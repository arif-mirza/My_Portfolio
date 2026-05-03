require("dotenv").config();
const app = require("./app");
const prisma = require("./config/db");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Verify database connection
    await prisma.$connect();
    console.log("✅ PostgreSQL connected via Prisma");

    app.listen(PORT, () => {
      console.log(`\n🚀 Server running in ${process.env.NODE_ENV || "development"} mode`);
      console.log(`📡 API:    http://localhost:${PORT}/api`);
      console.log(`🏥 Health: http://localhost:${PORT}/api/health\n`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to database:", error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  console.log("\n🔌 Database disconnected. Shutting down...");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

startServer();
