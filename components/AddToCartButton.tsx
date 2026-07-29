"use client";

import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";

type AddToCartButtonProps = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export default function AddToCartButton({
  id,
  name,
  price,
  image,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();

  function handleClick() {
    addToCart({
      id,
      name,
      price,
      image,
    });

    toast.success(`${name} added to cart`);
  }

  return (
    <button
      onClick={handleClick}
      className="mt-10 rounded-xl bg-[#16301F] px-8 py-4 text-lg font-semibold text-white transition hover:bg-[#21452c]"
    >
      Add to Cart
    </button>
  );
}