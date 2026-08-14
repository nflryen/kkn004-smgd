import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'villagePotency',
  title: 'Potensi Desa & Titik Peta',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Tempat / UMKM / Wisata',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Judul Tempat (Sama dengan Nama Tempat)',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'UMKM', value: 'UMKM' },
          { title: 'Wisata', value: 'Wisata' },
          { title: 'Fasilitas Publik', value: 'Fasilitas Publik' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gmapsUrl',
      title: 'Google Maps Link (gmapsUrl)',
      type: 'string',
      description: 'Paste URL Google Maps tempat ini (contoh: https://maps.app.goo.gl/... atau https://google.com/maps?q=-7.5285,109.3315). Jika diisi, koordinat latitude & longitude akan di-extract secara otomatis!',
    }),
    defineField({
      name: 'latitude',
      title: 'Latitude Coordinate (Opsional)',
      type: 'number',
      description: 'Koordinat Latitude (Opsional jika gmapsUrl diisi)',
    }),
    defineField({
      name: 'longitude',
      title: 'Longitude Coordinate (Opsional)',
      type: 'number',
      description: 'Koordinat Longitude (Opsional jika gmapsUrl diisi)',
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Singkat Tempat',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whatsappContact',
      title: 'Nomor WhatsApp Kontak (Opsional)',
      type: 'string',
      description: 'Gunakan format 628..., contoh: 6281234567890',
    }),
    defineField({
      name: 'coverImage',
      title: 'Foto Lokasi (Cover Image)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'image',
      title: 'Foto Lokasi Alias (Image)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
})
