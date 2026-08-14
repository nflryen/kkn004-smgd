import { StorybookSection } from "@/components/sections/StorybookSection";
import { Footer } from "@/components/layout/Footer";
import { client } from "@/sanity/lib/client";
import { STORYBOOK_QUERY } from "@/sanity/lib/queries";
import type { StoryData } from "@/data/stories";

export const revalidate = 10;

export default async function StorybookPage() {
  const stories = (await client.fetch(STORYBOOK_QUERY).catch(() => [])) as StoryData[];

  return (
    <main className="min-h-screen bg-[#FBFBF9] text-[#111827] w-full flex flex-col pt-28 md:pt-36 pb-20">
      <div className="flex-1 w-full">
        <StorybookSection stories={stories} />
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}
