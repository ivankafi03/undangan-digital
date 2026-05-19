"use client";

import { LayoutDashboard, ShoppingBag, FileText, Image, Bell, Settings, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const navItems = [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Pesanan", href: "/admin/pesanan", icon: ShoppingBag },
        { name: "Tambah", href: "/admin/tambah", icon: FileText },
        { name: "Promo", href: "/admin/promo", icon: Image },
        { name: "Broadcast", href: "/admin/broadcast", icon: Bell },
        { name: "Setelan", href: "/admin/setting", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900 flex flex-col pb-28">
            {/* Unified Top Header Bar */}
            <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl overflow-hidden shadow-md flex items-center justify-center border border-slate-100 flex-shrink-0 bg-slate-50">
                        <img 
                            src="/658080585_18042732272580949_1176413146137522839_n.jpg" 
                            alt="FikaDigi Logo" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="text-xl font-black text-slate-900 tracking-tighter">
                        Fika<span className="text-sky-500">Digi</span> 
                        <span className="ml-2 px-2 py-0.5 bg-slate-100 text-slate-500 text-[9px] font-extrabold rounded-md uppercase tracking-wider border border-slate-200/50">Admin</span>
                    </span>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl border border-slate-100">
                        <User className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-extrabold text-slate-600">Administrator</span>
                    </div>
                    
                    <form action={logout}>
                        <button className="flex items-center gap-1.5 px-3 py-2 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition duration-300 rounded-xl font-bold text-xs shadow-sm">
                            <LogOut className="w-3.5 h-3.5" />
                            <span className="hidden xs:inline">Keluar</span>
                        </button>
                    </form>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-grow p-4 sm:p-8 lg:p-12 w-full">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>

            {/* Premium Floating Bottom Navigation Dock */}
            <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] max-w-[480px]">
                <nav className="bg-slate-950/95 text-white backdrop-blur-md px-1.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl border border-slate-800 shadow-[0_15px_40px_rgba(0,0,0,0.35)] flex items-center justify-around gap-0.5">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.name === "Dashboard" && pathname === "/admin");
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex flex-col items-center justify-center py-1 px-1 sm:px-2.5 rounded-xl transition-all duration-300 flex-1 min-w-0 ${
                                    isActive
                                        ? "text-sky-400 scale-105"
                                        : "text-slate-400 hover:text-white"
                                }`}
                            >
                                <item.icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform flex-shrink-0 ${isActive ? "stroke-[2.5px]" : "stroke-[2px]"}`} />
                                <span className="text-[7.5px] min-[360px]:text-[8.5px] sm:text-[9.5px] font-bold mt-1 tracking-tighter truncate max-w-full text-center block whitespace-nowrap">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
