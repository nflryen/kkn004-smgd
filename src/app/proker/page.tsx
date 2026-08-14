import { ProkerSection } from "@/components/sections/ProkerSection";
import { Footer } from "@/components/layout/Footer";
import { client } from "@/sanity/lib/client";
import { PROKERS_QUERY } from "@/sanity/lib/queries";
import type { ProkerData } from "@/components/proker/ProkerDetailModal";

export const revalidate = 60;

export default async function ProkerPage() {
  const prokers = (await client.fetch(PROKERS_QUERY).catch(() => [])) as ProkerData[];

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] w-full flex flex-col">
      {/* 1. Top Navbar Spacer */}
      <div className="h-28 md:h-36 w-full flex-shrink-0" />

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-0 sm:px-4">
        <ProkerSection prokers={prokers} />
      </div>

      {/* 3. Bottom Footer Spacer */}
      <div className="h-24 md:h-36 w-full flex-shrink-0" />

      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}

