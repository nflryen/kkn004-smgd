"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface LightboxModalProps {
  image: string | null;
  onClose: () => void;
}

export function LightboxModal({ image, onClose }: LightboxModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (image) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [image]);

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {image && (
        <div className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-xl overflow-y-auto p-4 md:p-12 flex items-center justify-center cursor-zoom-out" onClick={onClose}>
          {/* Backdrop interaction to close */}
          <div className="absolute inset-0 min-h-full" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="relative z-10 max-w-6xl w-full my-auto flex items-center justify-center cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 md:-right-12 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95 shadow-xl"
              aria-label="Tutup Galeri Visual"
            >
              <X className="w-6 h-6 text-teal-300" />
            </button>
            <img 
              src={image} 
              alt="Gallery View" 
              className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl ring-1 ring-white/20"
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}

