import nodemailer from "nodemailer";

// Create SMTP Transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: (process.env.SMTP_PORT || "465") === "465", // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

const fromEmail = process.env.SMTP_FROM || `"FikaDigi Premium" <${process.env.SMTP_USER}>`;
const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://fikadigi.store";

/**
 * Send an Admin Invitation email
 */
export async function sendAdminInvitationEmail(toEmail: string, token: string) {
    const inviteLink = `${appUrl}/admin/accept-invitation?token=${token}`;

    const mailOptions = {
        from: fromEmail,
        to: toEmail,
        subject: "Undangan Menjadi Admin FikaDigi.store",
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #f0f0f0; border-radius: 16px; background-color: #ffffff;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #0f172a; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">FikaDigi</h1>
                    <p style="color: #64748b; margin: 5px 0 0 0; font-size: 14px;">Undangan Akses Administrator</p>
                </div>
                <div style="border-top: 3px solid #0284c7; padding-top: 30px;">
                    <p style="font-size: 16px; color: #334155; line-height: 1.6; margin-bottom: 20px;">
                        Halo,
                    </p>
                    <p style="font-size: 16px; color: #334155; line-height: 1.6; margin-bottom: 25px;">
                        Anda telah diundang untuk menjadi **Administrator** di website <strong>fikadigi.store</strong>.
                        Dengan akses ini, Anda dapat mengelola pesanan, mengatur tema, dan mengonfigurasi setelan website FikaDigi.
                    </p>
                    <div style="text-align: center; margin: 35px 0;">
                        <a href="${inviteLink}" style="background-color: #0f172a; color: #ffffff; padding: 16px 32px; font-size: 15px; font-weight: 700; text-decoration: none; border-radius: 12px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                            Terima Undangan & Buat Password
                        </a>
                    </div>
                    <p style="font-size: 12px; color: #94a3b8; line-height: 1.6; margin-bottom: 20px; background-color: #f8fafc; padding: 15px; border-radius: 8px;">
                        Jika tombol di atas tidak berfungsi, silakan salin dan tempel tautan berikut ke browser Anda:<br/>
                        <a href="${inviteLink}" style="color: #0284c7; word-break: break-all;">${inviteLink}</a>
                    </p>
                    <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 30px 0;" />
                    <p style="font-size: 13px; color: #64748b; text-align: center; margin: 0;">
                        Tautan ini berlaku selama 24 jam.<br/>
                        &copy; 2026 FikaDigi. All rights reserved.
                    </p>
                </div>
            </div>
        `,
    };

    return transporter.sendMail(mailOptions);
}

/**
 * Send a Password Reset email
 */
export async function sendPasswordResetEmail(toEmail: string, token: string) {
    const resetLink = `${appUrl}/admin/reset-password?token=${token}`;

    const mailOptions = {
        from: fromEmail,
        to: toEmail,
        subject: "Reset Sandi Admin FikaDigi.store",
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #f0f0f0; border-radius: 16px; background-color: #ffffff;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #0f172a; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">FikaDigi</h1>
                    <p style="color: #64748b; margin: 5px 0 0 0; font-size: 14px;">Permintaan Reset Kata Sandi</p>
                </div>
                <div style="border-top: 3px solid #ef4444; padding-top: 30px;">
                    <p style="font-size: 16px; color: #334155; line-height: 1.6; margin-bottom: 20px;">
                        Halo Admin FikaDigi,
                    </p>
                    <p style="font-size: 16px; color: #334155; line-height: 1.6; margin-bottom: 25px;">
                        Kami menerima permintaan untuk mereset kata sandi akun administrator Anda. 
                        Jika Anda tidak melakukan permintaan ini, silakan abaikan email ini dengan aman.
                    </p>
                    <div style="text-align: center; margin: 35px 0;">
                        <a href="${resetLink}" style="background-color: #ef4444; color: #ffffff; padding: 16px 32px; font-size: 15px; font-weight: 700; text-decoration: none; border-radius: 12px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                            Reset Kata Sandi Sekarang
                        </a>
                    </div>
                    <p style="font-size: 12px; color: #94a3b8; line-height: 1.6; margin-bottom: 20px; background-color: #f8fafc; padding: 15px; border-radius: 8px;">
                        Jika tombol di atas tidak berfungsi, silakan salin dan tempel tautan berikut ke browser Anda:<br/>
                        <a href="${resetLink}" style="color: #ef4444; word-break: break-all;">${resetLink}</a>
                    </p>
                    <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 30px 0;" />
                    <p style="font-size: 13px; color: #64748b; text-align: center; margin: 0;">
                        Tautan reset ini berlaku selama 1 jam.<br/>
                        &copy; 2026 FikaDigi. All rights reserved.
                    </p>
                </div>
            </div>
        `,
    };

    return transporter.sendMail(mailOptions);
}

/**
 * Send a Password Change Confirmation email
 */
export async function sendPasswordChangeConfirmEmail(toEmail: string, token: string) {
    const confirmLink = `${appUrl}/admin/confirm-password-change?token=${token}`;

    const mailOptions = {
        from: fromEmail,
        to: toEmail,
        subject: "Konfirmasi Perubahan Sandi Admin FikaDigi",
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #f0f0f0; border-radius: 16px; background-color: #ffffff;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #0f172a; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">FikaDigi</h1>
                    <p style="color: #64748b; margin: 5px 0 0 0; font-size: 14px;">Konfirmasi Perubahan Kata Sandi</p>
                </div>
                <div style="border-top: 3px solid #f59e0b; padding-top: 30px;">
                    <p style="font-size: 16px; color: #334155; line-height: 1.6; margin-bottom: 20px;">
                        Halo Admin FikaDigi,
                    </p>
                    <p style="font-size: 16px; color: #334155; line-height: 1.6; margin-bottom: 25px;">
                        Anda telah meminta perubahan kata sandi untuk akun administrator Anda. 
                        Untuk mengonfirmasi dan mengaktifkan kata sandi baru Anda, silakan klik tombol di bawah ini:
                    </p>
                    <div style="text-align: center; margin: 35px 0;">
                        <a href="${confirmLink}" style="background-color: #f59e0b; color: #ffffff; padding: 16px 32px; font-size: 15px; font-weight: 700; text-decoration: none; border-radius: 12px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                            Konfirmasi Perubahan Sandi
                        </a>
                    </div>
                    <p style="font-size: 12px; color: #94a3b8; line-height: 1.6; margin-bottom: 20px; background-color: #f8fafc; padding: 15px; border-radius: 8px;">
                        Jika tombol di atas tidak berfungsi, silakan salin dan tempel tautan berikut ke browser Anda:<br/>
                        <a href="${confirmLink}" style="color: #f59e0b; word-break: break-all;">${confirmLink}</a>
                    </p>
                    <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 30px 0;" />
                    <p style="font-size: 13px; color: #64748b; text-align: center; margin: 0;">
                        Tautan konfirmasi ini berlaku selama 1 jam.<br/>
                        &copy; 2026 FikaDigi. All rights reserved.
                    </p>
                </div>
            </div>
        `,
    };

    return transporter.sendMail(mailOptions);
}
