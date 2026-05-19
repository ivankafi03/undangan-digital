const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Clearing old themes...');
  await prisma.tema.deleteMany({});

  const themes = [
    {
      nama_tema: "Visual Journey",
      kategori: "Pernikahan",
      gambar: "themes/Visual Journey.webp",
      link_demo: "https://www.wevitation.com/demo/visual-journey",
      harga_asli: 149000,
      harga_diskon: 99000
    },
    {
      nama_tema: "Snap Photo",
      kategori: "Pernikahan",
      gambar: "themes/Snap Photo.webp",
      link_demo: "https://www.wevitation.com/demo/snap-photo",
      harga_asli: 149000,
      harga_diskon: 99000
    },
    {
      nama_tema: "Mildness",
      kategori: "Pernikahan",
      gambar: "themes/Mildness.webp",
      link_demo: "https://www.wevitation.com/demo/mildness",
      harga_asli: 149000,
      harga_diskon: 99000
    },
    {
      nama_tema: "Elegant Light",
      kategori: "Pernikahan",
      gambar: "themes/Elegant Light.webp",
      link_demo: "https://www.wevitation.com/demo/elegant-light",
      harga_asli: 149000,
      harga_diskon: null
    },
    {
      nama_tema: "Photovit: Black",
      kategori: "Pernikahan",
      gambar: "themes/Photovit Black.webp",
      link_demo: "https://www.wevitation.com/demo/photovit",
      harga_asli: 149000,
      harga_diskon: 99000
    },
    {
      nama_tema: "BluBloom",
      kategori: "Pernikahan",
      gambar: "themes/BluBloom.webp",
      link_demo: "https://www.wevitation.com/demo/bloom-blue",
      harga_asli: 149000,
      harga_diskon: null
    },
    {
      nama_tema: "Peppy",
      kategori: "Pernikahan",
      gambar: "themes/Peppy.webp",
      link_demo: "https://www.wevitation.com/demo/peppy",
      harga_asli: 149000,
      harga_diskon: 99000
    }
  ];

  console.log('Seeding beautiful high-res WebP themes...');
  for (const t of themes) {
    await prisma.tema.create({
      data: t
    });
  }

  console.log('Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
