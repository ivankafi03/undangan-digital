import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const setting = await prisma.setting.findFirst();
    const waNumber = setting?.nomor_wa || "628123456789";

    return (
        <>
            <Navbar waNumber={waNumber} />
            {children}
            <Footer waNumber={waNumber} />
        </>
    );
}
