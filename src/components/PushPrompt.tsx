"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { registerAndSubscribe, getActiveSubscription } from "@/lib/push";

export default function PushPrompt() {
    const [isVisible, setIsVisible] = useState(false);
    const [status, setStatus] = useState<"prompt" | "loading" | "success" | "denied">("prompt");

    useEffect(() => {
        // 1. Check if user already dismissed it this session
        const dismissed = sessionStorage.getItem("push_prompt_dismissed");
        if (dismissed === "true") return;

        // 2. Check if push is supported & user is already subscribed
        if (typeof window !== "undefined" && "Notification" in window) {
            if (Notification.permission === "granted") {
                // Already granted, no need to show prompt
                return;
            }
            if (Notification.permission === "denied") {
                // Denied, no need to show prompt
                return;
            }
        } else {
            // Push not supported
            return;
        }

        // 3. Slide in after 5 seconds
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleSubscribe = async () => {
        setStatus("loading");
        try {
            // Request native browser permission
            const permission = await Notification.requestPermission();
            
            if (permission === "granted") {
                // Register Service Worker & get subscription object
                const subscription = await registerAndSubscribe();
                
                if (subscription) {
                    // Send to backend database
                    const res = await fetch("/api/push/subscribe", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(subscription),
                    });

                    if (res.ok) {
                        setStatus("success");
                        // Automatically fade out after 3 seconds on success
                        setTimeout(() => {
                            setIsVisible(false);
                        }, 3000);
                        return;
                    }
                }
            } else if (permission === "denied") {
                setStatus("denied");
                sessionStorage.setItem("push_prompt_dismissed", "true");
                setTimeout(() => {
                    setIsVisible(false);
                }, 3000);
                return;
            }
            
            setStatus("prompt");
        } catch (error) {
            console.error("Failed to subscribe:", error);
            setStatus("prompt");
        }
    };

    const handleDismiss = () => {
        setIsVisible(false);
        sessionStorage.setItem("push_prompt_dismissed", "true");
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 30, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-6 right-6 z-50 w-full max-w-[360px] p-5 rounded-3xl bg-slate-900/95 text-white border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-md"
                >
                    {/* Close Button */}
                    <button 
                        onClick={handleDismiss}
                        className="absolute top-4 right-4 text-slate-500 hover:text-white transition"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    {status === "prompt" && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0 animate-pulse">
                                    <Bell className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-sky-400 uppercase tracking-widest">
                                        <Sparkles className="w-3 h-3" /> Info Promo
                                    </span>
                                    <h4 className="text-sm font-extrabold tracking-tight">Aktifkan Notifikasi?</h4>
                                </div>
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Dapatkan info rilis tema undangan digital terbaru, diskon kilat, dan promo eksklusif gratis langsung di layar HP/Laptop Anda!
                            </p>
                            <div className="flex gap-2.5 pt-1">
                                <button
                                    onClick={handleDismiss}
                                    className="flex-1 py-2.5 px-4 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition"
                                >
                                    Nanti Saja
                                </button>
                                <button
                                    onClick={handleSubscribe}
                                    className="flex-1 py-2.5 px-4 bg-sky-500 text-white rounded-xl text-xs font-bold hover:bg-sky-400 transition shadow-[0_0_20px_rgba(14,165,233,0.3)]"
                                >
                                    Terima
                                </button>
                            </div>
                        </div>
                    )}

                    {status === "loading" && (
                        <div className="py-6 flex flex-col items-center justify-center gap-3 text-center">
                            <div className="w-10 h-10 rounded-full border-2 border-slate-800 border-t-sky-400 animate-spin" />
                            <p className="text-xs font-bold text-slate-300">Menghubungkan ke browser...</p>
                            <p className="text-[10px] text-slate-500">Silakan klik "Allow/Izinkan" pada dialog browser Anda.</p>
                        </div>
                    )}

                    {status === "success" && (
                        <div className="py-4 flex flex-col items-center justify-center gap-3 text-center">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                <Bell className="w-6 h-6 animate-bounce" />
                            </div>
                            <h4 className="text-sm font-extrabold text-emerald-400">🎉 Notifikasi Aktif!</h4>
                            <p className="text-xs text-slate-400 leading-relaxed max-w-[220px]">
                                Terima kasih! Anda akan menerima update promo langsung di perangkat ini.
                            </p>
                        </div>
                    )}

                    {status === "denied" && (
                        <div className="py-4 flex flex-col items-center justify-center gap-3 text-center">
                            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
                                <BellOff className="w-6 h-6" />
                            </div>
                            <h4 className="text-sm font-extrabold text-rose-400">Izin Ditolak</h4>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Anda menolak izin notifikasi. Anda dapat mengaktifkannya kapan saja lewat pengaturan gembok browser.
                            </p>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
