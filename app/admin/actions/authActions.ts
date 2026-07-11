"use server";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function loginAdmin(formData: FormData) {
  const email = (formData.get("email") as string).trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  const admin = await prisma.adminUser.findUnique({
    where: {
      email,
    },
  });

  if (!admin) {
    throw new Error("Invalid email or password.");
  }

  const passwordMatches = await bcrypt.compare(
    password,
    admin.passwordHash
  );

  if (!passwordMatches) {
    throw new Error("Invalid email or password.");
  }

  const session = await getSession();

  session.isLoggedIn = true;
  session.adminId = admin.id;
  session.email = admin.email;

  await session.save();

  redirect("/admin/dashboard");
}

export async function logoutAdmin() {
  const session = await getSession();

  await session.destroy();

  redirect("/admin/login");
}