"use client";

import { createOrder } from "@/app/checkout/actions/orderActions";
import { useCart } from "@/context/CartContext";

export default function CheckoutForm() {
  const { cart, totalPrice } = useCart();

  return (
    <form action={createOrder} className="space-y-6">
      <div>
        <label className="mb-2 block font-medium">
          Full Name
        </label>

        <input
          type="text"
          name="customerName"
          required
          className="w-full rounded-xl border border-gray-300 p-4 focus:border-[#16301F] focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Email Address
        </label>

        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-xl border border-gray-300 p-4 focus:border-[#16301F] focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Phone Number
        </label>

        <input
          type="tel"
          name="phone"
          required
          className="w-full rounded-xl border border-gray-300 p-4 focus:border-[#16301F] focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          City
        </label>

        <input
          type="text"
          name="city"
          required
          className="w-full rounded-xl border border-gray-300 p-4 focus:border-[#16301F] focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Delivery Address
        </label>

        <textarea
          name="address"
          rows={5}
          required
          className="w-full rounded-xl border border-gray-300 p-4 focus:border-[#16301F] focus:outline-none"
        />
      </div>

      <input
        type="hidden"
        name="items"
        value={JSON.stringify(
          cart.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price,
          }))
        )}
      />

      <input
        type="hidden"
        name="total"
        value={totalPrice}
      />

      <button
        type="submit"
        className="w-full rounded-xl bg-[#16301F] py-4 text-lg font-semibold text-white transition hover:bg-[#21452c]"
      >
        Continue to Payment
      </button>
    </form>
  );
}