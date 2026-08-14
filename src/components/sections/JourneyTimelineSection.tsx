"use client";

import { motion, type Variants } from "framer-motion";
import { Calendar, MapPin, Award, Heart } from "lucide-react";

interface MilestoneItem {
  day: string;
  date: string;
  title: string;
  description: string;
  icon: any;
  tag: string;
}

const JOURNEY_MILESTONES: MilestoneItem[] = [
  {
    day: "01",
    date: "20 Juli 2026",
    title: "Pelepasan & Penyambutan Desa",
    description: "Serah terima tim KKN 004 oleh Rektorat UIN Saizu kepada Perangkat Desa Somagede.",
    icon: Calendar,
    tag: "Awal Pengabdian",
  },
  {
    day: "12",
    date: "31 Juli 2026",
    title: "Survei & Pemetaan Digital Atlas",
    description: "Pendataan titik koordinat lokasi UMKM Gula Jawa, fasilitas umum, dan destinasi wisata.",
    icon: MapPin,
    tag: "Digitalisasi Desa",
  },
  {
    day: "24",
    date: "12 Agustus 2026",
    title: "Modernisasi Kemasan UMKM",
    description: "Pelatihan desain label produk dan pendampingan registrasi lokasi bisnis di Google Maps.",
    icon: Award,
    tag: "Pemberdayaan Ekonomi",
  },
  {
    day: "35",
    date: "23 Agustus 2026",
    title: "Malam Puncak & Perpisahan Warga",
    description: "Pementasan seni kebudayaan lokal kenthongan dan penyerahan peta cetak Digital Atlas Somagede.",
    icon: Heart,
    tag: "Memori Abadi",
  },
];

export function JourneyTimelineSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 350, damping: 25 },
    },
  };

  return (
    <section className="w-full py-20 bg-[#FBFBF9] border-t border-neutral-200/80 relative overflow-hidden">
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
            Alur Perjalanan 2026
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-novatica font-bold text-[#111827] leading-tight mb-4">
            Jejak Langkah <span className="text-[#0F382C]">Pengabdian</span>
          </h2>
          <p className="text-[#4B5563] max-w-xl mx-auto text-base md:text-lg">
            Rangkaian tahapan kegiatan mahasiswa KKN 004 selama 35 hari bertugas di Desa Somagede.
          </p>
        </motion.div>

        {/* Timeline Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {JOURNEY_MILESTONES.map((item) => (
            <motion.div
              key={item.day}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-white border border-neutral-200/90 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-[#0F382C]/30 transition-all flex flex-col justify-between h-full relative"
            >
              <div>
                {/* Large Typographic Day Number */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl md:text-5xl font-novatica font-bold text-[#0F382C]/20 tracking-tighter">
                    HARI {item.day}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#0F382C]/[0.07] text-[#0F382C] flex items-center justify-center">
                    <item.icon className="w-5 h-5" />
                  </div>
                </div>

                <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-[#0F382C] px-2.5 py-1 rounded-md bg-emerald-500/10 mb-3">
                  {item.tag}
                </span>

                <h3 className="text-xl font-novatica font-bold text-[#111827] mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-[#4B5563] text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 text-xs font-semibold text-gray-500">
                {item.date}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
