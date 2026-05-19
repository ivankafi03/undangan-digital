"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, CheckCircle } from "lucide-react";

const fakeOrders = [
    { name: "Budi & Susi", theme: "Royal Rose", time: "2 menit yang lalu" },
    { name: "Arif & Anisa", theme: "Clean Vista", time: "5 menit yang lalu" },
    { name: "Rizky & Dinda", theme: "Gold Luxury", time: "10 menit yang lalu" },
    { name: "Daffa & Syifa", theme: "Pink Dream", time: "1 jam yang lalu" },
    { name: "Kevin & Tasya", theme: "Midnight Star", time: "30 detik yang lalu" },
];

export default function SocialProof() {
    const [currentOrder, setCurrentOrder] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let hideTimeout: NodeJS.Timeout;
        const showInterval = setInterval(() => {
            setVisible(true);
            hideTimeout = setTimeout(() => setVisible(false), 5000); // Show for 5 seconds
            setCurrentOrder((prev) => (prev + 1) % fakeOrders.length);
        }, 15000); // Every 15 seconds

        return () => {
            clearInterval(showInterval);
            if (hideTimeout) clearTimeout(hideTimeout);
        };
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, x: -50, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.8 }}
                    className="fixed bottom-24 left-6 z-[200] hidden md:block" // Hidden on mobile to avoid clutter
                >
                    <div className="bg-white/80 backdrop-blur-2xl border border-black/5 p-4 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] flex items-center gap-4 min-w-[280px]">
                        <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white shrink-0">
                            <ShoppingBag className="w-5 h-5" />
                        </div>
                        <div className="flex-grow">
                            <div className="flex items-center gap-2">
                                <p className="text-[10px] font-black uppercase tracking-widest text-black leading-none">Pesanan Masuk</p>
                                <CheckCircle className="w-3 h-3 text-green-500" />
                            </div>
                            <p className="text-sm font-bold text-slate-800 mt-1">
                                {fakeOrders[currentOrder].name} <span className="font-normal opacity-60">baru saja pesan tema</span> {fakeOrders[currentOrder].theme}
                            </p>
                            <p className="text-[10px] text-slate-400 mt-1 font-medium">{fakeOrders[currentOrder].time}</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
