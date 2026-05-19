import prisma from "@/lib/prisma";
import { updateTema } from "@/app/actions/tema";
import { notFound } from "next/navigation";

export default async function EditTemaPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const tema = await prisma.tema.findUnique({
        where: { id },
    });

    if (!tema) {
        notFound();
    }

    const categories = ["Pernikahan", "Khitan", "Aqiqah", "Ulang Tahun", "Walimatussafar"];

    return (
        <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 pb-20">
            <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter">Edit Tema</h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Perbarui informasi tema undangan digital.</p>
            </div>

            <div className="bg-white rounded-xl sm:rounded-[2rem] shadow-xl p-4 sm:p-10 border border-slate-100">
                <form action={updateTema.bind(null, id)} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Nama Tema</label>
                        <input
                            type="text"
                            name="nama_tema"
                            required
                            defaultValue={tema.nama_tema}
                            className="w-full px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-purple-500 transition-all text-slate-700 font-medium text-sm sm:text-base"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Kategori</label>
                        <select
                            name="kategori"
                            required
                            defaultValue={tema.kategori}
                            className="w-full px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-purple-500 transition-all text-slate-700 font-medium appearance-none bg-white text-sm sm:text-base"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Harga */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Harga Asli (Rp)</label>
                            <input
                                type="number"
                                name="harga_asli"
                                required
                                min="0"
                                defaultValue={tema.harga_asli}
                                className="w-full px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-purple-500 transition-all text-slate-700 font-medium text-sm sm:text-base"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Harga Diskon (Opsional)</label>
                            <input
                                type="number"
                                name="harga_diskon"
                                min="0"
                                defaultValue={tema.harga_diskon ?? ""}
                                placeholder="Kosongkan jika tidak ada"
                                className="w-full px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-purple-500 transition-all text-slate-700 font-medium text-sm sm:text-base"
                            />
                        </div>
                    </div>
                    <p className="text-[10px] sm:text-xs text-slate-400 ml-1">* Kosongkan Harga Diskon jika tidak ada promo.</p>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Link Demo (URL)</label>
                        <input
                            type="url"
                            name="link_demo"
                            required
                            defaultValue={tema.link_demo}
                            className="w-full px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-purple-500 transition-all text-slate-700 font-medium text-sm sm:text-base"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Ganti Gambar (Opsional)</label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-4">
                            <div className="w-20 h-28 rounded-xl overflow-hidden ring-2 ring-slate-100 flex-shrink-0">
                                <img src={tema.gambar.startsWith('http') ? tema.gambar : `/storage/${tema.gambar}`} className="w-full h-full object-cover" alt="Preview" />
                            </div>
                            <div className="flex-grow w-full">
                                <p className="text-xs text-slate-500 mb-2 font-medium">Gambar saat ini: <span className="italic block sm:inline text-slate-400 truncate max-w-xs">{tema.gambar}</span></p>
                                <input
                                    type="file"
                                    name="gambar_file"
                                    accept="image/*"
                                    className="w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                                />
                                <input type="hidden" name="gambar" defaultValue={tema.gambar} />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
                        <a
                            href="/admin/dashboard"
                            className="w-full sm:w-auto text-center px-8 py-3.5 sm:py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition text-sm sm:text-base"
                        >
                            Batal
                        </a>
                        <button
                            type="submit"
                            className="flex-grow py-3.5 sm:py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg hover:bg-slate-800 transition transform hover:-translate-y-0.5 text-sm sm:text-base"
                        >
                            Simpan Perubahan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
