const { PrismaClient } = require("@prisma/client");
const crypto = require("crypto");
require("dotenv").config();

const prisma = new PrismaClient();

const hashPassword = (password) => {
    return crypto.createHash("sha256").update(password).digest("hex");
};

async function main() {
    console.log("Seeding Admin Account...");

    const email = process.env.ADMIN_EMAIL || "ivankafipradana@gmail.com";
    const password = process.env.ADMIN_PASSWORD || "FikaDigiAdmin2026!";
    const hashedPassword = hashPassword(password);

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        console.log(`User ${email} already exists. Updating role to ADMIN and resetting password...`);
        await prisma.user.update({
            where: { email },
            data: {
                role: "ADMIN",
                password: hashedPassword,
            },
        });
        console.log("Admin account updated successfully!");
    } else {
        console.log(`Creating new Admin account for ${email}...`);
        await prisma.user.create({
            data: {
                name: "Administrator",
                email: email,
                password: hashedPassword,
                role: "ADMIN",
            },
        });
        console.log("Admin account created successfully!");
    }

    console.log("----------------------------------------");
    console.log(`Admin Email: ${email}`);
    console.log(`Admin Password: ${password} (Please change immediately inside dashboard)`);
    console.log("----------------------------------------");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
