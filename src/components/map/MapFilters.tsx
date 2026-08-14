"use client";

import { motion } from "framer-motion";

export type FilterCategory = "Semua" | "UMKM" | "Wisata" | "Fasilitas Publik";

interface MapFiltersProps {
  activeFilter: FilterCategory;
  onFilterChange: (category: FilterCategory) => void;
}

const categories: FilterCategory[] = ["Semua", "UMKM", "Wisata", "Fasilitas Publik"];

export function MapFilters({ activeFilter, onFilterChange }: MapFiltersProps) {
  return (
    <div className="inline-flex items-center gap-1 p-1.5 rounded-2xl bg-white/95 backdrop-blur-md border border-neutral-200/90 shadow-md max-w-full overflow-x-auto no-scrollbar">
      {categories.map((category) => {
        const isActive = activeFilter === category;
        return (
          <motion.button
            key={category}
            onClick={() => onFilterChange(category)}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
            className={`
              relative whitespace-nowrap px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-colors duration-200 min-h-[40px] flex items-center justify-center
              ${isActive ? "text-white" : "text-gray-700 hover:text-[#0F382C] hover:bg-neutral-100/80"}
            `}
          >
            <span className="relative z-10">{category}</span>
            {isActive && (
              <motion.div
                layoutId="activeMapFilter"
                className="absolute inset-0 bg-[#0F382C] rounded-xl shadow-xs"
                transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
