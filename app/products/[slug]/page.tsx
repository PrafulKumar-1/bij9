import Link from "next/link";
import { Download } from "lucide-react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

import { ProductCard } from "@/components/product/product-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { StickyEnquiry } from "@/components/product/sticky-enquiry";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProductBySlug, getRelatedProducts } from "@/lib/data";
import { buildPageMetadata, productJsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return buildPageMetadata({
      title: "Product not found",
      description: "The requested product could not be found.",
      path: `/products/${slug}`,
    });
  }

  return buildPageMetadata({
    title: `${product.title} Export Supply`,
    description: product.shortDescription,
    path: `/products/${product.slug}`,
  });
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = await getRelatedProducts(product.id, product.categoryId);
  const jsonLd = productJsonLd({
    name: product.title,
    description: product.shortDescription,
    image: product.images[0]?.url ?? "/product-1.jpg",
    category: product.category.name,
    sku: product.hsCode,
  });

  return (
    <div className="space-y-14 pb-20 pt-10">
      <section className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--gm-color-gold)]">{product.category.name}</p>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl text-white md:text-5xl">{product.title}</h1>
            <p className="max-w-3xl text-base leading-8 text-[var(--gm-color-text-muted)]">{product.shortDescription}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="muted">Origin: {product.originCountry}</Badge>
              <Badge variant="muted">
                MOQ: {product.moqValue} {product.moqUnit}
              </Badge>
              <Badge variant="muted">Lead Time: {product.leadTimeDays} days</Badge>
            </div>
          </div>

          <ProductGallery images={product.images} title={product.title} />

          <div className="rounded-xl border border-[var(--gm-color-border)] bg-[var(--gm-color-surface)] p-5 md:p-6">
            <h2 className="mb-4 text-2xl text-white">Specifications</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Attribute</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Origin</TableCell>
                  <TableCell>{product.originCountry}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>MOQ</TableCell>
                  <TableCell>
                    {product.moqValue} {product.moqUnit}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Packaging</TableCell>
                  <TableCell>{product.packagingOptions.join(", ")}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Lead Time</TableCell>
                  <TableCell>{product.leadTimeDays} days</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Certifications</TableCell>
                  <TableCell>{product.certifications.join(", ") || "Available on request"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>HS Code</TableCell>
                  <TableCell>{product.hsCode || "Available on request"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="space-y-4 rounded-xl border border-[var(--gm-color-border)] bg-[var(--gm-color-surface)] p-5 md:p-6">
            <h2 className="text-2xl text-white">Packaging Options</h2>
            <div className="flex flex-wrap gap-2">
              {product.packagingOptions.map((option) => (
                <Badge key={option}>{option}</Badge>
              ))}
            </div>
            {product.brochureUrl ? (
              <Button asChild size="sm" variant="secondary">
                <a href={product.brochureUrl} rel="noreferrer" target="_blank">
                  <Download className="mr-2 h-4 w-4" /> Download Brochure
                </a>
              </Button>
            ) : null}
          </div>

          <div className="rounded-xl border border-[var(--gm-color-border)] bg-[var(--gm-color-surface)] p-6">
            <h2 className="mb-4 text-2xl text-white">Product Details</h2>
            <article className="prose prose-invert max-w-none text-[var(--gm-color-text-muted)]">
              <ReactMarkdown>{product.description}</ReactMarkdown>
            </article>
          </div>
        </div>

        <StickyEnquiry productId={product.id} />
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl text-white">Related Products</h2>
          <Button asChild size="sm" variant="secondary">
            <Link href="/products">View Catalog</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
    </div>
  );
}
