import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

type OrderEmailProps = {
  email: string;
  customerName: string;
  orderId: string;
  total: number;
};

export async function sendOrderConfirmationEmail({
  email,
  customerName,
  orderId,
  total,
}: OrderEmailProps) {
  if (!email) {
    return;
  }

  await resend.emails.send({
    from: "TS Care Palace <onboarding@resend.dev>",
    to: email,
    subject: "Your TS Care Palace Order Has Been Confirmed 🎉",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color:#16301F;">
          Thank you for shopping with TS Care Palace
        </h2>

        <p>
          Hello ${customerName},
        </p>

        <p>
          Your payment has been received successfully.
        </p>

        <h3>
          Order Details
        </h3>

        <p>
          <strong>Order ID:</strong> ${orderId}
        </p>

        <p>
          <strong>Total Amount:</strong>
          ₦${total.toLocaleString()}
        </p>

        <p>
          We will notify you when your order status changes.
        </p>

        <hr />

        <p>
          Thank you for choosing TS Care Palace.
        </p>

        <p>
          For more details, enquiries, or assistance with your order,
          contact us on WhatsApp:
        </p>

        <p>
          <strong>📱 08133389068</strong>
        </p>

        <p>
          We look forward to serving you again.
        </p>
      </div>
    `,
  });
}