"use client";

import { motion } from "framer-motion";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  division: string;
  photo?: string;
  instagram?: string;
  linkedin?: string;
  bio?: string;
}

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
      className="group relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-white border border-neutral-200/80 shadow-xs cursor-pointer hover:shadow-md hover:border-[#0F382C]/30 transition-all duration-300"
    >
      {/* Portrait Background */}
      {member.photo ? (
        <img
          src={member.photo}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center text-[#0F382C] font-bold text-3xl">
          {member.name.charAt(0)}
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/90 via-[#111827]/40 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

      {/* Content Badge & Details */}
      <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col items-center text-center">
        <div className="px-3.5 py-1 mb-2.5 rounded-full bg-[#0F382C] text-white text-[10px] font-semibold uppercase tracking-wider shadow-xs">
          {member.role}
        </div>
        
        <h4 className="text-lg md:text-xl font-novatica font-bold text-white leading-tight mb-1">
          {member.name}
        </h4>
        <p className="text-xs font-medium text-emerald-300 uppercase tracking-widest mb-2">
          {member.division}
        </p>

        {member.bio && (
          <p className="text-xs text-neutral-200 line-clamp-2 mt-2 max-w-[90%] mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed">
            {member.bio}
          </p>
        )}

        {/* Social Links */}
        {(member.instagram || member.linkedin) && (
          <div className="flex items-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            {member.instagram && (
              <a 
                href={member.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#111827] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center border border-white/20 shadow-xs active:scale-95"
                aria-label={`Instagram ${member.name}`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            )}
            {member.linkedin && (
              <a 
                href={member.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#111827] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center border border-white/20 shadow-xs active:scale-95"
                aria-label={`LinkedIn ${member.name}`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
