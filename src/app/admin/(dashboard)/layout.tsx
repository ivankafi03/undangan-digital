"use client";

import { Sidebar } from "@/components/admin/Sidebar";
import { LogOut, User, Menu, X } from "lucide-react";
import Link from "next/link";
import { logout } from "@/app/actions/auth";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
            {/* Top Bar for Mobile & Tablet */}
            <header className="lg:hidden flex items-center justify-between bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-40 w-full shadow-sm">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-black shadow-md">
                        ✨
                    </div>
                    <span className="text-lg font-black text-slate-900 tracking-tighter">Fika<span className="text-sky-500">Digi</span></span>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 text-slate-500 hover:text-slate-900 transition-colors bg-slate-50 rounded-lg border border-slate-200"
                >
                    <Menu className="w-5 h-5" />
                </button>
            </header>

            {/* Backdrop for Mobile Sidebar */}
            {isSidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-40 transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar (Desktop & Mobile Drawer) */}
            <aside className={`
                w-80 bg-white border-r border-slate-200 flex flex-col fixed lg:sticky top-0 h-screen z-50 transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}>
                {/* Close Button & Header inside Mobile Drawer */}
                <div className="p-8 lg:p-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-sky-200">
                            ✨
                        </div>
                        <span className="text-2xl font-black text-slate-900 tracking-tighter">Fika<span className="text-sky-500">Digi</span></span>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="lg:hidden p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <Sidebar onItemClick={() => setIsSidebarOpen(false)} />

                <div className="mt-auto p-8 lg:p-10 space-y-4">
                    <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-200">
                            <User className="w-5 h-5 text-slate-400" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-900">Admin</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Administrator</p>
                        </div>
                    </div>
                    <form action={logout}>
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition font-bold text-sm">
                            <LogOut className="w-5 h-5" />
                            Keluar Sesi
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-5 sm:p-8 lg:p-12 overflow-y-auto w-full">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
