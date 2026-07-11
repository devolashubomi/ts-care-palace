import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AdminDashboard() {
  return (
    <>
      <Header />

      <main className="container mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-[#16301F]">
            Admin Dashboard
          </h1>

          <p className="mt-3 text-lg text-gray-600">
            Welcome to the TS Care Palace management system.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/admin/products"
            className="rounded-2xl bg-[#16301F] p-8 text-white shadow-lg transition hover:-translate-y-1"
          >
            <div className="text-5xl">📦</div>

            <h2 className="mt-6 text-2xl font-bold">
              Products
            </h2>

            <p className="mt-3 text-gray-200">
              Add, edit and delete products.
            </p>
          </Link>

          <div className="rounded-2xl bg-white p-8 shadow-lg opacity-60">
            <div className="text-5xl">🛒</div>

            <h2 className="mt-6 text-2xl font-bold">
              Orders
            </h2>

            <p className="mt-3 text-gray-600">
              Coming soon
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-lg opacity-60">
            <div className="text-5xl">👥</div>

            <h2 className="mt-6 text-2xl font-bold">
              Customers
            </h2>

            <p className="mt-3 text-gray-600">
              Coming soon
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-lg opacity-60">
            <div className="text-5xl">📈</div>

            <h2 className="mt-6 text-2xl font-bold">
              Analytics
            </h2>

            <p className="mt-3 text-gray-600">
              Coming soon
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}