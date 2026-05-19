const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const themes = [
    {
      nama_tema: "Visual Journey",
      kategori: "Pernikahan",
      gambar: "themes/thumbnail/visual-journey.png",
      link_demo: "https://www.wevitation.com/demo/visual-journey"
    },
    {
      nama_tema: "Snap Photo",
      kategori: "Pernikahan",
      gambar: "themes/thumbnail/snap-photo.png",
      link_demo: "https://www.wevitation.com/demo/snap-photo"
    },
    {
      nama_tema: "Mildness",
      kategori: "Pernikahan",
      gambar: "themes/thumbnail/mildness.png",
      link_demo: "https://www.wevitation.com/demo/mildness"
    },
    {
      nama_tema: "Elegant Light",
      kategori: "Pernikahan",
      gambar: "themes/thumbnail/elegant-light.png",
      link_demo: "https://www.wevitation.com/demo/elegant-light"
    },
    {
      nama_tema: "Photovit: Black",
      kategori: "Pernikahan",
      gambar: "themes/thumbnail/photovit.png",
      link_demo: "https://www.wevitation.com/demo/photovit"
    },
    {
      nama_tema: "BluBloom",
      kategori: "Pernikahan",
      gambar: "themes/thumbnail/bloom-blue.png",
      link_demo: "https://www.wevitation.com/demo/bloom-blue"
    },
    {
      nama_tema: "Peppy",
      kategori: "Pernikahan",
      gambar: "themes/thumbnail/peppy.png",
      link_demo: "https://www.wevitation.com/demo/peppy"
    }
  ];

  console.log('Seeding Wevitation themes...');

  for (const theme of themes) {
    await prisma.tema.upsert({
      where: { id: -1 }, // Dummy where since we don't have unique name constraint but want to avoid error
      update: {},
      create: theme,
    });
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
