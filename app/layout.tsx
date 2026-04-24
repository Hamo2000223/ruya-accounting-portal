import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ثانوي أدبي — مراجعة المواد",
  description:
    "مرجع دراسي بالعربية لطلاب الثانوية الأدبية في مصر: تاريخ، إنجليزي، جغرافيا، عربي، إحصاء، فرنساوي — مع دليل ومقالات مراجعة.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={notoArabic.variable}>
      <body className="flex min-h-dvh flex-col font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
