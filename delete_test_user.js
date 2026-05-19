const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Deleting test user 'ivan'...");
    const result = await prisma.user.deleteMany({
      where: {
        email: "ivankafipradana@gmail.com"
      }
    });
    console.log("SUCCESS: Deleted users count:", result.count);
  } catch (error) {
    console.error("ERROR: Failed to delete test user!");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
