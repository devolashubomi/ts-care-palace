"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: string;
  images: {
    imageUrl: string;
  }[];
};

export default function ProductGrid({
  products,
}: {
  products: Product[];
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category.toLowerCase() === category.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  return (
    <>
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full rounded-lg border p-3 md:w-96"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="rounded-lg border p-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>cosmetics</option>
          <option>organic</option>
        </select>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.slug}
            name={product.name}
            price={product.price}
            category={product.category}
            image={
              product.images.length
                ? product.images[0].imageUrl
                : "/placeholder.png"
            }
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="mt-10 text-center text-gray-500">
          No products found.
        </p>
      )}
    </>
  );
}