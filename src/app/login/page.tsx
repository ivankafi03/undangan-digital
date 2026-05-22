"use client";

import { loginMember } from "@/app/actions/member";
import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, ArrowLeft, Loader2, ShieldAlert, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function MemberLoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        const formData = new FormData(e.currentTarget);
        try {
            const res = await loginMember(formData);
            if (res?.error) {
                setError(res.error);
                setLoading(false);
            }
        } catch (err) {
            setError("Terjadi kesalahan saat menghubungi server.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0] flex items-center justify-center p-4 relative overflow-hidden font-sans">
            {/* Background Batik Motif */}
            <div 
                className="absolute inset-0 z-0 opacity-[0.035] pointer-events-none bg-repeat" 
                style={{ backgroundImage: "url('/batik-complex.svg')" }} 
            />

            {/* Glowing decorative blur circles */}
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl pointer-events-none z-0" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none z-0" />

            {/* Back to Home Button */}
            <Link 
                href="/" 
                className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-900 transition-all bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-full border border-gray-200/50 shadow-sm z-20 hover:-translate-y-0.5 active:scale-95 duration-200"
            >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Beranda
            </Link>

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white/90 backdrop-blur-xl w-full max-w-md rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_50px_rgba(15,23,42,0.06)] border border-white/60 overflow-hidden relative z-10"
            >
                {/* Top Accent Gradient Line */}
                <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600"></div>

                <div className="text-center mb-8">
                    {/* Brand Logo Container */}
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-20 h-20 rounded-2xl mx-auto overflow-hidden shadow-md border-2 border-white ring-4 ring-sky-500/5 mb-5 cursor-pointer transition-all duration-300"
                    >
                        <img 
                            src="/658080585_18042732272580949_1176413146137522839_n.jpg" 
                            alt="FikaDigi Logo" 
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    <h1 className="text-3xl font-black text-[#111111] tracking-tight">
                        Fika<span className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">Digi</span>
                    </h1>
                    <p className="text-slate-500 mt-2 font-semibold text-sm">
                        Selamat Datang Kembali
                    </p>
                </div>

                {error && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-center font-bold text-xs flex items-center justify-center gap-2"
                    >
                        <ShieldAlert className="w-5 h-5 shrink-0 animate-bounce" />
                        <span>{error}</span>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                            Alamat Email
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-sky-500 transition-colors">
                                <Mail className="w-5 h-5" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="nama@email.com"
                                className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all text-slate-700 font-medium placeholder-slate-400"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                            Kata Sandi
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-sky-500 transition-colors">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                type="password"
                                name="password"
                                required
                                placeholder="Masukkan kata sandi"
                                className="w-full pl-12 pr-6 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all text-slate-700 font-medium placeholder-slate-400"
                            />
                        </div>
                    </div>

                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.01, y: -1 }}
                        whileTap={{ scale: 0.99 }}
                        className={`w-full py-4 text-white rounded-2xl font-bold text-base shadow-lg shadow-sky-500/10 hover:shadow-sky-500/20 transition-all duration-200 flex items-center justify-center gap-2 ${
                            loading 
                                ? "bg-slate-300 cursor-not-allowed" 
                                : "bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:opacity-[0.98]"
                        }`}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Memproses...</span>
                            </>
                        ) : (
                            <>
                                <span>Masuk ke Dashboard</span>
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </motion.button>
                </form>

                {/* Bottom Links */}
                <div className="text-center mt-6 pt-6 border-t border-slate-100">
                    <p className="text-slate-500 text-sm">
                        Belum memiliki akun?{" "}
                        <Link href="/register" className="text-sky-500 font-bold hover:text-indigo-600 transition-colors duration-200">
                            Daftar Sekarang
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
