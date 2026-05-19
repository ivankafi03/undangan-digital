const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function generateSlug(str) {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, ''); // Remove all non-word chars
}

function determineCategory(name) {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('ulang tahun') || lowerName.includes('birthday') || lowerName.includes('animal fun')) {
    return 'Ulang Tahun';
  }
  if (lowerName.includes('khitan')) {
    return 'Khitan';
  }
  if (lowerName.includes('aqiqah')) {
    return 'Aqiqah';
  }
  return 'Pernikahan';
}

async function main() {
  console.log('Clearing old themes...');
  await prisma.tema.deleteMany({});

  const themesDir = path.join(__dirname, '..', 'public', 'storage', 'themes');
  console.log('Reading WebP themes from directory:', themesDir);

  if (!fs.existsSync(themesDir)) {
    console.error('Directory does not exist:', themesDir);
    return;
  }

  const files = fs.readdirSync(themesDir);
  const webpFiles = files.filter(f => f.endsWith('.webp'));
  console.log(`Found ${webpFiles.length} WebP theme files.`);

  const themesData = [];

  for (const file of webpFiles) {
    const themeName = path.parse(file).name;
    const slug = generateSlug(themeName);
    const category = determineCategory(themeName);

    // Set premium realistic pricing
    const hasPromo = Math.random() > 0.4; // 60% chance of promo
    const hargaAsli = 149000;
    const hargaDiskon = hasPromo ? 99000 : null;

    themesData.push({
      nama_tema: themeName,
      kategori: category,
      gambar: `themes/${file}`,
      link_demo: `https://www.wevitation.com/demo/${slug}`,
      harga_asli: hargaAsli,
      harga_diskon: hargaDiskon
    });
  }

  console.log('Seeding all themes to the database...');
  await prisma.tema.createMany({
    data: themesData
  });

  console.log(`Successfully seeded ${themesData.length} themes!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
