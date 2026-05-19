"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA({ waNumber }: { waNumber: string }) {
    return (
        <section className="pt-16 pb-12 px-5 bg-[#0B0F19] relative overflow-hidden border-b border-white/5">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-sky-900/20 blur-[120px] rounded-full pointer-events-none" />
            
            {/* Delicate Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
            />

            <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-xs font-semibold text-sky-400 tracking-widest uppercase mb-8"
                >
                    <Sparkles className="w-4 h-4" />
                    Mari Mulai Perjalanan Anda
                </motion.div>

                <h2 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-white mb-4 sm:mb-8 tracking-tighter leading-tight max-w-4xl">
                    Siap membuat undangan <br className="hidden md:block" />
                    yang <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 italic font-serif font-medium">tak terlupakan?</span>
                </h2>

                <p className="text-gray-400 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed font-light">
                    Bergabunglah dengan ribuan pasangan yang telah mempercayakan momen bahagia mereka bersama FikaDigi. Praktis, elegan, dan siap disebarkan.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                    <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={`https://wa.me/${waNumber}?text=Halo%20FikaDigi%2C%20saya%20siap%20memesan%20undangan%20digital!`}
                        target="_blank"
                        className="group flex items-center justify-center gap-2 px-10 py-5 bg-sky-500 text-white text-base font-bold rounded-2xl hover:bg-sky-400 transition-colors shadow-[0_0_30px_rgba(14,165,233,0.3)] w-full sm:w-auto"
                    >
                        Pesan Sekarang
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                    <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href="/#katalog"
                        className="px-10 py-5 bg-white/5 border border-white/10 text-white text-base font-medium rounded-2xl hover:bg-white/10 transition-colors w-full sm:w-auto text-center"
                    >
                        Jelajahi Katalog
                    </motion.a>
                </div>
            </div>
        </section>
    );
}
