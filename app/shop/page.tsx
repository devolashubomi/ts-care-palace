import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { prisma } from "@/lib/prisma";

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    where: {
      published: true,
    },
    include: {
      images: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <Header />

      <main className="container mx-auto px-6 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-[#16301F]">
            Shop Our Products
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            Discover premium cosmetics and natural organic products.
          </p>
        </div>

        <ProductGrid products={products} />
      </main>

      <Footer />
    </>
  );
}