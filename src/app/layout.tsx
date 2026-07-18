import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdminFab } from "@/components/AdminFab";
import { BackToTop } from "@/components/BackToTop";
import { StarryBackground } from "@/components/StarryBackground";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Starry — 个人网站",
    template: "%s — Starry",
  },
  description: "海南大学软件工程专业在读。技术文章、项目展示、学习记录。",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://starry.os.kg"),
  openGraph: {
    title: "Starry — 个人网站",
    description: "海南大学软件工程专业在读。技术文章、项目展示、学习记录。",
    type: "website",
    locale: "zh_CN",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('starry-theme')||'warm';document.documentElement.setAttribute('data-theme',t)})()`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col relative">
        <StarryBackground />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-text-primary focus:text-text-inverse focus:text-sm"
        >
          跳到内容
        </a>
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <AdminFab />
        <BackToTop />
        <Analytics />
      </body>
    </html>
  );
}
