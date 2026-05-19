import { createTema } from "@/app/actions/tema";

export default function AddTemaPage() {
    const categories = ["Pernikahan", "Khitan", "Aqiqah", "Ulang Tahun", "Walimatussafar"];

    return (
        <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 pb-20">
            <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter">Tambah Tema Baru</h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Lengkapi data di bawah untuk menambah tema ke katalog.</p>
            </div>

            <div className="bg-white rounded-xl sm:rounded-[2rem] shadow-xl p-4 sm:p-10 border border-slate-100">
                <form action={createTema} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Nama Tema</label>
                        <input
                            type="text"
                            name="nama_tema"
                            required
                            placeholder="Contoh: Royal Rose"
                            className="w-full px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-purple-500 transition-all text-slate-700 font-medium text-sm sm:text-base"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Kategori</label>
                        <select
                            name="kategori"
                            required
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
                                placeholder="150000"
                                className="w-full px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-purple-500 transition-all text-slate-700 font-medium text-sm sm:text-base"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">Harga Diskon (Opsional)</label>
                            <input
                                type="number"
                                name="harga_diskon"
                                min="0"
                                placeholder="99000"
                                className="w-full px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-purple-500 transition-all text-slate-700 font-medium text-sm sm:text-base"
                            />
                        </div>
                    </div>
                    <p className="text-[10px] sm:text-xs text-slate-400 ml-1">* Isi Harga Diskon hanya jika tema ini sedang promo.</p>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Link Demo (URL)</label>
                        <input
                            type="url"
                            name="link_demo"
                            required
                            placeholder="https://example.com/demo"
                            className="w-full px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-purple-500 transition-all text-slate-700 font-medium text-sm sm:text-base"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">Upload Gambar Tema</label>
                        <div className="relative group">
                            <input
                                type="file"
                                name="gambar_file"
                                accept="image/*"
                                required
                                className="w-full px-4 py-3 sm:px-6 sm:py-4 rounded-2xl border-2 border-dashed border-slate-200 hover:border-purple-400 focus:outline-none transition-all text-slate-500 font-medium cursor-pointer file:mr-4 file:py-1.5 file:px-3 sm:file:py-2 sm:file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200 text-xs sm:text-sm"
                            />
                        </div>
                        <p className="text-[10px] sm:text-xs text-slate-400 ml-1 italic">* Format: JPG, PNG. Maksimal 2MB.</p>
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
                            Simpan Tema
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
