import React from 'react';
import { MapPin, Store, AlertTriangle, Navigation, ShieldCheck, MapPinned } from 'lucide-react';

interface MapLegendProps {
  filter: "peta" | "umkm" | "evakuasi";
}

export default function MapLegend({ filter }: MapLegendProps) {
  return (
    <div className="mt-6 bg-white rounded-2xl p-6 shadow-xs border border-gray-200">
      <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-3 flex items-center gap-2">
        {filter === "peta" && <MapPin size={18} className="text-[#227b13]" />}
        {filter === "umkm" && <Store size={18} className="text-[#227b13]" />}
        {filter === "evakuasi" && <AlertTriangle size={18} className="text-red-600" />}
        
        <span>
          {filter === "peta" && "Penjelasan Peta Wilayah Administratif"}
          {filter === "umkm" && "Penjelasan Sebaran Sentra UMKM Desa Buddih"}
          {filter === "evakuasi" && "Panduan E-Mitigasi & Rute Jalur Evakuasi Darurat Bencana"}
        </span>
      </h4>

      <div className="text-gray-600 text-xs sm:text-sm leading-relaxed space-y-3">
        {filter === "peta" && (
          <div className="space-y-3">
            <p>
              Peta administratif wilayah Desa Buddih, Kecamatan Pademawu, Kabupaten Pamekasan. Peta interaktif di atas menunjukkan batas-batas wilayah desa serta aksesibilitas jalan poros yang menghubungkan dusun-dusun dengan pusat pemerintahan desa dan fasilitas umum lainnya.
            </p>
            <div className="flex items-center gap-2.5 bg-green-50 p-3 rounded-xl border border-green-200 text-green-900">
              <MapPinned size={20} className="text-[#227b13] shrink-0" />
              <span><strong>Pusat Pemerintahan:</strong> Kantor Kepala Desa Buddih dan fasilitas umum utama desa.</span>
            </div>
          </div>
        )}

        {filter === "umkm" && (
          <div className="space-y-3">
            <p>
              Peta sebaran UMKM menampilkan titik-titik lokasi usaha kreatif dan kuliner mandiri warga Desa Buddih agar mudah diakses oleh konsumen maupun wisatawan:
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2.5">
                <Store size={16} className="text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <strong>Warung Bu Fat:</strong> <span className="text-gray-500">Sentra kuliner nasi rames dan pecel khas Madura di Dusun Utara.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Store size={16} className="text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <strong>Dapur Bunda Putri:</strong> <span className="text-gray-500">Pusat produksi kue basah dan jajanan pasar di Dusun Tengah.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Store size={16} className="text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <strong>Kerupuk Puli Mas Sukron:</strong> <span className="text-gray-500">Produsen kerupuk puli rumahan di Dusun Selatan.</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Store size={16} className="text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <strong>Kerupuk Tette Nonya Asir:</strong> <span className="text-gray-500">Pengrajin kerupuk tette tradisional di Dusun Utara.</span>
                </div>
              </li>
            </ul>
          </div>
        )}

        {filter === "evakuasi" && (
          <div className="space-y-3">
            <p>
              Peta E-Mitigasi dan Evakuasi Desa Buddih merupakan media informasi yang disusun untuk membantu masyarakat dalam memahami wilayah desa, potensi risiko bencana, serta jalur evakuasi menuju lokasi yang aman. Peta ini menampilkan batas administrasi Desa Buddih, zona potensi kekeringan, jalur evakuasi, dan beberapa titik evakuasi yang dapat digunakan sebagai lokasi berkumpul sementara saat terjadi keadaan darurat.
            </p>
            <p>
              Zona potensi kekeringan ditandai pada wilayah bagian selatan desa yang berpotensi mengalami penurunan ketersediaan air bersih pada musim kemarau. Meskipun demikian, kondisi tersebut tidak termasuk dalam kategori kekeringan ekstrem. Jalur evakuasi ditampilkan sebagai panduan menuju titik-titik evakuasi yang telah ditentukan, yaitu Balai Desa Buddih, Pondok Kesehatan Desa (Ponkesdes) Buddih, SD IT Al-Multazam, dan Yayasan Alqodirun.
            </p>

            <div className="pt-2 font-semibold text-gray-800">Keterangan & Ikon Peta:</div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Garis Hijau */}
              <div className="flex items-start gap-3 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                <div className="w-4 h-4 rounded-full bg-emerald-500 shrink-0 mt-0.5 border border-white shadow-xs"></div>
                <div className="text-xs">
                  <strong className="block text-gray-900">Garis / Batas Hijau</strong>
                  <span className="text-gray-600">Menunjukkan batas administrasi Desa Buddih.</span>
                </div>
              </div>

              {/* Zona Kuning */}
              <div className="flex items-start gap-3 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                <div className="w-4 h-4 rounded-full bg-amber-400 shrink-0 mt-0.5 border border-white shadow-xs"></div>
                <div className="text-xs">
                  <strong className="block text-gray-900">Zona Kuning</strong>
                  <span className="text-gray-600">Wilayah potensi risiko kekeringan rendah-sedang (tidak ekstrem).</span>
                </div>
              </div>

              {/* Jalur Biru */}
              <div className="flex items-start gap-3 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                <div className="w-4 h-4 rounded-full bg-blue-500 shrink-0 mt-0.5 border border-white shadow-xs"></div>
                <div className="text-xs">
                  <strong className="block text-gray-900">Jalur Biru</strong>
                  <span className="text-gray-600">Jalur evakuasi yang direkomendasikan menuju lokasi aman.</span>
                </div>
              </div>

              {/* Titik Evakuasi */}
              <div className="flex items-start gap-3 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                <MapPin size={18} className="text-red-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="block text-gray-900">Titik Evakuasi (Tujuan)</strong>
                  <span className="text-gray-600">Lokasi berkumpul sementara & pusat koordinasi.</span>
                </div>
              </div>
            </div>

            {/* Daftar Lokasi Tujuan Titik Evakuasi */}
            <div className="bg-green-50/60 p-3.5 rounded-2xl border border-green-200 mt-3 space-y-1.5">
              <div className="font-bold text-green-900 text-xs flex items-center gap-1.5 uppercase tracking-wider">
                <ShieldCheck size={15} className="text-[#227b13]" /> Daftar Titik Evakuasi Resmi:
              </div>
              <ul className="list-disc list-inside pl-1 space-y-1 text-xs text-gray-700 font-medium">
                <li>Balai Desa Buddih</li>
                <li>Pondok Kesehatan Desa (Ponkesdes) Buddih</li>
                <li>SD IT Al-Multazam</li>
                <li>Yayasan Alqodirun</li>
              </ul>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 mt-3 text-xs">
              <strong>Catatan:</strong> Peta ini disusun sebagai media informasi dan edukasi bagi masyarakat Desa Buddih mengenai mitigasi bencana. Jalur evakuasi dan titik evakuasi yang ditampilkan merupakan rekomendasi berdasarkan kondisi wilayah desa. Dalam situasi darurat, masyarakat diharapkan tetap mengikuti arahan dari Pemerintah Desa Buddih, BPBD, maupun instansi terkait.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}