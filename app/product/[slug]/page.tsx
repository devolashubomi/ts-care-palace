import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      images: true,
      category: true,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="container mx-auto px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <img
              src={
                product.images.length
                  ? product.images[0].imageUrl
                  : "/placeholder.png"
              }
              alt={product.name}
              className="w-full rounded-3xl shadow-lg"
            />
          </div>

          <div>
            <span className="rounded-full bg-green-100 px-4 py-2 text-green-700">
              {product.category.name}
            </span>

            <h1 className="mt-6 text-5xl font-bold text-[#16301F]">
              {product.name}
            </h1>

            <p className="mt-6 text-4xl font-bold text-[#A9822E]">
              ₦{product.price.toLocaleString()}
            </p>

            <p className="mt-8 text-lg leading-8 text-gray-700">
              {product.description}
            </p>

            <p className="mt-8 text-lg">
              <strong>Stock:</strong> {product.stock}
            </p>

            <button className="mt-10 rounded-xl bg-[#16301F] px-8 py-4 text-lg font-semibold text-white transition hover:bg-[#21452c]">
              Add to Cart
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}