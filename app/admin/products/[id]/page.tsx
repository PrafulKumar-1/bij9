import { notFound } from "next/navigation";

import { ProductForm } from "@/components/admin/product-form";
import { db } from "@/lib/db";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [categories, product] = await Promise.all([
    db.category.findMany({ orderBy: { name: "asc" } }),
    db.product.findUnique({
      where: { id },
      include: { images: { orderBy: { sortOrder: "asc" } } },
    }),
  ]);

  if (!product) {
    notFound();
  }

  return <ProductForm categories={categories} product={product} />;
}
