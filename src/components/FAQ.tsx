"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    { q: "Berapa lama proses pembuatannya?", a: "Sangat cepat! Undangan Anda siap dalam hitungan jam setelah semua data dikirimkan kepada kami. Sistem otomatis kami memprosesnya seketika." },
    { q: "Apakah bisa revisi?", a: "Tentu bisa. Kami menyediakan revisi tak terbatas untuk detail teks agar hasilnya sempurna sesuai keinginan Anda." },
    { q: "Bagaimana cara menyebarkan undangannya?", a: "Anda akan mendapat tautan eksklusif (contoh: fikadigi.com/nama-pasangan) yang bisa langsung disebar via WhatsApp, Instagram, atau sosmed lainnya dengan preview yang cantik." },
    { q: "Bisa pakai musik sendiri?", a: "Pasti bisa. Anda bebas memilih lagu romantis favorit Anda sebagai latar otomatis saat tamu membuka undangan." },
    { q: "Apakah undangan bisa diakses selamanya?", a: "Ya, link undangan akan tetap aktif selamanya tanpa biaya bulanan. Anda bisa menyimpannya sebagai kenang-kenangan digital perjalanan cinta Anda." },
    { q: "Bagaimana jika ada masalah setelah undangan jadi?", a: "Tim dukungan kami siap membantu Anda kapan saja. Cukup klik tombol WhatsApp, dan kami akan merespons dengan cepat." },
];

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section id="faq" className="py-10 md:py-16 px-5 bg-white relative overflow-hidden">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10 md:mb-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1.2 bg-gray-50 border border-gray-200 rounded-full text-xs font-bold text-gray-500 tracking-widest uppercase mb-4 sm:mb-6"
                    >
                        Pusat Bantuan
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#111111] tracking-tight mb-4 sm:mb-6">
                        Pertanyaan <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 font-serif italic font-medium">Umum</span>
                    </h2>
                    <p className="text-sm sm:text-lg text-gray-500 max-w-xl mx-auto font-light leading-relaxed">
                        Segala hal yang perlu Anda ketahui tentang layanan undangan digital FikaDigi, dijawab dengan jelas dan transparan.
                    </p>
                </div>

                <div className="border-t border-gray-100">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border-b border-gray-100">
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                className="w-full flex items-center justify-between py-4 sm:py-6 text-left group"
                            >
                                <span className={`text-sm sm:text-lg md:text-xl font-semibold transition-colors duration-300 ${open === i ? "text-sky-600" : "text-gray-800 group-hover:text-gray-500"}`}>
                                    {faq.q}
                                </span>
                                <span 
                                    className={`ml-4 flex-shrink-0 transition-transform duration-500 ${open === i ? "rotate-45 text-sky-500" : "text-gray-400 group-hover:text-gray-600"}`}
                                >
                                    <Plus className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                                </span>
                            </button>
                            <AnimatePresence>
                                {open === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <p className="pb-4 sm:pb-8 text-xs sm:text-base md:text-lg text-gray-500 leading-relaxed font-light pr-4 sm:pr-8">
                                            {faq.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
