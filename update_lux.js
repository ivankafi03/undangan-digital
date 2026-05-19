const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.tema.updateMany({
    where: { nama_tema: 'Culture Chinese Lux' },
    data: { link_demo: 'https://www.wevitation.com/demo/chinese' }
  });
  console.log('Link updated for Culture Chinese Lux');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
