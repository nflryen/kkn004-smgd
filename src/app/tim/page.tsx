import { TeamSection } from "@/components/sections/TeamSection";
import { Footer } from "@/components/layout/Footer";
import { client } from "@/sanity/lib/client";
import { TEAM_MEMBERS_QUERY } from "@/sanity/lib/queries";
import type { TeamMember } from "@/components/team/TeamCard";

export const revalidate = 60;

export default async function TimPage() {
  const team = (await client.fetch(TEAM_MEMBERS_QUERY).catch(() => [])) as TeamMember[];

  return (
    <main className="min-h-screen bg-[#FBFBF9] text-[#111827] w-full flex flex-col pt-28 md:pt-36 pb-20">
      <div className="flex-1 w-full">
        <TeamSection team={team} />
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}
