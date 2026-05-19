import prisma from "@/lib/prisma";
import { updateSetting } from "@/app/actions/admin";
import { Save, Phone, Mail, Instagram, Facebook, MessageCircle, Presentation, Youtube, Megaphone } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SettingPage() {
    const setting = await prisma.setting.findFirst();

    return (
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 pb-20">
            <div>
                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter">Pengaturan Umum</h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Konfigurasi kontak, sosial media, dan fitur website FikaDigi.</p>
            </div>

            <form action={updateSetting} className="space-y-8 sm:space-y-12">
                {/* Kontak & Komunikasi */}
                <div className="bg-white rounded-xl sm:rounded-[2rem] shadow-sm p-4 sm:p-10 border border-slate-100">
                    <div className="flex items-center gap-3 text-slate-900 font-bold mb-6">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                            <MessageCircle className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg sm:text-xl">Kontak & Komunikasi</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Phone className="w-4 h-4 text-green-500"/> No. WhatsApp Admin</label>
                            <input
                                type="text"
                                name="nomor_wa"
                                required
                                defaultValue={setting?.nomor_wa || "628123456789"}
                                placeholder="628123456789"
                                className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Mail className="w-4 h-4 text-rose-500"/> Email Kontak</label>
                            <input
                                type="email"
                                name="email"
                                defaultValue={setting?.email || ""}
                                placeholder="halo@fikadigi.store"
                                className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold"
                            />
                        </div>
                    </div>

                    <div className="mt-6 space-y-2">
                        <label className="text-sm font-bold text-slate-700">Template Pesan WhatsApp</label>
                        <p className="text-xs text-slate-500 mb-2">Gunakan placeholder: [TEMA], [HARGA].</p>
                        <textarea
                            name="waTemplate"
                            rows={5}
                            defaultValue={setting?.waTemplate || "Halo FikaDigi, saya ingin memesan tema undangan digital berikut:\n\n📋 *DETAIL PESANAN*\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n✦ *Tema:* [TEMA]\n✦ *Harga:* [HARGA]\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nMohon info untuk langkah selanjutnya ya. Terima kasih!"}
                            placeholder="Ketik template pesan WhatsApp di sini..."
                            className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-sm leading-relaxed"
                        />
                    </div>
                </div>

                {/* Sosial Media */}
                <div className="bg-white rounded-xl sm:rounded-[2rem] shadow-sm p-4 sm:p-10 border border-slate-100">
                    <div className="flex items-center gap-3 text-slate-900 font-bold mb-6">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center">
                            <Instagram className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg sm:text-xl">Sosial Media</h2>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 mb-6">Kosongkan link jika Anda tidak ingin memunculkan logo sosmed tersebut di website.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Instagram className="w-4 h-4 text-pink-500"/> Instagram</label>
                            <input
                                type="url"
                                name="instagram"
                                defaultValue={setting?.instagram || ""}
                                placeholder="https://instagram.com/fikadigi"
                                className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-semibold"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Facebook className="w-4 h-4 text-blue-600"/> Facebook</label>
                            <input
                                type="url"
                                name="facebook"
                                defaultValue={setting?.facebook || ""}
                                placeholder="https://facebook.com/fikadigi"
                                className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-semibold"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Presentation className="w-4 h-4 text-slate-900"/> TikTok</label>
                            <input
                                type="url"
                                name="tiktok"
                                defaultValue={setting?.tiktok || ""}
                                placeholder="https://tiktok.com/@fikadigi"
                                className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-semibold"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2"><Youtube className="w-4 h-4 text-red-500"/> YouTube</label>
                            <input
                                type="url"
                                name="youtube"
                                defaultValue={setting?.youtube || ""}
                                placeholder="https://youtube.com/@fikadigi"
                                className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-semibold"
                            />
                        </div>
                    </div>
                </div>

                {/* Banner Promo */}
                <div className="bg-white rounded-xl sm:rounded-[2rem] shadow-sm p-4 sm:p-10 border border-slate-100">
                    <div className="flex items-center gap-3 text-slate-900 font-bold mb-6">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                            <Megaphone className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg sm:text-xl">Banner Pengumuman (Header)</h2>
                    </div>

                    <div className="space-y-6">
                        <label className="flex items-center gap-3 cursor-pointer p-4 bg-slate-50 rounded-2xl border border-slate-200">
                            <div className="relative">
                                <input type="checkbox" name="showPromo" value="true" defaultChecked={setting?.showPromo} className="sr-only peer" />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </div>
                            <span className="text-sm font-bold text-slate-700">Tampilkan Banner Promo di Website</span>
                        </label>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Teks Banner Promo</label>
                            <input
                                type="text"
                                name="promoBanner"
                                defaultValue={setting?.promoBanner || "🎉 DISKON 50% UNTUK 10 PEMBELI PERTAMA HARI INI!"}
                                placeholder="Ketik promo kilat Anda di sini..."
                                className="w-full px-5 py-3.5 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-bold text-slate-700"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4 pb-10">
                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2.5 w-full py-4 sm:py-5 bg-slate-900 text-white rounded-2xl sm:rounded-3xl font-bold shadow-xl hover:bg-sky-500 transition transform hover:-translate-y-1 text-base sm:text-lg"
                    >
                        <Save className="w-5 h-5" />
                        Simpan Semua Pengaturan
                    </button>
                </div>
            </form>
        </div>
    );
}
