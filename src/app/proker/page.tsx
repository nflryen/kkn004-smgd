import { ProkerSection } from "@/components/sections/ProkerSection";
import { Footer } from "@/components/layout/Footer";
import { client } from "@/sanity/lib/client";
import { PROKERS_QUERY } from "@/sanity/lib/queries";
import type { ProkerData } from "@/components/proker/ProkerDetailModal";

export const revalidate = 60;

export default async function ProkerPage() {
  const prokers = (await client.fetch(PROKERS_QUERY).catch(() => [])) as ProkerData[];

  return (
    <main className="min-h-screen bg-[#FBFBF9] text-[#111827] w-full flex flex-col pt-28 md:pt-36 pb-20">
      <div className="flex-1 w-full">
        <ProkerSection prokers={prokers} />
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}
