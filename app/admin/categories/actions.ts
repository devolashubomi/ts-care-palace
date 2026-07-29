"use server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function createSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/* =========================================================
   CREATE CATEGORY
========================================================= */

export async function createCategory(formData: FormData) {
  await requireAuth();

  const name = (formData.get("name") as string).trim();

  if (!name) {
    throw new Error("Category name is required.");
  }

  const slug = createSlug(name);

  const existing = await prisma.productCategory.findFirst({
    where: {
      OR: [{ name }, { slug }],
    },
  });

  if (existing) {
    throw new Error("Category already exists.");
  }

  await prisma.productCategory.create({
    data: {
      name,
      slug,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
  revalidatePath("/admin/products/new");
  revalidatePath("/admin/products/[id]/edit");

  redirect("/admin/categories");
}

/* =========================================================
   UPDATE CATEGORY
========================================================= */

export async function updateCategory(formData: FormData) {
  await requireAuth();

  const id = (formData.get("id") as string).trim();
  const name = (formData.get("name") as string).trim();

  if (!id) {
    throw new Error("Category ID is required.");
  }

  if (!name) {
    throw new Error("Category name is required.");
  }

  const slug = createSlug(name);

  const existing = await prisma.productCategory.findFirst({
    where: {
      slug,
      NOT: {
        id,
      },
    },
  });

  if (existing) {
    throw new Error("Another category already uses this name.");
  }

  await prisma.productCategory.update({
    where: {
      id,
    },
    data: {
      name,
      slug,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
  revalidatePath("/admin/products/new");
  revalidatePath("/admin/products/[id]/edit");

  redirect("/admin/categories");
}

/* =========================================================
   DELETE CATEGORY
========================================================= */

export async function deleteCategory(formData: FormData) {
  await requireAuth();

  const id = (formData.get("id") as string).trim();

  if (!id) {
    throw new Error("Category ID is required.");
  }

  const category = await prisma.productCategory.findUnique({
    where: {
      id,
    },
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  if (!category) {
    throw new Error("Category not found.");
  }

  if (category._count.products > 0) {
    throw new Error(
      "Cannot delete a category that still contains products."
    );
  }

  await prisma.productCategory.delete({
    where: {
      id,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
  revalidatePath("/admin/products/new");
  revalidatePath("/admin/products/[id]/edit");

  redirect("/admin/categories");
}