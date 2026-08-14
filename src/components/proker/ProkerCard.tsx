"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, MapPin, Star, Bookmark } from "lucide-react";
import type { ProkerData } from "./ProkerDetailModal";
import { StatusBadge } from "./ProkerDetailModal";

interface ProkerCardProps {
  proker: ProkerData;
  onClick: () => void;
}

export function ProkerCard({ proker, onClick }: ProkerCardProps) {
  const progressPct = proker.progress !== undefined 
    ? proker.progress 
    : proker.status === "Completed" ? 100 : proker.status === "In Progress" ? 65 : 25;

  const isUnggulan = proker.programType === "unggulan";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 15 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
      onClick={onClick}
      className="group relative cursor-pointer bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#0F382C]/30 transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative w-full h-48 bg-neutral-100 overflow-hidden shrink-0">
        {proker.coverImage ? (
          <img
            src={proker.coverImage}
            alt={proker.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-100 flex items-center justify-center" />
        )}
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
          <StatusBadge status={proker.status} />
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold shadow-xs ${
            isUnggulan
              ? "bg-[#0F382C] text-white"
              : "bg-white/90 backdrop-blur-xs text-neutral-700 border border-neutral-200"
          }`}>
            {isUnggulan ? <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" /> : <Bookmark className="w-3.5 h-3.5 text-neutral-500" />}
            <span>{isUnggulan ? "Program Unggulan" : "Program Pendukung"}</span>
          </span>
        </div>
        
        <div className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-full bg-[#0F382C] text-white text-[11px] font-semibold uppercase tracking-wider shadow-xs">
          {proker.division}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-novatica font-bold text-[#111827] mb-3 line-clamp-2 leading-snug group-hover:text-[#0F382C] transition-colors">
          {proker.title}
        </h3>
        
        <div className="flex flex-wrap items-center gap-4 text-gray-500 text-xs font-medium mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#0F382C]" />
            <span>{proker.date && proker.date.trim() !== "" ? proker.date : "Jadwal Menyusul"}</span>
          </div>
          {proker.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#0F382C]" />
              <span className="line-clamp-1">{proker.location}</span>
            </div>
          )}
        </div>
        
        <p className="text-[#4B5563] text-sm line-clamp-3 mb-5 leading-relaxed flex-1">
          {proker.description}
        </p>

        {/* Progress Bar Indicator */}
        <div className="mb-5 pt-3 border-t border-neutral-100">
          <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500 mb-1.5">
            <span>Progres Program</span>
            <span className="text-[#0F382C] font-bold">{progressPct}%</span>
          </div>
          <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0F382C] rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Action Link */}
        <div className="mt-auto pt-2 flex items-center justify-between text-[#0F382C] font-semibold text-sm group-hover:text-[#155443] transition-colors min-h-[40px]">
          <span>Lihat Detail Program</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </motion.div>
  );
}
