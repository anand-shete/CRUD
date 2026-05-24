import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

// Catching the undefined bug before the driver wrapper breaks
if (!process.env.DATABASE_URL) {
  throw new Error(
    "CRITICAL: process.env.DATABASE_URL is undefined. Ensure 'dotenv/config' runs at line one of your main entry file!",
  );
}
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export { prisma };
