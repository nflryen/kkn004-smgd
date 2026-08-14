"use client";

import { motion, type Variants } from "framer-motion";

interface PolaroidItem {
  id: string;
  image: string;
  caption: string;
  date: string;
  rotation: number;
}

const POLAROID_MEMORIES: PolaroidItem[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=800",
    caption: "Senyum Kehangatan Warga Dusun 2",
    date: "22 Juli 2026",
    rotation: -5,
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&q=80&w=800",
    caption: "Proses Pembuatan Gula Jawa Tradisional",
    date: "28 Juli 2026",
    rotation: 4,
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
    caption: "Pesona Keindahan Alam Somagede",
    date: "05 Agustus 2026",
    rotation: -3,
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800",
    caption: "Kebersamaan Tim KKN 004 & Karang Taruna",
    date: "17 Agustus 2026",
    rotation: 6,
  },
];

export function ScatterPolaroidGallery() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 300, damping: 25 },
    },
  };

  return (
    <section className="w-full py-20 bg-[#FBFBF9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

        {/* Header Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#0F382C] px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-600/20 inline-block mb-4">
            Mengukir Memori
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-novatica font-bold text-[#111827] leading-tight mb-4">
            Potret Kehangatan <br className="hidden md:block" />
            <span className="text-[#0F382C]">Pengabdian Somagede</span>
          </h2>
          <p className="text-[#4B5563] max-w-xl mx-auto text-base md:text-lg">
            Kumpulan dokumentasi yang mengabadikan kebersamaan, senyum warga, dan lanskap asri Desa Somagede.
          </p>
        </motion.div>

        {/* Scattered Polaroid Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 pt-4"
        >
          {POLAROID_MEMORIES.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              animate={{ rotate: item.rotation }}
              whileHover={{ scale: 1.06, rotate: 0, zIndex: 20 }}
              className="bg-white p-4 pb-6 rounded-xl border border-neutral-200/90 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col relative group"
            >
              {/* Top Tape Effect */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-amber-100/80 border border-amber-200/60 rotate-[-2deg] shadow-xs pointer-events-none z-10" />

              {/* Photo Frame */}
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-neutral-100 mb-4">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Handwritten Style Caption */}
              <div className="flex flex-col text-left px-1">
                <p className="font-serif italic text-base text-[#111827] font-medium leading-snug mb-1">
                  "{item.caption}"
                </p>
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  {item.date}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
