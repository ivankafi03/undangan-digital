"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
    const email = (formData.get("email") as string).trim();
    const password = (formData.get("password") as string).trim();

    console.log("LOGIN REQUEST (trimmed):", { email, password: "***" });

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
        console.error("CRITICAL: ADMIN_EMAIL or ADMIN_PASSWORD is not set in environment variables!");
        redirect("/admin/login?error=Server configuration error");
    }

    if (email === adminEmail && password === adminPassword) {
        const cookieStore = await cookies();
        cookieStore.set("admin_session", "authenticated", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });
        console.log("LOGIN SUCCESS! Redirecting to dashboard...");
        redirect("/admin/dashboard");
    } else {
        console.log("LOGIN FAILED! Invalid credentials.");
        redirect("/admin/login?error=Invalid credentials");
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    redirect("/admin/login");
}
