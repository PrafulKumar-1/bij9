import { z } from "zod";

export const uploadSchema = z.object({
  folder: z
    .string()
    .trim()
    .regex(/^[a-z0-9-]+(?:\/[a-z0-9-]+)*$/i, "Invalid folder path")
    .max(60)
    .optional(),
});
