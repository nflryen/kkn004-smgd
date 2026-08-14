import { GallerySection } from "@/components/sections/GallerySection";
import { Footer } from "@/components/layout/Footer";

export default function GaleriPage() {
  return (
    <main className="min-h-screen bg-[#FBFBF9] text-[#111827] w-full flex flex-col pt-28 md:pt-36 pb-20">
      <div className="flex-1 w-full">
        <GallerySection />
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}
