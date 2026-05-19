"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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

export async function createTema(formData: FormData) {
    const nama_tema = formData.get("nama_tema") as string;
    const kategori = formData.get("kategori") as string;
    const link_demo = formData.get("link_demo") as string;
    const harga_asli = parseFloat(formData.get("harga_asli") as string) || 0;
    const harga_diskon_raw = formData.get("harga_diskon") as string;
    const harga_diskon = harga_diskon_raw ? parseFloat(harga_diskon_raw) : null;
    const file = formData.get("gambar_file") as File;

    let gambar = "";
    if (file && file.size > 0) {
        gambar = await saveFile(file, "cover");
    } else {
        gambar = formData.get("gambar") as string;
    }

    await prisma.tema.create({
        data: {
            nama_tema,
            kategori,
            link_demo,
            gambar,
            harga_asli,
            harga_diskon,
        },
    });

    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    redirect("/admin/dashboard");
}

export async function updateTema(id: number, formData: FormData) {
    const nama_tema = formData.get("nama_tema") as string;
    const kategori = formData.get("kategori") as string;
    const link_demo = formData.get("link_demo") as string;
    const harga_asli = parseFloat(formData.get("harga_asli") as string) || 0;
    const harga_diskon_raw = formData.get("harga_diskon") as string;
    const harga_diskon = harga_diskon_raw ? parseFloat(harga_diskon_raw) : null;
    const file = formData.get("gambar_file") as File;

    let gambar = formData.get("gambar") as string;
    if (file && file.size > 0) {
        const newGambar = await saveFile(file, "cover");
        if (newGambar) gambar = newGambar;
    }

    await prisma.tema.update({
        where: { id },
        data: {
            nama_tema,
            kategori,
            link_demo,
            gambar,
            harga_asli,
            harga_diskon,
        },
    });

    revalidatePath("/admin/dashboard");
    revalidatePath("/");
    redirect("/admin/dashboard");
}

export async function deleteTema(id: number) {
    await prisma.tema.delete({
        where: { id },
    });

    revalidatePath("/admin/dashboard");
    revalidatePath("/");
}
