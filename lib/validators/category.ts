import { z } from "zod";

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(2),
  slug: z.string().trim().min(2),
  description: z.string().trim().min(10),
  heroImageUrl: z.string().trim().min(1),
});

export type CategoryInput = z.infer<typeof categorySchema>;
