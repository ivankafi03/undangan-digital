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
  description: "Layanan pembuatan undangan digital profesional untuk segala momen bahagia bersama FikaDigi.",
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
