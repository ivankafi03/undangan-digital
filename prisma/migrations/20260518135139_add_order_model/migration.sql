-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama_pelanggan" TEXT NOT NULL,
    "no_wa" TEXT,
    "temaId" INTEGER NOT NULL,
    "harga" REAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Order_temaId_fkey" FOREIGN KEY ("temaId") REFERENCES "Tema" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
