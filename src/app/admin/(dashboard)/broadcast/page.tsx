import prisma from "@/lib/prisma";
import BroadcastForm from "@/components/admin/BroadcastForm";

export const dynamic = "force-dynamic";

export default async function BroadcastPage() {
    const subscriberCount = await prisma.pushSubscription.count();

    return (
        <div className="space-y-8 sm:space-y-12 pb-20">
            <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Push Broadcast</h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">Kirimkan notifikasi layar langsung ke HP dan Laptop pelanggan FikaDigi secara gratis.</p>
            </div>

            <BroadcastForm initialSubscribers={subscriberCount} />
        </div>
    );
}
