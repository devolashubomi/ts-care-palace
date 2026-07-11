import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@tscarepalace.com";
  const password = "Admin123!";

  const passwordHash = await bcrypt.hash(password, 10);

  const existingAdmin = await prisma.adminUser.findUnique({
    where: {
      email,
    },
  });

  if (existingAdmin) {
    console.log("❌ Admin already exists.");
    return;
  }

  await prisma.adminUser.create({
    data: {
      email,
      passwordHash,
    },
  });

  console.log("✅ Admin created successfully!");
  console.log("Email:", email);
  console.log("Password:", password);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });