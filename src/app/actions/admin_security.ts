"use server";

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";
import { sendAdminInvitationEmail, sendPasswordResetEmail, sendPasswordChangeConfirmEmail } from "@/lib/mail";

// Secure hashing helper
const hashPassword = (password: string) => {
    return crypto.createHash("sha256").update(password).digest("hex");
};

// Get currently logged-in admin
export async function getCurrentAdmin() {
    try {
        const cookieStore = await cookies();
        const adminId = cookieStore.get("admin_session")?.value;
        if (!adminId) return null;

        const admin = await prisma.user.findUnique({
            where: { id: adminId },
        });

        if (!admin || admin.role !== "ADMIN") return null;
        return admin;
    } catch {
        return null;
    }
}

/**
 * Invite a new Admin
 */
export async function inviteAdmin(prevState: any, formData: FormData) {
    const email = (formData.get("email") as string).trim().toLowerCase();

    if (!email) {
        return { error: "Email wajib diisi." };
    }

    try {
        const currentAdmin = await getCurrentAdmin();
        if (!currentAdmin) {
            return { error: "Akses ditolak. Anda bukan admin." };
        }

        // Check if already an admin
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser && existingUser.role === "ADMIN") {
            return { error: "Email ini sudah terdaftar sebagai Administrator." };
        }

        // Generate invitation token
        const token = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

        // Upsert invitation (delete existing pending for the same email first to avoid duplicates)
        await prisma.adminInvitation.upsert({
            where: { email },
            update: { token, expiresAt },
            create: { email, token, expiresAt },
        });

        // Send email
        await sendAdminInvitationEmail(email, token);

        return { success: `Undangan berhasil dikirim ke ${email}.` };
    } catch (error) {
        console.error("Invite Admin Error:", error);
        return { error: "Gagal mengirim undangan. Silakan coba lagi." };
    }
}

/**
 * Revoke an Admin Invitation
 */
export async function revokeInvitation(id: string) {
    try {
        const currentAdmin = await getCurrentAdmin();
        if (!currentAdmin) {
            return { error: "Akses ditolak." };
        }

        await prisma.adminInvitation.delete({
            where: { id },
        });

        return { success: "Undangan berhasil ditarik." };
    } catch (error) {
        console.error("Revoke Invite Error:", error);
        return { error: "Gagal menarik undangan." };
    }
}

/**
 * Accept an Admin Invitation (Create Admin Account)
 */
export async function acceptInvitation(prevState: any, formData: FormData) {
    const token = formData.get("token") as string;
    const name = (formData.get("name") as string).trim();
    const password = (formData.get("password") as string).trim();

    if (!token || !name || !password) {
        return { error: "Semua kolom wajib diisi." };
    }

    if (password.length < 8) {
        return { error: "Sandi harus minimal 8 karakter." };
    }

    try {
        // Validate invitation
        const invite = await prisma.adminInvitation.findUnique({
            where: { token },
        });

        if (!invite || invite.expiresAt < new Date()) {
            return { error: "Undangan tidak valid atau sudah kedaluwarsa." };
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: invite.email },
        });

        const hashedPassword = hashPassword(password);

        if (existingUser) {
            // Update role to ADMIN if user already exists as member
            await prisma.user.update({
                where: { email: invite.email },
                data: {
                    name,
                    role: "ADMIN",
                    password: hashedPassword,
                },
            });
        } else {
            // Create brand new ADMIN user
            await prisma.user.create({
                data: {
                    name,
                    email: invite.email,
                    password: hashedPassword,
                    role: "ADMIN",
                },
            });
        }

        // Delete invitation
        await prisma.adminInvitation.delete({
            where: { token },
        });

        return { success: "Pendaftaran berhasil! Mengalihkan ke halaman masuk..." };
    } catch (error) {
        console.error("Accept Invitation Error:", error);
        return { error: "Terjadi kesalahan. Silakan coba lagi." };
    }
}

/**
 * Request Password Change inside Admin Settings
 */
export async function requestPasswordChange(prevState: any, formData: FormData) {
    const currentPassword = (formData.get("currentPassword") as string).trim();
    const newPassword = (formData.get("newPassword") as string).trim();
    const confirmPassword = (formData.get("confirmPassword") as string).trim();

    if (!currentPassword || !newPassword || !confirmPassword) {
        return { error: "Semua kolom wajib diisi." };
    }

    if (newPassword !== confirmPassword) {
        return { error: "Konfirmasi sandi baru tidak cocok." };
    }

    if (newPassword.length < 8) {
        return { error: "Sandi baru harus minimal 8 karakter." };
    }

    try {
        const currentAdmin = await getCurrentAdmin();
        if (!currentAdmin) {
            return { error: "Akses ditolak. Silakan masuk terlebih dahulu." };
        }

        // Verify current password
        if (currentAdmin.password !== hashPassword(currentPassword)) {
            return { error: "Sandi saat ini salah." };
        }

        // Save password change request
        const token = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        const hashedNewPassword = hashPassword(newPassword);

        await prisma.passwordChangeRequest.upsert({
            where: { userId: currentAdmin.id },
            update: { hashedPassword: hashedNewPassword, token, expiresAt },
            create: { userId: currentAdmin.id, hashedPassword: hashedNewPassword, token, expiresAt },
        });

        // Send confirmation email
        await sendPasswordChangeConfirmEmail(currentAdmin.email, token);

        return { success: `Permintaan dibuat! Silakan klik link konfirmasi yang dikirim ke email ${currentAdmin.email}.` };
    } catch (error) {
        console.error("Request Password Change Error:", error);
        return { error: "Gagal membuat permintaan. Coba lagi." };
    }
}

/**
 * Confirm Password Change (Applies the new password)
 */
export async function confirmPasswordChange(token: string) {
    if (!token) return { error: "Token tidak valid." };

    try {
        const changeRequest = await prisma.passwordChangeRequest.findUnique({
            where: { token },
        });

        if (!changeRequest || changeRequest.expiresAt < new Date()) {
            return { error: "Link konfirmasi salah atau sudah kedaluwarsa." };
        }

        // Apply new password
        await prisma.user.update({
            where: { id: changeRequest.userId },
            data: {
                password: changeRequest.hashedPassword,
            },
        });

        // Delete change request
        await prisma.passwordChangeRequest.delete({
            where: { token },
        });

        return { success: "Sandi berhasil diubah! Silakan masuk kembali." };
    } catch (error) {
        console.error("Confirm Password Change Error:", error);
        return { error: "Gagal mengubah sandi." };
    }
}

/**
 * Request Password Reset (Forgot Password)
 */
export async function requestPasswordReset(prevState: any, formData: FormData) {
    const email = (formData.get("email") as string).trim().toLowerCase();

    if (!email) {
        return { error: "Email wajib diisi." };
    }

    try {
        // Look up admin by email
        const admin = await prisma.user.findFirst({
            where: { email, role: "ADMIN" },
        });

        if (!admin) {
            // Securely return success even if email is not found to prevent user enumeration
            return { success: "Jika email terdaftar, tautan reset telah dikirim ke kotak masuk Anda." };
        }

        // Generate reset token
        const token = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        await prisma.passwordResetToken.create({
            data: { email, token, expiresAt },
        });

        // Send email
        await sendPasswordResetEmail(email, token);

        return { success: "Tautan reset telah dikirim ke kotak masuk Anda." };
    } catch (error) {
        console.error("Request Reset Error:", error);
        return { error: "Terjadi kesalahan. Coba lagi." };
    }
}

/**
 * Reset Password using Token
 */
export async function resetPassword(prevState: any, formData: FormData) {
    const token = formData.get("token") as string;
    const password = (formData.get("password") as string).trim();
    const confirmPassword = (formData.get("confirmPassword") as string).trim();

    if (!token || !password || !confirmPassword) {
        return { error: "Semua kolom wajib diisi." };
    }

    if (password !== confirmPassword) {
        return { error: "Konfirmasi sandi tidak cocok." };
    }

    if (password.length < 8) {
        return { error: "Sandi baru harus minimal 8 karakter." };
    }

    try {
        const resetToken = await prisma.passwordResetToken.findUnique({
            where: { token },
        });

        if (!resetToken || resetToken.expiresAt < new Date()) {
            return { error: "Token reset salah atau sudah kedaluwarsa." };
        }

        const hashedPassword = hashPassword(password);

        // Update all matching admins (usually just one)
        await prisma.user.updateMany({
            where: { email: resetToken.email, role: "ADMIN" },
            data: { password: hashedPassword },
        });

        // Delete token(s) for this email
        await prisma.passwordResetToken.deleteMany({
            where: { email: resetToken.email },
        });

        return { success: "Sandi berhasil direset! Silakan masuk kembali." };
    } catch (error) {
        console.error("Reset Password Error:", error);
        return { error: "Gagal mereset sandi. Coba lagi." };
    }
}
