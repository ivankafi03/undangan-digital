import prisma from "@/lib/prisma";
import { updateSetting } from "@/app/actions/admin";
import { Save, Phone } from "lucide-react";

export default async function SettingPage() {
    const setting = await prisma.setting.findFirst();

    return (
        <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 pb-20">
            <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter">Pengaturan Umum</h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Konfigurasi dasar aplikasi undangan digital kamu.</p>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-[2rem] shadow-xl p-5 sm:p-10 border border-slate-100">
                <form action={updateSetting} className="space-y-6 sm:space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-slate-900 font-bold mb-2">
                            <Phone className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <h2 className="text-base sm:text-lg">Nomor WhatsApp Admin</h2>
                        </div>
                        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                            Nomor ini akan digunakan sebagai tujuan pesan otomatis saat pelanggan klik tombol <strong>"Pesan Sekarang"</strong> atau <strong>"Konsultasi"</strong>.
                            Gunakan format internasional tanpa tanda plus (contoh: 628123456789).
                        </p>
                        <input
                            type="text"
                            name="nomor_wa"
                            required
                            defaultValue={setting?.nomor_wa || "628123456789"}
                            placeholder="628123456789"
                            className="w-full px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl border-2 border-slate-100 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all text-slate-700 font-bold text-base sm:text-lg"
                        />
                    </div>

                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2.5 w-full py-3.5 sm:py-4.5 bg-slate-900 text-white rounded-2xl font-bold shadow-lg hover:bg-slate-800 transition transform hover:-translate-y-0.5 active:scale-95 text-sm sm:text-base"
                    >
                        <Save className="w-4 sm:w-5 h-4 sm:h-5" />
                        Simpan Perubahan
                    </button>
                </form>
            </div>
        </div>
    );
}
