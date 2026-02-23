import { parse } from "csv-parse/sync";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { serializeStringArray, slugify } from "@/lib/utils";

type CsvRow = {
  title: string;
  slug?: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  originCountry: string;
  moqValue: string;
  moqUnit: string;
  packagingOptions: string;
  leadTimeDays: string;
  certifications?: string;
  hsCode?: string;
  featured?: string;
  status?: "draft" | "published";
  images: string;
  brochureUrl?: string;
};

function parseImages(value: string) {
  return value
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item, idx) => {
      const [url, alt] = item.split("|").map((x) => x.trim());
      return { url, alt: alt || `Imported image ${idx + 1}`, sortOrder: idx };
    });
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "CSV file is required" }, { status: 400 });
  }

  const text = await file.text();
  const rows = parse(text, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as CsvRow[];

  let upserted = 0;

  for (const row of rows) {
    const category = await db.category.findUnique({
      where: { slug: slugify(row.categorySlug) },
    });

    if (!category) {
      continue;
    }

    const slug = slugify(row.slug || row.title);
    const images = parseImages(row.images || "/product-1.jpg|Imported product");

    await db.product.upsert({
      where: { slug },
      update: {
        title: row.title,
        categoryId: category.id,
        shortDescription: row.shortDescription,
        description: row.description,
        originCountry: row.originCountry,
        moqValue: Number(row.moqValue || 1),
        moqUnit: row.moqUnit || "kg",
        packagingOptions: serializeStringArray(
          row.packagingOptions
            .split("|")
            .map((item) => item.trim())
            .filter(Boolean),
        ),
        leadTimeDays: Number(row.leadTimeDays || 14),
        certifications: serializeStringArray(
          row.certifications
            ? row.certifications
                .split("|")
                .map((item) => item.trim())
                .filter(Boolean)
            : [],
        ),
        hsCode: row.hsCode || null,
        featured: row.featured === "true",
        brochureUrl: row.brochureUrl || null,
        status: row.status || "draft",
        images: {
          deleteMany: {},
          create: images,
        },
      },
      create: {
        title: row.title,
        slug,
        categoryId: category.id,
        shortDescription: row.shortDescription,
        description: row.description,
        originCountry: row.originCountry,
        moqValue: Number(row.moqValue || 1),
        moqUnit: row.moqUnit || "kg",
        packagingOptions: serializeStringArray(
          row.packagingOptions
            .split("|")
            .map((item) => item.trim())
            .filter(Boolean),
        ),
        leadTimeDays: Number(row.leadTimeDays || 14),
        certifications: serializeStringArray(
          row.certifications
            ? row.certifications
                .split("|")
                .map((item) => item.trim())
                .filter(Boolean)
            : [],
        ),
        hsCode: row.hsCode || null,
        featured: row.featured === "true",
        brochureUrl: row.brochureUrl || null,
        status: row.status || "draft",
        images: {
          create: images,
        },
      },
    });

    upserted += 1;
  }

  return NextResponse.json({ message: `Imported ${upserted} products successfully.` });
}
