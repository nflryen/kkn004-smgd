import { createClient } from '@sanity/client';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vanvfeba';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN;

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});

const umkmData = [
  {
    _type: "villagePotency",
    name: "Mie Ayam Pak Eko",
    title: "Mie Ayam Pak Eko",
    category: "UMKM",
    gmapsUrl: "https://maps.app.goo.gl/8CPvfA5twFKtUR1h8?g_st=aw",
    description: "Kuliner mie ayam legendaris yang telah berjalan selama 13 tahun dengan racikan personal. Menyajikan mie ayam original, mie ayam ceker spesial, kepala, hingga bakso. Berlokasi strategis di depan Puskesmas Somagede.",
    whatsappContact: "085643384168",
    operationalHours: "09.00 - 21.00 WIB (Buka Setiap Hari)"
  },
  {
    _type: "villagePotency",
    name: "Intan Kripik",
    title: "Intan Kripik",
    category: "UMKM",
    gmapsUrl: "https://share.google/PVzzLaAzfMRwbjykO",
    description: "Sentra olahan keripik dan sriping renyah khas Somagede yang berdiri sejak 15 tahun lalu. Menyediakan sriping original serta varian rasa kekinian seperti coklat, matcha, tiramisu, dan strawberry. Berlokasi di sebelah utara SMK Muhammadiyah Somagede.",
    whatsappContact: "085227505004",
    operationalHours: "Buka Setiap Hari"
  },
  {
    _type: "villagePotency",
    name: "Dapur Roti Gamol",
    title: "Dapur Roti Gamol",
    category: "UMKM",
    gmapsUrl: "https://share.google/PVzzLaAzfMRwbjykO",
    description: "Produsen roti modern dengan kapasitas 100 pcs per hari dan aneka pilihan rasa premium, mulai dari coklat keju, tiramisu crunchy, hingga abon mayo pedas gurih. Berlokasi di belakang SDN 01 Somagede.",
    whatsappContact: "085742028456",
    operationalHours: "Buka Setiap Hari"
  },
  {
    _type: "villagePotency",
    name: "Annajah Ice Cream",
    title: "Annajah Ice Cream",
    category: "UMKM",
    gmapsUrl: "https://maps.app.goo.gl/y5csw4AhNTR6LPoz6",
    description: "Penyedia aneka es tradisional dan es krim segar ramah anak (es mambo, es gabus, es lilin, hingga es krim cup varian matcha, durian, dan coklat). Berlokasi dekat TPQ Al-Irsyad Somagede.",
    whatsappContact: "085712862146",
    operationalHours: "Buka Setiap Hari"
  },
  {
    _type: "villagePotency",
    name: "Bakso Cuanki Mba Desti",
    title: "Bakso Cuanki Mba Desti",
    category: "UMKM",
    gmapsUrl: "https://maps.app.goo.gl/veK3Gk6tCWk19HEy8",
    description: "Kuliner bakso cuanki favorit yang telah beroperasi selama 7 tahun dengan kapasitas 150 porsi harian. Menyajikan bakso telur puyuh, bakso mercon pedas, bakso urat, daging, hingga bakso beranak. Berlokasi di Pasar Somagede arah Taman Loka Asri.",
    whatsappContact: "083891370601",
    operationalHours: "10.00 WIB - Habis (Buka Setiap Hari)"
  },
  {
    _type: "villagePotency",
    name: "Mie Ayam Siam",
    title: "Mie Ayam Siam",
    category: "UMKM",
    gmapsUrl: "https://maps.app.goo.gl/5yHjhYZjEk4p5T4JA",
    description: "Warung mie ayam legendaris dengan resep otentik selama 18 tahun pelayanan. Menawarkan kelezatan mie ayam original yang konsisten dan lezat. Berlokasi di Jl. Raya Somagede (sebelah KOPDES Merah Putih).",
    whatsappContact: "085647608522",
    operationalHours: "08.00 - 20.00 WIB (Buka Setiap Hari)"
  },
  {
    _type: "villagePotency",
    name: "Ondol-Ondol Mbah Ribut",
    title: "Ondol-Ondol Mbah Ribut",
    category: "UMKM",
    gmapsUrl: "https://maps.app.goo.gl/Qp5TaTY7G3LtHxUJ7",
    description: "Jajanan sarapan tradisional khas Banyumasan: ondol-ondol gurih, niwon, dan combro hangat yang dibuat fresh setiap fajar. Berlokasi di Jl. Turi (depan Masjid Nurul Hikmah Karanganyar).",
    whatsappContact: "08132639512",
    operationalHours: "04.30 - 08.00 WIB (Pagi)"
  },
  {
    _type: "villagePotency",
    name: "Kembar Fried Chicken",
    title: "Kembar Fried Chicken",
    category: "UMKM",
    gmapsUrl: "https://maps.app.goo.gl/5qbw24riimcLr4Xt5",
    description: "Ayam goreng krispi gurih dengan potongan paha, dada, sayap, ceker, dan ati ampela renyah dengan harga terjangkau. Berlokasi tepat di depan SDN 01 Somagede.",
    whatsappContact: "085779009431",
    operationalHours: "09.00 - 18.00 WIB"
  },
  {
    _type: "villagePotency",
    name: "Ketupat Landan Mbah Dakem",
    title: "Ketupat Landan Mbah Dakem",
    category: "UMKM",
    gmapsUrl: "https://maps.app.goo.gl/8CPvfA5twFKtUR1h8",
    description: "Sentra perajin ketupat landan tradisional legendaris selama 40 tahun dengan kapasitas produksi 30 kg beras per hari. Menghasilkan ketupat pulen kenyal khas tradisi lokal Somagede.",
    whatsappContact: "085747953123",
    operationalHours: "Buka Setiap Hari"
  },
  {
    _type: "villagePotency",
    name: "Galeri Seni Jaran Kepang Taruna Karya",
    title: "Galeri Seni Jaran Kepang Taruna Karya",
    category: "Wisata",
    gmapsUrl: "https://maps.app.goo.gl/8CPvfA5twFKtUR1h8",
    description: "Pusat pelestarian seni budaya dan kerajinan kesenian jaran kepang / ebeg tradisional khas Desa Somagede yang dikelola oleh Bapak Eko Teguh Prayitno.",
    whatsappContact: "081558098067",
    operationalHours: "Sesuai Jadwal Kegiatan"
  }
];

async function seed() {
  console.log(`Starting seed batch mutation for ${umkmData.length} items...`);
  
  const transaction = client.transaction();
  for (const item of umkmData) {
    transaction.create(item);
  }
  
  try {
    const result = await transaction.commit();
    console.log('Successfully committed Sanity mutation batch!', result);
  } catch (error) {
    console.error('Error committing Sanity transaction:', error);
    process.exit(1);
  }
}

seed();
