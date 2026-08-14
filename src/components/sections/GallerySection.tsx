"use client";

import { motion } from "framer-motion";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export function GallerySection({ images }: { images?: string[] }) {
  return (
    <section className="relative w-full py-16 md:py-20 overflow-hidden bg-[#FBFBF9]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-novatica font-bold text-[#111827] mb-4 leading-tight">
            Galeri <br className="hidden md:block" />
            <span className="text-[#0F382C]">
              Memori Somagede
            </span>
          </h2>
          
          <p className="text-[#4B5563] max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Kumpulan momen kebersamaan, program kerja, dan keindahan alam Desa Somagede yang terekam dalam lensa kami.
          </p>
        </motion.div>

        <GalleryGrid images={images} />
      </div>
    </section>
  );
}
