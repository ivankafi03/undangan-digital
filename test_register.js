const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const crypto = require("crypto");

const hashPassword = (password) => {
    return crypto.createHash("sha256").update(password).digest("hex");
};

async function main() {
  try {
    const name = "ivan";
    const email = "ivankafipradana@gmail.com";
    const no_wa = "081456789012";
    const password = "password123";

    console.log("Simulating registration check...");
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [{ email }, { no_wa }]
        }
    });

    console.log("Existing user found:", existingUser);

    console.log("Creating user...");
    const user = await prisma.user.create({
        data: {
            name,
            email,
            no_wa,
            password: hashPassword(password),
            role: "MEMBER",
        }
    });
    console.log("SUCCESS: User created successfully!", user);

  } catch (error) {
    console.error("ERROR: Failed during registration simulation!");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
