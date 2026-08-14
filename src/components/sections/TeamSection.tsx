"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart } from "lucide-react";
import { TeamGrid } from "@/components/team/TeamGrid";
import type { TeamMember } from "@/components/team/TeamCard";

export function TeamSection({ team }: { team?: TeamMember[] }) {
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
            Tim Pengabdi <br className="hidden md:block" />
            <span className="text-[#0F382C]">
              KKN 004 Somagede
            </span>
          </h2>
          
          <p className="text-[#4B5563] max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Mengenal lebih dekat para mahasiswa yang mendedikasikan waktu dan pemikiran untuk kemajuan Desa Somagede.
          </p>
        </motion.div>

        {/* Panoramic Group Team Photo Showcase Frame */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-white border border-neutral-200/90 rounded-2xl md:rounded-3xl p-3 md:p-6 shadow-xl relative mb-16"
        >
          <div className="flex items-center justify-between px-2 mb-4">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#0F382C]" />
              <span className="text-xs md:text-sm font-bold text-[#111827] uppercase tracking-wider">
                Foto Bersama Seluruh Mahasiswa KKN 004
              </span>
            </div>
            <span className="hidden sm:inline-block text-xs font-medium text-gray-500 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200">
              Desa Somagede 2026
            </span>
          </div>

          <div className="relative w-full overflow-hidden rounded-xl md:rounded-2xl bg-neutral-900 border border-neutral-200/50 shadow-inner">
            <Image
              src="/assets/images/background-hero-section.png"
              alt="Foto Bersama Tim Pengabdi KKN 004 Somagede 2026"
              width={3110}
              height={1350}
              priority
              className="w-full h-auto object-contain transition-transform duration-700 hover:scale-[1.01]"
            />
          </div>
        </motion.div>

        <TeamGrid team={team} />
      </div>
    </section>
  );
}
