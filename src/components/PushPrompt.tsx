"use client";

import { useEffect, useState } from "react";
import { Bell, BellOff, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { registerAndSubscribe, getActiveSubscription } from "@/lib/push";

export default function PushPrompt() {
    const [isVisible, setIsVisible] = useState(false);
    const [status, setStatus] = useState<"prompt" | "loading" | "success" | "denied">("prompt");

    useEffect(() => {
        // 1. Check if user already dismissed it
        const dismissed = localStorage.getItem("push_prompt_dismissed");
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

        // 3. Slide in after 25 seconds (less intrusive, targeting engaged users)
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 25000);

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
                localStorage.setItem("push_prompt_dismissed", "true");
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
        localStorage.setItem("push_prompt_dismissed", "true");
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 30, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 mx-auto sm:mx-0 z-50 w-[calc(100%-2rem)] sm:w-72 max-w-[290px] p-4 rounded-2xl bg-slate-950/95 text-white border border-slate-800 shadow-[0_15px_40px_rgba(0,0,0,0.4)] backdrop-blur-md"
                >
                    {/* Close Button */}
                    <button 
                        onClick={handleDismiss}
                        className="absolute top-3.5 right-3.5 text-slate-500 hover:text-white transition"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>

                    {status === "prompt" && (
                        <div className="space-y-3">
                            <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-xl bg-sky-50/10 border border-sky-50/20 text-sky-400 flex items-center justify-center flex-shrink-0 animate-pulse">
                                    <Bell className="w-4 h-4" />
                                </div>
                                <div>
                                    <span className="block text-[9px] font-bold text-sky-400 uppercase tracking-wider">
                                        Info & Update
                                    </span>
                                    <h4 className="text-xs font-black tracking-tight">Aktifkan Notifikasi?</h4>
                                </div>
                            </div>
                            <p className="text-[10.5px] text-slate-400 leading-relaxed">
                                Dapatkan info rilis tema terbaru dan kabar update penting langsung di layar perangkat Anda!
                            </p>
                            <div className="flex gap-2 pt-0.5">
                                <button
                                    onClick={handleDismiss}
                                    className="flex-1 py-2 px-3 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold hover:bg-white/10 transition"
                                >
                                    Nanti Saja
                                </button>
                                <button
                                    onClick={handleSubscribe}
                                    className="flex-1 py-2 px-3 bg-sky-500 text-white rounded-lg text-[10px] font-bold hover:bg-sky-400 transition shadow-[0_0_15px_rgba(14,165,233,0.3)]"
                                >
                                    Terima
                                </button>
                            </div>
                        </div>
                    )}

                    {status === "loading" && (
                        <div className="py-4 flex flex-col items-center justify-center gap-2.5 text-center">
                            <div className="w-8 h-8 rounded-full border-2 border-slate-800 border-t-sky-400 animate-spin" />
                            <p className="text-[11px] font-bold text-slate-300">Menghubungkan...</p>
                            <p className="text-[9px] text-slate-500">Silakan klik "Allow/Izinkan" pada dialog browser.</p>
                        </div>
                    )}

                    {status === "success" && (
                        <div className="py-3 flex flex-col items-center justify-center gap-2 text-center">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                <Bell className="w-5 h-5 animate-bounce" />
                            </div>
                            <h4 className="text-xs font-black text-emerald-400">🎉 Notifikasi Aktif!</h4>
                            <p className="text-[10px] text-slate-400 leading-normal max-w-[200px]">
                                Anda akan menerima info promo langsung di perangkat ini.
                            </p>
                        </div>
                    )}

                    {status === "denied" && (
                        <div className="py-3 flex flex-col items-center justify-center gap-2 text-center">
                            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
                                <BellOff className="w-5 h-5" />
                            </div>
                            <h4 className="text-xs font-black text-rose-400">Izin Ditolak</h4>
                            <p className="text-[10px] text-slate-400 leading-normal">
                                Izin notifikasi ditolak. Anda dapat mengaktifkannya via setelan browser.
                            </p>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
