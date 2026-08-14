"use client";

import { motion, type Variants } from "framer-motion";
import { Users, Sprout } from "lucide-react";

export function VillageProfileSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="w-full py-16 md:py-24 bg-[#FBFBF9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

        {/* Section Header & Info Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="flex flex-col gap-6">
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-novatica font-bold text-[#111827] leading-tight">
                Mengenal <br />
                <span className="text-[#0F382C]">
                  Somagede
                </span>
              </h2>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="text-[#4B5563] text-lg leading-relaxed max-w-xl">
                Desa Somagede merupakan sebuah wilayah asri yang terletak di Kabupaten Banyumas, Jawa Tengah.
                Berada di kawasan perbukitan hijau dan tidak jauh dari pusat historis Alun-Alun Banyumas, desa ini menawarkan perpaduan sempurna antara udara yang sejuk, letak geografis yang strategis, dan lingkungan yang tenang. Sebuah ruang yang ideal bagi kami untuk belajar, membaur, dan mengabdi.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mt-4">
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                className="bg-white border border-neutral-200/80 p-6 rounded-2xl shadow-xs hover:shadow-md hover:border-[#0F382C]/30 transition-all cursor-pointer"
              >
                <Users className="w-8 h-8 text-[#0F382C] mb-4" />
                <div className="text-3xl font-novatica font-bold text-[#111827] mb-1">4.8K+</div>
                <div className="text-sm text-[#4B5563]">Penduduk Jiwa</div>
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                className="bg-white border border-neutral-200/80 p-6 rounded-2xl shadow-xs hover:shadow-md hover:border-[#0F382C]/30 transition-all cursor-pointer"
              >
                <Sprout className="w-8 h-8 text-[#0F382C] mb-4" />
                <div className="text-3xl font-novatica font-bold text-[#111827] mb-1">UMKM</div>
                <div className="text-sm text-[#4B5563]">Roti Gamol &amp; Wisata Lokal</div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-neutral-200/80 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=1200"
              alt="Desa Somagede"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
