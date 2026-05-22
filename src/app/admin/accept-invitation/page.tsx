"use client";

import { acceptInvitation } from "@/app/actions/admin_security";
import { useActionState, startTransition, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { User, Lock, KeyRound, ArrowRight } from "lucide-react";

function AcceptInvitationForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";

    const [state, formAction, isPending] = useActionState(
        async (prevState: any, formData: FormData) => {
            return await acceptInvitation(prevState, formData);
        },
        null
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append("token", token);
        startTransition(() => {
            formAction(formData);
        });
    };

    if (!token) {
        return (
            <div className="text-center space-y-4">
                <div className="text-4xl">⚠️</div>
                <h2 className="text-xl font-bold text-slate-800">Token Undangan Tidak Ditemukan</h2>
                <p className="text-slate-500 text-xs leading-relaxed max-w-xs mx-auto">
                    Tautan undangan tidak memiliki token yang valid. Silakan hubungi admin utama untuk mengirimkan undangan ulang.
                </p>
                <a href="/" className="inline-block mt-4 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-md">
                    Kembali ke Beranda
                </a>
            </div>
        );
    }

    return (
        <>
            <div className="mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-6">
                    🤝
                </div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Terima Undangan</h1>
                <p className="text-slate-500 mt-2 font-medium text-sm leading-relaxed">
                    Selamat! Anda diundang menjadi **Administrator** FikaDigi. Silakan lengkapi profil Anda di bawah.
                </p>
            </div>

            {state?.error && (
                <div className="mb-6 p-4 bg-rose-50 text-rose-600 rounded-2xl text-center text-xs font-bold border border-rose-100 animate-pulse">
                    {state.error}
                </div>
            )}

            {state?.success ? (
                <div className="p-6 bg-emerald-50 text-emerald-800 rounded-3xl border border-emerald-100 text-center space-y-4">
                    <div className="text-2xl">🎉</div>
                    <p className="text-sm font-bold leading-relaxed">{state.success}</p>
                    <a 
                        href="/admin/login" 
                        className="inline-block w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition shadow-md"
                    >
                        Masuk ke Dashboard
                    </a>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-bold text-slate-700 ml-1 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-slate-400" /> Nama Lengkap Anda
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="Contoh: Ivan Kafi"
                            className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-slate-700 font-semibold"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs sm:text-sm font-bold text-slate-700 ml-1 flex items-center gap-1.5">
                            <Lock className="w-3.5 h-3.5 text-slate-400" /> Sandi Akun Admin
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="Minimal 8 karakter"
                            className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-slate-700 font-semibold"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className={`w-full py-4.5 text-white rounded-2xl font-bold text-base shadow-xl flex items-center justify-center gap-2 transition transform active:scale-95 ${
                            isPending 
                                ? "bg-slate-400 cursor-not-allowed" 
                                : "bg-emerald-600 hover:bg-emerald-700 hover:-translate-y-0.5"
                        }`}
                    >
                        {isPending ? "Memproses..." : "Aktifkan Akun Admin & Masuk ➜"}
                    </button>
                </form>
            )}
        </>
    );
}

export default function AcceptInvitationPage() {
    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-teal-600"></div>
                <Suspense fallback={<div className="text-center py-10 font-bold text-slate-500 animate-pulse">Memuat...</div>}>
                    <AcceptInvitationForm />
                </Suspense>
            </div>
        </div>
    );
}
