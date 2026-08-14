"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapFilters, type FilterCategory } from "./MapFilters";
import { SplitMapInspector } from "./SplitMapInspector";
import { parseLocationCoordinates, type LocationData } from "./LocationDetailModal";
import { Layers, Map as MapIcon, Globe } from "lucide-react";

export const DUMMY_LOCATIONS: LocationData[] = [
  {
    id: "umkm-1",
    name: "Mie Ayam Pak Eko",
    title: "Mie Ayam Pak Eko",
    category: "UMKM",
    latitude: -7.5270,
    longitude: 109.3305,
    gmapsUrl: "https://maps.app.goo.gl/8CPvfA5twFKtUR1h8?g_st=aw",
    description: "Kuliner mie ayam legendaris yang telah berjalan selama 13 tahun dengan racikan personal. Menyajikan mie ayam original, mie ayam ceker spesial, kepala, hingga bakso. Berlokasi strategis di depan Puskesmas Somagede.",
    whatsappContact: "085643384168",
    operationalHours: "09.00 - 21.00 WIB (Buka Setiap Hari)"
  },
  {
    id: "umkm-2",
    name: "Intan Kripik",
    title: "Intan Kripik",
    category: "UMKM",
    latitude: -7.5245,
    longitude: 109.3290,
    gmapsUrl: "https://share.google/PVzzLaAzfMRwbjykO",
    description: "Sentra olahan keripik dan sriping renyah khas Somagede yang berdiri sejak 15 tahun lalu. Menyediakan sriping original serta varian rasa kekinian seperti coklat, matcha, tiramisu, dan strawberry. Berlokasi di sebelah utara SMK Muhammadiyah Somagede.",
    whatsappContact: "085227505004",
    operationalHours: "Buka Setiap Hari"
  },
  {
    id: "umkm-3",
    name: "Dapur Roti Gamol",
    title: "Dapur Roti Gamol",
    category: "UMKM",
    latitude: -7.5295,
    longitude: 109.3325,
    gmapsUrl: "https://share.google/PVzzLaAzfMRwbjykO",
    description: "Produsen roti modern dengan kapasitas 100 pcs per hari dan aneka pilihan rasa premium, mulai dari coklat keju, tiramisu crunchy, hingga abon mayo pedas gurih. Berlokasi di belakang SDN 01 Somagede.",
    whatsappContact: "085742028456",
    operationalHours: "Buka Setiap Hari"
  },
  {
    id: "umkm-4",
    name: "Annajah Ice Cream",
    title: "Annajah Ice Cream",
    category: "UMKM",
    latitude: -7.5310,
    longitude: 109.3285,
    gmapsUrl: "https://maps.app.goo.gl/y5csw4AhNTR6LPoz6",
    description: "Penyedia aneka es tradisional dan es krim segar ramah anak (es mambo, es gabus, es lilin, hingga es krim cup varian matcha, durian, dan coklat). Berlokasi dekat TPQ Al-Irsyad Somagede.",
    whatsappContact: "085712862146",
    operationalHours: "Buka Setiap Hari"
  },
  {
    id: "umkm-5",
    name: "Bakso Cuanki Mba Desti",
    title: "Bakso Cuanki Mba Desti",
    category: "UMKM",
    latitude: -7.5280,
    longitude: 109.3360,
    gmapsUrl: "https://maps.app.goo.gl/veK3Gk6tCWk19HEy8",
    description: "Kuliner bakso cuanki favorit yang telah beroperasi selama 7 tahun dengan kapasitas 150 porsi harian. Menyajikan bakso telur puyuh, bakso mercon pedas, bakso urat, daging, hingga bakso beranak. Berlokasi di Pasar Somagede arah Taman Loka Asri.",
    whatsappContact: "083891370601",
    operationalHours: "10.00 WIB - Habis (Buka Setiap Hari)"
  },
  {
    id: "umkm-6",
    name: "Mie Ayam Siam",
    title: "Mie Ayam Siam",
    category: "UMKM",
    latitude: -7.5260,
    longitude: 109.3340,
    gmapsUrl: "https://maps.app.goo.gl/5yHjhYZjEk4p5T4JA",
    description: "Warung mie ayam legendaris dengan resep otentik selama 18 tahun pelayanan. Menawarkan kelezatan mie ayam original yang konsisten dan lezat. Berlokasi di Jl. Raya Somagede (sebelah KOPDES Merah Putih).",
    whatsappContact: "085647608522",
    operationalHours: "08.00 - 20.00 WIB (Buka Setiap Hari)"
  },
  {
    id: "umkm-7",
    name: "Ondol-Ondol Mbah Ribut",
    title: "Ondol-Ondol Mbah Ribut",
    category: "UMKM",
    latitude: -7.5335,
    longitude: 109.3310,
    gmapsUrl: "https://maps.app.goo.gl/Qp5TaTY7G3LtHxUJ7",
    description: "Jajanan sarapan tradisional khas Banyumasan: ondol-ondol gurih, niwon, dan combro hangat yang dibuat fresh setiap fajar. Berlokasi di Jl. Turi (depan Masjid Nurul Hikmah Karanganyar).",
    whatsappContact: "08132639512",
    operationalHours: "04.30 - 08.00 WIB (Pagi)"
  },
  {
    id: "umkm-8",
    name: "Kembar Fried Chicken",
    title: "Kembar Fried Chicken",
    category: "UMKM",
    latitude: -7.5290,
    longitude: 109.3330,
    gmapsUrl: "https://maps.app.goo.gl/5qbw24riimcLr4Xt5",
    description: "Ayam goreng krispi gurih dengan potongan paha, dada, sayap, ceker, dan ati ampela renyah dengan harga terjangkau. Berlokasi tepat di depan SDN 01 Somagede.",
    whatsappContact: "085779009431",
    operationalHours: "09.00 - 18.00 WIB"
  },
  {
    id: "umkm-9",
    name: "Ketupat Landan Mbah Dakem",
    title: "Ketupat Landan Mbah Dakem",
    category: "UMKM",
    latitude: -7.5345,
    longitude: 109.3295,
    gmapsUrl: "https://maps.app.goo.gl/8CPvfA5twFKtUR1h8",
    description: "Sentra perajin ketupat landan tradisional legendaris selama 40 tahun dengan kapasitas produksi 30 kg beras per hari. Menghasilkan ketupat pulen kenyal khas tradisi lokal Somagede.",
    whatsappContact: "085747953123",
    operationalHours: "Buka Setiap Hari"
  },
  {
    id: "wisata-10",
    name: "Galeri Seni Jaran Kepang Taruna Karya",
    title: "Galeri Seni Jaran Kepang Taruna Karya",
    category: "Wisata",
    latitude: -7.5235,
    longitude: 109.3350,
    gmapsUrl: "https://maps.app.goo.gl/8CPvfA5twFKtUR1h8",
    description: "Pusat pelestarian seni budaya dan kerajinan kesenian jaran kepang / ebeg tradisional khas Desa Somagede yang dikelola oleh Bapak Eko Teguh Prayitno.",
    whatsappContact: "081558098067",
    operationalHours: "Sesuai Jadwal Kegiatan"
  }
];

// Initial Center (Balai Desa Somagede)
const SOMAGEDE_CENTER: [number, number] = [-7.5285, 109.3315];

const createCustomIcon = (category: string, index: number = 0) => {
  let colorClass = "bg-[#0F382C]"; // default
  if (category === "UMKM") colorClass = "bg-amber-600";
  if (category === "Wisata") colorClass = "bg-emerald-600";
  if (category === "Fasilitas Publik") colorClass = "bg-blue-600";

  const delaySec = (index * 0.08 + 0.2).toFixed(2);

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
                ? "bg-[#0F382C] text-[#ffffff] shadow-xs"
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
                ? "bg-[#0F382C] text-[#ffffff] shadow-xs"
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
                ? "bg-[#0F382C] text-[#ffffff] shadow-xs"
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
