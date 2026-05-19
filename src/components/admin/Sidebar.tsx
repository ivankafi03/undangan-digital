"use client";

import { LayoutDashboard, FileText, Tag, Image, Settings, ExternalLink, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
    const pathname = usePathname();

    const menuItems = [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Pesanan", href: "/admin/pesanan", icon: ShoppingBag },
        { name: "Tambah Tema", href: "/admin/tambah", icon: FileText },
        { name: "Promo", href: "/admin/promo", icon: Image },
        { name: "Pengaturan", href: "/admin/setting", icon: Settings },
    ];

    return (
        <nav className="flex-1 px-10 space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6 ml-1">Main Menu</p>
            {menuItems.map((item) => {
                const isActive = pathname === item.href || (item.name === "Dashboard" && pathname === "/admin");
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all duration-300 ${isActive
                            ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                            : "text-slate-500 hover:bg-slate-50 hover:text-sky-500"
                            }`}
                    >
                        <item.icon className={`w-5 h-5 ${isActive ? "text-sky-500" : ""}`} />
                        {item.name}
                    </Link>
                );
            })}

            <div className="pt-8 opacity-50">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4 ml-1">External</p>
                <a
                    href="/"
                    target="_blank"
                    className="flex items-center gap-4 px-5 py-3 text-slate-400 hover:text-slate-900 transition font-bold text-sm"
                >
                    <ExternalLink className="w-4 h-4" />
                    Lihat Situs
                </a>
            </div>
        </nav>
    );
}
