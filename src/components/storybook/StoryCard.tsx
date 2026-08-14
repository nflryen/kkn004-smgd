"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowRight, Eye } from "lucide-react";
import type { StoryData } from "@/data/stories";
import { urlForImage } from "@/sanity/lib/image";

interface StoryCardProps {
  story: StoryData;
  onPreview?: () => void;
  onClick?: () => void;
}

const FALLBACK_THUMBNAIL = "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=800";

export function StoryCard({ story, onPreview, onClick }: StoryCardProps) {
  const storySlug = story.slug || story.id || (story as any)._id || "1";
  const href = `/storybook/${storySlug}`;

  const handleQuickPreview = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onPreview) {
      onPreview();
    } else if (onClick) {
      onClick();
    }
  };

  // Safe Image URL Resolution with Sanity Builder & Fallback
  const rawStory = story as any;
  const coverImageUrl: string =
    typeof rawStory.coverImage === "string" && rawStory.coverImage
      ? rawStory.coverImage
      : rawStory.coverImageUrl
      ? rawStory.coverImageUrl
      : rawStory.coverImage?.asset?.url
      ? rawStory.coverImage.asset.url
      : rawStory.coverImage
      ? urlForImage(rawStory.coverImage).url()
      : FALLBACK_THUMBNAIL;

  return (
    <Link href={href} className="block h-full group focus:outline-none">
      <motion.div
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
        className="relative cursor-pointer flex flex-col bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-xs group-hover:shadow-md group-hover:border-[#0F382C]/30 transition-all duration-300 h-full"
      >
        {/* Image Header */}
        <div className="relative w-full h-56 bg-neutral-100 overflow-hidden shrink-0">
          <img
            src={coverImageUrl}
            alt={story.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              // Fallback image on network/404 error
              (e.target as HTMLImageElement).src = FALLBACK_THUMBNAIL;
            }}
          />
          
          {/* Reading Time Badge */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0F382C] text-white text-xs font-semibold shadow-xs">
            <Clock className="w-3.5 h-3.5 text-white/90" />
            {story.readingTime || "5 min read"}
          </div>

          {/* Quick Preview Trigger Button */}
          {(onPreview || onClick) && (
            <button
              onClick={handleQuickPreview}
              className="absolute top-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-[#111827] font-semibold text-xs shadow-md border border-neutral-200 min-h-[36px]"
              title="Pratinjau Cepat Modal"
              aria-label="Pratinjau Cepat Cerita"
            >
              <Eye className="w-3.5 h-3.5 text-[#0F382C]" />
              <span>Pratinjau</span>
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-6">
          <span className="text-xs font-bold text-[#0F382C] uppercase tracking-widest mb-3">
            {story.publishDate || (story as any).publishedAt || "20 Juli 2026"}
          </span>
          <h3 className="text-xl font-novatica font-bold text-[#111827] mb-4 line-clamp-2 leading-snug group-hover:text-[#0F382C] transition-colors">
            {story.title}
          </h3>
          
          {/* Author Footer */}
          <div className="mt-auto pt-5 border-t border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {story.authorPhoto ? (
                <img src={story.authorPhoto} alt={story.authorName} className="w-8 h-8 rounded-full border border-neutral-200 object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#0F382C] flex items-center justify-center text-white text-xs font-bold">
                  {(story.authorName || "T").charAt(0)}
                </div>
              )}
              <span className="text-xs font-medium text-gray-600">
                Oleh <span className="text-[#111827] font-semibold">{story.authorName || (story as any).author || "Tim KKN 004"}</span>
              </span>
            </div>

            <ArrowRight className="w-4 h-4 text-[#0F382C] transform group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
