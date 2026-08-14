"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapFilters, type FilterCategory } from "./MapFilters";
import { SplitMapInspector } from "./SplitMapInspector";
import { parseLocationCoordinates, type LocationData } from "./LocationDetailModal";
import { Layers, Map as MapIcon, Globe } from "lucide-react";

const DUMMY_LOCATIONS: LocationData[] = [
  {
    id: "1",
    name: "Wisata Alam & Hutan Somagede",
    category: "Wisata",
    latitude: -7.5250,
    longitude: 109.3280,
    description: "Kawasan hutan pinus dan panorama perbukitan yang asri khas Desa Somagede.",
    gmapsUrl: "https://maps.google.com/?q=-7.5250,109.3280",
  },
  {
    id: "2",
    name: "UMKM Gula Jawa Bp. Slamet",
    category: "UMKM",
    latitude: -7.5320,
    longitude: 109.3340,
    description: "Sentra produksi gula jawa olahan penderes kelapa tradisional Somagede.",
    whatsappContact: "6281234567890",
    gmapsUrl: "https://maps.google.com/?q=-7.5320,109.3340",
  },
  {
    id: "3",
    name: "Balai Desa Somagede",
    category: "Fasilitas Publik",
    latitude: -7.5285,
    longitude: 109.3315,
    description: "Pusat pemerintahan dan pelayanan publik Desa Somagede.",
    gmapsUrl: "https://maps.google.com/?q=-7.5285,109.3315",
  },
  {
    id: "4",
    name: "Sentra Edukasi Pertanian Somagede",
    category: "UMKM",
    latitude: -7.5360,
    longitude: 109.3270,
    description: "Kawasan budidaya hortikultura dan edukasi pertanian pangan rakyat.",
    gmapsUrl: "https://maps.google.com/?q=-7.5360,109.3270",
  },
];

// Initial Center (Balai Desa Somagede)
const SOMAGEDE_CENTER: [number, number] = [-7.5285, 109.3315];

const createCustomIcon = (category: string, index: number = 0) => {
  let colorClass = "bg-[#0F382C]"; // default
  if (category === "UMKM") colorClass = "bg-amber-600";
  if (category === "Wisata") colorClass = "bg-emerald-600";
  if (category === "Fasilitas Publik") colorClass = "bg-blue-600";

  const delaySec = (index * 0.12 + 0.3).toFixed(2);

  return L.divIcon({
    className: "bg-transparent border-none",
    html: `<div style="animation: markerPop 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${delaySec}s both;" class="relative w-8 h-8 rounded-full ${colorClass} border-2 border-white shadow-md flex items-center justify-center transform transition-transform hover:scale-110 cursor-pointer">
      <div class="w-2.5 h-2.5 rounded-full bg-white shadow-xs"></div>
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

type MapTileProvider = "satellite" | "roadmap" | "light";

export default function VillageMap({ potencies }: { potencies?: LocationData[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("Semua");
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [tileProvider, setTileProvider] = useState<MapTileProvider>("satellite");

  const data = potencies && potencies.length > 0 ? potencies : DUMMY_LOCATIONS;

  const filteredLocations = data.filter(
    (loc) => activeFilter === "Semua" || loc.category === activeFilter
  );

  // Map Tile Configuration
  const getTileUrl = (provider: MapTileProvider) => {
    switch (provider) {
      case "satellite":
        // Google Hybrid Satellite (Satellite + Place Labels + Roads)
        return "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}";
      case "roadmap":
        // Google Maps Official Vector Roadmap
        return "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}";
      case "light":
        // Carto Voyager Light Tiles
        return "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
    }
  };

  const getTileAttribution = (provider: MapTileProvider) => {
    if (provider === "satellite" || provider === "roadmap") {
      return "&copy; Google Maps Engine &copy; OpenStreetMap contributors";
    }
    return '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full h-auto lg:h-[650px] relative">
      {/* Dynamic Keyframes inline style */}
      <style jsx global>{`
        @keyframes markerPop {
          0% { opacity: 0; transform: scale(0.2) translateY(-20px); }
          70% { opacity: 1; transform: scale(1.15) translateY(0); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {/* Interactive Map Panel (65% Desktop Width) */}
      <div className="relative w-full lg:w-[65%] h-[450px] sm:h-[550px] lg:h-full rounded-3xl overflow-hidden border border-neutral-200/90 shadow-sm bg-[#111827]">
        {/* Map Header / Top-Left Glass Overlay Filters */}
        <div className="absolute top-4 left-4 z-[400] max-w-[calc(100%-2rem)] pointer-events-auto flex flex-col gap-2">
          <MapFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>

        {/* Map Layer Switcher / Top-Right Glass Control */}
        <div className="absolute top-4 right-4 z-[400] pointer-events-auto bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-neutral-200 shadow-md flex items-center gap-1">
          <button
            onClick={() => setTileProvider("satellite")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              tileProvider === "satellite"
                ? "bg-[#0F382C] text-white shadow-xs"
                : "text-gray-700 hover:bg-neutral-100"
            }`}
            title="Google Satelit Hibrida"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Satelit</span>
          </button>
          <button
            onClick={() => setTileProvider("roadmap")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              tileProvider === "roadmap"
                ? "bg-[#0F382C] text-white shadow-xs"
                : "text-gray-700 hover:bg-neutral-100"
            }`}
            title="Google Peta Vektor"
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Peta</span>
          </button>
          <button
            onClick={() => setTileProvider("light")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              tileProvider === "light"
                ? "bg-[#0F382C] text-white shadow-xs"
                : "text-gray-700 hover:bg-neutral-100"
            }`}
            title="Peta Terang Carto"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Terang</span>
          </button>
        </div>

        <MapContainer
          center={SOMAGEDE_CENTER}
          zoom={14}
          scrollWheelZoom={false}
          className="w-full h-full z-0"
          zoomControl={false}
        >
          {/* Dynamic Tile Engine */}
          <TileLayer
            key={tileProvider}
            attribution={getTileAttribution(tileProvider)}
            url={getTileUrl(tileProvider)}
            maxZoom={20}
          />

          <ZoomControl position="bottomright" />

          {filteredLocations.map((loc, idx) => {
            const { latitude, longitude } = parseLocationCoordinates(loc);

            return (
              <Marker
                key={loc.id}
                position={[latitude, longitude]}
                icon={createCustomIcon(loc.category, idx)}
                eventHandlers={{
                  click: () => setSelectedLocation(loc),
                }}
              />
            );
          })}
        </MapContainer>
      </div>

      {/* Glass Inspector Panel (35% Desktop Width) / Mobile Bottom Sheet */}
      <div className="w-full lg:w-[35%] h-auto lg:h-full shrink-0">
        <SplitMapInspector
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
        />
      </div>
    </div>
  );
}
