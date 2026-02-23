import Image from "next/image";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/product/product-card";
import { CtaStrip } from "@/components/sections/cta-strip";
import { getCategoryBySlug } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return buildPageMetadata({
      title: "Category not found",
      description: "The requested category could not be found.",
      path: `/categories/${slug}`,
    });
  }

  return buildPageMetadata({
    title: `${category.name} Exports`,
    description: category.description,
    path: `/categories/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="space-y-12 pb-20 pt-10">
      <section className="relative overflow-hidden rounded-2xl border border-[var(--gm-color-border)]">
        <div className="relative h-80">
          <Image alt={category.name} className="object-cover" fill priority sizes="100vw" src={category.heroImageUrl} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/30" />
          <div className="absolute inset-0 flex items-end px-6 py-8 md:px-10">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--gm-color-gold)]">Category</p>
              <h1 className="font-[family-name:var(--font-heading)] text-4xl text-white md:text-5xl">{category.name}</h1>
              <p className="text-sm leading-7 text-[var(--gm-color-text-muted)]">{category.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {category.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

      <CtaStrip />
    </div>
  );
}
