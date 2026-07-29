import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import { deleteCategory } from "./actions";

export default async function CategoriesPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  const categories = await prisma.productCategory.findMany({
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="container mx-auto px-6 py-10">
      <div className="mb-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="rounded-lg border border-[#16301F] px-5 py-3 text-[#16301F] transition hover:bg-[#16301F] hover:text-white"
          >
            ← Dashboard
          </Link>

          <h1 className="text-4xl font-bold text-[#16301F]">
            Categories
          </h1>
        </div>

        <Link
          href="/admin/categories/new"
          className="rounded-xl bg-[#16301F] px-6 py-3 text-white transition hover:bg-[#21452c]"
        >
          + Add Category
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow">
        <table className="w-full">
          <thead className="bg-[#16301F] text-white">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Slug</th>
              <th className="p-4 text-left">Products</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4 font-medium">
                  {category.name}
                </td>

                <td className="p-4 text-gray-600">
                  {category.slug}
                </td>

                <td className="p-4">
                  {category._count.products}
                </td>

                <td className="p-4">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/categories/${category.id}/edit`}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                    >
                      Edit
                    </Link>

                    <form action={deleteCategory}>
                      <input
                        type="hidden"
                        name="id"
                        value={category.id}
                      />

                      <button
                        type="submit"
                        disabled={category._count.products > 0}
                        className={`rounded-lg px-4 py-2 text-white transition ${
                          category._count.products > 0
                            ? "cursor-not-allowed bg-gray-400"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-10 text-center text-gray-500"
                >
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}