const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log("SUCCESS: Database connection is healthy!");
    console.log("Users found:", users.length);
  } catch (error) {
    console.error("ERROR: Failed to connect to database!");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
