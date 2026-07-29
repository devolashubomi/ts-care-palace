"use client";

import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";

type ProductCardProps = {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  image: string;
};

export default function ProductCard({
  id,
  slug,
  name,
  price,
  category,
  image,
}: ProductCardProps) {
  const { addToCart } = useCart();

  function handleAddToCart() {
    addToCart({
      id,
      name,
      price,
      image,
    });

    toast.success(`${name} added to cart`);
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-64 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          {category}
        </span>

        <h3 className="mt-3 text-xl font-bold text-gray-900">
          {name}
        </h3>

        <p className="mt-2 text-2xl font-bold text-[#A9822E]">
          ₦{price.toLocaleString()}
        </p>

        <div className="mt-5 flex gap-3">
          <button
            onClick={handleAddToCart}
            className="flex-1 rounded-lg bg-[#16301F] px-4 py-3 font-semibold text-white transition hover:bg-[#21452c]"
          >
            Add to Cart
          </button>

          <Link
            href={`/product/${slug}`}
            className="rounded-lg border border-[#16301F] px-4 py-3 font-semibold text-[#16301F] transition hover:bg-[#16301F] hover:text-white"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}