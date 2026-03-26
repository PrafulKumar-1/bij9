import type { Category, Product, ProductImage } from "@prisma/client";

import { upsertProductAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { parseJsonArray } from "@/lib/utils";

type ProductWithImages = Product & {
  images: ProductImage[];
};

export function ProductForm({
  categories,
  product,
}: {
  categories: Category[];
  product?: ProductWithImages | null;
}) {
  const imagesValue = product?.images
    ?.sort((a: ProductImage, b: ProductImage) => a.sortOrder - b.sortOrder)
    .map((image: ProductImage) => `${image.url}|${image.alt}`)
    .join("\n");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product ? "Edit Product" : "New Product"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={upsertProductAction} className="space-y-5">
          {product ? <input name="id" type="hidden" value={product.id} /> : null}

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title">
              <Input defaultValue={product?.title} minLength={3} name="title" required />
            </Field>
            <Field label="Slug">
              <Input defaultValue={product?.slug} name="slug" />
            </Field>
            <Field label="Category">
              <select
                className="h-11 w-full rounded-md border border-[var(--gm-color-border)] bg-[var(--gm-color-surface)] px-3 text-sm text-[var(--gm-color-text)]"
                defaultValue={product?.categoryId}
                name="categoryId"
                required
              >
                <option value="">Select category</option>
                {categories.map((category: Category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Origin Country">
              <Input defaultValue={product?.originCountry} minLength={2} name="originCountry" required />
            </Field>
            <Field label="MOQ Value">
              <Input defaultValue={product?.moqValue} min={1} name="moqValue" required type="number" />
            </Field>
            <Field label="MOQ Unit">
              <Input defaultValue={product?.moqUnit} name="moqUnit" placeholder="kg" required />
            </Field>
            <Field label="Lead Time (Days)">
              <Input defaultValue={product?.leadTimeDays} min={1} name="leadTimeDays" required type="number" />
            </Field>
            <Field label="HS Code (optional)">
              <Input defaultValue={product?.hsCode ?? ""} name="hsCode" />
            </Field>
            <Field label="Status">
              <select
                className="h-11 w-full rounded-md border border-[var(--gm-color-border)] bg-[var(--gm-color-surface)] px-3 text-sm text-[var(--gm-color-text)]"
                defaultValue={product?.status ?? "draft"}
                name="status"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </Field>
            <Field label="Brochure URL (optional)">
              <Input defaultValue={product?.brochureUrl ?? ""} name="brochureUrl" placeholder="/uploads/brochure.pdf" />
            </Field>
          </div>

          <Field label="Short Description">
            <Textarea
              defaultValue={product?.shortDescription}
              minLength={10}
              name="shortDescription"
              placeholder="At least 10 characters"
              required
            />
            <p className="text-xs text-[var(--gm-color-text-muted)]">Use at least 10 characters.</p>
          </Field>

          <Field label="Product Description (Markdown)">
            <Textarea
              className="min-h-52"
              defaultValue={product?.description}
              minLength={20}
              name="description"
              placeholder="Add a fuller product description with at least 20 characters"
              required
            />
            <p className="text-xs text-[var(--gm-color-text-muted)]">Use at least 20 characters.</p>
          </Field>

          <Field label="Packaging Options (comma separated)">
            <Input
              defaultValue={product ? parseJsonArray(product.packagingOptions).join(", ") : ""}
              name="packagingOptions"
              placeholder="25kg bag, 10kg carton"
              required
            />
          </Field>

          <Field label="Certifications (comma separated)">
            <Input
              defaultValue={product ? parseJsonArray(product.certifications).join(", ") : ""}
              name="certifications"
              placeholder="ISO 22000, HACCP"
            />
          </Field>

          <Field label="Images (one per line: /url|Alt text)">
            <Textarea
              className="min-h-32"
              defaultValue={imagesValue || "/product-1.jpg|Primary product image"}
              name="images"
              required
            />
          </Field>

          <label className="flex items-center gap-2 text-sm text-[var(--gm-color-text)]">
            <input defaultChecked={product?.featured ?? false} name="featured" type="checkbox" />
            Featured product
          </label>

          <Button type="submit">{product ? "Update Product" : "Create Product"}</Button>
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
