"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Home, Map, Briefcase, Users, BookMarked, Camera } from "lucide-react";

const NAV_LINKS = [
  { name: "Beranda", path: "/", icon: Home },
  { name: "Atlas", path: "/peta", icon: Map },
  { name: "Proker", path: "/proker", icon: Briefcase },
  { name: "Tim", path: "/tim", icon: Users },
  { name: "Jurnal", path: "/storybook", icon: BookMarked },
  { name: "Galeri", path: "/galeri", icon: Camera },
];

export function FloatingNav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [mounted, setMounted] = useState(false);
  const [isPastHero, setIsPastHero] = useState(pathname !== "/");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setIsPastHero(true);
    } else {
      setIsPastHero(scrollY.get() > 280);
    }
  }, [pathname, scrollY]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (pathname === "/") {
      setIsPastHero(latest > 280);
    } else {
      setIsPastHero(true);
    }
  });

  if (!mounted || pathname?.startsWith("/admin")) return null;

  return (
    <motion.nav
      initial={{ opacity: pathname === "/" ? 0 : 1, y: pathname === "/" ? -25 : 0 }}
      animate={{
        opacity: isPastHero ? 1 : 0,
        y: isPastHero ? 0 : -25,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      style={{ pointerEvents: isPastHero ? "auto" : "none" }}
      className="fixed bottom-4 md:bottom-auto md:top-6 left-1/2 -translate-x-1/2 z-50 transition-all w-[94%] max-w-2xl md:w-auto"
    >
      <div className="flex items-center justify-around md:justify-center gap-1 md:gap-1.5 px-3 py-2 rounded-full border border-neutral-200/80 bg-white/85 backdrop-blur-2xl shadow-lg shadow-black/5">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.path}
              href={link.path}
              className={`relative px-3 py-2 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-1.5 md:gap-2 min-h-[42px] min-w-[42px] ${
                isActive 
                  ? "text-white font-bold" 
                  : "text-gray-700 hover:text-[#0F382C]"
              }`}
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <link.icon 
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isActive ? "scale-105 text-white" : "opacity-80"
                  }`} 
                />
                <span className={`md:inline-block ${isActive ? "inline-block text-xs md:text-sm tracking-wide" : "hidden md:inline-block"}`}>
                  {link.name}
                </span>
              </span>
              
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute inset-0 bg-[#0F382C] rounded-full shadow-sm"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
