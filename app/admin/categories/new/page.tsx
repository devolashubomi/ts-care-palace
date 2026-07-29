import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { createCategory } from "../actions";

export default async function NewCategoryPage() {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  return (
    <main className="container mx-auto max-w-2xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-[#16301F]">
          Add Category
        </h1>

        <Link
          href="/admin/categories"
          className="rounded-lg border border-[#16301F] px-5 py-3 text-[#16301F] transition hover:bg-[#16301F] hover:text-white"
        >
          ← Back to Categories
        </Link>
      </div>

      <form
        action={createCategory}
        className="space-y-6 rounded-2xl bg-white p-8 shadow"
      >
        <div>
          <label className="mb-2 block font-semibold">
            Category Name
          </label>

          <input
            type="text"
            name="name"
            required
            placeholder="e.g. Hair Care"
            className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-[#16301F]"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-[#16301F] py-4 font-semibold text-white transition hover:bg-[#21452c]"
        >
          Create Category
        </button>
      </form>
    </main>
  );
}