"use client";

import { requestPasswordReset } from "@/app/actions/admin_security";
import { useActionState, startTransition } from "react";
import { Mail, ArrowLeft, Send } from "lucide-react";

export default function ForgotPasswordPage() {
    const [state, formAction, isPending] = useActionState(
        async (prevState: any, formData: FormData) => {
            return await requestPasswordReset(prevState, formData);
        },
        null
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        startTransition(() => {
            formAction(formData);
        });
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-rose-600"></div>

                <div className="mb-8">
                    <a 
                        href="/admin/login" 
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors mb-6"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Login
                    </a>

                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-6">
                        🔒
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Lupa Sandi Admin</h1>
                    <p className="text-slate-500 mt-2 font-medium text-sm leading-relaxed">
                        Masukkan email terdaftar Anda untuk menerima tautan reset kata sandi baru.
                    </p>
                </div>

                {state?.error && (
                    <div className="mb-6 p-4 bg-rose-50 text-rose-600 rounded-2xl text-center text-xs font-bold border border-rose-100 animate-pulse">
                        {state.error}
                    </div>
                )}

                {state?.success ? (
                    <div className="p-6 bg-emerald-50 text-emerald-800 rounded-3xl border border-emerald-100 text-center space-y-3">
                        <div className="text-2xl">📧</div>
                        <p className="text-sm font-bold leading-relaxed">{state.success}</p>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">
                            Silakan periksa kotak masuk dan folder spam email Anda.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs sm:text-sm font-bold text-slate-700 ml-1 flex items-center gap-1.5">
                                <Mail className="w-3.5 h-3.5 text-slate-400" /> Alamat Email Admin
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="nama@fikadigi.store"
                                className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all text-slate-700 font-semibold"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className={`w-full py-4.5 text-white rounded-2xl font-bold text-base shadow-xl flex items-center justify-center gap-2 transition transform active:scale-95 ${
                                isPending 
                                    ? "bg-slate-400 cursor-not-allowed" 
                                    : "bg-slate-900 hover:bg-slate-800 hover:-translate-y-0.5"
                            }`}
                        >
                            {isPending ? (
                                "Mengirim..."
                            ) : (
                                <>
                                    Kirim Link Reset <Send className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
