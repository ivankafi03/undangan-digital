"use server";

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";

// Helper for simple hashing
const hashPassword = (password: string) => {
    return crypto.createHash("sha256").update(password).digest("hex");
};

export async function registerMember(formData: FormData) {
    const name = (formData.get("name") as string).trim();
    const email = (formData.get("email") as string).trim();
    const no_wa = (formData.get("no_wa") as string).trim();
    const password = (formData.get("password") as string).trim();

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { no_wa }]
            }
        });

        if (existingUser) {
            return { error: "Email atau Nomor WhatsApp sudah terdaftar." };
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                no_wa,
                password: hashPassword(password),
                role: "MEMBER",
            }
        });

        const cookieStore = await cookies();
        cookieStore.set("member_session", user.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

    } catch (e) {
        console.error("Registration error:", e);
        return { error: "Terjadi kesalahan saat pendaftaran." };
    }
    
    redirect("/member/dashboard");
}

export async function loginMember(formData: FormData) {
    const email = (formData.get("email") as string).trim();
    const password = (formData.get("password") as string).trim();

    // Intercept admin login for convenience
    if (email === "admin@fikadigi.com" && password === "admin123") {
        const cookieStore = await cookies();
        cookieStore.set("admin_session", "authenticated", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });
        redirect("/admin/dashboard");
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user || user.password !== hashPassword(password)) {
            return { error: "Kredensial tidak valid." };
        }

        const cookieStore = await cookies();
        cookieStore.set("member_session", user.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

    } catch (e) {
        console.error("Login error:", e);
        return { error: "Terjadi kesalahan saat masuk." };
    }

    redirect("/member/dashboard");
}

export async function logoutMember() {
    const cookieStore = await cookies();
    cookieStore.delete("member_session");
    redirect("/login");
}
