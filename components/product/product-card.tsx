"use client";

import type { Product, Category, ProductImage } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ProductCardData = Product & {
  category: Category;
  images: ProductImage[];
  packagingOptions: string[];
  certifications: string[];
};

export function ProductCard({ product }: { product: ProductCardData }) {
  const primaryImage = product.images[0]?.url ?? "/product-1.jpg";

  return (
    <Card className="group overflow-hidden bg-[var(--gm-color-surface)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          alt={product.images[0]?.alt ?? product.title}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          src={primaryImage}
        />
      </div>

      <CardContent className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.16em] text-[var(--gm-color-gold)]">{product.category.name}</p>
            <h3 className="font-[family-name:var(--font-heading)] text-xl text-white">{product.title}</h3>
          </div>
          <Badge variant="muted">MOQ {product.moqValue}</Badge>
        </div>

        <p className="text-sm leading-6 text-[var(--gm-color-text-muted)]">{product.shortDescription}</p>

        <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em] text-[var(--gm-color-text-muted)]">
          <span>Origin: {product.originCountry}</span>
          <span>{product.moqValue} {product.moqUnit}</span>
        </div>

        <div className="flex gap-2">
          <Button asChild className="flex-1" size="sm" variant="secondary">
            <Link href={`/products/${product.slug}`}>View Details</Link>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1" size="sm">Quick Enquiry</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Quick Enquiry</DialogTitle>
                <DialogDescription>
                  Share your quantity and quality requirement. We respond with commercial terms quickly.
                </DialogDescription>
              </DialogHeader>
              <EnquiryForm compact productId={product.id} type="product" />
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
