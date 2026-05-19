"use client";

import { motion } from "framer-motion";
import { Tag, ArrowRight } from "lucide-react";

interface Promo {
    id: number;
    gambar: string;
    keterangan: string | null;
}

export default function PromoSection({ promo, waNumber }: { promo: Promo, waNumber?: string }) {
    if (!promo) return null;

    return (
        <section id="promo" className="py-12 bg-white relative">
            <div className="max-w-6xl mx-auto px-5 lg:px-8">
                <motion.a
                    href={`https://wa.me/${waNumber || "628123456789"}?text=${encodeURIComponent(
                        `Halo FikaDigi, saya ingin mengklaim promo spesial berikut:\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n🎁 KLAIM PROMO\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n✦ Detail: ${promo.keterangan || "Promo Spesial FikaDigi"}\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nMohon arahan selengkapnya ya. Terima kasih!`
                    )}`}
                    target="_blank"
                    className="block group relative rounded-[32px] overflow-hidden shadow-2xl shadow-sky-900/5"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Background Image full cover */}
                    <div className="absolute inset-0 bg-gray-900">
                        <img
                            src={`/storage/${promo.gambar}`}
                            alt="Promo FikaDigi"
                            className="w-full h-full object-cover opacity-80 transform group-hover:scale-105 transition-transform duration-1000"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1513271786634-9273f0525d88?q=80&w=1200&auto=format&fit=crop";
                            }}
                        />
                        {/* Elegant gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19]/90 via-[#0B0F19]/60 to-transparent" />
                    </div>

                    {/* Content over Frosted Glass */}
                    <div className="relative z-10 w-full md:w-3/5 lg:w-1/2 p-8 md:p-16 flex flex-col justify-center min-h-[400px]">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-500/20 backdrop-blur-md border border-sky-400/30 text-sky-300 rounded-full text-xs font-bold tracking-widest uppercase mb-6 self-start shadow-sm"
                        >
                            <Tag className="w-3.5 h-3.5" />
                            Penawaran Terbatas
                        </motion.div>

                        <h3 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight">
                            Wujudkan Impian, <br/>
                            <span className="text-sky-400 font-serif italic font-medium">Lebih Hemat.</span>
                        </h3>

                        <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed font-light">
                            {promo.keterangan || "Klaim harga spesial untuk paket premium kami hari ini. Waktu terbatas, jangan sampai terlewat!"}
                        </p>

                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white text-gray-900 font-bold rounded-xl self-start group-hover:bg-sky-50 transition-colors">
                            Klaim Promo
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </motion.a>
            </div>
        </section>
    );
}
