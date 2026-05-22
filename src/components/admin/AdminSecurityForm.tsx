"use client";

import { useActionState, startTransition, useState } from "react";
import { inviteAdmin, requestPasswordChange, revokeInvitation } from "@/app/actions/admin_security";
import { KeyRound, ShieldAlert, Mail, Send, Trash2, Clock, CheckCircle } from "lucide-react";

interface Invitation {
    id: string;
    email: string;
    createdAt: Date;
    expiresAt: Date;
}

interface AdminSecurityFormProps {
    initialInvitations: Invitation[];
    currentAdminEmail: string;
}

export default function AdminSecurityForm({ initialInvitations, currentAdminEmail }: AdminSecurityFormProps) {
    const [invitations, setInvitations] = useState<Invitation[]>(initialInvitations);
    const [loadingRevoke, setLoadingRevoke] = useState<string | null>(null);

    // Password Change Action State
    const [passState, passAction, passPending] = useActionState(
        async (prevState: any, formData: FormData) => {
            return await requestPasswordChange(prevState, formData);
        },
        null
    );

    // Invite Admin Action State
    const [inviteState, inviteAction, invitePending] = useActionState(
        async (prevState: any, formData: FormData) => {
            const res = await inviteAdmin(prevState, formData);
            if (res.success) {
                // Fetch updated invitations or manually append (we can reload or just update state for simplicity)
                // For a robust dev experience, we can reload or manual add since we know the email
                const email = formData.get("email") as string;
                const newInvite: Invitation = {
                    id: Math.random().toString(),
                    email: email.trim().toLowerCase(),
                    createdAt: new Date(),
                    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
                };
                setInvitations(prev => [newInvite, ...prev.filter(i => i.email !== newInvite.email)]);
            }
            return res;
        },
        null
    );

    const handlePassSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(() => {
            passAction(formData);
        });
    };

    const handleInviteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(() => {
            inviteAction(formData);
        });
        e.currentTarget.reset();
    };

    const handleRevoke = async (id: string) => {
        setLoadingRevoke(id);
        const res = await revokeInvitation(id);
        if (res.success) {
            setInvitations(prev => prev.filter(inv => inv.id !== id));
        } else if (res.error) {
            alert(res.error);
        }
        setLoadingRevoke(null);
    };

    return (
        <div className="space-y-6 sm:space-y-8">
            {/* Keamanan & Sandi Card */}
            <div className="bg-white rounded-xl sm:rounded-[2rem] shadow-sm p-4 sm:p-10 border border-slate-100">
                <div className="flex items-center gap-3 text-slate-900 font-bold mb-4 sm:mb-6">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-500">
                        <KeyRound className="w-4 h-4" />
                    </div>
                    <h2 className="text-base sm:text-xl">Keamanan & Ubah Kata Sandi</h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mb-6">
                    Ubah sandi login admin Anda. Sebagai tindakan keamanan ketat, **sandi baru hanya akan aktif setelah Anda mengonfirmasinya melalui email utama Anda (${currentAdminEmail})**.
                </p>

                {passState?.error && (
                    <div className="mb-6 p-4 bg-rose-50 text-rose-600 rounded-2xl text-xs font-bold border border-rose-100">
                        {passState.error}
                    </div>
                )}

                {passState?.success && (
                    <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-2xl text-xs font-bold border border-emerald-100 flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div>{passState.success}</div>
                    </div>
                )}

                <form onSubmit={handlePassSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                        <div className="space-y-1.5">
                            <label className="text-xs sm:text-sm font-bold text-slate-700">Sandi Saat Ini</label>
                            <input
                                type="password"
                                name="currentPassword"
                                required
                                placeholder="••••••••"
                                className="w-full px-4 py-2.5 sm:px-5 sm:py-3.5 rounded-xl sm:rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-xs sm:text-sm font-semibold text-slate-700"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs sm:text-sm font-bold text-slate-700">Sandi Baru</label>
                            <input
                                type="password"
                                name="newPassword"
                                required
                                placeholder="Minimal 8 karakter"
                                className="w-full px-4 py-2.5 sm:px-5 sm:py-3.5 rounded-xl sm:rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-xs sm:text-sm font-semibold text-slate-700"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs sm:text-sm font-bold text-slate-700">Konfirmasi Sandi Baru</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                required
                                placeholder="Ulangi sandi baru"
                                className="w-full px-4 py-2.5 sm:px-5 sm:py-3.5 rounded-xl sm:rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-xs sm:text-sm font-semibold text-slate-700"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={passPending}
                        className={`px-6 py-3.5 bg-slate-900 text-white rounded-xl sm:rounded-2xl font-bold hover:bg-sky-500 transition shadow-md active:scale-95 text-xs sm:text-sm flex items-center justify-center gap-2 ${
                            passPending ? "bg-slate-400 cursor-not-allowed" : ""
                        }`}
                    >
                        {passPending ? "Memproses..." : "Kirim Link Konfirmasi ke Email"}
                    </button>
                </form>
            </div>

            {/* Undang Admin Baru Card */}
            <div className="bg-white rounded-xl sm:rounded-[2rem] shadow-sm p-4 sm:p-10 border border-slate-100">
                <div className="flex items-center gap-3 text-slate-900 font-bold mb-4 sm:mb-6">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                        <Mail className="w-4 h-4" />
                    </div>
                    <h2 className="text-base sm:text-xl">Undang Administrator Baru</h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mb-6">
                    Masukkan email admin baru. Sistem akan otomatis mengirimkan email konfirmasi untuk mendaftar dan menyetel password mereka.
                </p>

                {inviteState?.error && (
                    <div className="mb-6 p-4 bg-rose-50 text-rose-600 rounded-2xl text-xs font-bold border border-rose-100">
                        {inviteState.error}
                    </div>
                )}

                {inviteState?.success && (
                    <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-2xl text-xs font-bold border border-emerald-100 flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div>{inviteState.success}</div>
                    </div>
                )}

                <form onSubmit={handleInviteSubmit} className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="flex-grow space-y-1.5">
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="nama-admin-baru@gmail.com"
                            className="w-full px-5 py-3.5 rounded-xl sm:rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-xs sm:text-sm font-semibold text-slate-700"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={invitePending}
                        className={`px-8 py-3.5 bg-slate-900 text-white rounded-xl sm:rounded-2xl font-bold hover:bg-emerald-500 transition shadow-md active:scale-95 text-xs sm:text-sm flex items-center justify-center gap-2 ${
                            invitePending ? "bg-slate-400 cursor-not-allowed" : ""
                        }`}
                    >
                        {invitePending ? "Mengirim..." : (
                            <>
                                Kirim Undangan <Send className="w-3.5 h-3.5" />
                            </>
                        )}
                    </button>
                </form>

                {/* List Undangan Pending */}
                {invitations.length > 0 && (
                    <div className="space-y-3">
                        <h3 className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '3s' }} /> Undangan Pending (Belum Diterima)
                        </h3>
                        <div className="overflow-hidden border border-slate-100 rounded-2xl">
                            <div className="divide-y divide-slate-100 bg-slate-50/50">
                                {invitations.map((inv) => (
                                    <div key={inv.id} className="flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors">
                                        <div className="space-y-1">
                                            <div className="text-xs sm:text-sm font-semibold text-slate-800">{inv.email}</div>
                                            <div className="text-[10px] text-slate-400 font-medium">
                                                Dikirim pada: {new Date(inv.createdAt).toLocaleString("id-ID")}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleRevoke(inv.id)}
                                            disabled={loadingRevoke === inv.id}
                                            className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition duration-300 flex items-center justify-center"
                                            title="Batalkan Undangan"
                                        >
                                            {loadingRevoke === inv.id ? (
                                                <span className="w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></span>
                                            ) : (
                                                <Trash2 className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
