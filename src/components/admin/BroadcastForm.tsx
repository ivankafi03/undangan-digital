"use client";

import { useState } from "react";
import { Send, Bell, Phone, CheckCircle, AlertTriangle, Monitor, Sparkles } from "lucide-react";

export default function BroadcastForm({ initialSubscribers }: { initialSubscribers: number }) {
    const [title, setTitle] = useState("PROMO SPESIAL FIKADIGI!");
    const [message, setMessage] = useState("Dapatkan diskon 50% untuk rilis tema teranyar hari ini. Buruan pesan sekarang sebelum kehabisan!");
    const [url, setUrl] = useState("/#katalog");
    
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ success: boolean; text: string } | null>(null);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const res = await fetch("/api/push/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    message,
                    url,
                    icon: "/icon.jpg"
                })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setStatus({
                    success: true,
                    text: `Berhasil mengirim broadcast ke ${data.sentCount} perangkat! (Gagal: ${data.failedCount || 0})`
                });
                // Reset form on success
                setTitle("PROMO SPESIAL FIKADIGI!");
                setMessage("Dapatkan diskon 50% untuk rilis tema teranyar hari ini. Buruan pesan sekarang sebelum kehabisan!");
                setUrl("/#katalog");
            } else {
                setStatus({
                    success: false,
                    text: data.error || "Gagal mengirim broadcast notifikasi."
                });
            }
        } catch (error) {
            console.error(error);
            setStatus({
                success: false,
                text: "Terjadi kesalahan koneksi server."
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Column (Left 7 columns) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center">
                        <Bell className="w-5 h-5 animate-bounce" />
                    </div>
                    <div>
                        <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">Formulir Push Broadcast</h2>
                        <p className="text-xs text-slate-400 font-medium">Tulis pesan yang ingin Anda kirimkan ke HP/Laptop pelanggan.</p>
                    </div>
                </div>

                {status && (
                    <div className={`p-4 rounded-2xl flex items-start gap-3 border text-sm font-semibold ${
                        status.success 
                            ? "bg-emerald-50 border-emerald-100 text-emerald-700" 
                            : "bg-rose-50 border-rose-100 text-rose-700"
                    }`}>
                        {status.success ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <AlertTriangle className="w-5 h-5 flex-shrink-0" />}
                        <span>{status.text}</span>
                    </div>
                )}

                <form onSubmit={handleSend} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Judul Notifikasi</label>
                        <input
                            type="text"
                            required
                            maxLength={50}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Contoh: PROMO SPESIAL!"
                            className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-sky-500 transition text-slate-700 font-semibold text-sm"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Isi Pesan Notifikasi</label>
                        <textarea
                            required
                            maxLength={150}
                            rows={3}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tulis detail promosi yang menarik..."
                            className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-sky-500 transition text-slate-700 font-medium text-sm resize-none"
                        />
                        <div className="flex justify-end">
                            <span className="text-[10px] text-slate-400 font-bold">{message.length}/150 karakter</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Tautan Tujuan (URL)</label>
                        <input
                            type="text"
                            required
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Contoh: /#katalog atau link tema spesifik"
                            className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-sky-500 transition text-slate-700 font-semibold text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || initialSubscribers === 0}
                        className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg hover:bg-sky-500 hover:shadow-sky-500/10 transition duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:hover:bg-slate-900 disabled:pointer-events-none"
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Sedang Mengirim...
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                Kirim Broadcast Sekarang
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Live Preview & Stats (Right 5 columns) */}
            <div className="lg:col-span-5 space-y-6">
                {/* Stats Card */}
                <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0 animate-pulse">
                        <Sparkles className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Pelanggan Aktif</p>
                        <h3 className="text-2xl font-black text-white mt-0.5">
                            {initialSubscribers} <span className="text-xs font-semibold text-slate-400">perangkat</span>
                        </h3>
                    </div>
                </div>

                {/* Device Preview */}
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 shadow-inner space-y-6">
                    <div className="flex justify-between items-center">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                            <Monitor className="w-3.5 h-3.5" /> Pratinjau Tampilan
                        </h4>
                        <span className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded text-[9px] font-bold uppercase">
                            SmartPhone
                        </span>
                    </div>

                    {/* Smartphone Notification container */}
                    <div className="relative mx-auto max-w-[280px] h-[480px] bg-slate-900 border-8 border-slate-950 rounded-[40px] shadow-2xl overflow-hidden flex flex-col justify-start p-3 pt-6 bg-cover bg-center"
                         style={{ backgroundImage: 'radial-gradient(circle, rgba(15,23,42,1) 0%, rgba(2,6,23,1) 100%)' }}
                    >
                        {/* Speaker & camera dynamic island notch */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-20 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-slate-800 rounded-full ml-auto mr-4" />
                        </div>

                        {/* Push Notification Card */}
                        <div className="mt-8 w-full bg-slate-950/70 border border-white/5 backdrop-blur-md rounded-2xl p-3 shadow-lg space-y-1.5 animate-pulse">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 rounded-md bg-white flex items-center justify-center text-[10px] font-black text-slate-950">
                                        F
                                    </div>
                                    <span className="text-[10px] font-black text-white tracking-wide uppercase">FikaDigi</span>
                                </div>
                                <span className="text-[9px] text-slate-500 font-bold">Sekarang</span>
                            </div>
                            <div className="space-y-0.5">
                                <h5 className="text-[11px] font-extrabold text-white line-clamp-1">
                                    {title || "JUDUL PUSH NOTIFIKASI"}
                                </h5>
                                <p className="text-[10px] text-slate-400 leading-normal line-clamp-3">
                                    {message || "Detail deskripsi pesan promo yang dikirimkan..."}
                                </p>
                            </div>
                        </div>

                        {/* Lockscreen clock helper */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none opacity-20">
                            <p className="text-2xl font-black text-white">09:41</p>
                            <p className="text-[9px] text-slate-400 font-bold">Rabu, 20 Mei</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
