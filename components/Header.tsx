"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="bg-[#16301F] text-white shadow-md">
      <div className="container flex items-center justify-between py-5">
        <Link href="/" className="text-3xl font-bold">
          TS Care Palace
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/" className="hover:text-[#A9822E]">
            Home
          </Link>

          <Link href="/shop" className="hover:text-[#A9822E]">
            Shop
          </Link>

          <Link href="/cart" className="hover:text-[#A9822E]">
            🛒 Cart
            {totalItems > 0 && (
              <span className="ml-2 rounded-full bg-[#A9822E] px-2 py-1 text-xs font-bold">
                {totalItems}
              </span>
            )}
          </Link>

          <Link href="/admin/login" className="hover:text-[#A9822E]">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}