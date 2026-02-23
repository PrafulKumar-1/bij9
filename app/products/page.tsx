import Link from "next/link";

import { ProductCard } from "@/components/product/product-card";
import { CtaStrip } from "@/components/sections/cta-strip";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { getPublishedCategories, getPublishedProducts } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Export Product Catalog",
  description: "Browse premium export products from India with category filters, search, and quick enquiry.",
  path: "/products",
});

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string; sort?: "newest" | "moq" | "popular"; page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page || 1);

  const [categories, productData] = await Promise.all([
    getPublishedCategories(),
    getPublishedProducts({
      categorySlug: params.category,
      search: params.q,
      sort: params.sort ?? "newest",
      page,
      pageSize: 9,
    }),
  ]);

  return (
    <div className="space-y-12 pb-20 pt-10">
      <SectionHeading
        description="Premium image-forward catalog with specification-led sourcing support."
        eyebrow="Catalog"
        title="Global product portfolio"
      />

      <section className="rounded-xl border border-[var(--gm-color-border)] bg-[var(--gm-color-surface)] p-4 md:p-6">
        <form className="grid gap-3 md:grid-cols-4" method="get">
          <input
            className="h-11 rounded-md border border-[var(--gm-color-border)] bg-[var(--gm-color-bg)] px-3 text-sm"
            defaultValue={params.q ?? ""}
            name="q"
            placeholder="Search products"
          />
          <select
            className="h-11 rounded-md border border-[var(--gm-color-border)] bg-[var(--gm-color-bg)] px-3 text-sm"
            defaultValue={params.category ?? ""}
            name="category"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            className="h-11 rounded-md border border-[var(--gm-color-border)] bg-[var(--gm-color-bg)] px-3 text-sm"
            defaultValue={params.sort ?? "newest"}
            name="sort"
          >
            <option value="newest">Newest</option>
            <option value="moq">MOQ</option>
            <option value="popular">Popular</option>
          </select>
          <Button type="submit">Apply</Button>
        </form>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {productData.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

      <section className="flex items-center justify-between rounded-xl border border-[var(--gm-color-border)] bg-[var(--gm-color-surface)] p-4">
        <p className="text-sm text-[var(--gm-color-text-muted)]">
          Page {productData.page} of {productData.totalPages} ({productData.total} products)
        </p>
        <div className="flex gap-2">
          <Button asChild disabled={productData.page <= 1} size="sm" variant="secondary">
            <Link
              href={{
                pathname: "/products",
                query: {
                  ...(params.q ? { q: params.q } : {}),
                  ...(params.category ? { category: params.category } : {}),
                  ...(params.sort ? { sort: params.sort } : {}),
                  page: Math.max(1, productData.page - 1),
                },
              }}
            >
              Previous
            </Link>
          </Button>
          <Button asChild disabled={productData.page >= productData.totalPages} size="sm" variant="secondary">
            <Link
              href={{
                pathname: "/products",
                query: {
                  ...(params.q ? { q: params.q } : {}),
                  ...(params.category ? { category: params.category } : {}),
                  ...(params.sort ? { sort: params.sort } : {}),
                  page: productData.page + 1,
                },
              }}
            >
              Next
            </Link>
          </Button>
        </div>
      </section>

      <CtaStrip />
    </div>
  );
}
