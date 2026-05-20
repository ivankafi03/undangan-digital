"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, MessageSquareText, Send } from "lucide-react";
import AnimatedIllustration from "./AnimatedIllustration";

const steps = [
    { 
        id: 1, 
        title: "Pilih Tema", 
        desc: "Jelajahi koleksi desain eksklusif di katalog kami, lalu pilih yang paling memancarkan pesona Anda.",
        icon: <Search className="w-6 h-6" />,
        image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop"
    },
    { 
        id: 2, 
        title: "Pilih Paket", 
        desc: "Pilih paket yang sesuai dengan kebutuhan dan impian Anda, mulai dari Basic hingga Premium.",
        icon: <Package className="w-6 h-6" />,
        image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop"
    },
    { 
        id: 3, 
        title: "Konfirmasi & Bayar", 
        desc: "Hubungi kami via WhatsApp untuk konfirmasi pesanan dan selesaikan pembayaran dengan aman.",
        icon: <MessageSquareText className="w-6 h-6" />,
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop"
    },
    { 
        id: 4, 
        title: "Terima Undangan", 
        desc: "Undangan digital Anda siap! Langsung bisa disebarkan ke semua tamu istimewa Anda.",
        icon: <Send className="w-6 h-6" />,
        image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop"
    },
];

export default function OrderStep() {
    const [activeStep, setActiveStep] = useState(1);

    return (
        <section id="cara-order" className="py-10 md:py-16 px-5 bg-[#FAFAFA] border-t border-gray-100">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-[#111111] tracking-tight">
                        Cara <span className="text-sky-500 font-serif italic font-medium">Pesan</span>
                    </h2>
                    <p className="text-gray-500 mt-2 sm:mt-4 text-sm sm:text-base max-w-xl mx-auto">4 langkah mudah untuk mewujudkan undangan pernikahan digital impian Anda bersama FikaDigi.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
                    {/* LEFT PANEL: Vertical Stepper */}
                    <div className="w-full lg:w-5/12 flex flex-col relative">
                        {/* Vertical Line */}
                        <div className="absolute left-[27px] top-8 bottom-8 w-[2px] bg-gray-200 z-0 hidden lg:block" />

                        <div className="space-y-2 lg:space-y-0 z-10">
                            {steps.map((step, index) => {
                                const isActive = activeStep === step.id;
                                const isPast = activeStep > step.id;
                                
                                return (
                                    <div 
                                        key={step.id}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => setActiveStep(step.id)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault();
                                                setActiveStep(step.id);
                                            }
                                        }}
                                        style={{ touchAction: "manipulation" }}
                                        className={`relative overflow-hidden flex items-start text-left w-full gap-3 sm:gap-5 p-3 sm:p-4 lg:p-6 rounded-2xl sm:rounded-3xl cursor-pointer select-none active:scale-[0.99] transition-all duration-200 ${
                                            isActive ? "bg-white shadow-xl shadow-sky-500/5 border border-sky-100 scale-[1.02]" : "hover:bg-gray-50"
                                        }`}
                                    >
                                        {/* Background Batik for Active Step Card */}
                                        {isActive && (
                                            <>
                                                <div className="absolute inset-0 z-0 opacity-[0.8] pointer-events-none bg-repeat" style={{ backgroundImage: "url('/batik-complex.svg')" }} />
                                                <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/80 to-transparent z-0"></div>
                                            </>
                                        )}

                                        <div className={`w-9 h-9 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 border-2 sm:border-4 border-[#FAFAFA] transition-colors duration-500 z-10 ${
                                            isActive ? "bg-sky-500 text-white shadow-md shadow-sky-500/30" : 
                                            isPast ? "bg-gray-900 text-white" : "bg-white text-gray-400 border-gray-100"
                                        }`}>
                                            <span className="text-sm sm:text-lg font-bold">{step.id}</span>
                                        </div>
                                        
                                        <div className="pt-1 sm:pt-2 z-10 relative flex-1">
                                            <h3 className={`text-sm sm:text-xl font-bold mb-1 sm:mb-2 transition-colors ${isActive ? "text-gray-900" : "text-gray-500"}`}>
                                                {step.title}
                                            </h3>
                                            <AnimatePresence>
                                                {isActive && (
                                                    <motion.p 
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                                        style={{ willChange: "height, opacity" }}
                                                        className="text-gray-500 text-xs sm:text-sm leading-relaxed"
                                                    >
                                                        {step.desc}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT PANEL: Detail Card */}
                    <div className="w-full lg:w-7/12 sticky top-24">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                                className="bg-white rounded-2xl sm:rounded-[2.5rem] p-5 sm:p-8 md:p-10 border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden relative group"
                            >
                                {/* Background Batik Pattern */}
                                <div className="absolute inset-0 z-0 opacity-[0.8] bg-repeat" style={{ backgroundImage: "url('/batik-complex.svg')" }}></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/60 to-transparent z-0"></div>

                                <div className="relative z-10">
                                    <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center mb-4 sm:mb-8 shadow-inner [&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-8 sm:[&>svg]:h-8">
                                        {steps[activeStep - 1].icon}
                                    </div>
                                    
                                    <h3 className="text-lg sm:text-3xl font-extrabold text-gray-900 mb-2 sm:mb-4">
                                        Langkah {activeStep}: {steps[activeStep - 1].title}
                                    </h3>
                                    
                                    <p className="text-gray-600 text-xs sm:text-lg leading-relaxed mb-4 sm:mb-8">
                                        {steps[activeStep - 1].desc}
                                    </p>

                                    <div className="w-full mt-4 flex justify-center bg-gray-50/50 rounded-xl sm:rounded-3xl p-3 sm:p-6 border border-gray-100 shadow-inner">
                                        <AnimatedIllustration step={activeStep} />
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
