"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { serializeStringArray, slugify } from "@/lib/utils";
import { categorySchema } from "@/lib/validators/category";
import { productSchema } from "@/lib/validators/product";

function splitList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseImageRows(value: string) {
  const rows = value
    .split("\n")
    .map((row) => row.trim())
    .filter(Boolean);

  return rows.map((row, index) => {
    const [url, alt] = row.split("|").map((item) => item.trim());
    return {
      url,
      alt: alt || `Product image ${index + 1}`,
      sortOrder: index,
    };
  });
}

export async function upsertCategoryAction(formData: FormData) {
  await requireAdminSession();

  const payload = {
    id: String(formData.get("id") || "") || undefined,
    name: String(formData.get("name") || ""),
    slug: slugify(String(formData.get("slug") || formData.get("name") || "")),
    description: String(formData.get("description") || ""),
    heroImageUrl: String(formData.get("heroImageUrl") || ""),
  };

  const parsed = categorySchema.safeParse(payload);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Invalid category payload");
  }

  if (parsed.data.id) {
    await db.category.update({
      where: { id: parsed.data.id },
      data: parsed.data,
    });
  } else {
    await db.category.create({
      data: parsed.data,
    });
  }

  revalidatePath("/admin/categories");
  revalidatePath("/products");
  revalidatePath("/");
  redirect("/admin/categories");
}

export async function deleteCategoryAction(formData: FormData) {
  await requireAdminSession();

  const id = String(formData.get("id") || "");
  if (!id) {
    throw new Error("Missing category id");
  }

  await db.category.delete({ where: { id } });

  revalidatePath("/admin/categories");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function upsertProductAction(formData: FormData) {
  await requireAdminSession();

  const payload = {
    id: String(formData.get("id") || "") || undefined,
    title: String(formData.get("title") || ""),
    slug: slugify(String(formData.get("slug") || formData.get("title") || "")),
    categoryId: String(formData.get("categoryId") || ""),
    shortDescription: String(formData.get("shortDescription") || ""),
    description: String(formData.get("description") || ""),
    originCountry: String(formData.get("originCountry") || ""),
    moqValue: Number(formData.get("moqValue") || 0),
    moqUnit: String(formData.get("moqUnit") || ""),
    packagingOptions: splitList(String(formData.get("packagingOptions") || "")),
    leadTimeDays: Number(formData.get("leadTimeDays") || 0),
    certifications: splitList(String(formData.get("certifications") || "")),
    hsCode: String(formData.get("hsCode") || "") || undefined,
    featured: String(formData.get("featured") || "") === "on",
    brochureUrl: String(formData.get("brochureUrl") || "") || undefined,
    status: String(formData.get("status") || "draft"),
    images: parseImageRows(String(formData.get("images") || "")),
  };

  const parsed = productSchema.safeParse(payload);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Invalid product payload");
  }

  const data = parsed.data;

  if (data.id) {
    await db.product.update({
      where: { id: data.id },
      data: {
        title: data.title,
        slug: data.slug,
        categoryId: data.categoryId,
        shortDescription: data.shortDescription,
        description: data.description,
        originCountry: data.originCountry,
        moqValue: data.moqValue,
        moqUnit: data.moqUnit,
        packagingOptions: serializeStringArray(data.packagingOptions),
        leadTimeDays: data.leadTimeDays,
        certifications: serializeStringArray(data.certifications),
        hsCode: data.hsCode,
        featured: data.featured,
        brochureUrl: data.brochureUrl,
        status: data.status,
        images: {
          deleteMany: {},
          create: data.images,
        },
      },
    });
  } else {
    await db.product.create({
      data: {
        title: data.title,
        slug: data.slug,
        categoryId: data.categoryId,
        shortDescription: data.shortDescription,
        description: data.description,
        originCountry: data.originCountry,
        moqValue: data.moqValue,
        moqUnit: data.moqUnit,
        packagingOptions: serializeStringArray(data.packagingOptions),
        leadTimeDays: data.leadTimeDays,
        certifications: serializeStringArray(data.certifications),
        hsCode: data.hsCode,
        featured: data.featured,
        brochureUrl: data.brochureUrl,
        status: data.status,
        images: {
          create: data.images,
        },
      },
    });
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function deleteProductAction(formData: FormData) {
  await requireAdminSession();

  const id = String(formData.get("id") || "");
  if (!id) {
    throw new Error("Missing product id");
  }

  await db.product.delete({ where: { id } });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}

export async function updateEnquiryStatusAction(formData: FormData) {
  await requireAdminSession();

  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "NEW");

  await db.enquiry.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/admin/enquiries");
}

export async function updateRequirementStatusAction(formData: FormData) {
  await requireAdminSession();

  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "NEW");

  await db.requirementRequest.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/admin/requirements");
}
