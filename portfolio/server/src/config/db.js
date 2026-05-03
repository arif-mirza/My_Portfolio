require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

// Prisma Client singleton — prevents multiple instances in dev (hot reload)
const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

module.exports = prisma;
