import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Anggota Tim (Team Member)',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Lengkap',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Peran / Jabatan',
      type: 'string',
      description: 'Contoh: "Nahkoda Sinergi - Kordes" atau "Sang Penunjuk Arah - DPL"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'division',
      title: 'Divisi',
      type: 'string',
      options: {
        list: [
          { title: 'DPL', value: 'DPL' },
          { title: 'Kordes', value: 'Kordes' },
          { title: 'Sekretaris', value: 'Sekretaris' },
          { title: 'Humas', value: 'Humas' },
          { title: 'Bendahara', value: 'Bendahara' },
          { title: 'Logistik', value: 'Logistik' },
          { title: 'Acara', value: 'Acara' },
          { title: 'Media', value: 'Media' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Urutan Tampil (Display Order)',
      type: 'number',
      description: 'Angka lebih kecil akan tampil lebih dulu. Contoh: DPL (1), Kordes (2), dsb.',
      validation: (Rule) => Rule.required().integer(),
    }),
    defineField({
      name: 'photo',
      title: 'Foto Profil',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'bio',
      title: 'Bio Pendek',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
})
