# Digital Atlas & UX Architecture Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the KKN 004 Somagede digital portal into a world-class web application with a Split Panel Digital Atlas layout (`/peta`), dynamic editorial storybook routes (`/storybook/[slug]`), and unified Framer Motion spring physics.

**Architecture:** 
- Desktop Digital Atlas uses a 65%/35% flex split container with a Leaflet map and sticky Glass Inspector Panel; mobile uses an adaptive Framer Motion Glass Bottom Sheet.
- Storybook creates a dynamic detail route (`/storybook/[slug]/page.tsx`) with a top scroll-progress bar (`scaleX` linked to `useScroll`), rich typography, and sticky TOC.
- System-wide Framer Motion animations use `type: "spring" as const`, `stiffness: 400`, `damping: 25`.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Framer Motion, Tailwind CSS, Leaflet, Lucide Icons, Sanity CMS.

## Global Constraints
- Target directory: `/Users/ray/Documents/KKN/004 SOMAGEDE/Web`
- Color tokens: `--bg-primary: #050a09`, `--accent-teal: #3b9b8d`, `--text-primary: #f4f8f7`, `--text-secondary: #a3c2bc`.
- Touch target minimum: `44x44px` on all buttons and interactive triggers.

---

### Task 1: Digital Atlas Split Panel & Bottom Sheet Refactor

**Files:**
- Create: `src/components/map/SplitMapInspector.tsx`
- Modify: `src/components/map/VillageMap.tsx`
- Modify: `src/components/sections/MapSection.tsx`

**Interfaces:**
- Consumes: `LocationData` interface from `@/components/map/LocationDetailModal`
- Produces: `SplitMapInspector` component providing a 65%/35% desktop layout and mobile bottom sheet.

- [ ] **Step 1: Create SplitMapInspector component**

```tsx
// src/components/map/SplitMapInspector.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Map as MapIcon, Phone, ExternalLink, Compass } from "lucide-react";
import type { LocationData } from "./LocationDetailModal";

interface SplitMapInspectorProps {
  location: LocationData | null;
  onClose: () => void;
}

export function SplitMapInspector({ location, onClose }: SplitMapInspectorProps) {
  if (!location) {
    return (
      <div className="hidden lg:flex flex-col items-center justify-center h-full p-8 text-center bg-[#0b1917]/90 backdrop-blur-xl border border-white/10 rounded-3xl">
        <Compass className="w-12 h-12 text-teal-400 opacity-60 mb-4 animate-spin" style={{ animationDuration: '10s' }} />
        <h4 className="text-xl font-bold text-white mb-2">Pilih Pin di Peta</h4>
        <p className="text-sm text-[var(--text-secondary)]">Klik penanda lokasi pada peta untuk melihat detail potensi UMKM & Wisata Somagede.</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="w-full h-full flex flex-col bg-[#0b1917]/95 backdrop-blur-2xl border border-white/15 rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="relative w-full h-48 sm:h-56 bg-[#1b4d44]/30 shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Tutup Detail Location"
          >
            <X className="w-5 h-5 text-teal-300" />
          </button>

          {location.coverImage ? (
            <img src={location.coverImage} alt={location.name} className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-teal-500/40">
              <MapIcon className="w-16 h-16" />
            </div>
          )}
          <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs font-bold text-teal-200 uppercase">
            {location.category}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1917] via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="flex-1 p-6 flex flex-col overflow-y-auto">
          <h3 className="text-2xl font-novatica font-bold text-white mb-3">{location.name}</h3>
          <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed mb-6 flex-1">
            {location.description}
          </p>

          <div className="flex flex-col gap-3 mt-auto shrink-0">
            {location.whatsappContact && (
              <a
                href={`https://wa.me/${location.whatsappContact.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-[#0B1917] font-bold text-sm transition-all shadow-[0_0_15px_rgba(59,155,141,0.4)] min-h-[48px]"
              >
                <Phone className="w-4 h-4" />
                Hubungi via WhatsApp
              </a>
            )}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/20 transition-all min-h-[48px]"
            >
              <ExternalLink className="w-4 h-4 text-teal-300" />
              Petunjuk Arah Google Maps
            </a>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Refactor VillageMap to integrate Split Panel Desktop / Bottom Sheet Mobile**

Update `VillageMap.tsx` to place Map (65%) side-by-side with `SplitMapInspector` (35%) on desktop (`lg:flex-row`).

- [ ] **Step 3: Test Split Panel Layout**

Run `npm run build` to verify layout components compile cleanly.

---

### Task 2: Dynamic Storybook Detail Route (`/storybook/[slug]`)

**Files:**
- Create: `src/app/storybook/[slug]/page.tsx`
- Modify: `src/components/storybook/StoryCard.tsx`
- Modify: `src/components/storybook/StorybookGrid.tsx`

**Interfaces:**
- Consumes: `StoryData` interface
- Produces: Dynamic article page with top scroll-progress bar, author bio, and sticky table of contents.

- [ ] **Step 1: Create dynamic route page `src/app/storybook/[slug]/page.tsx`**

```tsx
// src/app/storybook/[slug]/page.tsx
"use client";

import { use } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock, Share2, BookOpen } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

export default function StoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] w-full flex flex-col relative">
      {/* Top Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 via-emerald-400 to-mint z-[100] origin-left"
        style={{ scaleX }}
      />

      <div className="h-28 md:h-36 w-full flex-shrink-0" />

      <article className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-8 py-8">
        <Link 
          href="/storybook" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors mb-8 p-2 rounded-xl bg-white/5 border border-white/10 min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Buku Kenangan
        </Link>

        <div className="flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider text-teal-300 mb-4">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10">
            <CalendarDays className="w-4 h-4" />
            <span>20 Juli 2026</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10">
            <Clock className="w-4 h-4" />
            <span>5 min read</span>
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-6xl font-novatica font-bold text-white mb-6 leading-tight">
          Catatan Pengabdian Somagede
        </h1>

        <div className="flex items-center justify-between pb-8 mb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold">K</div>
            <div>
              <p className="text-sm font-bold text-white">Tim Redaksi KKN 004</p>
              <p className="text-xs text-[var(--text-secondary)]">Divisi Humas & Pubdekdok</p>
            </div>
          </div>
        </div>

        <div className="prose prose-invert prose-teal md:prose-lg max-w-none text-[var(--text-secondary)] leading-relaxed space-y-6">
          <p className="text-lg md:text-xl text-teal-100 font-medium leading-relaxed">
            Pengabdian di Desa Somagede memberikan berbagai pengalaman dan memori berharga tentang gotong royong dan hangatnya keramahan warga.
          </p>
          <p>
            Setiap harinya, tim KKN 004 berinteraksi langsung dengan warga desa, mengidentifikasi potensi lokal mulai dari gula jawa hingga kawasan wisata alam.
          </p>
        </div>
      </article>

      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Update `StoryCard.tsx` and `StorybookGrid.tsx` to link to `/storybook/[slug]`**

Allow users to click directly to open full article dynamic URL route `/storybook/${story.id}` while keeping quick preview trigger.

---

### Task 3: Motion Physics & Animation Rollout

**Files:**
- Modify: `src/components/sections/HeroSection.tsx`
- Modify: `src/components/sections/VillageProfileSection.tsx`
- Modify: `src/components/sections/ExploreModulesGrid.tsx`

**Interfaces:**
- Consumes: Framer Motion `motion`, `useScroll`, `useSpring`
- Produces: Smooth spring physics (`stiffness: 400`, `damping: 25`) and staggered reveals across pages.

- [ ] **Step 1: Apply spring physics and staggered reveals in sections**
- [ ] **Step 2: Verify zero layout shift and smooth scroll behavior**

---

### Task 4: Verification & Build Validation

**Files:**
- Execute: `npm run build`

- [ ] **Step 1: Run production build `npm run build` in `/Users/ray/Documents/KKN/004 SOMAGEDE/Web`**
- [ ] **Step 2: Verify zero TypeScript errors and all routes static/dynamic generation**
