import { z } from "zod";

import { contactSchema } from "@/lib/validators/common";

export const requirementRequestSchema = contactSchema.extend({
  productName: z.string().trim().min(2),
  quantity: z.string().trim().min(1),
  unit: z.string().trim().min(1),
  targetCountry: z.string().trim().min(2),
  qualitySpec: z.string().trim().min(2),
  packaging: z.string().trim().min(2),
  targetPrice: z.string().trim().optional(),
  incoterms: z.string().trim().min(2),
  timeline: z.string().trim().min(2),
  attachments: z.array(z.string()).optional().default([]),
  message: z.string().trim().optional(),
});

export type RequirementRequestInput = z.infer<typeof requirementRequestSchema>;
