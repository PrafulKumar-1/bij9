import { z } from "zod";

export const optionalString = z
  .string()
  .trim()
  .optional();

export const contactSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: optionalString,
  company: optionalString,
  country: optionalString,
});
