import { TeamSection } from "@/components/sections/TeamSection";
import { Footer } from "@/components/layout/Footer";
import { client } from "@/sanity/lib/client";
import { TEAM_MEMBERS_QUERY } from "@/sanity/lib/queries";
import type { TeamMember } from "@/components/team/TeamCard";

export const revalidate = 60;

export default async function TimPage() {
  const team = (await client.fetch(TEAM_MEMBERS_QUERY).catch(() => [])) as TeamMember[];

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] w-full flex flex-col">
      {/* 1. Top Navbar Spacer */}
      <div className="h-28 md:h-36 w-full flex-shrink-0" />

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-0 sm:px-4">
        <TeamSection team={team} />
      </div>

      {/* 3. Bottom Footer Spacer */}
      <div className="h-24 md:h-36 w-full flex-shrink-0" />

      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}

