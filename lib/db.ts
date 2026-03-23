import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString:
      process.env.DATABASE_URL ?? "postgresql://neondb_owner:npg_9zDQLXiI8Rfb@ep-gentle-fire-a856ayqd-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require",
  });

  return new PrismaClient({ adapter });
}

export const db = global.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = db;
}
