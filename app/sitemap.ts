import type { MetadataRoute } from "next";

import { db } from "@/lib/db";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

type SitemapProduct = Awaited<ReturnType<typeof db.product.findMany>>[number];
type SitemapCategory = Awaited<ReturnType<typeof db.category.findMany>>[number];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories]: [SitemapProduct[], SitemapCategory[]] = await Promise.all([
    db.product.findMany({ where: { status: "published" }, select: { slug: true, updatedAt: true } }),
    db.category.findMany({ select: { slug: true, updatedAt: true } }),
  ]);

  const staticRoutes = ["", "/products", "/request", "/about", "/compliance", "/logistics", "/contact"];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...products.map((product: SitemapProduct) => ({
      url: absoluteUrl(`/products/${product.slug}`),
      lastModified: product.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...categories.map((category: SitemapCategory) => ({
      url: absoluteUrl(`/categories/${category.slug}`),
      lastModified: category.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
