export const gallery = {
  name: 'gallery',
  title: 'Galeri Desa',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Judul Kegiatan',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Tanggal Kegiatan',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Kegiatan', value: 'Kegiatan' },
          { title: 'Pembangunan', value: 'Pembangunan' },
          { title: 'Kesehatan', value: 'Kesehatan' },
          { title: 'Pertanian', value: 'Pertanian' },
          { title: 'UMKM', value: 'UMKM' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Foto Kegiatan',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
  ],
};