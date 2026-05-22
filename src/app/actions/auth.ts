"use server";

import prisma from "@/lib/prisma";
import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const hashPassword = (password: string) => {
    return crypto.createHash("sha256").update(password).digest("hex");
};

export async function login(formData: FormData) {
    const email = (formData.get("email") as string).trim().toLowerCase();
    const password = (formData.get("password") as string).trim();

    console.log("ADMIN LOGIN REQUEST:", { email, password: "***" });

    try {
        const admin = await prisma.user.findFirst({
            where: { email, role: "ADMIN" },
        });

        if (!admin || admin.password !== hashPassword(password)) {
            console.log("LOGIN FAILED! Invalid credentials.");
            redirect("/admin/login?error=Invalid credentials");
        }

        const cookieStore = await cookies();
        cookieStore.set("admin_session", admin.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

        console.log("LOGIN SUCCESS! Redirecting to dashboard...");
        redirect("/admin/dashboard");
    } catch (e: any) {
        console.error("Login database error:", e);
        // If it's a redirect, throw it so Next.js handles it, otherwise redirect to error
        if (e.message?.includes("NEXT_REDIRECT")) {
            throw e;
        }
        redirect("/admin/login?error=Server database error");
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    redirect("/admin/login");
}
