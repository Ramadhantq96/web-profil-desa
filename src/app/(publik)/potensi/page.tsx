"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Tractor, Store, Sparkles } from "lucide-react";

const fadeInUp: any = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

// Data Nyata Sektor UMKM Desa Buddih secara Lengkap
const umkmDataItems = [
  { 
    id: 1, 
    title: "Warung Bu Fat", 
    desc: "Warung makan di Desa Buddih yang menyajikan menu kuliner tradisional harian seperti nasi rames dengan berbagai pilihan lauk pauk segar dan nasi pecel bumbu kacang khas Madura yang gurih.", 
    image: "/nasi.webp" 
  },
  { 
    id: 2, 
    title: "Dapur Bunda Putri", 
    desc: "Usaha rumahan yang aktif memproduksi aneka kue-kue basah dan jajanan pasar tradisional berkualitas tinggi, siap melayani pesanan untuk berbagai acara hajatan, rapat, maupun konsumsi harian warga.", 
    image: "/kue.webp" 
  },
  { 
    id: 3, 
    title: "Kerupuk Puli Mas Sukron", 
    desc: "Sentra produksi kerupuk puli rumahan yang diolah secara higienis menggunakan bahan dasar beras pilihan dan bumbu rempah alami, menghasilkan tekstur renyah serta cita rasa gurih yang khas.", 
    image: "/puli.webp" 
  },
  { 
    id: 4, 
    title: "Kerupuk Tette Nonya Asir", 
    desc: "Produsen kerupuk tette tradisional khas Madura yang diproses melalui metode penumbukan manual secara turun-temurun, memberikan keunikan rasa renyah saat digoreng kering.", 
    image: "/tette.webp" 
  },
];

export default function PotensiLokalPage() {
  const [activeTab, setActiveTab] = useState<"semua" | "pertanian" | "umkm">("semua");
  const [umkmSlide, setUmkmSlide] = useState(0);
  const totalUmkmSlides = 2; // 2 halaman pagination (masing-masing 2 item)

  // Auto slide untuk UMKM setiap 4.5 detik (hanya aktif di mode slider/semua jika diperlukan)
  useEffect(() => {
    const timer = setInterval(() => {
      setUmkmSlide((prev) => (prev + 1) % totalUmkmSlides);
    }, 4500);
    return () => clearInterval(timer);
  }, [totalUmkmSlides]);

  const displayedUmkm = umkmDataItems.slice(umkmSlide * 2, umkmSlide * 2 + 2);

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-white w-full overflow-x-hidden">
      
      {/* 1. HERO SECTION POTENSI LOKAL */}
      <section className="relative overflow-hidden py-24 lg:py-32 w-full text-white flex items-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/hero_potensi.webp" 
            alt="Potensi Lokal Desa Buddih" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c2c07]/95 via-[#0c2c07]/85 to-[#0c2c07]/70 mix-blend-multiply"></div>
        </div>

        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[200px] relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="max-w-3xl flex flex-col items-start">
            <div className="inline-block bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 shadow-sm border border-white/30">
              BERANDA &gt; POTENSI LOKAL
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-white drop-shadow-md">
              POTENSI LOKAL DESA BUDDIH
            </h1>
            <p className="text-green-100 leading-relaxed text-base sm:text-lg drop-shadow-sm">
              Mengeksplorasi keunggulan sektor pertanian tanaman pangan serta keragaman usaha mikro, kecil, dan menengah (UMKM) yang menjadi motor penggerak ekonomi kerakyatan di Desa Buddih.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="w-full h-[2px] bg-[#227b13]"></div>

      {/* 2. KONTEN UTAMA & FILTER KATEGORI */}
      <section className="py-16 lg:py-20 bg-white w-full">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[200px]">
          
          {/* Header Deskripsi & Filter Kategori */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="flex flex-col gap-6 mb-12"
          >
            <div className="max-w-3xl">
              <span className="text-green-700 font-bold text-xs tracking-widest uppercase block mb-1">KOMODITAS & USAHA WARGA</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
                Potensi Unggulan Desa Buddih
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Desa Buddih memiliki kekayaan sumber daya alam di sektor agraris serta kreativitas warga dalam mengelola produk kuliner dan olahan pangan rumahan bernilai ekonomis tinggi.
              </p>
            </div>

            {/* Scroll Selector Filter Kategori */}
            <div className="w-full overflow-x-auto pb-2 scrollbar-none">
              <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-full border border-gray-200 w-max">
                <button 
                  onClick={() => setActiveTab("semua")}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === "semua" ? "bg-[#227b13] text-white shadow-sm" : "text-gray-600 hover:text-green-700"
                  }`}
                >
                  Semua Potensi
                </button>
                <button 
                  onClick={() => setActiveTab("pertanian")}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === "pertanian" ? "bg-[#227b13] text-white shadow-sm" : "text-gray-600 hover:text-green-700"
                  }`}
                >
                  Sektor Pertanian
                </button>
                <button 
                  onClick={() => setActiveTab("umkm")}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === "umkm" ? "bg-[#227b13] text-white shadow-sm" : "text-gray-600 hover:text-green-700"
                  }`}
                >
                  Sektor UMKM
                </button>
              </div>
            </div>
          </motion.div>

          {/* ================= SECTION A: SEKTOR PERTANIAN ================= */}
          {(activeTab === "semua" || activeTab === "pertanian") && (
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="bg-[#F2F3E5] rounded-3xl p-6 sm:p-10 mb-16 border border-green-600/30"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Tractor className="text-[#113f0a]" size={22} />
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#113f0a] tracking-tight">
                      SEKTOR PERTANIAN
                    </h3>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Pusat mata pencaharian utama warga yang mengandalkan kesuburan tanah desa untuk tanaman pangan dan komoditas musiman.
                  </p>
                </div>
                {/* Tombol Lihat Selengkapnya (Mengubah state tab menjadi 'pertanian' secara instan di halaman yang sama) */}
                <button 
                  onClick={() => {
                    setActiveTab("pertanian");
                    window.scrollTo({ top: 400, behavior: "smooth" });
                  }}
                  className="flex items-center gap-1.5 text-gray-900 font-bold hover:text-green-700 transition-colors text-sm whitespace-nowrap bg-white px-4 py-2 rounded-full shadow-xs border border-gray-200 cursor-pointer"
                >
                  Lihat Selengkapnya <ArrowRight size={16} />
                </button>
              </div>

              {/* Grid 2 Kartu Pertanian */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                
                {/* Kartu 1: Padi Inbrida */}
                <motion.div 
                  whileHover={{ y: -4, transition: { duration: 0.15 } }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md border border-green-600 flex flex-col justify-between h-full"
                >
                  <div className="w-full aspect-video relative bg-gray-200">
                    <Image 
                      src="/padi.webp" 
                      alt="Tanaman Pangan Padi Inbrida" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-green-700 text-xs font-bold uppercase tracking-wider">
                        <Sparkles size={14} /> Komoditas Utama Sepanjang Tahun
                      </div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2 text-[#113f0a]">
                        Tanaman Pangan: Padi Inbrida
                      </h4>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                        Padi Inbrida merupakan komoditas tanaman pangan utama yang dibudidayakan secara intensif oleh para petani di Desa Buddih. Varietas ini dipilih karena memiliki daya adaptasi yang baik terhadap kondisi tanah setempat serta menghasilkan bulir beras berkualitas tinggi untuk mencukupi kebutuhan pangan lokal maupun regional.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Kartu 2: Tembakau */}
                <motion.div 
                  whileHover={{ y: -4, transition: { duration: 0.15 } }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md border border-green-600 flex flex-col justify-between h-full"
                >
                  <div className="w-full aspect-video relative bg-gray-200">
                    <Image 
                      src="/tembakau.webp" 
                      alt="Tembakau Musiman" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center gap-2 mb-2 text-amber-700 text-xs font-bold uppercase tracking-wider">
                        <Sparkles size={14} /> Komoditas Unggulan Musim Kemarau
                      </div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2 text-[#113f0a]">
                        Tembakau (Sesuai Musim)
                      </h4>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                        Selain padi, budidaya tanaman tembakau menjadi andalan ekonomi musiman bagi petani Desa Buddih saat memasuki musim kemarau. Kualitas daun tembakau dari wilayah ini dikenal memiliki aroma dan mutu rajangan yang sangat diminati oleh para pelaku industri tembakau.
                      </p>
                    </div>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          )}

          {/* ================= SECTION B: SEKTOR UMKM ================= */}
          {(activeTab === "semua" || activeTab === "umkm") && (
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Store className="text-[#113f0a]" size={22} />
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#113f0a] tracking-tight">
                      SEKTOR UMKM
                    </h3>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Beragam unit usaha mikro, kecil, dan menengah mandiri yang dikembangkan oleh warga guna memperkuat perekonomian desa.
                  </p>
                </div>
                {/* Tombol Lihat Selengkapnya (Mengubah state tab menjadi 'umkm' secara instan di halaman yang sama) */}
                <button 
                  onClick={() => {
                    setActiveTab("umkm");
                    window.scrollTo({ top: 400, behavior: "smooth" });
                  }}
                  className="flex items-center gap-1.5 text-gray-900 font-bold hover:text-green-700 transition-colors text-sm whitespace-nowrap bg-[#F2F3E5] px-4 py-2 rounded-full shadow-xs border border-gray-200 cursor-pointer"
                >
                  Lihat Selengkapnya <ArrowRight size={16} />
                </button>
              </div>

              {/* Tampilan Kondisional: Jika tab aktif 'umkm', tampilkan SEMUA item UMKM secara grid. Jika 'semua', tampilkan dengan slider */}
              {activeTab === "umkm" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                  {umkmDataItems.map((item) => (
                    <motion.div 
                      key={item.id}
                      whileHover={{ y: -4, transition: { duration: 0.15 } }}
                      className="bg-[#F2F3E5] rounded-2xl overflow-hidden shadow-sm border border-gray-200 flex flex-col justify-between h-full"
                    >
                      <div className="w-full aspect-video relative bg-gray-200">
                        <Image 
                          src={item.image} 
                          alt={item.title} 
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6 flex flex-col justify-between flex-grow">
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg mb-2 text-[#113f0a]">
                            {item.title}
                          </h4>
                          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <>
                  {/* Slider UMKM untuk Mode 'Semua' */}
                  <div className="relative min-h-[320px]">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={umkmSlide}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
                      >
                        {displayedUmkm.map((item) => (
                          <motion.div 
                            key={item.id}
                            whileHover={{ y: -4, transition: { duration: 0.15 } }}
                            className="bg-[#F2F3E5] rounded-2xl overflow-hidden shadow-sm border border-gray-200 flex flex-col justify-between h-full"
                          >
                            <div className="w-full aspect-video relative bg-gray-200">
                              <Image 
                                src={item.image} 
                                alt={item.title} 
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="p-6 flex flex-col justify-between flex-grow">
                              <div>
                                <h4 className="font-bold text-gray-900 text-lg mb-2 text-[#113f0a]">
                                  {item.title}
                                </h4>
                                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                                  {item.desc}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Pagination Dots */}
                  <div className="flex justify-center items-center gap-2 mt-8">
                    {Array.from({ length: totalUmkmSlides }).map((_, dotIndex) => (
                      <button
                        key={dotIndex}
                        onClick={() => setUmkmSlide(dotIndex)}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                          umkmSlide === dotIndex ? "w-8 h-3 bg-[#227b13]" : "w-3 h-3 bg-green-200 hover:bg-green-300"
                        }`}
                        aria-label={`Slide UMKM ${dotIndex + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}

            </motion.div>
          )}

        </div>
      </section>

    </div>
  );
}