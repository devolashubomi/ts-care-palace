import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#16301F] text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="mb-4 text-2xl font-bold">
              TS Care Palace
            </h2>

            <p className="text-gray-300">
              Your trusted destination for premium cosmetics,
              skincare products, and natural organic essentials.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-[#A9822E]">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/shop" className="hover:text-[#A9822E]">
                  Shop
                </Link>
              </li>

              <li>
                <Link href="/cart" className="hover:text-[#A9822E]">
                  Cart
                </Link>
              </li>

              <li>
                <Link href="/admin/login" className="hover:text-[#A9822E]">
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold">
              Contact
            </h3>

            <p>Email: support@tscarepalace.com</p>
            <p className="mt-2">Phone: +234 XXX XXX XXXX</p>
            <p className="mt-2">Nigeria</p>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-400">
          © {new Date().getFullYear()} TS Care Palace. All rights reserved.
        </div>
      </div>
    </footer>
  );
}