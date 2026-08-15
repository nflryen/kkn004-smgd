import { MapSection } from "@/components/sections/MapSection";
import { Footer } from "@/components/layout/Footer";
import { client } from "@/sanity/lib/client";
import { VILLAGE_POTENCY_QUERY } from "@/sanity/lib/queries";
import type { LocationData } from "@/components/map/LocationDetailModal";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function PetaPage() {
  const potencies = (await client.fetch(VILLAGE_POTENCY_QUERY, {}, { cache: "no-store" }).catch(() => [])) as LocationData[];

  return (
    <main className="min-h-screen bg-[#FBFBF9] text-[#111827] w-full flex flex-col pt-28 md:pt-36 pb-20">
      <div className="flex-1 w-full">
        <MapSection potencies={potencies} />
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </main>
  );
}
