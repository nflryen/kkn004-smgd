"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Map as MapIcon, Phone, ExternalLink, Compass, Clock } from "lucide-react";
import { parseLocationCoordinates, type LocationData } from "./LocationDetailModal";

interface SplitMapInspectorProps {
  location: LocationData | null;
  onClose: () => void;
}

export function SplitMapInspector({ location, onClose }: SplitMapInspectorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const locationTitle = location?.title || location?.name || "Detail Lokasi";

  const getGmapsUrl = (loc: LocationData) => {
    if (loc.gmapsUrl && loc.gmapsUrl.trim() !== "") {
      return loc.gmapsUrl;
    }
    const { latitude, longitude } = parseLocationCoordinates(loc);
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  };

  // Desktop Panel (Static Side Inspector)
  const renderDesktopInspector = () => {
    if (!location) {
      return (
        <div className="hidden lg:flex flex-col items-center justify-center h-full p-8 text-center bg-white border border-neutral-200/90 rounded-3xl shadow-sm">
          <Compass
            className="w-12 h-12 text-[#0F382C] opacity-60 mb-4 animate-spin"
            style={{ animationDuration: "10s" }}
          />
          <h4 className="text-xl font-bold text-[#111827] mb-2">Pilih Pin di Peta</h4>
          <p className="text-sm text-[#4B5563] leading-relaxed">
            Klik penanda lokasi pada peta untuk melihat detail potensi UMKM, Wisata &amp; Fasilitas Publik Somagede.
          </p>
        </div>
      );
    }

    const directionUrl = getGmapsUrl(location);

    return (
      <div className="hidden lg:flex flex-col w-full h-full bg-white border border-neutral-200/90 rounded-3xl overflow-hidden shadow-md">
        {/* Cover Image Header */}
        <div className="relative w-full h-48 bg-neutral-100 shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 p-2.5 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200 text-gray-800 hover:bg-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95 shadow-sm"
            aria-label="Tutup Detail Lokasi"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>

          {location.coverImage ? (
            <img
              src={location.coverImage}
              alt={locationTitle}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-[#0F382C]/30">
              <MapIcon className="w-16 h-16" />
            </div>
          )}
          <div className="absolute top-3 left-3 px-3.5 py-1 rounded-full bg-[#0F382C] border border-white/10 text-xs font-semibold text-white uppercase tracking-wider shadow-xs">
            {location.category}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Main Body Info */}
        <div className="flex-1 p-6 flex flex-col overflow-y-auto">
          <h3 className="text-2xl font-novatica font-bold text-[#111827] mb-2 leading-snug">
            {locationTitle}
          </h3>

          {location.operationalHours && (
            <div className="inline-flex items-center gap-1.5 mb-3 text-xs font-semibold text-[#0F382C] bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200/80 w-fit">
              <Clock className="w-3.5 h-3.5 text-[#0F382C]" />
              <span>{location.operationalHours}</span>
            </div>
          )}

          <p className="text-[#4B5563] text-sm md:text-base leading-relaxed mb-6 flex-1">
            {location.description}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col gap-3 mt-auto shrink-0">
            {location.whatsappContact && (
              <a
                href={`https://wa.me/${location.whatsappContact.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-[#0F382C] hover:bg-[#155443] text-white font-bold text-sm transition-all shadow-sm min-h-[48px] active:scale-[0.98]"
              >
                <Phone className="w-4 h-4" />
                Hubungi via WhatsApp
              </a>
            )}
            <a
              href={directionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-[#111827] font-semibold text-sm border border-neutral-200 transition-all min-h-[48px] active:scale-[0.98]"
            >
              <ExternalLink className="w-4 h-4 text-[#0F382C]" />
              Petunjuk Arah (Google Maps)
            </a>
          </div>
        </div>
      </div>
    );
  };

  // Mobile Bottom Sheet Portal (Elevated directly to document.body)
  const renderMobilePortalSheet = () => {
    if (!mounted) return null;

    const directionUrl = location ? getGmapsUrl(location) : "#";

    return createPortal(
      <AnimatePresence>
        {location && (
          <div className="fixed inset-0 z-[300] bg-black/40 backdrop-blur-xs flex flex-col justify-end lg:hidden">
            {/* Backdrop Tap to Close */}
            <div className="absolute inset-0" onClick={onClose} />

            <motion.div
              key={location.id}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative z-10 w-full max-h-[80vh] bg-white rounded-t-3xl p-6 pb-28 overflow-y-auto shadow-2xl flex flex-col"
            >
              {/* Drag handle */}
              <div className="w-12 h-1.5 bg-neutral-300 rounded-full mx-auto mb-4 shrink-0" />

              {/* Cover Image Header */}
              <div className="relative w-full h-44 sm:h-52 bg-neutral-100 rounded-2xl overflow-hidden shrink-0 mb-4">
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 z-20 p-2.5 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200 text-gray-800 hover:bg-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95 shadow-sm"
                  aria-label="Tutup Detail Lokasi"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>

                {location.coverImage ? (
                  <img
                    src={location.coverImage}
                    alt={locationTitle}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-[#0F382C]/30">
                    <MapIcon className="w-14 h-14" />
                  </div>
                )}
                <div className="absolute top-3 left-3 px-3.5 py-1 rounded-full bg-[#0F382C] border border-white/10 text-xs font-semibold text-white uppercase tracking-wider shadow-xs">
                  {location.category}
                </div>
              </div>

              {/* Detail Info */}
              <h3 className="text-2xl font-novatica font-bold text-[#111827] mb-2 leading-snug">
                {locationTitle}
              </h3>

              {location.operationalHours && (
                <div className="inline-flex items-center gap-1.5 mb-3 text-xs font-semibold text-[#0F382C] bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200/80 w-fit">
                  <Clock className="w-3.5 h-3.5 text-[#0F382C]" />
                  <span>{location.operationalHours}</span>
                </div>
              )}

              <p className="text-[#4B5563] text-sm leading-relaxed mb-6">
                {location.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-col gap-3 mt-auto shrink-0 pb-4">
                {location.whatsappContact && (
                  <a
                    href={`https://wa.me/${location.whatsappContact.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-[#0F382C] hover:bg-[#155443] text-white font-bold text-sm transition-all shadow-sm min-h-[48px] active:scale-[0.98]"
                  >
                    <Phone className="w-4 h-4" />
                    Hubungi via WhatsApp
                  </a>
                )}
                <a
                  href={directionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-neutral-100 hover:bg-neutral-200 text-[#111827] font-semibold text-sm border border-neutral-200 transition-all min-h-[48px] active:scale-[0.98]"
                >
                  <ExternalLink className="w-4 h-4 text-[#0F382C]" />
                  Petunjuk Arah (Google Maps)
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      document.body
    );
  };

  return (
    <>
      {renderDesktopInspector()}
      {renderMobilePortalSheet()}
    </>
  );
}
