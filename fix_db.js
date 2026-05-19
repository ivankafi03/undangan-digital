const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Fixing links and categories...');

  // 1. Fix link_demo for specific themes
  const linkUpdates = [
    { name: 'BluBloom', link: 'https://www.wevitation.com/demo/bloom-blue' },
    { name: 'Culture Batak', link: 'https://www.wevitation.com/demo/culture-batak' },
    { name: 'Culture Chinese Flower', link: 'https://www.wevitation.com/demo/culture-chinese-flower' },
    { name: 'Photovit Black', link: 'https://www.wevitation.com/demo/photovit' },
  ];

  for (const update of linkUpdates) {
    await prisma.tema.updateMany({
      where: { nama_tema: update.name },
      data: { link_demo: update.link }
    });
    console.log(`Updated link for ${update.name}`);
  }

  // 2. Fix the broken image path for Simple Rustic #2
  await prisma.tema.updateMany({
    where: { nama_tema: 'Simple Rustic #2' },
    data: { 
        gambar: 'themes/Simple Rustic 2.webp',
        nama_tema: 'Simple Rustic 2' // Also removing # from name just in case
    }
  });
  console.log('Fixed image path for Simple Rustic 2');

  // 3. Set ALL themes to 'Pernikahan'
  const updateCount = await prisma.tema.updateMany({
    where: {
      kategori: { not: 'Pernikahan' }
    },
    data: { kategori: 'Pernikahan' }
  });
  console.log(`Updated ${updateCount.count} themes to category Pernikahan.`);

  console.log('All database fixes applied successfully!');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
