import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "FikaDigi - Undangan Digital Premium",
  description: "Layanan pembuatan undangan digital profesional, instan, dan elegan untuk segala momen bahagia bersama FikaDigi.",
  openGraph: {
    title: "FikaDigi - Undangan Digital Premium",
    description: "Layanan pembuatan undangan digital profesional, instan, dan elegan untuk segala momen bahagia bersama FikaDigi.",
    url: "https://fikadigi.store",
    siteName: "FikaDigi",
    images: [
      {
        url: "https://fikadigi.store/658080585_18042732272580949_1176413146137522839_n.jpg",
        width: 1200,
        height: 630,
        alt: "FikaDigi Logo Preview",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FikaDigi - Undangan Digital Premium",
    description: "Layanan pembuatan undangan digital profesional, instan, dan elegan untuk segala momen bahagia bersama FikaDigi.",
    images: ["https://fikadigi.store/658080585_18042732272580949_1176413146137522839_n.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${plusJakartaSans.variable} antialiased bg-white text-[#1A1A1A]`}>
        {children}
      </body>
    </html>
  );
}
