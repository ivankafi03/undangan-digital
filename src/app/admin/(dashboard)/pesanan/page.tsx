import prisma from "@/lib/prisma";
import { updateOrderStatus, deleteOrder } from "@/app/actions/pesanan";
import { Trash2, CheckCircle, Clock, Search, Package, ArrowRight } from "lucide-react";

export default async function AdminPesananPage() {
    const orders = await prisma.order.findMany({
        include: { tema: true },
        orderBy: { createdAt: "desc" },
    });

    const formatPrice = (price: number) =>
        new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price);

    const formatDate = (date: Date) =>
        new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(date);

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Manajemen Pesanan</h1>
                    <p className="text-slate-500 mt-2 font-medium">Lacak dan kelola pesanan pelanggan yang masuk.</p>
                </div>
            </div>

            <div className="bg-white rounded-[3rem] shadow-soft overflow-hidden border border-slate-100">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-50">
                                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Tanggal & ID</th>
                                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Pelanggan</th>
                                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Tema & Harga</th>
                                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="px-10 py-6">
                                        <div className="font-bold text-slate-900">ORD-{order.id.toString().padStart(4, '0')}</div>
                                        <div className="text-xs text-slate-500 mt-1">{formatDate(order.createdAt)}</div>
                                    </td>
                                    <td className="px-10 py-6">
                                        <div className="font-black text-slate-900">{order.nama_pelanggan}</div>
                                        {order.no_wa && (
                                            <a
                                                href={`https://wa.me/${order.no_wa.replace(/^0/, '62')}`}
                                                target="_blank"
                                                className="text-xs text-green-600 font-bold hover:underline mt-1 inline-block"
                                            >
                                                {order.no_wa}
                                            </a>
                                        )}
                                    </td>
                                    <td className="px-10 py-6">
                                        <div className="font-bold text-slate-900 flex items-center gap-2">
                                            {order.tema ? order.tema.nama_tema : <span className="text-slate-400 italic">Tema Dihapus</span>}
                                        </div>
                                        <div className="text-xs text-slate-500 mt-1">{formatPrice(order.harga)}</div>
                                    </td>
                                    <td className="px-10 py-6">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1.5 ${
                                            order.status === "Pending" ? "bg-amber-100 text-amber-700" :
                                            order.status === "Diproses" ? "bg-blue-100 text-blue-700" :
                                            "bg-emerald-100 text-emerald-700"
                                        }`}>
                                            {order.status === "Pending" && <Clock className="w-3 h-3" />}
                                            {order.status === "Diproses" && <Package className="w-3 h-3" />}
                                            {order.status === "Selesai" && <CheckCircle className="w-3 h-3" />}
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-10 py-6">
                                        <div className="flex gap-2 justify-end items-center">
                                            {order.status === "Pending" && (
                                                <form action={updateOrderStatus.bind(null, order.id, "Diproses")}>
                                                    <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm text-xs font-bold flex items-center gap-1">
                                                        Proses <ArrowRight className="w-3 h-3" />
                                                    </button>
                                                </form>
                                            )}
                                            {order.status === "Diproses" && (
                                                <form action={updateOrderStatus.bind(null, order.id, "Selesai")}>
                                                    <button className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm text-xs font-bold flex items-center gap-1">
                                                        Selesai <CheckCircle className="w-3 h-3" />
                                                    </button>
                                                </form>
                                            )}
                                            <form action={deleteOrder.bind(null, order.id)}>
                                                <button className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-10 py-32 text-center text-slate-300">
                                        <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
                                        <p className="font-black uppercase tracking-[0.2em] text-xs">Belum Ada Pesanan</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
