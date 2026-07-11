import Link from "next/link";
import { loginAdmin } from "../actions/authActions";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F2E8] px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-[#16301F]">
            TS Care Palace
          </h1>

          <p className="mt-3 text-gray-600">
            Admin Dashboard Login
          </p>
        </div>

        <form action={loginAdmin} className="space-y-6">
          <div>
            <label className="mb-2 block font-semibold text-[#16301F]">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="admin@example.com"
              required
              className="w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-[#16301F]"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-[#16301F]">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              className="w-full rounded-xl border border-gray-300 p-4 outline-none transition focus:border-[#16301F]"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#16301F] py-4 text-lg font-semibold text-white transition hover:bg-[#21452c]"
          >
            Login
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="font-medium text-[#A9822E] hover:underline"
          >
            ← Back to Website
          </Link>
        </div>
      </div>
    </main>
  );
}