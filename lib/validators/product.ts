import { z } from "zod";

import { PRODUCT_STATUSES } from "@/lib/constants";

export const productSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(3),
  slug: z.string().trim().min(3),
  categoryId: z.string().trim().min(1),
  shortDescription: z.string().trim().min(10),
  description: z.string().trim().min(20),
  originCountry: z.string().trim().min(2),
  moqValue: z.coerce.number().int().positive(),
  moqUnit: z.string().trim().min(1),
  packagingOptions: z.array(z.string().trim().min(1)).min(1),
  leadTimeDays: z.coerce.number().int().positive(),
  certifications: z.array(z.string().trim().min(1)).default([]),
  hsCode: z.string().trim().optional(),
  featured: z.coerce.boolean().default(false),
  brochureUrl: z.string().trim().optional(),
  status: z.enum(PRODUCT_STATUSES),
  images: z
    .array(
      z.object({
        url: z.string().trim().min(1),
        alt: z.string().trim().min(1),
        sortOrder: z.coerce.number().int().min(0),
      }),
    )
    .min(1),
});

export type ProductInput = z.infer<typeof productSchema>;
