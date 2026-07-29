import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProduct } from "../../actions/productActions";
import { isAuthenticated } from "@/lib/auth";
import ImageUpload from "@/components/ImageUpload";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({
  params,
}: PageProps) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
      },
    }),
    prisma.productCategory.findMany({
      orderBy: {
        name: "asc",
      },
    }),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <main className="container mx-auto max-w-3xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-[#16301F]">
          Edit Product
        </h1>

        <a
          href="/admin/products"
          className="rounded-lg border border-[#16301F] px-5 py-3 text-[#16301F] transition hover:bg-[#16301F] hover:text-white"
        >
          ← Back to Products
        </a>
      </div>

      <form
        action={updateProduct}
        className="space-y-6 rounded-2xl bg-white p-8 shadow"
      >
        <input
          type="hidden"
          name="id"
          value={product.id}
        />

        <div>
          <label className="mb-2 block font-medium">
            Product Name
          </label>

          <input
            name="name"
            defaultValue={product.name}
            required
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Description
          </label>

          <textarea
            name="description"
            defaultValue={product.description}
            rows={5}
            required
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">
              Price (₦)
            </label>

            <input
              type="number"
              name="price"
              defaultValue={product.price}
              required
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Stock
            </label>

            <input
              type="number"
              name="stock"
              defaultValue={product.stock}
              required
              className="w-full rounded-lg border p-3"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Category
          </label>

          <select
            name="categoryId"
            defaultValue={product.categoryId}
            required
            className="w-full rounded-lg border p-3"
          >
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <ImageUpload
          defaultValue={product.images[0]?.imageUrl ?? ""}
        />

        <button
          type="submit"
          className="rounded-xl bg-[#16301F] px-8 py-4 font-semibold text-white transition hover:bg-[#21452c]"
        >
          Update Product
        </button>
      </form>
    </main>
  );
}