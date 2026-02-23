import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().default("file:./dev.db"),
  ADMIN_EMAIL: z.string().email().default("admin@globalmerchexport.com"),
  ADMIN_PASSWORD: z.string().min(8).default("ChangeMe123!"),
  AUTH_SECRET: z.string().min(12).optional(),
  SITE_URL: z.string().url().default("http://localhost:3000"),
  WHATSAPP_NUMBER: z.string().min(6).default("919999999999"),
  EMAIL_PROVIDER_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().email().optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
});

export const env = envSchema.parse(process.env);

export const authSecret = env.AUTH_SECRET ?? env.ADMIN_PASSWORD;
