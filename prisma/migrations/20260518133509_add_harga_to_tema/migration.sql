/*
  Warnings:

  - You are about to drop the `Packet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Packet";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tema" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_tema" TEXT NOT NULL,
    "kategori" TEXT NOT NULL DEFAULT 'Pernikahan',
    "gambar" TEXT NOT NULL,
    "link_demo" TEXT NOT NULL,
    "harga_asli" REAL NOT NULL DEFAULT 0,
    "harga_diskon" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Tema" ("createdAt", "gambar", "id", "kategori", "link_demo", "nama_tema", "updatedAt") SELECT "createdAt", "gambar", "id", "kategori", "link_demo", "nama_tema", "updatedAt" FROM "Tema";
DROP TABLE "Tema";
ALTER TABLE "new_Tema" RENAME TO "Tema";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
