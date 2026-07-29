"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckoutForm from "@/components/CheckoutForm";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <>
        <Header />

        <main className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl font-bold text-[#16301F]">
            Checkout
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Your cart is empty.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-block rounded-xl bg-[#16301F] px-8 py-4 text-white transition hover:bg-[#21452c]"
          >
            Continue Shopping
          </Link>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="container mx-auto max-w-6xl px-6 py-16">
        <h1 className="mb-10 text-5xl font-bold text-[#16301F]">
          Checkout
        </h1>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Customer Details */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-2xl font-bold">
              Delivery Information
            </h2>

            <CheckoutForm />
          </div>

          {/* Order Summary */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-2xl font-bold">
              Order Summary
            </h2>

            <div className="space-y-5">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div>
                    <p className="font-semibold">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-bold text-[#A9822E]">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between border-t pt-6">
              <span className="text-2xl font-bold">
                Total
              </span>

              <span className="text-3xl font-bold text-[#A9822E]">
                ₦{totalPrice.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}