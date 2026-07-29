"use server";

import { randomUUID } from "crypto";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { initializePayment } from "@/lib/paystack";

export async function createOrder(formData: FormData) {
  const customerName = (formData.get("customerName") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const address = (formData.get("address") as string)?.trim();
  const city = (formData.get("city") as string)?.trim();

  const itemsJson = formData.get("items") as string;
  const total = Number(formData.get("total"));

  if (!customerName || !email || !phone || !address || !city) {
    throw new Error("Please complete all required fields.");
  }

  const items: {
    id: string;
    quantity: number;
    price: number;
  }[] = JSON.parse(itemsJson);

  // Validate stock
  for (const item of items) {
    const product = await prisma.product.findUnique({
      where: {
        id: item.id,
      },
    });

    if (!product) {
      throw new Error("One of the products no longer exists.");
    }

    if (product.stock < item.quantity) {
      throw new Error(
        `${product.name} only has ${product.stock} item(s) left in stock.`
      );
    }
  }

  const reference = `TSCP-${randomUUID()}`;

  const order = await prisma.order.create({
    data: {
      customerName,
      email,
      phone,
      address,
      city,
      total,
      paystackReference: reference,

      items: {
        create: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  });

  const payment = await initializePayment({
    email,
    amount: total * 100,
    reference,
    callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/verify`,
    metadata: {
      orderId: order.id,
      customerName,
    },
  });

  redirect(payment.authorization_url);
}