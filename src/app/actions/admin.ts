"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "storage");

async function saveFile(file: File, subDir: string): Promise<string> {
    if (!file || file.size === 0) return "";

    try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const ext = path.extname(file.name);
        const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}${ext}`;
        const relativePath = path.join(subDir, filename);
        const absolutePath = path.join(UPLOAD_DIR, relativePath);

        await fs.mkdir(path.dirname(absolutePath), { recursive: true });
        await fs.writeFile(absolutePath, buffer);

        return relativePath.replace(/\\/g, "/");
    } catch (error) {
        console.error("Error saving file:", error);
        return "";
    }
}

// PROMO
export async function savePromo(formData: FormData) {
    const file = formData.get("gambar_file") as File;
    const keterangan = formData.get("keterangan") as string;

    let gambar = "";
    if (file && file.size > 0) {
        gambar = await saveFile(file, "promo");
    } else {
        gambar = formData.get("gambar") as string; // fallback to text input if any
    }

    if (!gambar) return; // Handle error

    await prisma.promo.create({
        data: { gambar, keterangan },
    });

    revalidatePath("/admin/promo");
    revalidatePath("/");
}

export async function deletePromo(id: number) {
    await prisma.promo.delete({ where: { id } });
    revalidatePath("/admin/promo");
    revalidatePath("/");
}


// SETTING
export async function updateSetting(formData: FormData) {
    const nomor_wa = formData.get("nomor_wa") as string;
    const setting = await prisma.setting.findFirst();

    if (setting) {
        await prisma.setting.update({
            where: { id: setting.id },
            data: { nomor_wa },
        });
    } else {
        await prisma.setting.create({
            data: { nomor_wa },
        });
    }

    revalidatePath("/admin/setting");
    revalidatePath("/");
}
