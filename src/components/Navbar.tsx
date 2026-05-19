"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";

export default function Navbar({ waNumber }: { waNumber: string }) {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

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

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#F3F4F6]" : "bg-transparent"}`}>
                <div className="max-w-7xl mx-auto px-5 lg:px-8 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-all flex items-center justify-center border border-gray-100">
                            <img 
                                src="/658080585_18042732272580949_1176413146137522839_n.jpg" 
                                alt="FikaDigi Logo" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="font-black text-xl text-[#111111] tracking-tight transition-colors">
                            Fika<span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">Digi</span>
                        </span>
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
                        <button onClick={() => setOpen(!open)} className="md:hidden w-10 h-10 flex items-center justify-center text-[#111111] rounded-full hover:bg-[#F3F4F6] transition-colors">
                            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {open && (
                <div className="fixed inset-0 z-40 bg-white flex flex-col pt-24 px-6 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex flex-col gap-2">
                        {links.map(l => (
                            <a
                                key={l.label}
                                href={l.href}
                                onClick={() => setOpen(false)}
                                className="py-4 text-2xl font-bold text-[#111111] border-b border-[#F3F4F6] flex items-center justify-between group"
                            >
                                {l.label}
                                <span className="text-[#0EA5E9] text-sm opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1">→</span>
                            </a>
                        ))}
                        <a
                            href={`https://wa.me/${waNumber}`}
                            target="_blank"
                            onClick={() => setOpen(false)}
                            className="mt-8 py-4 text-center bg-[#111111] text-white text-base font-medium rounded-full shadow-lg"
                        >
                            Konsultasi via WhatsApp
                        </a>
                    </div>
                </div>
            )}
        </>
    );
}
