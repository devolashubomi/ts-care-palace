import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export default async function AdminDashboard() {
  await requireAuth();

  const [
    totalProducts,
    totalCategories,
    totalOrders,
    paidOrders,
    pendingOrders,
    totalRevenue,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.productCategory.count(),
    prisma.order.count(),
    prisma.order.count({
      where: {
        paymentStatus: "paid",
      },
    }),
    prisma.order.count({
      where: {
        paymentStatus: "pending",
      },
    }),
    prisma.order.aggregate({
      where: {
        paymentStatus: "paid",
      },
      _sum: {
        total: true,
      },
    }),
  ]);

  return (
    <main className="container mx-auto px-6 py-10">
      <h1 className="mb-10 text-5xl font-bold text-[#16301F]">
        Admin Dashboard
      </h1>

      <div className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-6">
        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-gray-500">Products</p>
          <h2 className="mt-2 text-4xl font-bold">
            {totalProducts}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-gray-500">Categories</p>
          <h2 className="mt-2 text-4xl font-bold">
            {totalCategories}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-gray-500">Orders</p>
          <h2 className="mt-2 text-4xl font-bold">
            {totalOrders}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-gray-500">Paid</p>
          <h2 className="mt-2 text-4xl font-bold text-green-600">
            {paidOrders}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <p className="text-gray-500">Pending</p>
          <h2 className="mt-2 text-4xl font-bold text-yellow-600">
            {pendingOrders}
          </h2>
        </div>

        <div className="rounded-2xl bg-[#16301F] p-6 text-white shadow">
          <p>Total Revenue</p>

          <h2 className="mt-2 text-3xl font-bold">
            ₦{(totalRevenue._sum.total ?? 0).toLocaleString()}
          </h2>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <Link
          href="/admin/products"
          className="rounded-2xl bg-[#16301F] p-8 text-white shadow transition hover:-translate-y-1"
        >
          <div className="text-5xl">📦</div>

          <h2 className="mt-6 text-3xl font-bold">
            Products
          </h2>

          <p className="mt-3">
            Manage your store products.
          </p>
        </Link>

        <Link
          href="/admin/categories"
          className="rounded-2xl bg-[#4F46E5] p-8 text-white shadow transition hover:-translate-y-1"
        >
          <div className="text-5xl">🗂️</div>

          <h2 className="mt-6 text-3xl font-bold">
            Categories
          </h2>

          <p className="mt-3">
            Add, edit and organize product categories.
          </p>
        </Link>

        <Link
          href="/admin/orders"
          className="rounded-2xl bg-[#A9822E] p-8 text-white shadow transition hover:-translate-y-1"
        >
          <div className="text-5xl">🛒</div>

          <h2 className="mt-6 text-3xl font-bold">
            Orders
          </h2>

          <p className="mt-3">
            Manage customer orders.
          </p>
        </Link>
      </div>
    </main>
  );
}