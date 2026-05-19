const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const wevitationNames = [
    "Visual Journey",
    "Snap Photo",
    "Mildness",
    "Elegant Light",
    "Photovit: Black",
    "BluBloom",
    "Peppy"
  ];

  console.log('Fixing broken Wevitation theme images...');

  for (const name of wevitationNames) {
    const existing = await prisma.tema.findFirst({
        where: { nama_tema: name }
    });
    if (existing) {
        await prisma.tema.update({
            where: { id: existing.id },
            data: { gambar: "cover/clean-vista.png" } // Fallback to a working local image
        });
    }
  }

  console.log('Images fixed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
