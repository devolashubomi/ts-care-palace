import Link from "next/link";

type PageProps = {
  searchParams: Promise<{
    order?: string;
  }>;
};

export default async function CheckoutSuccessPage({
  searchParams,
}: PageProps) {
  const { order } = await searchParams;

  return (
    <main className="container mx-auto flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-10 text-center shadow-xl">
        <div className="mb-6 text-7xl">🎉</div>

        <h1 className="text-4xl font-bold text-[#16301F]">
          Order Successful!
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          Thank you for shopping with TS Care Palace.
        </p>

        <p className="mt-2 text-lg text-gray-600">
          Your order has been received and is being processed.
        </p>

        {order && (
          <div className="mt-8 rounded-2xl bg-gray-100 p-6">
            <p className="text-sm text-gray-500">
              Order Reference
            </p>

            <p className="mt-2 break-all text-lg font-bold text-[#16301F]">
              {order}
            </p>
          </div>
        )}

        <Link
          href="/shop"
          className="mt-10 inline-block rounded-xl bg-[#16301F] px-8 py-4 text-lg font-semibold text-white transition hover:bg-[#21452c]"
        >
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}