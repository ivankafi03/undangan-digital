"use client";

import { registerMember } from "@/app/actions/member";
import { useState } from "react";
import Link from "next/link";
import { User, Mail, Phone, Lock, ArrowLeft, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function MemberRegisterPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        const formData = new FormData(e.currentTarget);
        try {
            const res = await registerMember(formData);
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
        <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-5 relative overflow-hidden py-16">
            {/* Background elegant radial glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-sky-100/40 via-transparent to-transparent pointer-events-none z-0" />
            
            {/* Back to Home Button */}
            <Link 
                href="/" 
                className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors bg-white px-4 py-2 rounded-full border border-gray-200/60 shadow-sm z-10"
            >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Beranda
            </Link>

            <div className="w-full max-w-[440px] relative z-10">
                {/* Logo & Heading */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-white rounded-full shadow-sm border border-gray-200/60 mb-5">
                        <div className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center shadow-inner border border-gray-100">
                            <img 
                                src="/658080585_18042732272580949_1176413146137522839_n.jpg" 
                                alt="FikaDigi Logo" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="text-lg font-black text-gray-900 tracking-tight">
                            Fika<span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">Digi</span>
                        </span>
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Buat Akun Member</h1>
                    <p className="text-gray-500 mt-2 text-sm">Daftar sekarang untuk memesan dan melacak undangan Anda.</p>
                </div>

                {/* Premium Register Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100"
                >
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100/60 flex items-center gap-2"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-sky-500 transition-colors" />
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="Cth: Budi Santoso"
                                    className="w-full pl-12 pr-5 py-3.5 bg-gray-50 rounded-2xl border border-gray-200 focus:bg-white focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 transition-all text-gray-900 font-medium text-sm"
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Alamat Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-sky-500 transition-colors" />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="nama@email.com"
                                    className="w-full pl-12 pr-5 py-3.5 bg-gray-50 rounded-2xl border border-gray-200 focus:bg-white focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 transition-all text-gray-900 font-medium text-sm"
                                />
                            </div>
                        </div>

                        {/* WhatsApp Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Nomor WhatsApp</label>
                            <div className="relative group">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-sky-500 transition-colors" />
                                <input
                                    type="tel"
                                    name="no_wa"
                                    required
                                    placeholder="08123456789"
                                    className="w-full pl-12 pr-5 py-3.5 bg-gray-50 rounded-2xl border border-gray-200 focus:bg-white focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 transition-all text-gray-900 font-medium text-sm"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Kata Sandi</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-sky-500 transition-colors" />
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    minLength={6}
                                    placeholder="Minimal 6 karakter"
                                    className="w-full pl-12 pr-5 py-3.5 bg-gray-50 rounded-2xl border border-gray-200 focus:bg-white focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 transition-all text-gray-900 font-medium text-sm"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-sky-500/20 transition-all duration-300 transform active:scale-98 mt-2 flex items-center justify-center gap-2 ${
                                loading 
                                ? "bg-sky-400 cursor-not-allowed" 
                                : "bg-[#111111] hover:bg-sky-500 hover:shadow-xl hover:shadow-sky-500/20"
                            }`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Mendaftarkan...
                                </>
                            ) : (
                                "Daftar Akun"
                            )}
                        </button>
                    </form>

                    {/* Bottom Links */}
                    <div className="text-center mt-8 pt-6 border-t border-gray-100">
                        <p className="text-gray-500 text-sm">
                            Sudah memiliki akun?{" "}
                            <Link href="/login" className="text-sky-500 font-bold hover:text-sky-600 transition-colors">
                                Masuk di Sini
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
