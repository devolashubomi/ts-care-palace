"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();

  return (
    <>
      <Header />

      <main className="container py-16">
        <h1 className="mb-10 text-5xl font-bold text-[#16301F]">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
            <h2 className="text-3xl font-bold">
              Your cart is empty
            </h2>

            <p className="mt-4 text-gray-600">
              Start shopping to add products to your cart.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-block rounded-xl bg-[#16301F] px-8 py-4 font-semibold text-white hover:bg-[#21452C]"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center gap-6 rounded-3xl bg-white p-6 shadow-lg md:flex-row"
                >
                  <div className="relative h-32 w-32 overflow-hidden rounded-2xl">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">
                      {item.name}
                    </h2>

                    <p className="mt-2 text-xl font-semibold text-[#A9822E]">
                      ₦{item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                      className="rounded-lg bg-gray-200 px-4 py-2"
                    >
                      -
                    </button>

                    <span className="text-xl font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                      className="rounded-lg bg-gray-200 px-4 py-2"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                    className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-3xl bg-white p-8 shadow-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">
                  Total
                </h2>

                <span className="text-3xl font-bold text-[#A9822E]">
                  ₦{totalPrice.toLocaleString()}
                </span>
              </div>

              <button className="mt-8 w-full rounded-xl bg-[#16301F] py-4 text-xl font-semibold text-white hover:bg-[#21452C]">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}