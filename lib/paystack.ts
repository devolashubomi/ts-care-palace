const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

if (!PAYSTACK_SECRET_KEY) {
  throw new Error(
    "PAYSTACK_SECRET_KEY is missing from your .env file."
  );
}

const PAYSTACK_BASE_URL = "https://api.paystack.co";

type InitializePaymentParams = {
  email: string;
  amount: number;
  reference: string;
  callbackUrl: string;
  metadata?: Record<string, unknown>;
};

export async function initializePayment({
  email,
  amount,
  reference,
  callbackUrl,
  metadata,
}: InitializePaymentParams) {
  const response = await fetch(
    `${PAYSTACK_BASE_URL}/transaction/initialize`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount,
        reference,
        callback_url: callbackUrl,
        metadata,
      }),
      cache: "no-store",
    }
  );

  const result = await response.json();

  if (!response.ok || !result.status) {
    throw new Error(
      result.message || "Failed to initialize Paystack payment."
    );
  }

  return result.data;
}

export async function verifyPayment(reference: string) {
  const response = await fetch(
    `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
      cache: "no-store",
    }
  );

  const result = await response.json();

  if (!response.ok || !result.status) {
    throw new Error(
      result.message || "Failed to verify Paystack payment."
    );
  }

  return result.data;
}