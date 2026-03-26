import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

function getDatabaseUrl() {
  const connectionString = process.env.DATABASE_URL?.trim();

  if (!connectionString) {
    throw new Error("DATABASE_URL is not set. Add it to your .env file before starting the app.");
  }

  return connectionString;
}

const RETRYABLE_READ_OPERATIONS = new Set([
  "aggregate",
  "count",
  "findFirst",
  "findFirstOrThrow",
  "findMany",
  "findUnique",
  "findUniqueOrThrow",
  "groupBy",
]);

const RETRYABLE_DB_ERROR_CODES = new Set(["ECONNRESET", "ECONNREFUSED", "ETIMEDOUT"]);

function isRetryableDatabaseError(error: unknown) {
  if (!error || typeof error !== "object" || !("code" in error)) {
    return false;
  }

  return RETRYABLE_DB_ERROR_CODES.has(String(error.code));
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runWithRetry<T>(query: () => Promise<T>) {
  try {
    return await query();
  } catch (error) {
    if (!isRetryableDatabaseError(error)) {
      throw error;
    }

    await wait(1000);

    try {
      return await query();
    } catch (retryError) {
      if (!isRetryableDatabaseError(retryError)) {
        throw retryError;
      }

      await wait(2000);
      return query();
    }
  }
}

function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString: getDatabaseUrl(),
    connectionTimeoutMillis: 15_000,
    idleTimeoutMillis: 300_000,
    max: 5,
  });

  return new PrismaClient({ adapter }).$extends({
    query: {
      $allModels: {
        async $allOperations({ args, operation, query }) {
          const runQuery = () => query(args);

          if (!RETRYABLE_READ_OPERATIONS.has(operation)) {
            return runQuery();
          }

          return runWithRetry(runQuery);
        },
      },
    },
  });
}

type DbClient = ReturnType<typeof createPrismaClient>;

declare global {
  var prisma: DbClient | undefined;
}

export const db: DbClient = global.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = db;
}
