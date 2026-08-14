import { HeroSection } from "@/components/sections/HeroSection";
import { VillageProfileSection } from "@/components/sections/VillageProfileSection";
import { ExploreModulesGrid } from "@/components/sections/ExploreModulesGrid";
import { ScatterPolaroidGallery } from "@/components/gallery/ScatterPolaroidGallery";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="w-full bg-[#050A09] relative flex flex-col">
      {/* 
        Hero Section + Curtain Scroll Overlap Effect:
        - Layer 1: Hero occupies 100% viewport height (sticky top-0 z-10).
        - Layer 2: Incoming curtain layer (z-20) starts strictly below the fold at scrollTop = 0.
        - As user scrolls, Layer 2 glides UP smoothly OVER the pinned Hero background!
      */}
      
      {/* Layer 1: Pinned Sticky Hero (100% Viewport Height) */}
      <HeroSection />

      {/* Layer 2: Incoming Content Curtain Layer (Strictly Below Fold at scrollTop = 0) */}
      <div className="relative z-20 bg-[#FBFBF9] bg-grain ambient-glow rounded-t-[2.5rem] md:rounded-t-[3.5rem] shadow-[0_-25px_60px_rgba(0,0,0,0.15)] border-t border-white/20 overflow-hidden">
        <VillageProfileSection />
        <ExploreModulesGrid />
        <ScatterPolaroidGallery />
        <Footer />
      </div>
    </main>
  );
}
