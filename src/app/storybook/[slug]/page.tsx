import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { STORYBOOK_BY_SLUG_QUERY } from "@/sanity/lib/queries";
import { getStoryByIdOrSlug } from "@/data/stories";
import { StoryDetailClient } from "@/components/storybook/StoryDetailClient";

export const revalidate = 10;

export default async function StoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Fetch Live Document directly from Sanity CMS
  const sanityStory = await client.fetch(STORYBOOK_BY_SLUG_QUERY, { slug }).catch(() => null);

  // 2. Local fallback story if Sanity is offline or missing
  const localStory = getStoryByIdOrSlug(slug);

  const story: any = sanityStory || localStory;

  if (!story) {
    notFound();
  }

  console.log("Rendering Story Detail Page for Author:", story?.authorName || story?.author || "Tim KKN 004");

  return <StoryDetailClient story={story} slug={slug} />;
}
