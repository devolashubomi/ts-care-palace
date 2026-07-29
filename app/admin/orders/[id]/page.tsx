import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { updateOrderStatus } from "../actions";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

function getStatusColor(status: string) {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "confirmed":
      return "bg-blue-100 text-blue-800";
    case "shipped":
      return "bg-purple-100 text-purple-800";
    case "delivered":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default async function OrderDetailsPage({
  params,
}: PageProps) {
  await requireAuth();

  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <main className="container mx-auto px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-[#16301F]">
          Order Details
        </h1>

        <Link
          href="/admin/orders"
          className="rounded-xl border border-[#16301F] px-5 py-3 text-[#16301F] transition hover:bg-[#16301F] hover:text-white"
        >
          ← Back
        </Link>
      </div>

      <div className="mb-8 rounded-2xl bg-white p-6 shadow">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-gray-500">Current Status</p>

            <span
              className={`mt-2 inline-block rounded-full px-4 py-2 text-sm font-semibold capitalize ${getStatusColor(
                order.status
              )}`}
            >
              {order.status}
            </span>
          </div>

          <div>
            <p className="text-gray-500">Payment</p>

            <span className="mt-2 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold capitalize text-green-700">
              {order.paymentStatus}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-8 shadow">
          <h2 className="mb-6 text-2xl font-bold">
            Customer Information
          </h2>

          <div className="space-y-4">
            <p><strong>Name:</strong> {order.customerName}</p>
            <p><strong>Email:</strong> {order.email || "N/A"}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>City:</strong> {order.city}</p>
            <p><strong>Address:</strong> {order.address}</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow">
          <h2 className="mb-6 text-2xl font-bold">
            Order Information
          </h2>

          <div className="space-y-4">
            <p>
              <strong>Total:</strong> ₦
              {order.total.toLocaleString()}
            </p>

            <p>
              <strong>Reference:</strong>{" "}
              {order.paystackReference ?? "N/A"}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          <form action={updateOrderStatus} className="mt-8">
            <input
              type="hidden"
              name="orderId"
              value={order.id}
            />

            <label className="mb-3 block font-semibold">
              Update Status
            </label>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {[
                "pending",
                "confirmed",
                "shipped",
                "delivered",
                "cancelled",
              ].map((status) => (
                <button
                  key={status}
                  type="submit"
                  name="status"
                  value={status}
                  className={`rounded-xl px-4 py-3 font-semibold capitalize transition ${
                    order.status === status
                      ? "bg-[#16301F] text-white"
                      : "border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </form>
        </div>
      </div>

      <div className="mt-10 rounded-2xl bg-white p-8 shadow">
        <h2 className="mb-6 text-2xl font-bold">
          Products
        </h2>

        <table className="w-full">
          <thead className="border-b">
            <tr>
              <th className="py-3 text-left">Product</th>
              <th className="py-3 text-left">Price</th>
              <th className="py-3 text-left">Qty</th>
              <th className="py-3 text-left">Total</th>
            </tr>
          </thead>

          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-4">
                  {item.product.name}
                </td>

                <td className="py-4">
                  ₦{item.price.toLocaleString()}
                </td>

                <td className="py-4">
                  {item.quantity}
                </td>

                <td className="py-4 font-semibold">
                  ₦{(
                    item.price * item.quantity
                  ).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}