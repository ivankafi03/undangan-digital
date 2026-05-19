import { Sidebar } from "@/components/admin/Sidebar";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { logout } from "@/app/actions/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
            {/* Sidebar */}
            <aside className="w-80 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
                <div className="p-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-sky-200">
                            ✨
                        </div>
                        <span className="text-2xl font-black text-slate-900 tracking-tighter">Fika<span className="text-sky-500">Digi</span></span>
                    </div>
                </div>

                <Sidebar />

                <div className="mt-auto p-10 space-y-4">
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

            {/* Main Content */}
            <main className="flex-1 p-12 overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
