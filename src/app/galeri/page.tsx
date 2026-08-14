import { GallerySection } from "@/components/sections/GallerySection";
import { Footer } from "@/components/layout/Footer";

export default function GaleriPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] w-full flex flex-col">
      {/* 1. Top Navbar Spacer */}
      <div className="h-28 md:h-36 w-full flex-shrink-0" />

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-0 sm:px-4">
        <GallerySection />
      </div>

      {/* 3. Bottom Footer Spacer */}
      <div className="h-24 md:h-36 w-full flex-shrink-0" />

      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}
