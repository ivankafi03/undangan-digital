"use client";

import { useState } from "react";
import { X, Search, ExternalLink, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createOrder } from "@/app/actions/order";

interface Tema {
    id: number;
    nama_tema: string;
    kategori: string;
    gambar: string;
    link_demo: string;
    harga_asli: number;
    harga_diskon: number | null;
}

function formatPrice(price: number) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price);
}

export default function Catalog({ temas, waNumber, setting }: { temas: Tema[], waNumber: string, setting?: any }) {
    const [selected, setSelected] = useState<Tema | null>(null);
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("Semua");
    
    // Sort temas: promo items first, then by whatever order they came in (which is latest first)
    const sortedTemas = [...temas].sort((a, b) => {
        if (a.harga_diskon !== null && b.harga_diskon === null) return -1;
        if (a.harga_diskon === null && b.harga_diskon !== null) return 1;
        return 0;
    });

    // Extract unique categories
    const categories = ["Semua", ...Array.from(new Set(temas.map(t => t.kategori || "Premium")))];

    // Order form state
    const [isOrdering, setIsOrdering] = useState(false);
    const [nama, setNama] = useState("");
    const [noWa, setNoWa] = useState("");
    const [loading, setLoading] = useState(false);

    const filtered = sortedTemas.filter(t => {
        const matchesSearch = t.nama_tema.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = activeCategory === "Semua" || (t.kategori || "Premium") === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const hargaAktif = (tema: Tema) => tema.harga_diskon ?? tema.harga_asli;

    const handleOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selected) return;

        setLoading(true);
        const harga = hargaAktif(selected);
        
        const res = await createOrder({
            nama_pelanggan: nama,
            no_wa: noWa,
            temaId: selected.id,
            harga: harga
        });

        setLoading(false);
        
        if (res.success) {
            const defaultTemplate = `Halo FikaDigi, saya ingin memesan tema undangan digital berikut:\n\n📋 *DETAIL PESANAN*\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n✦ *Tema:* [TEMA]\n✦ *Harga:* [HARGA]\n✦ *Nama Pelanggan:* [NAMA]\n✦ *No. WhatsApp:* [NOWA]\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nMohon info untuk langkah selanjutnya ya. Terima kasih!`;
            
            const rawTemplate = setting?.waTemplate || defaultTemplate;
            const message = rawTemplate
                .replace(/\[TEMA\]/g, selected.nama_tema)
                .replace(/\[HARGA\]/g, formatPrice(harga))
                .replace(/\[NAMA\]/g, nama)
                .replace(/\[NOWA\]/g, noWa);

            const text = encodeURIComponent(message);
            window.open(`https://wa.me/${waNumber}?text=${text}`, "_blank");
            
            setIsOrdering(false);
            setSelected(null);
            setNama("");
            setNoWa("");
        } else {
            alert("Terjadi kesalahan, silakan coba lagi.");
        }
    };

    const handleCloseModal = () => {
        setSelected(null);
        setIsOrdering(false);
        setNama("");
        setNoWa("");
    };
    return (
        <section id="katalog" className="py-16 px-5 bg-[#FAFAFA]">
            <div className="max-w-7xl mx-auto">
                {/* Header & Filters (Centered Apple/Vercel Style) */}
                <div className="flex flex-col items-center mb-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight mb-4">
                        Koleksi <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600 font-serif italic font-medium">Mahakarya</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl text-lg mb-10">
                        Temukan desain yang paling mewakili kisah cinta Anda. Setiap tema dirancang dengan tingkat ketelitian tertinggi.
                    </p>

                    {/* Search Bar */}
                    <div className="w-full max-w-xl relative mb-8 group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-sky-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Cari nama tema..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 bg-white border border-gray-200 rounded-full text-base font-medium focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 shadow-sm transition-all"
                        />
                    </div>

                    {/* Pill Categories */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                                    activeCategory === cat 
                                    ? "bg-[#111111] text-white shadow-md shadow-gray-900/20 scale-105" 
                                    : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300 hover:text-gray-900"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Status bar */}
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200/60">
                    <p className="text-sm font-medium text-gray-500">
                        Menampilkan <span className="text-gray-900 font-bold">{filtered.length}</span> tema elegan
                    </p>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-6 md:gap-8">
                    <AnimatePresence>
                        {filtered.map((tema) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                key={tema.id} 
                                className="group cursor-pointer flex flex-col"
                                onClick={() => setSelected(tema)}
                            >
                                {/* Premium Card Image */}
                                <div className="relative aspect-[4/5] rounded-xl sm:rounded-[2rem] overflow-hidden bg-white shadow-sm border border-gray-100 mb-2 sm:mb-5 group-hover:shadow-xl group-hover:shadow-sky-900/5 transition-all duration-500">
                                    <img
                                        src={tema.gambar.startsWith('http') ? tema.gambar : `/storage/${tema.gambar}`}
                                        alt={tema.nama_tema}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />
                                    {tema.harga_diskon && (
                                        <div className="absolute top-1 right-1 sm:top-4 sm:right-4 px-1.5 py-0.5 sm:px-3 sm:py-1 bg-white/90 backdrop-blur-md text-sky-600 text-[6px] sm:text-[10px] font-black rounded-full uppercase tracking-widest shadow-sm">
                                            Promo
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                                        <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-full text-sm font-semibold tracking-wide flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            Lihat Detail
                                        </div>
                                    </div>
                                </div>

                                {/* Minimalist Typography Info */}
                                <div className="px-1 sm:px-2">
                                    <p className="text-[7px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5 sm:mb-1.5">{tema.kategori}</p>
                                    <h3 className="text-[10px] sm:text-lg font-bold text-gray-900 group-hover:text-sky-500 transition-colors line-clamp-1">{tema.nama_tema}</h3>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-3 mt-0.5 sm:mt-1.5">
                                        <span className="text-[9px] sm:text-base font-bold text-gray-900">{formatPrice(hargaAktif(tema))}</span>
                                        {tema.harga_diskon && (
                                            <span className="text-[7px] sm:text-sm text-gray-400 line-through font-medium">{formatPrice(tema.harga_asli)}</span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filtered.length === 0 && (
                    <div className="py-32 text-center">
                        <div className="w-20 h-20 bg-white border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                            <Search className="w-8 h-8 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Tema Tidak Ditemukan</h3>
                        <p className="text-gray-500">Kami belum memiliki tema dengan kriteria tersebut.</p>
                    </div>
                )}

                {/* MODAL (Refined styling) */}
                <AnimatePresence>
                {selected && (
                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-gray-900/40 backdrop-blur-md"
                        onClick={handleCloseModal}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, type: "spring", damping: 25 }}
                            className="relative bg-[#FAFAFA] w-full max-w-4xl rounded-2xl sm:rounded-[3rem] overflow-hidden flex flex-col md:flex-row max-h-[92vh] sm:max-h-[95vh] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Complex Kawung Batik Watermark (Full Modal) */}
                            <div className="absolute inset-0 z-0 opacity-[0.35] pointer-events-none bg-repeat" style={{ backgroundImage: "url('/batik-complex.svg')" }} />

                            {/* Modal Image (Top on mobile, Left on desktop) */}
                            <div className="w-full md:w-1/2 p-2 block relative z-10">
                                <div className="w-full h-40 sm:h-48 md:h-full bg-gray-100 rounded-xl md:rounded-[2.5rem] overflow-hidden relative shadow-inner">
                                    <img
                                        src={selected.gambar.startsWith('http') ? selected.gambar : `/storage/${selected.gambar}`}
                                        alt={selected.nama_tema}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent flex items-end p-4 md:p-8">
                                        <a
                                            href={selected.link_demo}
                                            target="_blank"
                                            className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 md:px-6 md:py-3 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-gray-900 transition-all"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" /> Buka Live Demo
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="flex-1 p-5 sm:p-8 md:p-12 flex flex-col overflow-y-auto relative bg-transparent z-10">
                                <div className="relative z-10 flex flex-col h-full">
                                    <button
                                        onClick={handleCloseModal}
                                        className="absolute top-0 right-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-colors z-20"
                                    >
                                        <X className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </button>

                                    <div className="mb-4 sm:mb-8 pr-10 sm:pr-12 pt-1 sm:pt-4">
                                        <span className="inline-block px-3 py-1 bg-sky-100 text-sky-700 text-[8px] sm:text-[10px] font-black rounded-full uppercase tracking-widest mb-2 sm:mb-4 border border-sky-200/50 shadow-sm">
                                            {selected.kategori}
                                        </span>
                                        <h3 className="text-xl sm:text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 mb-1 sm:mb-3 tracking-tight leading-none drop-shadow-sm">{selected.nama_tema}</h3>
                                    </div>

                                <div className="mb-4 sm:mb-10 py-3 sm:py-6 border-y border-gray-100">
                                    <p className="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 sm:mb-3">Harga Spesial</p>
                                    <div className="flex items-baseline gap-2 sm:gap-4">
                                        <span className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                                            {formatPrice(hargaAktif(selected))}
                                        </span>
                                        {selected.harga_diskon && (
                                            <span className="text-xs sm:text-lg text-gray-400 line-through font-medium">
                                                {formatPrice(selected.harga_asli)}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <AnimatePresence mode="wait">
                                        {!isOrdering ? (
                                            <motion.div
                                                key="button"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="space-y-2"
                                            >
                                                <button
                                                    onClick={() => setIsOrdering(true)}
                                                    className="w-full py-3 sm:py-4 bg-[#111111] text-white text-xs sm:text-sm font-bold uppercase tracking-widest rounded-xl sm:rounded-2xl hover:bg-sky-500 hover:shadow-xl hover:shadow-sky-500/20 transition-all duration-300"
                                                >
                                                    Pesan Tema Ini
                                                </button>
                                                <a
                                                    href={selected.link_demo}
                                                    target="_blank"
                                                    className="md:hidden flex items-center justify-center gap-1.5 w-full py-3 bg-gray-50 text-gray-900 text-xs font-bold uppercase tracking-widest rounded-xl border border-gray-200"
                                                >
                                                    <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                                                </a>
                                            </motion.div>
                                        ) : (
                                            <motion.form
                                                key="form"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                onSubmit={handleOrder}
                                                className="space-y-5"
                                            >
                                                <div>
                                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 block mb-2">Nama Lengkap</label>
                                                    <input
                                                        type="text"
                                                        required
                                                        value={nama}
                                                        onChange={(e) => setNama(e.target.value)}
                                                        className="w-full px-5 py-4 bg-gray-50 rounded-2xl border border-gray-200 focus:bg-white focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 text-sm font-medium transition-all"
                                                        placeholder="Cth: Dilan & Milea"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1 block mb-2">No. WhatsApp</label>
                                                    <input
                                                        type="tel"
                                                        required
                                                        value={noWa}
                                                        onChange={(e) => setNoWa(e.target.value)}
                                                        className="w-full px-5 py-4 bg-gray-50 rounded-2xl border border-gray-200 focus:bg-white focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 text-sm font-medium transition-all"
                                                        placeholder="Cth: 08123456789"
                                                    />
                                                </div>
                                                <div className="pt-2 flex gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => setIsOrdering(false)}
                                                        className="px-6 py-4 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-gray-200 transition-colors"
                                                    >
                                                        Batal
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        disabled={loading}
                                                        className="flex-1 flex items-center justify-center gap-2 py-4 bg-sky-500 text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/30 disabled:opacity-70"
                                                    >
                                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Kirim via WhatsApp"}
                                                    </button>
                                                </div>
                                            </motion.form>
                                        )}
                                    </AnimatePresence>
                                </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
                </AnimatePresence>
            </div>
        </section>
    );
}
