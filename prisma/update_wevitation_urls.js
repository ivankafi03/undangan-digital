const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const themes = [
    {
      nama_tema: "Visual Journey",
      gambar: "https://app.wevitation.com/storage/themes/thumbnail/visual-journey.png",
    },
    {
      nama_tema: "Snap Photo",
      gambar: "https://app.wevitation.com/storage/themes/thumbnail/snap-photo.png",
    },
    {
      nama_tema: "Mildness",
      gambar: "https://app.wevitation.com/storage/themes/thumbnail/mildness.png",
    },
    {
      nama_tema: "Elegant Light",
      gambar: "https://app.wevitation.com/storage/themes/thumbnail/elegant-light.png",
    },
    {
      nama_tema: "Photovit: Black",
      gambar: "https://app.wevitation.com/storage/themes/thumbnail/photovit.png",
    },
    {
      nama_tema: "BluBloom",
      gambar: "https://app.wevitation.com/storage/themes/thumbnail/bloom-blue.png",
    },
    {
      nama_tema: "Peppy",
      gambar: "https://app.wevitation.com/storage/themes/thumbnail/peppy.png",
    }
  ];

  console.log('Updating Wevitation themes with absolute URLs...');

  for (const theme of themes) {
    const existing = await prisma.tema.findFirst({
        where: { nama_tema: theme.nama_tema }
    });
    if (existing) {
        await prisma.tema.update({
            where: { id: existing.id },
            data: { gambar: theme.gambar }
        });
    }
  }

  console.log('Update completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
