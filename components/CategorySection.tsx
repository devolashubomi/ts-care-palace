import Link from "next/link";

export default function CategorySection() {
  const categories = [
    {
      title: "Cosmetics",
      description:
        "Makeup, serums, lotions, skincare and beauty essentials.",
      color: "bg-[#7B2E45]",
      href: "/shop?category=Cosmetics",
    },
    {
      title: "Organic",
      description:
        "Natural soaps, oils, shea butter and organic skincare products.",
      color: "bg-[#16301F]",
      href: "/shop?category=Organic",
    },
  ];

  return (
    <section className="container mx-auto px-6 py-20">
      <h2 className="mb-12 text-center text-5xl font-bold text-[#16301F]">
        Shop by Category
      </h2>

      <div className="grid gap-8 md:grid-cols-2">
        {categories.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className={`${category.color} group rounded-3xl p-10 text-white shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl`}
          >
            <h3 className="mb-4 text-3xl font-bold">
              {category.title}
            </h3>

            <p className="text-lg leading-7 text-gray-100">
              {category.description}
            </p>

            <div className="mt-8 inline-flex items-center rounded-full bg-white px-6 py-3 font-semibold text-[#16301F] transition group-hover:bg-[#A9822E] group-hover:text-white">
              Browse Products →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}