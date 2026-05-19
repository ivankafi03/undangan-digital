import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import OrderStep from "@/components/OrderStep";
import Catalog from "@/components/Catalog";
import PromoSection from "@/components/PromoSection";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";

export default async function Home() {
  const setting = await prisma.setting.findFirst();
  const waNumber = setting?.nomor_wa || "628123456789";

  const temas = await prisma.tema.findMany({
    orderBy: { createdAt: "desc" },
  });

  const promo = await prisma.promo.findFirst({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen">
      <Hero waNumber={waNumber} />
      <Features />
      <Catalog temas={temas} waNumber={waNumber} setting={setting} />
      <OrderStep />
      {promo && <PromoSection promo={promo} waNumber={waNumber} />}
      <FAQ />
      <CTA waNumber={waNumber} />
    </main>
  );
}
