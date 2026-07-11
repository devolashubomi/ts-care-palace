import Link from "next/link";

const featuredProducts = [
  {
    id: 1,
    name: "Organic Black Soap",
    price: "₦4,500",
    category: "Organic",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
  },
  {
    id: 2,
    name: "Vitamin C Face Serum",
    price: "₦8,000",
    category: "Cosmetics",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
  },
  {
    id: 3,
    name: "Raw Shea Butter",
    price: "₦3,500",
    category: "Organic",
    image:
      "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=800&q=80",
  },
  {
    id: 4,
    name: "Body Lotion",
    price: "₦7,500",
    category: "Cosmetics",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
  },
];

export default function Home() {
  return (
    <main>
      {/* Header */}
      <header className="bg-[#16301F] text-white">
        <div className="container flex items-center justify-between py-5">
          <h1 className="text-3xl font-bold">TS Care Palace</h1>

          <nav className="flex gap-6">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/admin/login">Admin</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <span className="inline-block rounded-full bg-[#A9822E] px-4 py-2 text-white">
              Premium Cosmetics & Organic Products
            </span>

            <h2 className="mt-6 text-6xl font-bold text-[#16301F]">
              Beauty Begins With Healthy Skin
            </h2>

            <p className="mt-6 text-lg text-gray-700">
              Discover carefully selected cosmetics and organic products that
              help you glow naturally every day.
            </p>

            <div className="mt-8 flex gap-4">
              <Link href="/shop" className="btn-primary">
                Shop Now
              </Link>

              <Link href="/shop" className="btn-secondary">
                Explore
              </Link>
            </div>
          </div>

          <img
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&q=80"
            alt="Beauty"
            className="rounded-3xl shadow-2xl"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <h2 className="mb-10 text-center text-4xl font-bold">
            Shop by Category
          </h2>

          <div className="grid gap-8 md:grid-cols-2">
            <Link
              href="/shop?category=cosmetics"
              className="rounded-3xl bg-[#7D2E3F] p-10 text-white"
            >
              <h3 className="text-3xl font-bold">Cosmetics</h3>

              <p className="mt-4">
                Makeup, serums, lotions, skincare and beauty essentials.
              </p>
            </Link>

            <Link
              href="/shop?category=organic"
              className="rounded-3xl bg-[#16301F] p-10 text-white"
            >
              <h3 className="text-3xl font-bold">Organic Products</h3>

              <p className="mt-4">
                Natural soaps, shea butter, oils and wellness products.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="section">
        <div className="container">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-4xl font-bold">Featured Products</h2>

            <Link href="/shop" className="text-[#A9822E] font-semibold">
              View All →
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-64 w-full object-cover"
                />

                <div className="p-6">
                  <p className="text-sm text-[#A9822E]">
                    {product.category}
                  </p>

                  <h3 className="mt-2 text-xl font-bold">
                    {product.name}
                  </h3>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="price-tag">{product.price}</span>

                    <button className="btn-primary">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold">Why Choose TS Care Palace?</h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="card p-8">
              <h3 className="text-2xl font-bold">🌿 Natural Products</h3>
              <p className="mt-4">
                Carefully sourced organic and skincare products.
              </p>
            </div>

            <div className="card p-8">
              <h3 className="text-2xl font-bold">🚚 Fast Delivery</h3>
              <p className="mt-4">
                Reliable delivery across Nigeria.
              </p>
            </div>

            <div className="card p-8">
              <h3 className="text-2xl font-bold">💚 Trusted Quality</h3>
              <p className="mt-4">
                Premium beauty products you can trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#16301F] py-12 text-white">
        <div className="container">
          <h2 className="text-3xl font-bold">TS Care Palace</h2>

          <p className="mt-4 max-w-xl text-gray-300">
            Your trusted destination for premium cosmetics and organic
            products.
          </p>

          <p className="mt-8 text-sm text-gray-400">
            © {new Date().getFullYear()} TS Care Palace. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}