"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ProkerCard } from "./ProkerCard";
import { ProkerDetailModal, type ProkerData } from "./ProkerDetailModal";
import { GridSkeleton } from "@/components/ui/Skeleton";
import { Inbox } from "lucide-react";

const DUMMY_PROKERS: ProkerData[] = [
  {
    id: "1",
    title: "Pengajian Rutin & Literasi Keagamaan Remaja Masjid",
    division: "Penguatan Umat",
    status: "Completed",
    date: "12 Agustus 2026",
    description: "Kegiatan pengajian berkala, pendampingan belajar Al-Qur'an, dan pembinaan karakter islami bagi pemuda Desa Somagede.",
    location: "Masjid Jami Somagede"
  },
  {
    id: "2",
    title: "Penanaman 1.000 Bibit Pohon & Konservasi Sumber Air",
    division: "Penhijauan Desa",
    status: "In Progress",
    date: "15 Agustus 2026",
    description: "Gerakan penanaman bibit pohon buah dan pohon lindung di sekitar daerah aliran sungai serta lereng perbukitan desa.",
    location: "Kawasan Lereng Somagede"
  },
  {
    id: "3",
    title: "Pelatihan E-Commerce & Kemasan Produk UMKM Gula Jawa",
    division: "Pergerakan Ekonomi Masyarakat",
    status: "Completed",
    date: "18 Agustus 2026",
    description: "Pendampingan branding kemasan hygienis dan otomatisasi toko online bagi perajin gula jawa murni Somagede.",
    location: "Balai Desa Somagede"
  },
  {
    id: "4",
    title: "Revitalisasi Taman Edukasi Herbal & Apotek Hidup RT",
    division: "Penhijauan Desa",
    status: "Planned",
    date: "24 Agustus 2026",
    description: "Pembuatan kebun tanaman obat keluarga (TOGA) berbasis partisipasi warga dusun untuk mendukung kesehatan alami.",
    location: "Pekarangan Warga Dusun II"
  }
];

const DIVISIONS = [
  "Semua",
  "Penguatan Umat",
  "Penhijauan Desa",
  "Pergerakan Ekonomi Masyarakat"
];

export function ProkerGrid({ prokers, isLoading }: { prokers?: ProkerData[]; isLoading?: boolean }) {
  const [activeDivision, setActiveDivision] = useState("Semua");
  const [selectedProker, setSelectedProker] = useState<ProkerData | null>(null);

  const data = prokers && prokers.length > 0 ? prokers : DUMMY_PROKERS;

  const filteredProkers = data.filter(
    (p) => activeDivision === "Semua" || p.division === activeDivision
  );

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  return (
    <div className="w-full">
      {/* Filters (Touch Target Ergonomics >= 44px) */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-12">
        {DIVISIONS.map((div) => {
          const isActive = activeDivision === div;
          return (
            <motion.button
              key={div}
              onClick={() => setActiveDivision(div)}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
              className={`
                relative px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wide transition-colors duration-200 min-h-[44px] flex items-center justify-center
                ${isActive
                  ? "text-white shadow-xs"
                  : "bg-white text-gray-700 border border-neutral-200 hover:bg-neutral-100/80 hover:text-[#0F382C]"
                }
              `}
            >
              <span className="relative z-10">{div}</span>
              {isActive && (
                <motion.div
                  layoutId="activeProkerFilter"
                  className="absolute inset-0 bg-[#0F382C] rounded-full shadow-xs"
                  transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {isLoading ? (
        <GridSkeleton count={6} />
      ) : filteredProkers.length === 0 ? (
        <div className="w-full py-16 flex flex-col items-center justify-center text-center bg-white border border-neutral-200 rounded-3xl p-8 shadow-xs">
          <Inbox className="w-12 h-12 text-[#0F382C] mb-4 opacity-80" />
          <h3 className="text-xl font-bold text-[#111827] mb-2">Belum Ada Program Kerja</h3>
          <p className="text-gray-500 text-sm max-w-sm">Tidak ada program kerja yang ditemukan untuk kategori ini.</p>
        </div>
      ) : (
        <motion.div 
          layout
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProkers.map((proker) => (
              <ProkerCard 
                key={proker.id} 
                proker={proker} 
                onClick={() => setSelectedProker(proker)} 
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Detail Modal */}
      <ProkerDetailModal 
        proker={selectedProker} 
        onClose={() => setSelectedProker(null)} 
      />
    </div>
  );
}
