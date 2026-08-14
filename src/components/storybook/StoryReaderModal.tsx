"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, CalendarDays, ExternalLink } from "lucide-react";
import Link from "next/link";
import { type StoryData } from "@/data/stories";

export type { StoryData };

interface StoryReaderModalProps {
  story: StoryData | null;
  onClose: () => void;
}

export function StoryReaderModal({ story, onClose }: StoryReaderModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (story) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [story]);

  if (!mounted) return null;

  const storySlug = story ? (story.slug || story.id) : "";

  const modalContent = (
    <AnimatePresence>
      {story && (
        <div className="fixed inset-0 z-[300] bg-black/85 backdrop-blur-md overflow-y-auto p-4 sm:p-6 md:p-10 flex items-start justify-center">
          {/* Backdrop interaction to close */}
          <div className="absolute inset-0 min-h-full" onClick={onClose} />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="relative z-10 w-full max-w-3xl my-auto rounded-3xl bg-[#0b1917] border border-white/20 shadow-2xl overflow-hidden"
          >
            {/* Ergonomic Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors shadow-lg min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95"
              aria-label="Tutup Jurnal Cerita"
            >
              <X className="w-5 h-5 text-teal-300" />
            </button>

            {/* Header Image */}
            <div className="w-full h-64 md:h-80 shrink-0 relative bg-[var(--accent-emerald)]/30">
              {story.coverImage ? (
                <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-[#1B4D44]/60 via-[#0B1917]/80 to-[#050a09]" />
              )}
              {/* Fade to body gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1917] via-transparent to-transparent" />
            </div>

            {/* Reading Content */}
            <div className="p-6 md:p-10 relative -mt-12 z-10">
              <div className="max-w-3xl mx-auto">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 mb-4 text-xs font-bold uppercase tracking-wider text-teal-300">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10">
                    <CalendarDays className="w-4 h-4" />
                    <span>{story.publishDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10">
                    <Clock className="w-4 h-4" />
                    <span>{story.readingTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-5xl font-novatica font-bold text-white mb-6 leading-tight">
                  {story.title}
                </h1>

                {/* Author Info & Open Full Route Link */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    {story.authorPhoto ? (
                      <img src={story.authorPhoto} alt={story.authorName} className="w-10 h-10 rounded-full border border-white/20 object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold">
                        {story.authorName.charAt(0)}
                      </div>
                    )}
                    <span className="text-sm font-medium text-[var(--text-secondary)]">
                      Ditulis oleh <strong className="text-white font-semibold">{story.authorName}</strong>
                    </span>
                  </div>

                  <Link
                    href={`/storybook/${storySlug}`}
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 text-xs font-bold border border-teal-500/30 transition-all min-h-[44px]"
                  >
                    <span>Buka Halaman Penuh</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Body Content */}
                <div className="prose prose-invert prose-teal md:prose-lg max-w-none text-[var(--text-secondary)] leading-relaxed">
                  {story.content}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
