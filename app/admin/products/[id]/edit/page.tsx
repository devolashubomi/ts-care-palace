import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProduct } from "../../actions/productActions";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      images: true,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="container mx-auto max-w-3xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold text-[#16301F]">
        Edit Product
      </h1>

      <form action={updateProduct} className="space-y-6 rounded-2xl bg-white p-8 shadow">
        <input type="hidden" name="id" value={product.id} />

        <div>
          <label className="mb-2 block font-medium">Product Name</label>
          <input
            name="name"
            defaultValue={product.name}
            required
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Description</label>
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
            <label className="mb-2 block font-medium">Price (₦)</label>
            <input
              type="number"
              name="price"
              defaultValue={product.price}
              required
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Stock</label>
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
          <label className="mb-2 block font-medium">Category</label>

          <select
            name="category"
            defaultValue={product.category}
            className="w-full rounded-lg border p-3"
          >
            <option value="cosmetics">Cosmetics</option>
            <option value="organic">Organic</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Product Image URL
          </label>

          <input
            name="imageUrl"
            defaultValue={product.images[0]?.imageUrl ?? ""}
            required
            className="w-full rounded-lg border p-3"
          />
        </div>

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