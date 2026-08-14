"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, 
  CalendarDays, 
  Clock, 
  Share2, 
  BookOpen, 
  Check, 
  Tag,
  Eye 
} from "lucide-react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Footer } from "@/components/layout/Footer";
import { urlForImage } from "@/sanity/lib/image";

const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl md:text-4xl font-novatica font-bold text-[#111827] mt-8 mb-4 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-novatica font-bold text-[#111827] mt-8 mb-4 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-novatica font-bold text-[#111827] mt-6 mb-3">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-[#374151] text-base md:text-lg leading-relaxed mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 p-6 rounded-2xl bg-[#0F382C]/[0.06] border border-[#0F382C]/15 text-[#0F382C] italic text-lg md:text-xl text-center font-semibold">
        "{children}"
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-6 text-[#374151] pl-4 text-base md:text-lg">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 text-[#374151] pl-4 text-base md:text-lg">
        {children}
      </ol>
    ),
  },
  types: {
    image: ({ value }) => {
      const imageUrl = value?.asset?.url || (value ? urlForImage(value).url() : "");
      if (!imageUrl) return null;
      return (
        <div className="my-8 rounded-2xl overflow-hidden border border-neutral-200 shadow-sm bg-neutral-100">
          <img
            src={imageUrl}
            alt={value?.alt || "Foto Artikel Jurnal"}
            className="w-full h-auto object-cover max-h-[500px]"
          />
          {value?.caption && (
            <p className="p-3 text-center text-xs text-gray-500 italic bg-neutral-50 border-t border-neutral-100">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
};

export function StoryDetailClient({ story, slug }: { story: any; slug: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [copied, setCopied] = useState(false);

  // Smart Baseline View Counter Calculation
  const calculateBaselineViews = (slugStr: string) => {
    const charSum = slugStr.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return 180 + ((charSum * 17) % 170); // Baseline range 180–350 views
  };

  const initialViews = story.views && story.views > 0 ? story.views : calculateBaselineViews(slug);
  const [views, setViews] = useState<number>(initialViews);

  // Dynamic View Counter Increment on Mount
  useEffect(() => {
    setViews((prev) => prev + 1);
  }, [slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Safe Cover Image URL Resolution
  const coverImageUrl: string | null =
    typeof story.coverImage === "string"
      ? story.coverImage
      : story.coverImageUrl
      ? story.coverImageUrl
      : story.coverImage?.asset?.url
      ? story.coverImage.asset.url
      : story.coverImage
      ? urlForImage(story.coverImage).url()
      : null;

  const authorName = story.authorName || story.author || "Tim Redaksi KKN 004";
  const authorRole = story.authorRole || "Penopang Karya";
  const category = story.category || "Catatan Pengabdian";
  const publishDate = story.publishDate || story.publishedAt || "20 Juli 2026";

  const bodyContent = story.body || story.content;

  return (
    <main className="min-h-screen bg-[#FBFBF9] w-full flex flex-col relative overflow-x-hidden">
      {/* Top Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#0F382C] z-[100] origin-left shadow-xs"
        style={{ scaleX }}
      />

      {/* Header Spacer */}
      <div className="h-28 md:h-36 w-full flex-shrink-0" />

      {/* Main Article Container */}
      <div className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-6 pb-28 md:pb-16 flex flex-col">

        {/* Navigation Bar & Share */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link 
            href="/storybook" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#111827] hover:text-[#0F382C] transition-all px-4 py-2.5 rounded-2xl bg-white border border-neutral-200 shadow-xs min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4 text-[#0F382C]" />
            <span>Kembali ke Buku Kenangan</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-700 hover:text-[#111827] transition-all px-3.5 py-2.5 rounded-2xl bg-white border border-neutral-200 shadow-xs min-h-[44px]"
            aria-label="Bagikan Cerita"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-700" />
                <span className="text-emerald-800 font-bold">Tersalin!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-[#0F382C]" />
                <span className="hidden sm:inline">Bagikan</span>
              </>
            )}
          </button>
        </div>

        {/* Hero Header Card */}
        <motion.article 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-white border border-neutral-200/90 rounded-3xl overflow-hidden shadow-xs mb-10"
        >
          {coverImageUrl && (
            <div className="relative w-full h-64 md:h-96 overflow-hidden bg-neutral-100">
              <img 
                src={coverImageUrl} 
                alt={story.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-gray-600 mb-6">
              <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0F382C] text-white">
                <Tag className="w-3.5 h-3.5 text-white/90" />
                <span>{category}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-gray-700">
                <CalendarDays className="w-3.5 h-3.5 text-[#0F382C]" />
                <span>{publishDate}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-gray-700">
                <Clock className="w-3.5 h-3.5 text-[#0F382C]" />
                <span>{story.readingTime || "5 min read"}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold">
                <Eye className="w-3.5 h-3.5 text-[#0F382C]" />
                <span>{views} Pembaca</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-novatica font-bold text-[#111827] mb-6 leading-tight">
              {story.title}
            </h1>

            <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
              <div className="flex items-center gap-4">
                {story.authorPhoto ? (
                  <img 
                    src={story.authorPhoto} 
                    alt={authorName} 
                    className="w-12 h-12 rounded-full border border-neutral-200 object-cover shadow-xs"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#0F382C] flex items-center justify-center text-white font-bold text-lg shadow-xs">
                    {authorName.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-base font-bold text-[#111827]">
                    {authorName}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">
                    {authorRole}
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-100 border border-neutral-200 text-xs text-[#0F382C] font-semibold">
                <BookOpen className="w-4 h-4 text-[#0F382C]" />
                <span>Jurnal Somagede</span>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Article Content Body with PortableText & Fallback Support */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white border border-neutral-200/90 rounded-3xl p-6 md:p-12 shadow-xs"
        >
          {Array.isArray(bodyContent) ? (
            <PortableText value={bodyContent} components={portableTextComponents} />
          ) : (
            <div className="prose prose-neutral md:prose-lg max-w-none text-[#374151] leading-relaxed space-y-6">
              {bodyContent}
            </div>
          )}
        </motion.div>

        {/* Return Footer Card */}
        <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-[#111827] font-bold text-lg mb-1">Nikmati Cerita Pengabdian Lainnya</h4>
            <p className="text-xs text-gray-500">Jelajahi berbagai jurnal harian dan dokumentasi kegiatan KKN 004 Somagede.</p>
          </div>
          <Link 
            href="/storybook"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#0F382C] hover:bg-[#155443] text-white font-bold text-sm transition-all shadow-sm min-h-[44px] shrink-0"
          >
            <BookOpen className="w-4 h-4" />
            Lihat Semua Cerita
          </Link>
        </div>

      </div>

      {/* Global Footer */}
      <div className="mt-16">
        <Footer />
      </div>
    </main>
  );
}
