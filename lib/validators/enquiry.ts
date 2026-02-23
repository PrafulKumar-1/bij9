import { z } from "zod";

import { contactSchema } from "@/lib/validators/common";

export const enquirySchema = contactSchema.extend({
  type: z.enum(["product", "general"]),
  productId: z.string().trim().optional(),
  message: z.string().trim().min(10).max(3000),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
