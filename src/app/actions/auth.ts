"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
    const email = (formData.get("email") as string).trim();
    const password = (formData.get("password") as string).trim();

    console.log("LOGIN REQUEST (trimmed):", { email, password });

    // Simple hardcoded check
    if (email === "admin@fikadigi.com" && password === "admin123") {
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
