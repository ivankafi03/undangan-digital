"use client";

import { ArrowRight, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero({ waNumber }: { waNumber: string }) {
    return (
        <section id="home" className="relative pt-20 pb-12 md:pt-28 md:pb-20 overflow-hidden bg-white min-h-[85vh] flex flex-col items-center">
            {/* Elegant Top Glow - High Performance CSS */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100/60 via-transparent to-transparent pointer-events-none" />
            
            <div className="relative max-w-5xl mx-auto px-5 lg:px-8 flex flex-col items-center text-center z-10 w-full mt-2 md:mt-4">
                
                {/* Ultra-minimalist Badge */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAFAFA] border border-gray-200/60 rounded-full mb-8 shadow-sm"
                >
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
                    </span>
                    <span className="text-xs font-semibold text-gray-700 tracking-wide">Generasi Baru Undangan</span>
                </motion.div>

                {/* Monumental Typography (Linear/Vercel Style) */}
                <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold text-[#111111] tracking-tighter mb-4 sm:mb-8 leading-[1.1] sm:leading-[1.05]"
                >
                    Momen Spesial <br className="hidden md:block" />
                    Dalam <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">Satu Sentuhan.</span>
                </motion.h1>

                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-sm sm:text-lg md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-12 font-medium"
                >
                    Platform premium untuk menciptakan undangan pernikahan digital eksklusif. Praktis, indah, dan abadi.
                </motion.p>

                {/* Sleek Minimalist Actions */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mb-10 sm:mb-20"
                >
                    <a
                        href="/#katalog"
                        className="group flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 bg-[#111111] text-white text-sm sm:text-base font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 shadow-xl shadow-gray-200"
                    >
                        Buat Undangan
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                        href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                            "Halo FikaDigi, saya ingin berkonsultasi mengenai pembuatan undangan digital premium. Mohon info selengkapnya ya. Terima kasih!"
                        )}`}
                        target="_blank"
                        className="group flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 bg-white border border-gray-200 text-[#111111] text-sm sm:text-base font-semibold rounded-full hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 shadow-sm"
                    >
                        <PlayCircle className="w-5 h-5 text-sky-500 group-hover:scale-110 transition-transform" />
                        Konsultasi via WA
                    </a>
                </motion.div>

                {/* Grand Showcase Image (Wide format) */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="w-full relative"
                >
                    <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] md:aspect-[21/9] bg-gray-100 rounded-t-2xl sm:rounded-t-[3rem] overflow-hidden border-t-4 sm:border-t-8 border-x-4 sm:border-x-8 border-gray-50 shadow-[0_-20px_60px_-15px_rgba(14,165,233,0.1)]">
                        <img 
                            src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=2000" 
                            alt="FikaDigi Wedding Invitation Theme Showcase"
                            className="w-full h-full object-cover object-center"
                        />
                        {/* Gradient Fade out to blend with the next section */}
                        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />
                        
                        {/* Elegant floating label */}
                        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-4 py-2 sm:px-6 sm:py-3 rounded-full shadow-lg border border-gray-100 z-20 flex items-center gap-2 sm:gap-3 whitespace-nowrap">
                            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500" />
                            <span className="text-[10px] sm:text-sm font-bold text-gray-900 tracking-wide">FikaDigi Wedding Themes</span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
