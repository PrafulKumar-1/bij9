import "dotenv/config";
import { defineConfig, env } from "prisma/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: { url: env("DATABASE_URL") },
  ...({
    adapter: async () => new PrismaBetterSqlite3({ url: env("DATABASE_URL") }),
  } as object),
});
