"use client";

import { motion } from "framer-motion";

export function CardSkeleton() {
  return (
    <div className="w-full h-72 rounded-2xl bg-white/5 border border-white/10 overflow-hidden relative animate-shimmer flex flex-col p-6 gap-4">
      <div className="w-24 h-4 rounded-full bg-white/10" />
      <div className="w-3/4 h-8 rounded-lg bg-white/10" />
      <div className="w-full h-16 rounded-lg bg-white/5" />
      <div className="mt-auto flex items-center justify-between">
        <div className="w-20 h-4 rounded-full bg-white/10" />
        <div className="w-10 h-10 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function StorySkeleton() {
  return (
    <div className="w-full h-96 rounded-2xl bg-white/5 border border-white/10 overflow-hidden relative animate-shimmer flex flex-col">
      <div className="w-full h-56 bg-white/10" />
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="w-20 h-3 rounded-full bg-teal-500/20" />
        <div className="w-5/6 h-6 rounded-md bg-white/10" />
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/10" />
          <div className="w-28 h-4 rounded-md bg-white/10" />
        </div>
      </div>
    </div>
  );
}

export function StoryGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <StorySkeleton key={i} />
      ))}
    </div>
  );
}
