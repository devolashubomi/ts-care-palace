import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProduct } from "./actions/productActions";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="container mx-auto px-6 py-10">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-[#16301F]">
          Products
        </h1>

        <Link
          href="/admin/products/new"
          className="rounded-xl bg-[#16301F] px-6 py-3 text-white transition hover:bg-[#21452c]"
        >
          + Add Product
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow">
        <table className="w-full">
          <thead className="bg-[#16301F] text-white">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4">
                  <img
                    src={
                      product.images[0]?.imageUrl ??
                      "/placeholder.png"
                    }
                    alt={product.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                </td>

                <td className="p-4 font-medium">
                  {product.name}
                </td>

                <td className="p-4 capitalize">
                  {product.category}
                </td>

                <td className="p-4">
                  ₦{product.price.toLocaleString()}
                </td>

                <td className="p-4">
                  {product.stock}
                </td>

                <td className="p-4">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                    >
                      Edit
                    </Link>

                    <form action={deleteProduct}>
                      <input
                        type="hidden"
                        name="id"
                        value={product.id}
                      />

                      <button
                        type="submit"
                        className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                        onClick={(e) => {
                          if (
                            !confirm(
                              "Are you sure you want to delete this product?"
                            )
                          ) {
                            e.preventDefault();
                          }
                        }}
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-10 text-center text-gray-500"
                >
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}