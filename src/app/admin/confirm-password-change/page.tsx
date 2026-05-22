import { confirmPasswordChange } from "@/app/actions/admin_security";
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ConfirmPasswordChangePage({
    searchParams,
}: {
    searchParams: Promise<{ token?: string }>;
}) {
    const { token } = await searchParams;

    let success = false;
    let message = "Token tidak valid atau tidak ditemukan.";

    if (token) {
        const result = await confirmPasswordChange(token);
        if (result.success) {
            success = true;
            message = result.success;
        } else if (result.error) {
            message = result.error;
        }
    }

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl overflow-hidden relative text-center">
                <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${
                    success ? "from-emerald-500 to-teal-500" : "from-rose-500 to-red-500"
                }`}></div>

                <div className="flex flex-col items-center justify-center space-y-6 mt-4">
                    {success ? (
                        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 shadow-md">
                            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                        </div>
                    ) : (
                        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center border border-rose-100 shadow-md">
                            <XCircle className="w-10 h-10 text-rose-500" />
                        </div>
                    )}

                    <div className="space-y-2">
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                            {success ? "Konfirmasi Berhasil" : "Konfirmasi Gagal"}
                        </h1>
                        <p className="text-slate-500 font-medium text-sm px-4 leading-relaxed">
                            {message}
                        </p>
                    </div>

                    <a 
                        href="/admin/login" 
                        className={`w-full py-4.5 text-white rounded-2xl font-bold text-base shadow-xl flex items-center justify-center gap-2 transition transform active:scale-95 ${
                            success 
                                ? "bg-slate-900 hover:bg-slate-800 hover:-translate-y-0.5" 
                                : "bg-rose-600 hover:bg-rose-700 hover:-translate-y-0.5"
                        }`}
                    >
                        Masuk Kembali <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </div>
    );
}
