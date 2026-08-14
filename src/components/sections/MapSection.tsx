"use client";

import dynamic from "next/dynamic";
import { Compass } from "lucide-react";
import { motion } from "framer-motion";
import type { LocationData } from "@/components/map/LocationDetailModal";

const VillageMap = dynamic(() => import("@/components/map/VillageMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] lg:h-[650px] rounded-3xl bg-white border border-neutral-200/90 flex items-center justify-center shadow-xs">
      <div className="flex flex-col items-center gap-4">
        <Compass className="w-12 h-12 text-[#0F382C] animate-spin" style={{ animationDuration: "3s" }} />
        <span className="text-[#111827] font-semibold tracking-wide text-sm sm:text-base">
          Memuat Peta Atlas Digital Somagede...
        </span>
      </div>
    </div>
  ),
});

export function MapSection({ potencies }: { potencies?: LocationData[] }) {
  return (
    <section className="relative w-full py-16 md:py-20 overflow-hidden bg-[#FBFBF9]" id="peta">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center text-center mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-neutral-200 shadow-xs text-[#0F382C] text-xs md:text-sm font-semibold uppercase tracking-wider mb-4">
            <Compass className="w-4 h-4 text-[#0F382C]" />
            <span>Digital Atlas &amp; Navigasi</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-novatica font-bold text-[#111827] mb-4 leading-tight">
            Peta Potensi &amp;{" "}
            <span className="text-[#0F382C]">
              Digital Atlas Somagede
            </span>
          </h2>

          <p className="text-[#4B5563] max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Temukan lokasi UMKM unggulan, destinasi pariwisata, serta fasilitas publik di Somagede melalui peta interaktif dua panel kami.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, type: "spring", stiffness: 350, damping: 25 }}
        >
          <VillageMap potencies={potencies} />
        </motion.div>
      </div>
    </section>
  );
}
