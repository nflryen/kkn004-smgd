import type { Metadata } from "next";
import localFont from "next/font/local";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const novatica = localFont({
  src: [
    {
      path: "../assets/fonts/BCNovaticaTEST-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/BCNovaticaTEST-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/BCNovaticaTEST-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/BCNovaticaTEST-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-novatica",
  display: "swap",
});

export const metadata: Metadata = {
  title: 'KKN 004 UIN Saizu Somagede 2026',
  description: 'Portal Pengabdian Masyarakat & Digital Atlas Desa Somagede',
  icons: {
    icon: [
      { url: '/assets/logos/kkn004somagede.png', href: '/assets/logos/kkn004somagede.png' }
    ],
    shortcut: '/assets/logos/kkn004somagede.png',
    apple: '/assets/logos/kkn004somagede.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${novatica.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FBFBF9] text-[#111827] relative selection:bg-[#0F382C]/10 selection:text-[#0F382C]">
        <ThemeProvider>
          <FloatingNav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
