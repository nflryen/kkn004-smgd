"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  return (
    <section
      ref={containerRef}
      className="relative w-full sticky top-0 z-10 min-h-screen h-screen flex flex-col justify-between overflow-hidden bg-[#050A09] text-white"
    >
      {/* Background Team Photo Canvas with Strong Dark Overlay & Backdrop Blur */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/assets/images/background-hero-section.png"
          alt="KKN 004 Team Hero Background"
          fill
          priority
          className="object-cover object-center filter blur-[1px] opacity-80"
        />
        {/* Heavy Dark Overlay & Blur for 100% Crisp Legibility */}
        <div className="absolute inset-0 bg-[#050A09]/75 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050A09]/30 via-[#050A09]/20 to-[#050A09]" />
      </div>

      {/* Main Content with Parallax Framing Motion */}
      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 w-full flex flex-col items-center text-center pt-24 md:pt-32 pb-12 my-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Top Soft Badge Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm mb-8">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-xs md:text-sm font-bold tracking-wider text-emerald-200 uppercase">
              KKN 004 UIN Saizu Somagede 2026
            </span>
          </div>

          {/* Primary Crisp Editorial Header - Line 1: Merajut Asa & Sinergi Karya (Single Line on Desktop), Line 2: Desa Somagede */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.75rem] font-novatica font-bold text-white leading-[1.08] mb-8 tracking-tight max-w-6xl drop-shadow-md">
            <span className="block whitespace-normal md:whitespace-nowrap">Merajut Asa &amp; Sinergi Karya</span>
            <span className="block text-emerald-300 mt-1 md:mt-2">
              Desa Somagede
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base md:text-xl text-neutral-200 font-normal leading-relaxed mb-10 drop-shadow-sm">
            Portal pengabdian masyarakat: menelusuri jejak karya, memetakan Digital Atlas potensi desa, dan mendokumentasikan memori bersama warga Somagede.
          </p>
        </motion.div>

        {/* Primary & Secondary Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-6"
        >
          <Link href="/peta" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#0F382C] hover:bg-[#155443] text-white font-semibold text-base md:text-lg transition-all shadow-lg flex items-center justify-center gap-2.5 min-h-[50px]"
            >
              <Compass className="w-5 h-5 text-emerald-300" />
              Jelajahi Digital Atlas
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>

          <Link href="/proker" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white/90 hover:bg-white text-[#111827] font-semibold text-base md:text-lg border border-neutral-200 transition-all shadow-md flex items-center justify-center gap-2 min-h-[50px]"
            >
              Lihat Program Kerja
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
