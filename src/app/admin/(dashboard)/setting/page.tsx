import prisma from "@/lib/prisma";
import { updateSetting } from "@/app/actions/admin";
import { getCurrentAdmin } from "@/app/actions/admin_security";
import AdminSecurityForm from "@/components/admin/AdminSecurityForm";
import { Save, Phone, Mail, Instagram, Facebook, MessageCircle, Presentation, Youtube, Megaphone } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SettingPage() {
    const setting = await prisma.setting.findFirst();
    const currentAdmin = await getCurrentAdmin();
    const invitations = await prisma.adminInvitation.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 pb-20">
            <div>
                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter">Pengaturan Umum</h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Konfigurasi kontak, sosial media, dan fitur website FikaDigi.</p>
            </div>

            <form action={updateSetting} className="space-y-6 sm:space-y-8">
                {/* Kontak & Komunikasi */}
                <div className="bg-white rounded-xl sm:rounded-[2rem] shadow-sm p-4 sm:p-10 border border-slate-100">
                    <div className="flex items-center gap-3 text-slate-900 font-bold mb-4 sm:mb-6">
                        <h2 className="text-base sm:text-xl">Kontak & Komunikasi</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-1.5">
                            <label className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-green-500"/> No. WhatsApp Admin</label>
                            <input
                                type="text"
                                name="nomor_wa"
                                required
                                defaultValue={setting?.nomor_wa || "628123456789"}
                                placeholder="628123456789"
                                className="w-full px-4 py-2.5 sm:px-5 sm:py-3.5 rounded-xl sm:rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-xs sm:text-sm font-semibold text-slate-700"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-rose-500"/> Email Kontak</label>
                            <input
                                type="email"
                                name="email"
                                defaultValue={setting?.email || ""}
                                placeholder="halo@fikadigi.store"
                                className="w-full px-4 py-2.5 sm:px-5 sm:py-3.5 rounded-xl sm:rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-xs sm:text-sm font-semibold text-slate-700"
                            />
                        </div>
                    </div>

                    <div className="mt-4 sm:mt-6 space-y-1.5">
                        <label className="text-xs sm:text-sm font-bold text-slate-700">Template Pesan WhatsApp</label>
                        <p className="text-[10px] sm:text-xs text-slate-500 mb-1.5">Gunakan placeholder: [TEMA], [HARGA].</p>
                        <textarea
                            name="waTemplate"
                            rows={5}
                            defaultValue={setting?.waTemplate || "Halo FikaDigi, saya ingin memesan tema undangan digital berikut:\n\n*DETAIL PESANAN*\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n*Tema:* [TEMA]\n*Harga:* [HARGA]\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nMohon info untuk langkah selanjutnya ya. Terima kasih!"}
                            placeholder="Ketik template pesan WhatsApp di sini..."
                            className="w-full px-4 py-2.5 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-xs sm:text-sm leading-relaxed"
                        />
                    </div>
                </div>

                {/* Sosial Media */}
                <div className="bg-white rounded-xl sm:rounded-[2rem] shadow-sm p-4 sm:p-10 border border-slate-100">
                    <div className="flex items-center gap-3 text-slate-900 font-bold mb-4 sm:mb-6">
                        <h2 className="text-base sm:text-xl">Sosial Media</h2>
                    </div>
                    <p className="text-[10px] sm:text-xs text-slate-500 mb-4 sm:mb-6">Kosongkan link jika Anda tidak ingin memunculkan logo sosmed tersebut di website.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-1.5">
                            <label className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5"><Instagram className="w-3.5 h-3.5 text-pink-500"/> Instagram</label>
                            <input
                                type="url"
                                name="instagram"
                                defaultValue={setting?.instagram || ""}
                                placeholder="https://instagram.com/fikadigi"
                                className="w-full px-4 py-2.5 sm:px-5 sm:py-3.5 rounded-xl sm:rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-xs sm:text-sm font-semibold text-slate-700"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5"><Facebook className="w-3.5 h-3.5 text-blue-600"/> Facebook</label>
                            <input
                                type="url"
                                name="facebook"
                                defaultValue={setting?.facebook || ""}
                                placeholder="https://facebook.com/fikadigi"
                                className="w-full px-4 py-2.5 sm:px-5 sm:py-3.5 rounded-xl sm:rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-xs sm:text-sm font-semibold text-slate-700"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5"><Presentation className="w-3.5 h-3.5 text-slate-900"/> TikTok</label>
                            <input
                                type="url"
                                name="tiktok"
                                defaultValue={setting?.tiktok || ""}
                                placeholder="https://tiktok.com/@fikadigi"
                                className="w-full px-4 py-2.5 sm:px-5 sm:py-3.5 rounded-xl sm:rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-xs sm:text-sm font-semibold text-slate-700"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5"><Youtube className="w-3.5 h-3.5 text-red-500"/> YouTube</label>
                            <input
                                type="url"
                                name="youtube"
                                defaultValue={setting?.youtube || ""}
                                placeholder="https://youtube.com/@fikadigi"
                                className="w-full px-4 py-2.5 sm:px-5 sm:py-3.5 rounded-xl sm:rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-xs sm:text-sm font-semibold text-slate-700"
                            />
                        </div>
                    </div>
                </div>

                {/* Banner Promo */}
                <div className="bg-white rounded-xl sm:rounded-[2rem] shadow-sm p-4 sm:p-10 border border-slate-100">
                    <div className="flex items-center gap-3 text-slate-900 font-bold mb-4 sm:mb-6">
                        <h2 className="text-base sm:text-xl">Banner Pengumuman (Header)</h2>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                        <label className="flex items-center gap-3 cursor-pointer p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-200">
                            <div className="relative">
                                <input type="checkbox" name="showPromo" value="true" defaultChecked={setting?.showPromo} className="sr-only peer" />
                                <div className="w-9 h-5 sm:w-11 sm:h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </div>
                            <span className="text-xs sm:text-sm font-bold text-slate-700">Tampilkan Banner Promo di Website</span>
                        </label>

                        <div className="space-y-1.5">
                            <label className="text-xs sm:text-sm font-bold text-slate-700">Teks Banner Promo</label>
                            <input
                                type="text"
                                name="promoBanner"
                                defaultValue={setting?.promoBanner || "DISKON 50% UNTUK 10 PEMBELI PERTAMA HARI INI!"}
                                placeholder="Ketik promo kilat Anda di sini..."
                                className="w-full px-4 py-2.5 sm:px-5 sm:py-3.5 rounded-xl sm:rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-xs sm:text-sm font-bold text-slate-700"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 w-full py-3 sm:py-5 bg-slate-900 text-white rounded-xl sm:rounded-3xl font-bold shadow-xl hover:bg-sky-500 transition transform hover:-translate-y-1 text-xs sm:text-lg"
                    >
                        <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                        Simpan Semua Pengaturan
                    </button>
                </div>
            </form>

            {/* Keamanan & Hak Akses Admin Section */}
            <hr className="border-t-2 border-slate-100 my-8 sm:my-12" />

            <div>
                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter">Keamanan & Admin</h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Ubah kata sandi login dan kelola hak akses administrator website FikaDigi.</p>
            </div>

            <AdminSecurityForm 
                initialInvitations={invitations} 
                currentAdminEmail={currentAdmin?.email || "ivankafipradana@gmail.com"} 
            />
        </div>
    );
}
