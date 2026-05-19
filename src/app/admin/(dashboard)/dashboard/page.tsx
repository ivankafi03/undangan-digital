import prisma from "@/lib/prisma";
import Link from "next/link";
import { Edit2, Trash2, Plus, Sparkles, TrendingUp, ShoppingBag, LayoutTemplate, Users, Eye, ArrowRight, MessageCircle } from "lucide-react";
import { deleteTema } from "@/app/actions/tema";
import TrafficChart from "@/components/admin/TrafficChart";

export const dynamic = "force-dynamic";

function formatPrice(price: number) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price);
}

export default async function AdminDashboard() {
    const temas = await prisma.tema.findMany({
        orderBy: { createdAt: "desc" },
    });

    const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        include: { tema: true }
    });

    // 5 Recent Orders
    const recentOrders = orders.slice(0, 5);
    
    const totalTema = temas.length;
    const totalPesanan = orders.length;
    const estimasiPendapatan = orders
        .filter(o => o.status === "Selesai")
        .reduce((sum, order) => sum + order.harga, 0);

    // Calculate Traffic visits for last 7 days
    const last7DaysData = [];
    const today = new Date();
    
    // Fetch visits from db
    const visits = await prisma.pageVisit.findMany({
        orderBy: { date: "asc" },
        take: 30
    });

    const visitsMap = new Map(visits.map(v => [v.date, v.count]));

    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        const dateStr = d.toISOString().split("T")[0];
        last7DaysData.push({
            date: dateStr,
            count: visitsMap.get(dateStr) || 0
        });
    }

    const totalViews = visits.reduce((sum, v) => sum + v.count, 0);
    const todayViews = visitsMap.get(today.toISOString().split("T")[0]) || 0;

    return (
        <div className="space-y-8 sm:space-y-12 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Dashboard Utama</h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">Ringkasan analitik kunjungan, penjualan, dan katalog tema.</p>
                </div>
                <Link
                    href="/admin/tambah"
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 text-white rounded-2xl font-bold shadow-lg hover:bg-blue-600 hover:shadow-blue-500/10 transition-all text-sm transform hover:-translate-y-0.5"
                >
                    <Plus className="w-4 h-4" strokeWidth={3} />
                    Tambah Tema Baru
                </Link>
            </div>

            {/* Statistik Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                {/* Total Tema */}
                <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3 sm:gap-5 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center flex-shrink-0">
                        <LayoutTemplate className="w-5 h-5 sm:w-7 sm:h-7" />
                    </div>
                    <div>
                        <p className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Tema</p>
                        <h3 className="text-base sm:text-2xl font-extrabold text-slate-900 mt-0.5">{totalTema}</h3>
                    </div>
                </div>

                {/* Total Pesanan */}
                <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3 sm:gap-5 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center flex-shrink-0">
                        <ShoppingBag className="w-5 h-5 sm:w-7 sm:h-7" />
                    </div>
                    <div>
                        <p className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Pesanan</p>
                        <h3 className="text-base sm:text-2xl font-extrabold text-slate-900 mt-0.5">{totalPesanan}</h3>
                    </div>
                </div>

                {/* Pendapatan Selesai */}
                <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3 sm:gap-5 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-5 h-5 sm:w-7 sm:h-7" />
                    </div>
                    <div>
                        <p className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pendapatan Selesai</p>
                        <h3 className="text-base sm:text-2xl font-extrabold text-slate-900 mt-0.5">{formatPrice(estimasiPendapatan)}</h3>
                    </div>
                </div>

                {/* Total Kunjungan */}
                <div className="bg-white p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3 sm:gap-5 hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center flex-shrink-0">
                        <Eye className="w-5 h-5 sm:w-7 sm:h-7" />
                    </div>
                    <div>
                        <p className="text-[8px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kunjungan Hari Ini</p>
                        <h3 className="text-base sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                            {todayViews} <span className="text-[10px] sm:text-xs font-semibold text-slate-400">({totalViews} total)</span>
                        </h3>
                    </div>
                </div>
            </div>

            {/* Bento Grid: Traffic Chart & Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Traffic Analytics (Left 2 columns) */}
                <div className="lg:col-span-2 bg-white p-4 sm:p-8 rounded-2xl sm:rounded-[2rem] border border-slate-100 shadow-sm space-y-4 sm:space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg sm:text-xl font-bold text-slate-900">Trafik Pengunjung</h3>
                            <p className="text-xs text-slate-400 font-medium">Statistik kunjungan unik dalam 7 hari terakhir.</p>
                        </div>
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
                            Live Counter
                        </span>
                    </div>
                    <TrafficChart data={last7DaysData} />
                </div>

                {/* 5 Recent Orders (Right 1 column) */}
                <div className="bg-white p-4 sm:p-8 rounded-2xl sm:rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Pesanan Terbaru</h3>
                                <p className="text-xs text-slate-400 font-medium">Antrean 5 pesanan masuk terbaru.</p>
                            </div>
                            <Link href="/admin/pesanan" className="text-xs font-bold text-blue-600 hover:text-blue-500 flex items-center gap-1">
                                Lihat Semua <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        {recentOrders.length === 0 ? (
                            <div className="py-12 text-center text-slate-300">
                                <ShoppingBag className="w-10 h-10 mx-auto mb-3 opacity-20" />
                                <p className="text-xs font-bold uppercase tracking-wider">Belum ada pesanan</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {recentOrders.map((order) => (
                                    <div key={order.id} className="flex items-center justify-between p-2.5 sm:p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="min-w-0 flex-1 pr-2 sm:pr-3">
                                            <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">{order.nama_pelanggan}</p>
                                            <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate mt-0.5">{order.tema.nama_tema}</p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <span className={`inline-block px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-bold uppercase tracking-wider ${
                                                order.status === "Selesai" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                                                order.status === "Diproses" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                                                "bg-amber-50 text-amber-600 border border-amber-100"
                                            }`}>
                                                {order.status}
                                            </span>
                                            <p className="text-[10px] sm:text-xs font-extrabold text-slate-800 mt-0.5 sm:mt-1">{formatPrice(order.harga)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Katalog Tema Section */}
            <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">Katalog Tema</h3>
                        <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider">{temas.length} Item</span>
                    </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full">
                    {temas.map((tema) => (
                        <div key={tema.id} className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between w-full">
                            {/* Gambar */}
                            <div className="relative aspect-[4/5] overflow-hidden bg-slate-50 flex-shrink-0">
                                <img
                                    src={tema.gambar.startsWith('http') ? tema.gambar : `/storage/${tema.gambar}`}
                                    alt={tema.nama_tema}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                {tema.harga_diskon && (
                                    <div className="absolute top-1 left-1 sm:top-2 sm:left-2 px-1.5 py-0.5 sm:px-2 sm:py-0.5 bg-red-500 text-white text-[6px] sm:text-[8px] font-bold rounded-full uppercase tracking-wider">
                                        PROMO
                                    </div>
                                )}
                                {/* Aksi Hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2 sm:p-2.5 gap-1.5 sm:gap-2">
                                    <a
                                        href={tema.link_demo}
                                        target="_blank"
                                        className="flex-1 py-1 sm:py-1.5 bg-white text-slate-900 text-[8px] sm:text-[9.5px] font-bold uppercase tracking-wider text-center rounded-lg hover:bg-slate-100 transition-colors"
                                    >
                                        Live Preview
                                    </a>
                                </div>
                            </div>

                            {/* Detail */}
                            <div className="p-2 sm:p-3.5 flex-1 flex flex-col justify-between">
                                <div>
                                    <p className="text-[10px] sm:text-xs font-black text-slate-900 truncate group-hover:text-blue-600 transition-colors">{tema.nama_tema}</p>
                                    <p className="text-[7.5px] sm:text-[8.5px] font-bold text-slate-400 mt-0.5 uppercase tracking-widest">{tema.kategori || "Premium"}</p>
                                </div>
                                
                                <div className="mt-1.5 sm:mt-2">
                                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-1">
                                        <span className="text-[10px] sm:text-xs md:text-sm font-black text-slate-900">{formatPrice(tema.harga_diskon ?? tema.harga_asli)}</span>
                                        {tema.harga_diskon && (
                                            <span className="text-[7.5px] sm:text-[8.5px] md:text-[9.5px] text-slate-400 line-through">{formatPrice(tema.harga_asli)}</span>
                                        )}
                                    </div>

                                    {/* Tombol Aksi Bawah */}
                                    <div className="flex gap-1.5 sm:gap-2 mt-2 sm:mt-3 pt-2 sm:pt-2.5 border-t border-slate-100">
                                        <Link
                                            href={`/admin/edit/${tema.id}`}
                                            className="flex-1 flex items-center justify-center gap-1 py-1 sm:py-1.5 bg-slate-50 text-slate-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all text-[8px] sm:text-[9.5px] font-bold"
                                        >
                                            <Edit2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> <span className="hidden sm:inline">Edit</span>
                                        </Link>
                                        <form action={deleteTema.bind(null, tema.id)} className="flex-1">
                                            <button className="w-full flex items-center justify-center gap-1 py-1 sm:py-1.5 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all text-[8px] sm:text-[9.5px] font-bold">
                                                <Trash2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> <span className="hidden sm:inline">Hapus</span>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {temas.length === 0 && (
                    <div className="bg-white rounded-3xl p-16 sm:p-24 text-center text-slate-300 border border-slate-100">
                        <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 opacity-20" />
                        <p className="font-black uppercase tracking-[0.2em] text-[9px] sm:text-xs">Katalog Masih Kosong</p>
                    </div>
                )}
            </div>
        </div>
    );
}
