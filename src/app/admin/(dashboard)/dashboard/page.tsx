import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
import Link from "next/link";
import { Edit2, Trash2, ExternalLink, Plus, Sparkles, Tag, TrendingUp, ShoppingBag, LayoutTemplate } from "lucide-react";
import { deleteTema } from "@/app/actions/tema";

function formatPrice(price: number) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price);
}

export default async function AdminDashboard() {
    const temas = await prisma.tema.findMany({
        orderBy: { createdAt: "desc" },
    });

    const orders = await prisma.order.findMany();
    
    const totalTema = temas.length;
    const totalPesanan = orders.length;
    const estimasiPendapatan = orders
        .filter(o => o.status === "Selesai")
        .reduce((sum, order) => sum + order.harga, 0);

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Dashboard Admin</h1>
                    <p className="text-slate-500 mt-2 font-medium">Ringkasan aktivitas dan katalog tema undangan digital Anda.</p>
                </div>
                <Link
                    href="/admin/tambah"
                    className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-[1.5rem] font-black shadow-xl hover:bg-sky-500 transition-all transform hover:-translate-y-1"
                >
                    <Plus className="w-5 h-5" strokeWidth={3} />
                    Tambah Tema
                </Link>
            </div>

            {/* Statistik Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center">
                        <LayoutTemplate className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Tema</p>
                        <h3 className="text-3xl font-black text-slate-900">{totalTema}</h3>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center">
                        <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Pesanan</p>
                        <h3 className="text-3xl font-black text-slate-900">{totalPesanan}</h3>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                        <TrendingUp className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Pendapatan Selesai</p>
                        <h3 className="text-3xl font-black text-slate-900">{formatPrice(estimasiPendapatan)}</h3>
                    </div>
                </div>
            </div>

            <div>
                <div className="flex items-center gap-3 mb-8">
                    <h3 className="text-2xl font-bold text-slate-900">Katalog Tema Terbaru</h3>
                    <span className="px-3 py-1 bg-sky-100 text-sky-600 rounded-full text-xs font-bold uppercase tracking-wider">{temas.length} Item</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {temas.map((tema) => (
                        <div key={tema.id} className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
                            {/* Gambar */}
                            <div className="relative aspect-[3/4] overflow-hidden bg-slate-50">
                                <img
                                    src={tema.gambar.startsWith('http') ? tema.gambar : `/storage/${tema.gambar}`}
                                    alt={tema.nama_tema}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                {tema.harga_diskon && (
                                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-red-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                                        PROMO
                                    </div>
                                )}
                                {/* Aksi Hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 gap-2">
                                    <a
                                        href={tema.link_demo}
                                        target="_blank"
                                        className="flex-1 py-2.5 bg-white text-slate-900 text-xs font-bold uppercase tracking-wider text-center rounded-xl hover:bg-slate-100 transition-colors"
                                    >
                                        Preview
                                    </a>
                                </div>
                            </div>

                            {/* Detail */}
                            <div className="p-5">
                                <p className="text-lg font-black text-slate-900 truncate group-hover:text-sky-500 transition-colors">{tema.nama_tema}</p>
                                <p className="text-xs font-bold text-slate-400 mt-0.5 uppercase tracking-widest">{tema.kategori || "Premium"}</p>
                                
                                <div className="flex items-baseline gap-2 mt-3">
                                    <span className="text-base font-black text-slate-900">{formatPrice(tema.harga_diskon ?? tema.harga_asli)}</span>
                                    {tema.harga_diskon && (
                                        <span className="text-xs text-slate-400 line-through">{formatPrice(tema.harga_asli)}</span>
                                    )}
                                </div>

                                {/* Tombol Aksi Bawah */}
                                <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                                    <Link
                                        href={`/admin/edit/${tema.id}`}
                                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-sky-500 hover:text-white transition-all text-xs font-bold"
                                    >
                                        <Edit2 className="w-3.5 h-3.5" /> Edit
                                    </Link>
                                    <form action={deleteTema.bind(null, tema.id)}>
                                        <button className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all text-xs font-bold">
                                            <Trash2 className="w-3.5 h-3.5" /> Hapus
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {temas.length === 0 && (
                    <div className="bg-white rounded-[3rem] p-32 text-center text-slate-300 border border-slate-100">
                        <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p className="font-black uppercase tracking-[0.2em] text-xs">Katalog Masih Kosong</p>
                    </div>
                )}
            </div>
        </div>
    );
}
