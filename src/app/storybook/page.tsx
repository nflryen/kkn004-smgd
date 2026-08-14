import { StorybookSection } from "@/components/sections/StorybookSection";
import { Footer } from "@/components/layout/Footer";
import { client } from "@/sanity/lib/client";
import { STORYBOOK_QUERY } from "@/sanity/lib/queries";
import type { StoryData } from "@/data/stories";

export const revalidate = 10;

export default async function StorybookPage() {
  const stories = (await client.fetch(STORYBOOK_QUERY).catch(() => [])) as StoryData[];

  console.log("Fetched Storybook Articles:", stories);

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] w-full flex flex-col">
      {/* 1. Top Navbar Spacer */}
      <div className="h-28 md:h-36 w-full flex-shrink-0" />

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-0 sm:px-4">
        <StorybookSection stories={stories} />
      </div>

      {/* 3. Bottom Footer Spacer */}
      <div className="h-24 md:h-36 w-full flex-shrink-0" />

      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}
