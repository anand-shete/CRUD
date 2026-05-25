import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export const connectDb = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("PostgreSQL connected successfully via Prisma Adapter!");
  } catch (error) {
    console.error("❌ \x1b[31mFailed to connect to PostgreSQL:\x1b[0m", error);
    process.exit(1);
  }
};
