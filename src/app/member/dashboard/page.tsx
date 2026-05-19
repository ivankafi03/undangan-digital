import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, Clock, CheckCircle2, ChevronRight, LogOut, ArrowLeft } from "lucide-react";
import { logoutMember } from "@/app/actions/member";

export default async function MemberDashboard() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("member_session")?.value;

    if (!userId) {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            orders: {
                include: {
                    tema: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    });

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
                <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm hover:scale-105 transition-transform">
                            F
                        </Link>
                        <div>
                            <h1 className="font-bold text-gray-900 leading-tight">Member Dashboard</h1>
                            <p className="text-xs text-gray-500">Halo, {user.name}</p>
                        </div>
                    </div>
                    
                    <form action={logoutMember}>
                        <button type="submit" className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Keluar</span>
                        </button>
                    </form>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-5 py-10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-extrabold text-gray-900">Pesanan Saya</h2>
                        <p className="text-sm text-gray-500 mt-1">Lacak status pesanan undangan digital Anda di sini.</p>
                    </div>
                    <Link href="/#katalog" className="inline-flex items-center gap-2 bg-sky-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-sky-600 transition-colors">
                        Buat Pesanan Baru
                    </Link>
                </div>

                {user.orders.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Package className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Belum ada pesanan</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">Anda belum pernah memesan tema undangan. Silakan telusuri katalog kami untuk menemukan tema impian Anda.</p>
                        <Link href="/#katalog" className="inline-flex items-center gap-2 text-sky-500 font-bold hover:underline">
                            Lihat Katalog Tema <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {user.orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex flex-col sm:flex-row gap-6 items-start sm:items-center hover:border-sky-100 transition-colors">
                                <div className="w-full sm:w-32 aspect-[3/4] sm:aspect-square rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 relative">
                                    <img src={order.tema.gambar.startsWith('http') ? order.tema.gambar : `/storage/${order.tema.gambar}`} alt={order.tema.nama_tema} className="w-full h-full object-cover" />
                                </div>
                                
                                <div className="flex-1 w-full">
                                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                                        <div>
                                            <p className="text-xs font-bold tracking-wider text-sky-500 uppercase mb-1">ID Pesanan: #{order.id}</p>
                                            <h3 className="text-xl font-bold text-gray-900">{order.tema.nama_tema}</h3>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                                            order.status === 'Selesai' ? 'bg-green-50 text-green-600 border border-green-100' : 
                                            order.status === 'Diproses' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 
                                            'bg-orange-50 text-orange-600 border border-orange-100'
                                        }`}>
                                            {order.status === 'Selesai' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                                            {order.status}
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 mt-4 pt-4 border-t border-gray-50">
                                        <div>
                                            <p className="text-xs text-gray-500 mb-0.5">Tanggal Pesan</p>
                                            <p className="text-sm font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-0.5">Total Harga</p>
                                            <p className="text-sm font-bold text-gray-900">Rp {order.harga.toLocaleString('id-ID')}</p>
                                        </div>
                                    </div>

                                    {order.status === 'Selesai' && order.tema.link_demo && (
                                        <div className="mt-5">
                                            <a href={order.tema.link_demo} target="_blank" className="inline-block w-full sm:w-auto text-center bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-800 transition-colors">
                                                Lihat Undangan Anda
                                            </a>
                                            <p className="text-xs text-gray-500 mt-2">* Tautan di atas adalah simulasi (demo). Hubungi admin jika ada revisi.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
