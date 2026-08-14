import Link from "next/link";
import { TripleLogoBadge } from "./TripleLogoBadge";
import { MobileDrawer } from "./MobileDrawer";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0b1917]/80 border-b border-white/10 transition-all duration-300 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        
        {/* Left: Triple Logo Badge (Unified Brand Identity) */}
        <Link 
          href="/" 
          aria-label="Home" 
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded-full group min-h-[44px] flex items-center"
        >
          <TripleLogoBadge />
        </Link>
        
        {/* Right: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <Link href="/" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Beranda</Link>
          <Link href="/peta" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Digital Atlas</Link>
          <Link href="/proker" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Proker</Link>
          <Link href="/tim" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Tim KKN</Link>
          <Link href="/storybook" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Jurnal</Link>
          <Link href="/galeri" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Galeri</Link>
          <Link 
            href="/admin" 
            className="text-sm font-semibold text-teal-300 hover:text-teal-200 transition-all duration-300 px-5 py-2 rounded-full bg-white/5 border border-teal-500/40 hover:border-teal-400 hover:shadow-[0_0_20px_rgba(59,155,141,0.4)] hover:bg-white/10 active:scale-95 min-h-[44px] flex items-center justify-center"
          >
            Admin Studio
          </Link>
        </nav>

        {/* Right: Mobile Drawer Trigger */}
        <MobileDrawer />
      </div>
    </header>
  );
}

