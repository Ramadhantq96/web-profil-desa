import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#113f0a] text-white pt-16">
      <div className="w-full px-6 sm:px-12 lg:px-[200px]">
        
        {/* Bagian Atas Footer (Grid Utama) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14">
          
          {/* Kolom Kiri: Logo Ganda & Deskripsi Desa (Lebar: 4 grid) */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/Logo_unira.png"
                  alt="Logo Unira"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/Lambang_daerah.png"
                  alt="Lambang Daerah"
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-lg font-bold tracking-wide">Desa Buddih</h2>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed font-light">
              Website Profil Desa<br />
              Buddih, Kecamatan Pademawu,<br />
              Kabupaten Pamekasan.
            </p>
          </div>

          {/* Kolom Kanan: Tautan, Layanan, dan Hubungi Kami */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-12 lg:gap-16 justify-start lg:justify-end">
            
            {/* Kolom Tautan */}
            <div className="flex flex-col space-y-3">
              <h3 className="text-base font-semibold tracking-wide mb-1">Tautan</h3>
              <Link href="/" className="text-sm text-gray-200 hover:text-white transition-colors">
                Beranda
              </Link>
              <Link href="/profil" className="text-sm text-gray-200 hover:text-white transition-colors">
                Profil Desa
              </Link>
              <Link href="/potensi" className="text-sm text-gray-200 hover:text-white transition-colors">
                Potensi Lokal
              </Link>
            </div>

            {/* Kolom Layanan */}
            <div className="flex flex-col space-y-3">
              <h3 className="text-base font-semibold tracking-wide mb-1">Layanan</h3>
              <Link href="/galeri" className="text-sm text-gray-200 hover:text-white transition-colors">
                Galeri Desa
              </Link>
              <Link href="/hubungi-kami" className="text-sm text-gray-200 hover:text-white transition-colors">
                Hubungi Kami
              </Link>
              <Link href="/admin/tambah-galeri" className="text-sm text-gray-200 hover:text-white transition-colors">
                Kelola Situs
              </Link>
            </div>

            {/* Kolom Hubungi Kami */}
            <div className="flex flex-col space-y-4">
              <h3 className="text-base font-semibold tracking-wide mb-1">Hubungi Kami</h3>
              
              {/* Alamat */}
              <div className="flex items-start space-x-3">
                <div className="bg-white p-2 rounded-lg text-[#113f0a] flex-shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="text-xs text-gray-200 leading-relaxed">
                  <span className="font-semibold block text-white text-sm">Alamat</span>
                  Buddih, Kec. Pademawu, Kab. Pamekasan
                </div>
              </div>

              {/* Telepon */}
              <div className="flex items-start space-x-3">
                <div className="bg-white p-2 rounded-lg text-[#113f0a] flex-shrink-0 mt-0.5">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="text-xs text-gray-200 leading-relaxed">
                  <span className="font-semibold block text-white text-sm">Telepon</span>
                  +62 878-8209-7733
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3">
                <div className="bg-white p-2 rounded-lg text-[#113f0a] flex-shrink-0 mt-0.5">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="text-xs text-gray-200 leading-relaxed">
                  <span className="font-semibold block text-white text-sm">Email</span>
                  webdesabuddih13@gmail.com
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Bagian Copyright dengan Background Lebih Gelap & Tinggi Proporsional */}
      <div className="w-full bg-[#0c2c07] py-5 border-t border-[#092005]">
        <div className="w-full px-6 sm:px-12 lg:px-[200px] text-center text-xs text-gray-300 flex items-center justify-center space-x-1">
          <span>&copy;</span>
          <span>2026 | Dikembangkan Oleh Kelompok 13 KKN UNIRA</span>
        </div>
      </div>
    </footer>
  );
}