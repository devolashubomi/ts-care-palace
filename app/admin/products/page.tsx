import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { deleteProduct } from "./actions/productActions";
import { isAuthenticated } from "@/lib/auth";

export default async function ProductsPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  const products = await prisma.product.findMany({
    include: {
      images: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="container mx-auto px-6 py-10">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#16301F]">
            Products
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your store inventory.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/admin"
            className="rounded-xl border border-[#16301F] px-6 py-3 text-[#16301F] transition hover:bg-[#16301F] hover:text-white"
          >
            ← Dashboard
          </Link>

          <Link
            href="/admin/products/new"
            className="rounded-xl bg-[#16301F] px-6 py-3 text-white transition hover:bg-[#21452c]"
          >
            + Add Product
          </Link>
        </div>
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
              <th className="p-4 text-left">Featured</th>
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
                  <Image
                    src={
                      product.images[0]?.imageUrl ??
                      "/placeholder.png"
                    }
                    alt={product.name}
                    width={64}
                    height={64}
                    className="rounded-lg object-cover"
                  />
                </td>

                <td className="p-4">
                  <div className="font-semibold">
                    {product.name}
                  </div>

                  {!product.published && (
                    <span className="mt-1 inline-block rounded-full bg-gray-200 px-2 py-1 text-xs">
                      Hidden
                    </span>
                  )}
                </td>

                <td className="p-4">
                  {product.category.name}
                </td>

                <td className="p-4">
                  ₦{product.price.toLocaleString()}
                </td>

                <td className="p-4">
                  {product.stock}
                </td>

                <td className="p-4">
                  {product.featured ? (
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                      ⭐ Featured
                    </span>
                  ) : (
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                      No
                    </span>
                  )}
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
                  colSpan={7}
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