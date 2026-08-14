import Link from "next/link";
import { TripleLogoBadge } from "./TripleLogoBadge";

export function Footer() {
  return (
    <footer className="w-full bg-[#FBFBF9] pt-20 pb-12 border-t border-neutral-200 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">

          {/* Brand, Mission & Triple Logo Array */}
          <div className="md:col-span-5 flex flex-col items-start">
            <h3 className="text-3xl font-novatica font-bold text-[#111827] mb-4">KKN 004 Somagede</h3>
            <p className="text-[#4B5563] text-sm leading-relaxed max-w-sm mb-6">
              Membangun desa, merajut asa bersama masyarakat Somagede. Dedikasi dari mahasiswa Universitas Islam Negeri Prof. K.H. Saifuddin Zuhri Purwokerto.
            </p>

            {/* Triple Logo Branding Array */}
            <div className="mb-2">
              <TripleLogoBadge />
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-[#111827] font-bold mb-6 tracking-wider text-xs uppercase">Navigasi Utama</h4>
            <ul className="space-y-3 text-sm text-[#4B5563]">
              <li><Link href="/" className="hover:text-[#0F382C] transition-colors inline-block py-1">Beranda</Link></li>
              <li><Link href="/peta" className="hover:text-[#0F382C] transition-colors inline-block py-1">Peta Digital Atlas</Link></li>
              <li><Link href="/proker" className="hover:text-[#0F382C] transition-colors inline-block py-1">Program Kerja</Link></li>
              <li><Link href="/tim" className="hover:text-[#0F382C] transition-colors inline-block py-1">Tim Pengabdi</Link></li>
              <li><Link href="/storybook" className="hover:text-[#0F382C] transition-colors inline-block py-1">Buku Kenangan</Link></li>
              <li><Link href="/galeri" className="hover:text-[#0F382C] transition-colors inline-block py-1">Galeri Visual</Link></li>
            </ul>
          </div>

          {/* Socials & Admin */}
          <div className="md:col-span-3">
            <h4 className="text-[#111827] font-bold mb-6 tracking-wider text-xs uppercase">Sosial &amp; Admin</h4>
            <ul className="space-y-3 text-sm text-[#4B5563]">
              <li>
                <a href="https://www.instagram.com/kkn004somagede26_/" target="_blank" rel="noopener noreferrer" className="hover:text-[#0F382C] transition-colors inline-flex items-center gap-2 py-1">
                  Instagram KKN 004
                </a>
              </li>
              <li>
                <Link href="/admin" className="text-[#0F382C] font-semibold hover:underline transition-colors inline-flex items-center gap-2 py-1">
                  Admin →
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="w-full pt-8 border-t border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <p>&copy; {new Date().getFullYear()} KKN 004 UIN Saizu Somagede. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Dirancang dengan dedikasi untuk Desa Somagede.
          </p>
        </div>
      </div>
    </footer>
  );
}
