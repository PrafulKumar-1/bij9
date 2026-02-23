import { notFound } from "next/navigation";

import { CategoryForm } from "@/components/admin/category-form";
import { db } from "@/lib/db";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = await db.category.findUnique({ where: { id } });

  if (!category) {
    notFound();
  }

  return <CategoryForm category={category} />;
}
