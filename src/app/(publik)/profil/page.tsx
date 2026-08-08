"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Eye,
  ClipboardList,
  Map,
  Compass,
  Thermometer,
  Grid,
  Mountain,
  User,
  Users
} from "lucide-react";

const fadeInUp: any = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function ProfilDesaPage() {
  return (
    <div className="min-h-screen font-sans text-gray-800 bg-white w-full overflow-x-hidden">

      {/* 1. HERO SECTION PROFIL DESA */}
      <section className="relative overflow-hidden py-20 lg:py-32 w-full text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero_profil.webp"
            alt="Profil Desa Buddih"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#0c2c07]/80 mix-blend-multiply"></div>
        </div>

        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[200px] relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-3xl flex flex-col items-start">
            <div className="inline-block bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 shadow-sm border border-white/30">
              BERANDA &gt; PROFIL DESA BUDDIH
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-white drop-shadow-md">
              PROFIL DESA BUDDIH
            </h1>
            <p className="text-green-100 leading-relaxed text-base sm:text-lg drop-shadow-sm">
              Mengenal lebih dekat sejarah, visi misi, kondisi geografis, serta struktur pemerintahan Desa Buddih, Kecamatan Pademawu, Kabupaten Pamekasan.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="w-full h-[2px] bg-[#227b13]"></div>

      {/* 2. SEJARAH DESA BUDDIH (Gambar Diperbarui Menjadi Persegi Panjang / Rasio Lanskap) */}
      <section className="py-16 lg:py-24 bg-white w-full">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[200px]">

          <div className="mb-10">
            <span className="text-green-700 font-bold text-xs tracking-widest uppercase block mb-1">SEJARAH DESA BUDDIH</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
              Sejarah dan Asal Usul Desa Buddih
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Bingkai Gambar Persegi Panjang / Rasio 16:9 */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 relative flex justify-center lg:justify-start"
            >
              <div className="relative w-full aspect-video max-w-[560px]">
                <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 bg-[#227b13] rounded-2xl -z-0"></div>
                <div className="absolute inset-0 bg-gray-100 rounded-2xl overflow-hidden shadow-xl border-[6px] border-white z-10">
                  <Image
                    src="/sejarah_desa.webp"
                    alt="Sejarah Desa Buddih"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Teks Sejarah dengan Struktur Seimbang */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-6 flex flex-col justify-center space-y-4"
            >
              <div className="border-l-4 border-[#227b13] pl-4 py-1 space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
                <p>
                  Konon menurut para leluhur dan sesepuh desa, nama <strong className="text-gray-900">Buddih</strong> berasal dari kata dalam bahasa Madura yang erat kaitannya dengan nilai-nilai kearifan lokal, ketenangan, serta budi pekerti luhur yang dijunjung tinggi oleh para pendiri permukiman awal di wilayah ini.
                </p>
                <p>
                  Seiring berjalannya waktu dan perkembangan zaman, Desa Buddih terus berbenah dari sebuah kawasan agraris tradisional menjadi desa mandiri yang tetap mempertahankan semangat gotong royong, tradisi keagamaan, serta produktivitas di sektor pertanian tanaman pangan seperti padi inbrida.
                </p>
                <p>
                  Kini, di bawah kepemimpinan aparatur desa yang progresif, Desa Buddih berkomitmen untuk terus meningkatkan kualitas pelayanan publik, pembangunan infrastruktur yang merata, serta kesejahteraan hidup seluruh warganya.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. VISI & MISI DESA (Background #F2F3E5) */}
      <section className="py-20 bg-[#F2F3E5] relative z-0 w-full">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[200px] text-center mb-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <p className="text-green-700 font-bold text-xs tracking-widest uppercase mb-1">ARAH PERKEMBANGAN DESA</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Visi & Misi Desa Buddih</h2>
            <div className="w-16 h-1 bg-[#227b13] mx-auto rounded-full"></div>
          </motion.div>
        </div>

        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[200px] space-y-8">

          <motion.div
            whileHover={{ y: -4, transition: { duration: 0.15 } }}
            className="bg-[#113f0a] text-white rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white shrink-0">
                <Eye size={22} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Visi Desa</h3>
            </div>
            <div className="border-l-4 border-green-400 pl-4 py-1 space-y-2">
              <p className="text-green-50 text-sm sm:text-base leading-relaxed italic">
                1. "Terwujudnya masyarakat desa yang maju, mandiri, adil, sehat, dan sejahtera."
              </p>
              <p className="text-green-50 text-sm sm:text-base leading-relaxed italic">
                2. "Membangun Desa sebagai pusat ekonomi lokal yang beriman, berkarakter, dan berkeadilan."
              </p>
            </div>
          </motion.div>

          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-[#227b13] rounded-lg flex items-center justify-center text-white shrink-0">
                <ClipboardList size={22} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Misi Desa</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Pemerintahan", desc: "Memperbaiki pelayanan publik agar cepat, jujur, dan ramah." },
                { title: "Pembangunan", desc: "Memperbaiki jalan, dan saluran air secara merata." },
                { title: "Ekonomi", desc: "Meningkatkan dan memperbaiki fasilitas Usaha Pertanian agar produksi lebih baik dan lebih produktif." },
                { title: "Sosial", desc: "Menjaga kebersihan lingkungan, keamanan, serta kegiatan gotong royong." }
              ].map((misi, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4, transition: { duration: 0.15 } }}
                  className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all flex items-start gap-4"
                >
                  <div className="w-8 h-8 bg-green-100 text-green-800 rounded-lg flex items-center justify-center font-bold text-sm shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{misi.title}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{misi.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. KONDISI GEOGRAFIS DESA */}
      <section className="py-16 lg:py-24 bg-white w-full">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[200px]">

          <div className="mb-10">
            <span className="text-green-700 font-bold text-xs tracking-widest uppercase block mb-1">WILAYAH</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
              Kondisi Geografis Desa Buddih
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-3xl">
              Desa Buddih terletak di wilayah Kecamatan Pademawu dengan lanskap dataran rendah yang sangat potensial untuk sektor pertanian dan perkebunan rakyat.
            </p>
          </div>

          <motion.div
            whileHover={{ y: -3 }}
            className="bg-[#F2F3E5] rounded-2xl p-6 sm:p-8 border border-green-600 shadow-sm mb-8 transition-all"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-[#227b13] rounded-lg flex items-center justify-center text-white">
                <Map size={18} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Batas Wilayah Desa Buddih</h3>
            </div>

            <div className="space-y-4">
              {[
                { label: "Utara", value: "Kangenan" },
                { label: "Selatan", value: "Beddurih" },
                { label: "Barat", value: "Ceguk" },
                { label: "Timur", value: "Sopa'ah" },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b border-gray-300 pb-3 text-sm sm:text-base">
                  <span className="font-medium text-gray-700">{item.label}</span>
                  <span className="font-semibold text-gray-900 bg-white px-4 py-1 rounded-md shadow-xs border border-gray-200">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { title: "Luas Wilayah", value: "1,037 km³", icon: <Compass className="text-[#227b13]" size={22} /> },
              { title: "Pembagian Wilayah", value: "3 Dusun (Utara, Tengah, Selatan)", icon: <Grid className="text-[#227b13]" size={22} /> },
              { title: "Suhu Rata-rata", value: "28°C - 32°C", icon: <Thermometer className="text-[#227b13]" size={22} /> },
              { title: "Ketinggian Wilayah", value: "20 - 50 mdpl", icon: <Mountain className="text-[#227b13]" size={22} /> },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -5, transition: { duration: 0.15 } }}
                className="bg-[#F2F3E5] rounded-xl p-6 shadow-md hover:shadow-xl transition-all flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-xs flex items-center justify-center shrink-0">
                  {card.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{card.value}</h4>
                  <p className="text-gray-500 text-xs mt-0.5">{card.title}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* 5. STRUKTUR ORGANISASI PERANGKAT DESA (Background #F2F3E5) */}
      <section className="py-20 bg-[#F2F3E5] relative z-0 w-full">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[200px] text-center mb-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <p className="text-green-700 font-bold text-xs tracking-widest uppercase mb-1">PEMERINTAHAN</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Struktur Organisasi Perangkat Desa</h2>
            <div className="w-16 h-1 bg-[#227b13] mx-auto rounded-full"></div>
          </motion.div>
        </div>

        <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-12 lg:px-[200px] space-y-8">

          {/* Kepala Desa (Menggunakan pic_kades.webp) */}
          <div className="flex justify-center">
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.15 } }}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl border border-gray-200 text-center w-full max-w-[280px]"
            >
              <div className="w-28 h-28 bg-gray-200 rounded-lg mx-auto mb-3 relative overflow-hidden shadow-inner">
                <Image
                  src="/pic_kades.webp"
                  alt="MUKHLIS - Kepala Desa"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <h4 className="font-bold text-gray-900 text-base">MUKHLIS</h4>
              <p className="text-green-700 font-semibold text-xs mt-0.5">Kepala Desa</p>
            </motion.div>
          </div>

          {/* Sekretaris Desa & Kaur Utama */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div whileHover={{ y: -4 }} className="bg-white rounded-xl p-6 shadow-md border border-gray-200 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-green-50 text-green-700 rounded-full mb-3 flex items-center justify-center font-bold shadow-inner">
                <User size={28} />
              </div>
              <h4 className="font-bold text-gray-900 text-sm">MAMAN ARIEF EFENDI</h4>
              <p className="text-gray-500 text-xs mt-0.5">Sekretaris Desa</p>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="bg-white rounded-xl p-6 shadow-md border border-gray-200 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-green-50 text-green-700 rounded-full mb-3 flex items-center justify-center font-bold shadow-inner">
                <User size={28} />
              </div>
              <h4 className="font-bold text-gray-900 text-sm">MEILINDA WATI</h4>
              <p className="text-gray-500 text-xs mt-0.5">Kaur Keuangan</p>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="bg-white rounded-xl p-6 shadow-md border border-gray-200 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-green-50 text-green-700 rounded-full mb-3 flex items-center justify-center font-bold shadow-inner">
                <User size={28} />
              </div>
              <h4 className="font-bold text-gray-900 text-sm">DEKKY GUNAWAN</h4>
              <p className="text-gray-500 text-xs mt-0.5">Kaur Perencanaan</p>
            </motion.div>
          </div>

          {/* Kaur & Kasi Lainnya */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "MOH. MOHRAM", title: "Kaur Tata Usaha dan Umum" },
              { name: "MUSTARI", title: "Kasi Kesejahteraan" },
              { name: "AYU KRISWANTO", title: "Kasi Pemerintahan" },
              { name: "DONI FERNANDI", title: "Kasi Pelayanan" },
            ].map((staff, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md border border-gray-200 text-center flex flex-col items-center"
              >
                <div className="w-14 h-14 bg-green-50 text-[#227b13] rounded-full mb-3 flex items-center justify-center shadow-inner">
                  <User size={24} />
                </div>
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm">{staff.name}</h4>
                <p className="text-gray-500 text-[11px] mt-0.5">{staff.title}</p>
              </motion.div>
            ))}
          </div>

          {/* Kepala Dusun & Staf */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "EDI PURWANTO", title: "Kepala Dusun Utara" },
              { name: "HERMANTO FELANI", title: "Kepala Dusun Tengah" },
              { name: "SYAMSUL BAHRI", title: "Kepala Dusun Selatan" },
              { name: "ZAIN ISWANTORO", title: "Staf Desa" },
            ].map((kadus, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-[#113f0a] text-white rounded-xl p-5 shadow-md hover:shadow-xl text-center flex flex-col items-center border border-[#227b13]"
              >
                <div className="w-14 h-14 bg-white/20 text-white rounded-full mb-3 flex items-center justify-center shadow-inner">
                  <Users size={24} />
                </div>
                <h4 className="font-bold text-white text-xs sm:text-sm">{kadus.name}</h4>
                <p className="text-green-200 text-[11px] mt-0.5">{kadus.title}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}