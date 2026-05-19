"use client";

import { login } from "@/app/actions/auth";
import { useState, useEffect } from "react";

export default function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        searchParams.then((params) => {
            if (params.error) {
                setError(params.error);
            }
        });
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log("Form submit triggered!");
        setLoading(true);
        // Let the Server Action handle it via the form action attribute
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sky-500 to-blue-600"></div>

                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl mx-auto flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-6">
                        ✨
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900">Admin FikaDigi</h1>
                    <p className="text-slate-500 mt-2 font-medium">Masuk untuk mengelola katalog</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-center font-bold border border-red-100 italic animate-pulse">
                        E-mail atau password salah!
                    </div>
                )}

                <form action={login} onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="admin@meldigi.com"
                            className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all text-slate-700 font-medium"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            placeholder="••••••••"
                            className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all text-slate-700 font-medium"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-5 text-white rounded-2xl font-bold text-lg shadow-xl transition transform active:scale-95 ${loading ? "bg-slate-400 cursor-not-allowed" : "bg-slate-900 hover:bg-slate-800 hover:-translate-y-1"
                            }`}
                    >
                        {loading ? "Memproses..." : "Masuk Sekarang ➜"}
                    </button>
                </form>

                <p className="text-center mt-8 text-slate-400 text-sm">
                    Lupa password? Hubungi developer.
                </p>
            </div>
        </div>
    );
}
