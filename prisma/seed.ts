import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear old data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.productCategory.deleteMany();

  // Create categories
  const cosmetics = await prisma.productCategory.create({
    data: {
      name: "Cosmetics",
      slug: "cosmetics",
    },
  });

  const organic = await prisma.productCategory.create({
    data: {
      name: "Organic",
      slug: "organic",
    },
  });

  // Product 1
  await prisma.product.create({
    data: {
      name: "Vitamin C Face Serum",
      slug: "vitamin-c-face-serum",
      description:
        "Brightens the skin, reduces dark spots and improves skin texture.",
      price: 8000,
      stock: 25,
      featured: true,
      published: true,
      categoryId: cosmetics.id,

      images: {
        create: [
          {
            imageUrl:
              "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
            altText: "Vitamin C Face Serum",
            position: 1,
          },
        ],
      },
    },
  });

  // Product 2
  await prisma.product.create({
    data: {
      name: "Organic Black Soap",
      slug: "organic-black-soap",
      description:
        "Traditional African black soap for healthy glowing skin.",
      price: 4500,
      stock: 40,
      featured: true,
      published: true,
      categoryId: organic.id,

      images: {
        create: [
          {
            imageUrl:
              "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
            altText: "Organic Black Soap",
            position: 1,
          },
        ],
      },
    },
  });

  // Product 3
  await prisma.product.create({
    data: {
      name: "Raw Shea Butter",
      slug: "raw-shea-butter",
      description:
        "Pure unrefined shea butter suitable for skin and hair.",
      price: 3500,
      stock: 30,
      featured: false,
      published: true,
      categoryId: organic.id,

      images: {
        create: [
          {
            imageUrl:
              "https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=800&q=80",
            altText: "Raw Shea Butter",
            position: 1,
          },
        ],
      },
    },
  });

  console.log("✅ Database seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });