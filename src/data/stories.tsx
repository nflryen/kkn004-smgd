import React from "react";

export interface StoryData {
  id: string;
  slug: string;
  title: string;
  publishDate: string;
  authorName: string;
  authorRole?: string;
  authorPhoto?: string;
  coverImage?: string;
  readingTime: string;
  category?: string;
  views?: number;
  summary?: string;
  content: React.ReactNode;
  body?: any;
}

export const DUMMY_STORIES: StoryData[] = [
  {
    id: "1",
    slug: "pelepasan-mahasiswa",
    title: "Pelepasan Mahasiswa KKN 004 Somagede oleh Rektorat",
    publishDate: "20 Juli 2026",
    authorName: "Rizky Pratama",
    authorRole: "Ketua Tim KKN 004",
    category: "Kegiatan",
    readingTime: "3 min read",
    views: 312,
    summary: "Pelepasan resmi tim KKN 004 Desa Somagede menandai dimulainya masa pengabdian 35 hari di Kabupaten Banyumas.",
    content: (
      <>
        <p className="text-lg md:text-xl text-[#111827] font-medium leading-relaxed mb-6">
          Hari ini menjadi langkah awal bagi kami, tim KKN 004, untuk mulai mengabdi di Desa Somagede. Acara pelepasan berlangsung dengan khidmat di lapangan rektorat.
        </p>
        <p className="mb-4 text-[#374151]">
          Kami membawa harapan besar untuk dapat bersinergi dengan masyarakat, mengembangkan potensi desa, dan belajar banyak hal dari kehidupan bermasyarakat secara langsung. Sinergi antara dunia akademis dan kearifan lokal warga desa adalah kunci keberhasilan program pengabdian ini.
        </p>
        <p className="mb-4 text-[#374151]">
          Setibanya di Desa Somagede, kami disambut dengan sangat hangat oleh Bapak Kepala Desa beserta jajaran perangkat desa. Kehangatan ini membakar semangat kami untuk merealisasikan berbagai program kerja unggulan, mulai dari pemetaan Digital Atlas, modernisasi kemasan UMKM Gula Jawa, hingga program edukasi digital di SD setempat.
        </p>
        <blockquote className="my-8 p-6 rounded-2xl bg-[#0F382C]/[0.06] border border-[#0F382C]/15 text-[#0F382C] italic font-serif text-lg text-center font-semibold">
          "Pengabdian sejatinya bukan sekadar memberi, tetapi tentang saling mendengarkan dan bertumbuh bersama warga masyarakat desa."
        </blockquote>
        <p className="text-[#374151]">
          Perjalanan 35 hari ke depan tentu akan dipenuhi tantangan dan cerita berharga. Kami berkomitmen untuk mendokumentasikan setiap momen penting dalam Storybook Jurnal Harian ini.
        </p>
      </>
    )
  },
  {
    id: "2",
    slug: "survei-potensi-umkm",
    title: "Survei Potensi UMKM Gula Jawa di Dusun 2",
    publishDate: "25 Juli 2026",
    authorName: "Toni Setiawan",
    authorRole: "Divisi Ekonomi & UMKM",
    category: "Ekonomi Desa",
    readingTime: "5 min read",
    views: 248,
    summary: "Eksplorasi pembuatan gula jawa tradisional di Dusun 2 Somagede, dari nira kelapa segar hingga proses pencetakan khas.",
    content: (
      <>
        <p className="text-lg md:text-xl text-[#111827] font-medium leading-relaxed mb-6">
          Potensi gula jawa di Somagede sangat luar biasa. Hari ini kami berkunjung ke rumah Bapak Slamet, salah satu pengrajin gula jawa tradisional di Dusun 2.
        </p>
        <p className="mb-4 text-[#374151]">
          Proses pembuatannya masih sangat autentik, dimulai dari penyadapan nira kelapa di pagi buta (penderesan) hingga proses pemanasan berjam-jam di atas tungku kayu bakar. Aroma karamel khas menyelimuti seluruh area dapur tradisional.
        </p>
        <p className="mb-4 text-[#374151]">
          Meskipun memiliki cita rasa dan kualitas rasa yang sangat unggul dibanding produk pabrikan, para perajin gula jawa lokal masih menghadapi beberapa kendala klasik: fluktuasi harga dari tengkulak, kemasan yang minim informasi brand, serta keterbatasan jangkauan pemasaran digital.
        </p>
        <h3 className="text-2xl font-novatica font-bold text-[#111827] mt-8 mb-4">
          Langkah Inovasi Tim KKN 004
        </h3>
        <p className="mb-4 text-[#374151]">
          Melalui program kerja Divisi Ekonomi & UMKM, kami merancang serangkaian pendampingan modernisasi usaha:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-6 text-[#4B5563] pl-4">
          <li>Desain ulang label kemasan yang lebih higienis dan memiliki daya tarik estetis premium.</li>
          <li>Pendaftaran lokasi usaha perajin pada Google Maps & Digital Atlas Somagede.</li>
          <li>Pelatihan pembuatan akun toko digital (e-commerce) & WhatsApp Business.</li>
        </ul>
        <p className="text-[#374151]">
          Harapan kami, gula jawa hasil karya warga Somagede tidak hanya dikenal di lingkup lokal Banyumas, namun juga mampu merambah pasar nusantara dengan nilai jual yang jauh lebih adil.
        </p>
      </>
    )
  },
  {
    id: "3",
    slug: "keseruan-lomba-17-agustus",
    title: "Keseruan Lomba 17 Agustus Bersama Warga",
    publishDate: "18 Agustus 2026",
    authorName: "Nadia Putri",
    authorRole: "Divisi Humas & Pubdekdok",
    category: "Kemasyarakatan",
    readingTime: "4 min read",
    views: 419,
    summary: "Semarak peringatan HUT RI ke-81 di Desa Somagede penuh tawa, antusiasme, dan kehangatan warga dari seluruh dusun.",
    content: (
      <>
        <p className="text-lg md:text-xl text-[#111827] font-medium leading-relaxed mb-6">
          Merdeka! Semarak kemerdekaan Republik Indonesia ke-81 sangat terasa di lapangan desa Somagede. Mulai dari lomba balap karung helm, panjat pinang, hingga tarik tambang antar dusun.
        </p>
        <p className="mb-4 text-[#374151]">
          Antusiasme warga dari anak-anak kecil hingga orang tua membuat kami merasa benar-benar menjadi bagian dari keluarga besar Desa Somagede. Gelak tawa dan sorak dukungan terdengar riuh menggemuruh sepanjang sore hari.
        </p>
        <p className="mb-4 text-[#374151]">
          Tim KKN 004 bertindak sebagai panitia pendamping dan dokumentator resmi acara. Kami merekam setiap momen keceriaan warga dalam format foto high-resolution dan video rekapan dokumenter.
        </p>
        <p className="text-[#374151]">
          Malam harinya, acara dilanjutkan dengan Malam Puncak Kebudayaan di Balai Desa. Penampilan seni tradisional kenthongan serta pembagian hadiah menjadi penutup manis dari rangkaian perayaan kemerdekaan yang penuh kehangatan ini.
        </p>
      </>
    )
  }
];

export function getStoryByIdOrSlug(idOrSlug: string): StoryData | undefined {
  return DUMMY_STORIES.find(
    (s) => s.id === idOrSlug || s.slug === idOrSlug
  );
}
