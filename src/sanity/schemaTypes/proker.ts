import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'proker',
  title: 'Program Kerja',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Proker',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'division',
      title: 'Kategori Program Utama',
      type: 'string',
      options: {
        list: [
          { title: 'Penguatan Umat', value: 'Penguatan Umat' },
          { title: 'Penhijauan Desa', value: 'Penhijauan Desa' },
          { title: 'Pergerakan Ekonomi Masyarakat', value: 'Pergerakan Ekonomi Masyarakat' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'programType',
      title: 'Jenis Program',
      type: 'string',
      options: {
        list: [
          { title: '⭐ Program Unggulan', value: 'unggulan' },
          { title: '📌 Program Pendukung', value: 'pendukung' },
        ],
        layout: 'radio',
      },
      initialValue: 'pendukung',
    }),
    defineField({
      name: 'status',
      title: 'Status Pelaksanaan',
      type: 'string',
      options: {
        list: [
          { title: 'Direncanakan', value: 'Planned' },
          { title: 'Sedang Berjalan', value: 'In Progress' },
          { title: 'Selesai', value: 'Completed' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Tanggal Pelaksanaan (Opsional)',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Lokasi (Opsional)',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Proker',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Foto Cover',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'division',
      media: 'coverImage',
    },
  },
})
