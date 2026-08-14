"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { Map, Briefcase, Users, BookMarked, Camera, ArrowRight } from "lucide-react";

const MODULES = [
  {
    title: "Digital Atlas",
    description: "Jelajahi peta interaktif potensi UMKM dan destinasi wisata Desa Somagede.",
    icon: Map,
    path: "/peta",
  },
  {
    title: "Program Kerja",
    description: "Pantau realisasi program kerja fisik dan non-fisik mahasiswa KKN 004.",
    icon: Briefcase,
    path: "/proker",
  },
  {
    title: "Tim Pengabdi",
    description: "Mengenal lebih dekat para mahasiswa di balik layar KKN 004 Somagede.",
    icon: Users,
    path: "/tim",
  },
  {
    title: "Buku Kenangan",
    description: "Membaca jurnal harian, kisah suka duka, dan memori tak terlupakan.",
    icon: BookMarked,
    path: "/storybook",
  },
  {
    title: "Galeri Visual",
    description: "Menelusuri dokumentasi foto berkualitas tinggi perjalanan pengabdian kami.",
    icon: Camera,
    path: "/galeri",
  },
];

export function ExploreModulesGrid() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="w-full py-20 bg-[#FBFBF9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
          className="mb-14 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-novatica font-bold text-[#111827] mb-4">
            Eksplorasi <span className="text-[#0F382C]">Modul Portal</span>
          </h2>
          <p className="text-[#4B5563] max-w-xl mx-auto text-base md:text-lg">
            Temukan semua informasi dan dokumentasi melalui modul-modul interaktif di bawah ini.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {MODULES.map((module, idx) => (
            <motion.div key={module.path} variants={itemVariants} className={idx === 4 ? "md:col-span-2 lg:col-span-1" : ""}>
              <Link href={module.path} className="block h-full group">
                <motion.div 
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="h-full flex flex-col p-8 rounded-3xl bg-white border border-neutral-200/80 shadow-xs hover:shadow-md hover:border-[#0F382C]/30 transition-all duration-200"
                >
                  <div className="w-13 h-13 rounded-2xl bg-[#0F382C]/[0.07] border border-[#0F382C]/10 flex items-center justify-center mb-6 text-[#0F382C] group-hover:scale-105 transition-transform duration-200">
                    <module.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-novatica font-bold text-[#111827] mb-3 group-hover:text-[#0F382C] transition-colors">{module.title}</h3>
                  <p className="text-[#4B5563] text-sm md:text-base leading-relaxed mb-8 flex-grow">{module.description}</p>
                  <div className="flex items-center text-[#0F382C] font-semibold text-sm group-hover:text-[#155443] transition-colors min-h-[44px]">
                    <span>Eksplorasi Sekarang</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
