import type { Prisma } from "@prisma/client";

import { db } from "@/lib/db";
import { parseJsonArray } from "@/lib/utils";

type ProductSort = "newest" | "moq" | "popular";

export async function getPublishedCategories() {
  return db.category.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: { products: true },
      },
    },
  });
}

export async function getFeaturedProducts(limit = 6) {
  const products = await db.product.findMany({
    where: { status: "published", featured: true },
    include: { images: { orderBy: { sortOrder: "asc" } }, category: true },
    orderBy: { updatedAt: "desc" },
    take: limit,
  });

  return products.map(normalizeProduct);
}

export async function getPublishedProducts(params: {
  search?: string;
  categorySlug?: string;
  sort?: ProductSort;
  page?: number;
  pageSize?: number;
}) {
  const page = Math.max(1, params.page ?? 1);
  const pageSize = Math.min(24, Math.max(1, params.pageSize ?? 9));

  const where: Prisma.ProductWhereInput = {
    status: "published",
    ...(params.search
      ? {
          OR: [
            { title: { contains: params.search, mode: "insensitive" } },
            { shortDescription: { contains: params.search, mode: "insensitive" } },
          ],
        }
      : {}),
    ...(params.categorySlug
      ? {
          category: {
            slug: params.categorySlug,
          },
        }
      : {}),
  };

  const orderBy: Prisma.ProductOrderByWithRelationInput[] =
    params.sort === "moq"
      ? [{ moqValue: "asc" }]
      : params.sort === "popular"
        ? [{ popularity: "desc" }, { updatedAt: "desc" }]
        : [{ createdAt: "desc" }];

  const [products, total] = await Promise.all([
    db.product.findMany({
      where,
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        category: true,
      },
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    db.product.count({ where }),
  ]);

  return {
    products: products.map(normalizeProduct),
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export async function getProductBySlug(slug: string) {
  const product = await db.product.findUnique({
    where: { slug },
    include: {
      category: true,
      images: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!product || product.status !== "published") {
    return null;
  }

  return normalizeProduct(product);
}

export async function getRelatedProducts(productId: string, categoryId: string) {
  const products = await db.product.findMany({
    where: {
      id: { not: productId },
      categoryId,
      status: "published",
    },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      category: true,
    },
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  return products.map(normalizeProduct);
}

export async function getCategoryBySlug(slug: string) {
  const category = await db.category.findUnique({
    where: { slug },
    include: {
      products: {
        where: { status: "published" },
        include: { images: { orderBy: { sortOrder: "asc" } }, category: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!category) {
    return null;
  }

  return {
    ...category,
    products: category.products.map(normalizeProduct),
  };
}

export async function getAdminDashboardStats() {
  const [products, categories, enquiries, requirements] = await Promise.all([
    db.product.count(),
    db.category.count(),
    db.enquiry.count(),
    db.requirementRequest.count(),
  ]);

  return { products, categories, enquiries, requirements };
}

export function normalizeProduct<T extends {
  packagingOptions: string;
  certifications: string;
  images: Array<{ url: string; alt: string; sortOrder: number }>;
}>(product: T) {
  return {
    ...product,
    packagingOptions: parseJsonArray(product.packagingOptions),
    certifications: parseJsonArray(product.certifications),
    images: [...product.images].sort((a, b) => a.sortOrder - b.sortOrder),
  };
}
