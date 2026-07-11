import Link from "next/link";
import { createProduct } from "../actions/productActions";

export default function NewProductPage() {
  return (
    <main className="container mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-[#16301F]">
          Add New Product
        </h1>

        <Link
          href="/admin/products"
          className="rounded-lg border border-[#16301F] px-5 py-3 text-[#16301F] transition hover:bg-[#16301F] hover:text-white"
        >
          ← Back to Products
        </Link>
      </div>

      <form
        action={createProduct}
        className="space-y-8 rounded-2xl bg-white p-8 shadow-xl"
      >
        <div>
          <label className="mb-2 block text-lg font-semibold">
            Product Name
          </label>

          <input
            type="text"
            name="name"
            required
            placeholder="Vitamin C Face Serum"
            className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#16301F]"
          />
        </div>

        <div>
          <label className="mb-2 block text-lg font-semibold">
            Description
          </label>

          <textarea
            name="description"
            required
            rows={6}
            placeholder="Write a detailed description..."
            className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#16301F]"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-lg font-semibold">
              Price (₦)
            </label>

            <input
              type="number"
              name="price"
              required
              min="1"
              placeholder="5000"
              className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#16301F]"
            />
          </div>

          <div>
            <label className="mb-2 block text-lg font-semibold">
              Stock
            </label>

            <input
              type="number"
              name="stock"
              required
              min="0"
              placeholder="25"
              className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#16301F]"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-lg font-semibold">
            Category
          </label>

          <select
            name="category"
            className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#16301F]"
          >
            <option value="cosmetics">Cosmetics</option>
            <option value="organic">Organic</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-lg font-semibold">
            Image URL
          </label>

          <input
            type="url"
            name="imageUrl"
            required
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#16301F]"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-[#16301F] py-4 text-lg font-semibold text-white transition hover:bg-[#21452c]"
        >
          Save Product
        </button>
      </form>
    </main>
  );
}