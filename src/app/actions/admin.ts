"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
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
    const data = {
        nomor_wa: formData.get("nomor_wa") as string || "628123456789",
        email: formData.get("email") as string || null,
        instagram: formData.get("instagram") as string || null,
        facebook: formData.get("facebook") as string || null,
        tiktok: formData.get("tiktok") as string || null,
        twitter: formData.get("twitter") as string || null,
        youtube: formData.get("youtube") as string || null,
        waTemplate: formData.get("waTemplate") as string || null,
        promoBanner: formData.get("promoBanner") as string || null,
        showPromo: formData.get("showPromo") === "true",
    };

    const setting = await prisma.setting.findFirst();

    if (setting) {
        await prisma.setting.update({
            where: { id: setting.id },
            data,
        });
    } else {
        await prisma.setting.create({
            data,
        });
    }

    revalidatePath("/admin/setting");
    revalidatePath("/");
}

// TRAFFIC TRACKING
export async function trackVisit() {
    try {
        const cookieStore = await cookies();
        if (cookieStore.has("admin_session")) {
            return;
        }

        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
        await prisma.pageVisit.upsert({
            where: { date: today },
            update: { count: { increment: 1 } },
            create: { date: today, count: 1 },
        });
    } catch (error) {
        console.error("Failed to track visit:", error);
    }
}
