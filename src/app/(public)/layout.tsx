import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Tracker from "@/components/Tracker";

export default async function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const setting = await prisma.setting.findFirst();
    const waNumber = setting?.nomor_wa || "628123456789";

    return (
        <>
            <Tracker />
            <Navbar waNumber={waNumber} setting={setting} />
            {children}
            <Footer waNumber={waNumber} setting={setting} />
        </>
    );
}
