"use server";

import { prisma } from "@/lib/prisma";
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
   CREATE PRODUCT
========================================================= */

export async function createProduct(formData: FormData) {
  const name = (formData.get("name") as string).trim();
  const description = (formData.get("description") as string).trim();
  const category = formData.get("category") as "cosmetics" | "organic";
  const imageUrl = (formData.get("imageUrl") as string).trim();

  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));

  if (!name || !description || !imageUrl) {
    throw new Error("Please fill in all required fields.");
  }

  if (price <= 0) {
    throw new Error("Price must be greater than zero.");
  }

  if (stock < 0) {
    throw new Error("Stock cannot be negative.");
  }

  const slug = createSlug(name);

  const product = await prisma.product.create({
    data: {
      name,
      slug,
      description,
      price,
      stock,
      category,
      featured: false,
      published: true,
    },
  });

  await prisma.productImage.create({
    data: {
      productId: product.id,
      imageUrl,
    },
  });

  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/admin/products");

  redirect("/admin/products");
}

/* =========================================================
   UPDATE PRODUCT
========================================================= */

export async function updateProduct(formData: FormData) {
  const id = formData.get("id") as string;

  const name = (formData.get("name") as string).trim();
  const description = (formData.get("description") as string).trim();
  const category = formData.get("category") as "cosmetics" | "organic";
  const imageUrl = (formData.get("imageUrl") as string).trim();

  const price = Number(formData.get("price"));
  const stock = Number(formData.get("stock"));

  if (!id) {
    throw new Error("Missing product ID.");
  }

  if (!name || !description || !imageUrl) {
    throw new Error("Please fill in all required fields.");
  }

  const slug = createSlug(name);

  await prisma.product.update({
    where: { id },
    data: {
      name,
      slug,
      description,
      price,
      stock,
      category,
    },
  });

  const existingImage = await prisma.productImage.findFirst({
    where: {
      productId: id,
    },
  });

  if (existingImage) {
    await prisma.productImage.update({
      where: {
        id: existingImage.id,
      },
      data: {
        imageUrl,
      },
    });
  } else {
    await prisma.productImage.create({
      data: {
        productId: id,
        imageUrl,
      },
    });
  }

  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/admin/products");
  revalidatePath(`/product/${slug}`);

  redirect("/admin/products");
}

/* =========================================================
   DELETE PRODUCT
========================================================= */

export async function deleteProduct(formData: FormData) {
  const id = formData.get("id") as string;

  if (!id) {
    throw new Error("Missing product ID.");
  }

  // Delete images first
  await prisma.productImage.deleteMany({
    where: {
      productId: id,
    },
  });

  // Delete product
  await prisma.product.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/admin/products");

  redirect("/admin/products");
}