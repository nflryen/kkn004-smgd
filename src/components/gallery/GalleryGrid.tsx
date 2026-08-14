"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { LightboxModal } from "./LightboxModal";
import { Maximize2 } from "lucide-react";
import { urlForImage } from "@/sanity/lib/image";

const DUMMY_IMAGES = [
  "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1518134346374-184f9d21ce2e?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1502472581566-8ece71bb2101?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1473161962258-150b0cdba53a?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800",
];

const FALLBACK_GALLERY_IMAGE = "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=800";

export function GalleryGrid({ images }: { images?: (string | any)[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const data = images && images.length > 0 ? images : DUMMY_IMAGES;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 350, damping: 25 }
    }
  };

  const resolveImageUrl = (img: string | any): string => {
    if (!img) return FALLBACK_GALLERY_IMAGE;
    if (typeof img === "string") return img;
    if (img.asset?.url) return img.asset.url;
    if (img.url) return img.url;
    return urlForImage(img).url() || FALLBACK_GALLERY_IMAGE;
  };

  return (
    <div className="w-full">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
      >
        {data.map((rawImg, idx) => {
          const src = resolveImageUrl(rawImg);
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              className="group relative cursor-pointer break-inside-avoid overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-xs hover:shadow-md hover:border-[#0F382C]/30 transition-all duration-300"
              onClick={() => setSelectedImage(src)}
            >
              <div className="relative w-full overflow-hidden bg-neutral-100">
                <img 
                  src={src} 
                  alt={`Dokumentasi ${idx + 1}`} 
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_GALLERY_IMAGE;
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-200 p-3 rounded-full bg-white/90 text-[#0F382C] shadow-md border border-neutral-200">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <LightboxModal image={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}
