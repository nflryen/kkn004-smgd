import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'storybook',
  title: 'Storybook (Jurnal & Buku Kenangan)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Cerita',
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
      name: 'category',
      title: 'Kategori Cerita',
      type: 'string',
      initialValue: 'Catatan Pengabdian',
    }),
    defineField({
      name: 'publishDate',
      title: 'Tanggal Publikasi',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Penulis',
      type: 'reference',
      to: [{ type: 'teamMember' }],
    }),
    defineField({
      name: 'coverImage',
      title: 'Foto Cover',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'views',
      title: 'Jumlah Pembaca (Views)',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'body',
      title: 'Isi Cerita',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } }
      ]
    }),
  ],
})
