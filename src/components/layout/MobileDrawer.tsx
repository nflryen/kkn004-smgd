"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MapPin, Users, BookOpen, Home, BookMarked, Camera, ShieldCheck } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "Beranda", href: "/", icon: Home },
  { name: "Digital Atlas", href: "/peta", icon: MapPin },
  { name: "Program Kerja", href: "/proker", icon: BookOpen },
  { name: "Tim KKN", href: "/tim", icon: Users },
  { name: "Buku Kenangan", href: "/storybook", icon: BookMarked },
  { name: "Galeri Visual", href: "/galeri", icon: Camera },
  { name: "Sanity Studio", href: "/admin", icon: ShieldCheck },
];

export function MobileDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Trigger Button (Thumb Zone Optimized - min 44x44px) */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden flex items-center justify-center p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg active:scale-95 transition-transform hover:bg-white/20 min-w-[44px] min-h-[44px]"
        aria-label="Open Navigation Menu"
      >
        <Menu className="w-6 h-6 text-teal-300" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-[#050a09]/85 backdrop-blur-md"
            />

            {/* Slide-over Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-4/5 max-w-xs bg-[#0b1917]/95 backdrop-blur-2xl border-l border-white/15 p-6 flex flex-col shadow-2xl overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-novatica font-bold text-white tracking-wide">Navigasi Portal</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white active:scale-95 transition-transform hover:bg-white/10 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close Navigation Menu"
                >
                  <X className="w-5 h-5 text-teal-300" />
                </button>
              </div>

              <nav className="flex flex-col gap-2.5 flex-1">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3.5 text-base text-[var(--text-primary)] font-medium p-3.5 rounded-2xl hover:bg-white/10 active:bg-white/15 transition-all border border-transparent hover:border-teal-500/30 group min-h-[48px]"
                    >
                      <div className="p-2 bg-[var(--accent-emerald)] rounded-xl shadow-[0_0_15px_rgba(27,77,68,0.5)] group-hover:scale-110 transition-transform">
                        <link.icon className="w-4 h-4 text-teal-300" />
                      </div>
                      <span className="group-hover:text-teal-200 transition-colors">{link.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto pt-6 border-t border-white/10 text-center text-xs text-[var(--text-secondary)]">
                &copy; 2026 KKN 004 Somagede
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

