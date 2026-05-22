"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles, Megaphone, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ waNumber, setting }: { waNumber: string, setting?: any }) {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [logoHovered, setLogoHovered] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const links = [
        { label: "Beranda", href: "/#home" },
        { label: "Katalog", href: "/#katalog" },
        { label: "Cara Order", href: "/#cara-order" },
        { label: "FAQ", href: "/#faq" },
        { label: "Dashboard Member", href: "/member/dashboard" },
    ];

    const showPromo = setting?.showPromo && setting?.promoBanner;

    return (
        <>
            {showPromo && (
                <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-blue-600 to-sky-500 text-white text-xs sm:text-sm font-bold py-2 px-4 text-center shadow-md flex items-center justify-center gap-2">
                    <Megaphone className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse" />
                    <span className="truncate">{setting.promoBanner}</span>
                </div>
            )}

            <nav className={`fixed ${showPromo ? "top-8 sm:top-9" : "top-0"} left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/70 backdrop-blur-xl border-b border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.03)]" : "bg-transparent"}`}>
                <div className="max-w-7xl mx-auto px-5 lg:px-8 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link 
                        href="/" 
                        className="flex items-center group relative"
                    >
                        <motion.div 
                            animate={{ 
                                rotate: scrolled ? 360 : 0,
                                opacity: scrolled ? 0 : 1,
                                width: scrolled ? 0 : 36,
                                height: scrolled ? 0 : 36,
                                scale: scrolled ? 0 : 1,
                                marginRight: scrolled ? 0 : 10
                            }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="w-9 h-9 rounded-xl overflow-hidden shadow-md flex items-center justify-center border border-gray-100 shrink-0"
                        >
                            <img 
                                src="/658080585_18042732272580949_1176413146137522839_n.jpg" 
                                alt="FikaDigi Logo" 
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                        
                        <div className="relative overflow-hidden h-7 flex items-center select-none">
                            <AnimatePresence mode="wait">
                                {!scrolled ? (
                                    <motion.span
                                        key="brand"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -20, opacity: 0 }}
                                        transition={{ duration: 0.35, ease: "easeOut" }}
                                        className="font-black text-xl text-[#111111] tracking-tight whitespace-nowrap block"
                                    >
                                        Fika<span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">Digi</span>
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="tagline"
                                        initial={{ y: -20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: 20, opacity: 0 }}
                                        transition={{ duration: 0.35, ease: "easeOut" }}
                                        className="font-black text-xs xs:text-sm sm:text-base md:text-lg tracking-tight whitespace-nowrap block"
                                    >
                                        <span className="text-[#111111]">Jasa Pembuatan </span>
                                        <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                            Undangan Digital
                                        </span>
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {links.map(l => (
                            <a key={l.label} href={l.href} className="text-sm text-[#4B5563] hover:text-[#0EA5E9] transition-colors font-medium tracking-wide">
                                {l.label}
                            </a>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-4">
                        <a
                            href={`https://wa.me/${waNumber}`}
                            target="_blank"
                            className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 bg-[#111111] text-white text-sm font-medium rounded-full hover:bg-[#222222] transition-colors shadow-md hover:shadow-lg"
                        >
                            Konsultasi Gratis
                        </a>

                        {/* Mobile User Icon & Hamburger aligned closely */}
                        <div className="flex md:hidden items-center gap-1">
                            <Link 
                                href="/member/dashboard" 
                                className="w-10 h-10 flex items-center justify-center text-gray-700 rounded-full hover:bg-gray-100/80 active:scale-90 transition-all duration-200"
                                aria-label="Dashboard Member"
                            >
                                <User className="w-5 h-5" />
                            </Link>

                            <button onClick={() => setOpen(!open)} className="w-10 h-10 flex items-center justify-center text-[#111111] rounded-full hover:bg-gray-100/80 active:scale-90 transition-all duration-200">
                                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {open && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl flex flex-col ${showPromo ? "pt-32" : "pt-24"} px-6 overflow-hidden`}
                    >
                        {/* Background Batik Motif 80% Opacity */}
                        <div className="absolute inset-0 z-0 opacity-[0.8] pointer-events-none bg-repeat" style={{ backgroundImage: "url('/batik-complex.svg')" }} />
                        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white/95 z-0" />

                        <div className="flex flex-col gap-2 relative z-10">
                            {links.map((l, index) => (
                                <motion.a
                                    key={l.label}
                                    href={l.href}
                                    onClick={() => setOpen(false)}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 + 0.1, duration: 0.4, ease: "easeOut" }}
                                    className="py-4 text-2xl font-bold text-[#111111] border-b border-gray-100 flex items-center justify-between group"
                                >
                                    <span className="group-hover:text-sky-500 transition-colors duration-300">{l.label}</span>
                                    <span className="text-[#0EA5E9] text-lg opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 duration-300">→</span>
                                </motion.a>
                            ))}
                            <motion.a
                                href={`https://wa.me/${waNumber}`}
                                target="_blank"
                                onClick={() => setOpen(false)}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: links.length * 0.05 + 0.15, duration: 0.4, type: "spring", stiffness: 200 }}
                                className="mt-8 py-4 text-center bg-gradient-to-r from-sky-500 to-blue-600 text-white text-base font-bold rounded-full shadow-lg shadow-sky-500/20 hover:shadow-sky-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <Sparkles className="w-5 h-5 animate-pulse" />
                                Konsultasi via WhatsApp
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
