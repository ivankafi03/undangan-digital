import prisma from "@/lib/prisma";
import { savePromo, deletePromo } from "@/app/actions/admin";
import { Trash2, Image as ImageIcon, Plus, Upload } from "lucide-react";

export default async function PromoPage() {
    const promos = await prisma.promo.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-6 sm:space-y-10 pb-20">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter">Manajemen Promo</h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">Banner promo yang muncul di halaman depan.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl sm:rounded-[2rem] shadow-xl p-6 sm:p-8 border border-slate-100 sticky top-10">
                        <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                            <Plus className="w-5 h-5" />
                            Tambah Promo
                        </h2>
                        <form action={savePromo} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1 text-slate-400">Pilih File Gambar</label>
                                <div className="relative group border-2 border-dashed border-slate-200 rounded-2xl p-4 hover:border-purple-400 transition-all text-center">
                                    <input
                                        type="file"
                                        name="gambar_file"
                                        accept="image/*"
                                        required
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <div className="flex flex-col items-center gap-2">
                                        <Upload className="w-8 h-8 text-slate-300 group-hover:text-purple-500 transition" />
                                        <span className="text-xs font-bold text-slate-400 group-hover:text-purple-600 transition">Klik untuk upload gambar</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Keterangan (Opsional)</label>
                                <textarea
                                    name="keterangan"
                                    placeholder="Promo Diskon 50%..."
                                    className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-purple-500 transition-all text-slate-700 font-medium h-24 resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg hover:bg-slate-800 transition transform hover:-translate-y-0.5"
                            >
                                Simpan Promo
                            </button>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    {promos.map((promo) => (
                        <div key={promo.id} className="bg-white rounded-2xl sm:rounded-[2rem] shadow-lg overflow-hidden border border-slate-100 flex flex-col sm:flex-row group h-auto sm:h-48">
                            <div className="w-full sm:w-1/3 h-48 sm:h-auto relative">
                                <img
                                    src={`/storage/${promo.gambar}`}
                                    alt={promo.keterangan || "Promo"}
                                    className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="w-full sm:w-2/3 p-5 sm:p-8 flex flex-col justify-between gap-4">
                                <div>
                                    <h3 className="text-base sm:text-xl font-bold text-slate-900 mb-1.5 sm:mb-2 line-clamp-2">{promo.keterangan || "Tanpa Keterangan"}</h3>
                                    <p className="text-slate-400 text-[10px] sm:text-xs flex items-center gap-1">
                                        <ImageIcon className="w-3.5 h-3.5" />
                                        {promo.gambar}
                                    </p>
                                </div>
                                <div className="flex justify-end">
                                    <form action={deletePromo.bind(null, promo.id)} className="w-full sm:w-auto">
                                        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition font-bold text-sm">
                                            <Trash2 className="w-4 h-4" />
                                            Hapus
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ))}
                    {promos.length === 0 && (
                        <div className="bg-white rounded-2xl sm:rounded-[2rem] border-2 border-dashed border-slate-200 p-12 sm:p-20 text-center text-slate-400 text-sm sm:text-base">
                            Belum ada promo yang aktif.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
