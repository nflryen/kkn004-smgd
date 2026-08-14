"use client";

import { motion, type Variants } from "framer-motion";
import { TeamCard, type TeamMember } from "./TeamCard";

const DUMMY_TEAM: TeamMember[] = [
  { id: "1", name: "Bapak Budi", role: "Sang Penunjuk Arah - DPL", division: "DPL" },
  { id: "2", name: "Ahmad Faisal", role: "Nahkoda Sinergi - Kordes", division: "Kordes" },
  { id: "3", name: "Siti Aminah", role: "Sekretaris 1", division: "Inti" },
  { id: "4", name: "Dewi Lestari", role: "Bendahara 1", division: "Inti" },
  { id: "5", name: "Rizky Pratama", role: "Koordinator", division: "Humas" },
  { id: "6", name: "Nadia Putri", role: "Koordinator", division: "Kesehatan" },
  { id: "7", name: "Toni Setiawan", role: "Koordinator", division: "Ekonomi" },
  { id: "8", name: "Dina Mariana", role: "Koordinator", division: "Acara" },
];

export function TeamGrid({ team }: { team?: TeamMember[] }) {
  const data = team && team.length > 0 ? team : DUMMY_TEAM;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 350, damping: 25 }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
    >
      {data.map((member) => (
        <motion.div key={member.id} variants={itemVariants}>
          <TeamCard member={member} />
        </motion.div>
      ))}
    </motion.div>
  );
}
