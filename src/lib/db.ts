import { PrismaClient } from "@prisma/client";

const singletonPrisma = global as unknown as {
  prisma: PrismaClient;
};

export const db = singletonPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") singletonPrisma.prisma = db;
