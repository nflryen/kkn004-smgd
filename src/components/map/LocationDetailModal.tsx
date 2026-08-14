"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Map as MapIcon, Phone, ExternalLink } from "lucide-react";

export interface LocationData {
  id: string;
  name: string;
  title?: string;
  category: string;
  latitude?: number;
  longitude?: number;
  gmapsUrl?: string;
  coverImage?: string;
  description: string;
  whatsappContact?: string;
}

export function parseLocationCoordinates(loc: Partial<LocationData>): { latitude: number; longitude: number } {
  if (typeof loc.latitude === "number" && typeof loc.longitude === "number" && !isNaN(loc.latitude) && !isNaN(loc.longitude)) {
    return { latitude: loc.latitude, longitude: loc.longitude };
  }

  const url = loc.gmapsUrl || "";
  const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/) || url.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/) || url.match(/(-?\d+\.\d+),\s*(-?\d+\.\d+)/);

  const lat = match ? parseFloat(match[1]) : -7.5285;
  const lng = match ? parseFloat(match[2]) : 109.3315;

  return { latitude: lat, longitude: lng };
}

interface LocationDetailModalProps {
  location: LocationData | null;
  onClose: () => void;
}

export function LocationDetailModal({ location, onClose }: LocationDetailModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (location) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [location]);

  if (!mounted) return null;

  const locationTitle = location?.title || location?.name || "Detail Lokasi";
  const { latitude, longitude } = location ? parseLocationCoordinates(location) : { latitude: -7.5285, longitude: 109.3315 };
  const directionUrl = location?.gmapsUrl || `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  const modalContent = (
    <AnimatePresence>
      {location && (
        <div className="fixed inset-0 z-[300] bg-black/85 backdrop-blur-md overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
          {/* Backdrop interaction to close */}
          <div className="absolute inset-0 min-h-full" onClick={onClose} />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed inset-0 w-full h-full bg-[#0b1917] flex flex-col z-[300] sm:relative sm:max-w-4xl sm:max-h-[90vh] sm:rounded-3xl sm:my-auto sm:border sm:border-white/15 sm:shadow-2xl sm:overflow-hidden"
          >
            {/* Map Header Container (Top) */}
            <div className="relative w-full h-[40vh] md:h-[50vh] flex-shrink-0 bg-[var(--accent-emerald)]/30">
              {/* Ergonomic Touch Target Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors shadow-lg min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95"
                aria-label="Tutup Detail Peta"
              >
                <X className="w-5 h-5 text-teal-300" />
              </button>

              {location.coverImage ? (
                <img
                  src={location.coverImage}
                  alt={locationTitle}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-teal-500/30">
                  <MapIcon className="w-16 h-16" />
                </div>
              )}
              {/* Category Badge */}
              <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs font-bold tracking-wider text-teal-200 shadow-lg uppercase z-10">
                {location.category}
              </div>
              {/* Fade to body gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1917] via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Content Wrapper */}
            <div className="flex-1 w-full p-6 sm:p-8 flex flex-col overflow-y-auto">
              <h2 className="text-3xl md:text-4xl font-novatica font-bold text-white mb-4 leading-tight shrink-0">{locationTitle}</h2>
              <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed mb-8 shrink-0">
                {location.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 mt-auto shrink-0">
                {location.whatsappContact && (
                  <a
                    href={`https://wa.me/${location.whatsappContact.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-teal-500 hover:bg-teal-400 text-[#0B1917] font-bold text-sm md:text-base transition-all shadow-[0_0_20px_rgba(59,155,141,0.4)] hover:shadow-[0_0_30px_rgba(59,155,141,0.6)] active:scale-[0.98] min-h-[48px]"
                  >
                    <Phone className="w-5 h-5" />
                    Hubungi via WhatsApp
                  </a>
                )}
                <a
                  href={directionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm md:text-base border border-white/20 hover:border-teal-400/50 transition-all active:scale-[0.98] min-h-[48px]"
                >
                  <ExternalLink className="w-5 h-5 text-teal-300" />
                  Petunjuk Arah (Google Maps)
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
