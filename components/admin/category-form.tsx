import type { Category } from "@prisma/client";

import { upsertCategoryAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function CategoryForm({ category }: { category?: Category | null }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{category ? "Edit Category" : "New Category"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={upsertCategoryAction} className="space-y-4">
          {category ? <input name="id" type="hidden" value={category.id} /> : null}

          <Field label="Category Name">
            <Input defaultValue={category?.name} name="name" placeholder="Agro Commodities" required />
          </Field>
          <Field label="Slug">
            <Input defaultValue={category?.slug} name="slug" placeholder="agro" />
          </Field>
          <Field label="Description">
            <Textarea defaultValue={category?.description} name="description" required />
          </Field>
          <Field label="Hero Image URL">
            <Input defaultValue={category?.heroImageUrl} name="heroImageUrl" placeholder="/category-agro.jpg" required />
          </Field>

          <Button type="submit">{category ? "Update Category" : "Create Category"}</Button>
        </form>
      </CardContent>
    </Card>
  );
}

function Field({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
