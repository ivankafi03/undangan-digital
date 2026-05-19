const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    // Clear existing data
    await prisma.packet.deleteMany();
    await prisma.tema.deleteMany();
    await prisma.promo.deleteMany();
    await prisma.setting.deleteMany();

    // Seed Setting
    await prisma.setting.create({
        data: { nomor_wa: "6282244433321" }, // Using a plausible number or current one
    });

    // Seed Packets (Standard from Laravel logic)
    await prisma.packet.createMany({
        data: [
            {
                nama_paket: "Basic",
                harga_asli: 150000,
                harga_diskon: 99000,
                fitur: "Masa Aktif 6 Bulan\nRevisi Sepuasnya\nCustom Musik\nNavigasi Peta\nRSVP & Ucapan",
                is_best_seller: false,
            },
            {
                nama_paket: "Premium",
                harga_asli: 250000,
                harga_diskon: 149000,
                fitur: "Masa Aktif Selamanya\nRevisi Sepuasnya\nCustom Musik\nNavigasi Peta\nRSVP & Ucapan\nLove Story\nCountdown\nKado Digital",
                is_best_seller: true,
            },
        ],
    });

    // Seed Temas (Using REAL filenames from Laravel storage)
    await prisma.tema.createMany({
        data: [
            {
                nama_tema: "Pinkness Vista",
                kategori: "Pernikahan",
                gambar: "cover/BIayv7ACrXPmCbHVKYLyFbR976EJuPKVWKdHPQAz.png",
                link_demo: "https://wevitation.com/demo/pinkness-vista",
            },
            {
                nama_tema: "Royal Rose",
                kategori: "Pernikahan",
                gambar: "cover/BIayv7ACrXPmCbHVKYLyFbR976EJuPKVWKdHPQAz.png", // Reusing for now
                link_demo: "https://wevitation.com/demo/royal-rose",
            },
            {
                nama_tema: "Blue Sky",
                kategori: "Pernikahan",
                gambar: "cover/BIayv7ACrXPmCbHVKYLyFbR976EJuPKVWKdHPQAz.png", // Reusing for now
                link_demo: "https://wevitation.com/demo/blue-sky",
            },
        ],
    });

    // Seed Promo
    await prisma.promo.create({
        data: {
            gambar: "promo/N1JyV5YhyjJt6y5eC6qQxS1vovIrRAH7nRqXSdgc.png",
            keterangan: "Promo Spesial Ramadhan - Diskon 50% untuk semua paket!",
        },
    });

    console.log("Seeding with real data finished!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
