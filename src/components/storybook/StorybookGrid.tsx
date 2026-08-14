"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { StoryCard } from "./StoryCard";
import { StoryReaderModal } from "./StoryReaderModal";
import { StoryGridSkeleton } from "@/components/ui/Skeleton";
import { BookOpen } from "lucide-react";
import { DUMMY_STORIES, type StoryData } from "@/data/stories";

export function StorybookGrid({ stories, isLoading }: { stories?: StoryData[]; isLoading?: boolean }) {
  const [selectedStory, setSelectedStory] = useState<StoryData | null>(null);
  
  const data = stories && stories.length > 0 ? stories : DUMMY_STORIES;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
    <div className="w-full">
      {isLoading ? (
        <StoryGridSkeleton count={3} />
      ) : data.length === 0 ? (
        <div className="w-full py-16 flex flex-col items-center justify-center text-center bg-white border border-neutral-200 rounded-3xl p-8 shadow-xs">
          <BookOpen className="w-12 h-12 text-[#0F382C] mb-4 opacity-80" />
          <h3 className="text-xl font-bold text-[#111827] mb-2">Belum Ada Cerita Jurnal</h3>
          <p className="text-gray-500 text-sm max-w-sm">Jurnal dan cerita pengabdian akan segera dipublikasikan.</p>
        </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {data.map((story, idx) => (
            <motion.div key={story.id || story.slug || idx} variants={itemVariants}>
              <StoryCard 
                story={story} 
                onPreview={() => setSelectedStory(story)} 
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Quick Reader Modal */}
      <StoryReaderModal 
        story={selectedStory} 
        onClose={() => setSelectedStory(null)} 
      />
    </div>
  );
}
