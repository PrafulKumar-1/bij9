"use client";

import type { ProductImage } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

export function ProductGallery({ images, title }: { images: ProductImage[]; title: string }) {
  const [active, setActive] = useState(0);
  const selected = images[active] ?? images[0];

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[var(--gm-color-border)]">
        <Image
          alt={selected?.alt ?? title}
          className="object-cover"
          fill
          priority
          sizes="(max-width: 1200px) 100vw, 60vw"
          src={selected?.url ?? "/product-1.jpg"}
        />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            className={cn(
              "relative aspect-square overflow-hidden rounded-md border",
              index === active ? "border-[var(--gm-color-gold)]" : "border-[var(--gm-color-border)]",
            )}
            key={image.id}
            onClick={() => setActive(index)}
            type="button"
          >
            <Image alt={image.alt} className="object-cover" fill sizes="120px" src={image.url} />
          </button>
        ))}
      </div>
    </div>
  );
}
