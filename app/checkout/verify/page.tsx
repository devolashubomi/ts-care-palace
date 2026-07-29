import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyPayment } from "@/lib/paystack";
import { sendOrderConfirmationEmail } from "@/lib/email";

type PageProps = {
  searchParams: Promise<{
    reference?: string;
    trxref?: string;
  }>;
};

export default async function VerifyPaymentPage({
  searchParams,
}: PageProps) {
  const { reference, trxref } = await searchParams;

  const paymentReference = reference ?? trxref;

  if (!paymentReference) {
    redirect("/checkout");
  }

  const payment = await verifyPayment(paymentReference);

  if (payment.status !== "success") {
    redirect("/checkout");
  }

  const order = await prisma.order.findUnique({
    where: {
      paystackReference: paymentReference,
    },
    include: {
      items: true,
    },
  });

  if (!order) {
    redirect("/checkout");
  }

  if (order.paymentStatus !== "paid") {
    await prisma.$transaction([
      prisma.order.update({
        where: {
          id: order.id,
        },
        data: {
          paymentStatus: "paid",
        },
      }),

      ...order.items.map((item) =>
        prisma.product.update({
          where: {
            id: item.productId,
          },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        })
      ),
    ]);

    if (order.email) {
      await sendOrderConfirmationEmail({
        email: order.email,
        customerName: order.customerName,
        orderId: order.id,
        total: order.total,
      });
    }
  }

  redirect(`/checkout/success?order=${order.id}`);
}