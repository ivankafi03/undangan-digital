"use client";

import { Instagram, MessageCircle, Mail, Facebook, Youtube, Presentation } from "lucide-react";

export default function Footer({ waNumber, setting }: { waNumber: string, setting: any }) {
    const navLinks = [
        { label: "Beranda", href: "/#home" },
        { label: "Katalog Tema", href: "/#katalog" },
        { label: "Cara Memesan", href: "/#cara-order" },
        { label: "Pertanyaan Umum", href: "/#faq" },
    ];

    const legalLinks = [
        { label: "Syarat & Ketentuan", href: "#" },
        { label: "Kebijakan Privasi", href: "#" },
    ];

    return (
        <footer className="bg-[#0B0F19] pt-16 pb-10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
            />

            <div className="max-w-7xl mx-auto px-5 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-16 pb-16 border-b border-white/5">
                    <div className="max-w-md">
                        <div className="flex items-center gap-2.5 mb-6 group">
                            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md flex items-center justify-center border border-white/10">
                                <img 
                                    src="/658080585_18042732272580949_1176413146137522839_n.jpg" 
                                    alt="FikaDigi Logo" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="font-black text-2xl text-white tracking-tight">
                                Fika<span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">Digi</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-base leading-relaxed mb-8 font-light">
                            Platform pembuatan undangan digital premium yang dirancang untuk mengabadikan setiap detik momen istimewa Anda dengan keanggunan modern.
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                            {setting?.instagram && (
                                <a href={setting.instagram} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-pink-400 hover:border-pink-400/50 hover:bg-pink-500/10 transition-all">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            )}
                            {setting?.facebook && (
                                <a href={setting.facebook} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all">
                                    <Facebook className="w-5 h-5" />
                                </a>
                            )}
                            {setting?.tiktok && (
                                <a href={setting.tiktok} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/50 hover:bg-white/10 transition-all">
                                    <Presentation className="w-5 h-5" />
                                </a>
                            )}
                            {setting?.youtube && (
                                <a href={setting.youtube} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-500/50 hover:bg-red-500/10 transition-all">
                                    <Youtube className="w-5 h-5" />
                                </a>
                            )}
                            <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-green-400 hover:border-green-400/50 hover:bg-green-500/10 transition-all">
                                <MessageCircle className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div className="w-full lg:w-[450px] bg-white/5 p-8 rounded-[32px] border border-white/10 backdrop-blur-sm">
                        <h4 className="text-lg font-bold text-white mb-2">Dapatkan Info Promo Khusus</h4>
                        <p className="text-gray-400 text-sm mb-6 font-light">Berlangganan untuk mendapatkan rilis tema terbaru dan diskon eksklusif.</p>
                        <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
                            <div className="absolute left-4 text-gray-500">
                                <Mail className="w-5 h-5" />
                            </div>
                            <input 
                                type="email" 
                                placeholder="Alamat email Anda" 
                                className="w-full bg-[#0A0E17] border border-white/10 rounded-2xl py-4 pl-12 pr-32 text-sm text-white focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all placeholder:text-gray-600"
                            />
                            <button className="absolute right-2 top-2 bottom-2 bg-sky-500 text-white px-5 rounded-xl text-sm font-bold hover:bg-sky-400 transition-colors flex items-center gap-2">
                                Kirim
                            </button>
                        </form>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap gap-x-8 gap-y-3">
                            {navLinks.map(l => (
                                <a key={l.label} href={l.href} className="text-sm text-gray-300 hover:text-sky-400 font-medium transition-colors">
                                    {l.label}
                                </a>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                            {legalLinks.map(l => (
                                <a key={l.label} href={l.href} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
                                    {l.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="text-left md:text-right">
                        <p className="text-sm font-bold text-white mb-1">Hubungi Kami</p>
                        <a href={`https://wa.me/${waNumber}`} className="text-sky-400 font-medium hover:text-sky-300 transition-colors block mb-1">+{waNumber}</a>
                        {setting?.email && (
                            <a href={`mailto:${setting.email}`} className="text-sm text-gray-500 hover:text-gray-300 transition-colors">{setting.email}</a>
                        )}
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                    <p className="text-xs text-gray-500 font-medium">
                        © {new Date().getFullYear()} FikaDigi. Seluruh hak cipta dilindungi.
                    </p>
                    <p className="text-xs text-gray-500 font-medium flex items-center justify-center gap-1.5">
                        Dibuat dengan <HeartIcon /> untuk momen spesial Anda
                    </p>
                </div>
            </div>
        </footer>
    );
}

function HeartIcon() {
    return (
        <svg className="w-3.5 h-3.5 text-rose-500 fill-rose-500" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
    );
}
