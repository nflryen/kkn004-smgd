"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Star, Bookmark } from "lucide-react";

export type ProkerStatus = "Planned" | "In Progress" | "Completed";

export interface ProkerData {
  id: string;
  title: string;
  division: string;
  programType?: "unggulan" | "pendukung" | string;
  status: ProkerStatus;
  date?: string;
  description: string;
  coverImage?: string;
  location?: string;
  progress?: number;
}

interface ProkerDetailModalProps {
  proker: ProkerData | null;
  onClose: () => void;
}

export function ProkerDetailModal({ proker, onClose }: ProkerDetailModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (proker) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [proker]);

  if (!mounted) return null;

  const getProgressPercentage = (status: ProkerStatus, custom?: number) => {
    if (custom !== undefined) return custom;
    if (status === "Completed") return 100;
    if (status === "In Progress") return 65;
    return 25;
  };

  const isUnggulan = proker?.programType === "unggulan";

  const modalContent = (
    <AnimatePresence>
      {proker && (
        <div className="fixed inset-0 z-[600] bg-black/75 backdrop-blur-md overflow-y-auto p-4 sm:p-6 md:p-10 flex items-start justify-center">
          {/* Backdrop interaction to close */}
          <div className="absolute inset-0 min-h-full" onClick={onClose} />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="relative z-10 w-full max-w-3xl my-auto rounded-3xl bg-white border border-neutral-200 shadow-2xl overflow-hidden"
          >
            {/* Ergonomic Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200 text-[#111827] hover:bg-white transition-colors shadow-md min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95"
              aria-label="Tutup Detail Program Kerja"
            >
              <X className="w-5 h-5 text-[#0F382C]" />
            </button>

            {/* Image Header */}
            <div className="relative w-full h-64 sm:h-80 bg-neutral-100 shrink-0">
              {proker.coverImage ? (
                <img
                  src={proker.coverImage}
                  alt={proker.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center" />
              )}
              {/* Status Badge */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <StatusBadge status={proker.status} />
                <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-semibold shadow-xs ${
                  isUnggulan
                    ? "bg-[#0F382C] text-white border-[#0F382C]"
                    : "bg-white text-neutral-700 border-neutral-200"
                }`}>
                  {isUnggulan ? <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" /> : <Bookmark className="w-3.5 h-3.5 text-neutral-500" />}
                  <span>{isUnggulan ? "Program Unggulan" : "Program Pendukung"}</span>
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-[#0F382C] text-white text-xs font-semibold uppercase tracking-wider">
                  {proker.division}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-novatica font-bold text-[#111827] mb-6 leading-tight">
                {proker.title}
              </h2>

              {/* Progress Bar Component */}
              <div className="mb-8 p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                <div className="flex items-center justify-between text-xs font-bold text-[#111827] mb-2">
                  <span>Progres Pelaksanaan</span>
                  <span className="text-[#0F382C]">{getProgressPercentage(proker.status, proker.progress)}%</span>
                </div>
                <div className="w-full h-2.5 bg-neutral-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0F382C] rounded-full transition-all duration-500"
                    style={{ width: `${getProgressPercentage(proker.status, proker.progress)}%` }}
                  />
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="p-2.5 rounded-xl bg-neutral-100 border border-neutral-200 text-[#0F382C]">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider opacity-70">Pelaksanaan</p>
                    <p className="text-sm font-semibold text-[#111827]">{proker.date || "Jadwal Menyusul"}</p>
                  </div>
                </div>
                {proker.location && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="p-2.5 rounded-xl bg-neutral-100 border border-neutral-200 text-[#0F382C]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider opacity-70">Lokasi</p>
                      <p className="text-sm font-semibold text-[#111827]">{proker.location}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Extended Details */}
              <div className="prose max-w-none text-[#374151] leading-relaxed">
                <p className="text-base md:text-lg">
                  {proker.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}

export function StatusBadge({ status }: { status: ProkerStatus }) {
  let colors = "";
  let label = "";

  switch (status) {
    case "Completed":
      colors = "bg-emerald-700 text-white border-emerald-800";
      label = "Selesai";
      break;
    case "In Progress":
      colors = "bg-[#0F382C] text-white border-[#0F382C]";
      label = "Berjalan";
      break;
    case "Planned":
      colors = "bg-neutral-100 text-gray-800 border-neutral-300";
      label = "Direncanakan";
      break;
  }

  return (
    <span className={`px-3 py-1.5 rounded-full border text-xs font-semibold shadow-xs ${colors}`}>
      {label}
    </span>
  );
}
