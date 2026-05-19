const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const SOURCE_DIR = path.join(__dirname, 'gambar');
const DEST_DIR = path.join(__dirname, 'public', 'storage', 'themes');

// Ensure destination directory exists
if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

function generateSlug(str) {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, ''); // Remove all non-word chars (like #, etc)
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
  console.log('Reading files from', SOURCE_DIR);
  const files = fs.readdirSync(SOURCE_DIR);

  const webpFiles = files.filter(f => f.endsWith('.webp'));
  console.log(`Found ${webpFiles.length} WebP files.`);

  console.log('Clearing old themes...');
  await prisma.tema.deleteMany({}); // Delete all existing themes to avoid duplicates and broken ones

  const themesData = [];

  for (const file of webpFiles) {
    const fileNameWithoutExt = path.parse(file).name;
    const slug = generateSlug(fileNameWithoutExt);
    const category = determineCategory(fileNameWithoutExt);
    
    // Copy file
    const srcPath = path.join(SOURCE_DIR, file);
    const destPath = path.join(DEST_DIR, file);
    fs.copyFileSync(srcPath, destPath);

    themesData.push({
      nama_tema: fileNameWithoutExt,
      kategori: category,
      gambar: `themes/${file}`,
      link_demo: `https://www.wevitation.com/demo/${slug}`
    });
  }

  console.log('Inserting into database...');
  await prisma.tema.createMany({
    data: themesData
  });

  console.log('Successfully imported', themesData.length, 'themes!');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
