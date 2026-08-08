"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Loader2, Image as ImageIcon } from "lucide-react";

const fadeInUp: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function GaleriPage() {
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // Kategori disesuaikan persis dengan pilihan di form admin
  const categories = ["Semua", "Kegiatan", "Pembangunan", "Kesehatan", "Pertanian", "UMKM"];

  useEffect(() => {
    async function fetchSanityData() {
      try {
        setLoading(true);
        const res = await fetch("/api/gallery");
        const result = await res.json();
        if (result.success) {
          setGalleryItems(result.data || []);
        }
      } catch (error) {
        console.error("Gagal mengambil data galeri:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSanityData();
  }, []);

  const filteredGallery = selectedCategory === "Semua" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const displayedGallery = showAll ? filteredGallery : filteredGallery.slice(0, 6);

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-[#F2F3E5] w-full overflow-x-hidden">
      
      {/* 1. HERO SECTION GALERI */}
      <section className="relative overflow-hidden bg-white pt-14 pb-8 w-full border-b border-gray-100">
        <div className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="flex flex-col items-center">
            <div className="inline-block bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
              WEBSITE &gt; GALERI
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-4">
              GALERI DESA BUDDIH
            </h1>
            <p className="text-gray-600 max-w-2xl leading-relaxed text-sm sm:text-base">
              Dokumentasi visual kegiatan warga, pembangunan infrastruktur, pelayanan kesehatan, serta perkembangan sektor pertanian dan UMKM di Desa Buddih.
            </p>
          </motion.div>
        </div>

        {/* Slider Tombol Filter Kategori */}
        <div className="w-full max-w-[1200px] mx-auto px-4 mt-8 flex justify-center">
          <div className="w-full overflow-x-auto pb-2 scrollbar-none flex justify-start sm:justify-center">
            <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-full border border-gray-200 w-max shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowAll(false); // Reset tampilan saat ganti kategori
                  }}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat 
                      ? "bg-[#227b13] text-white shadow-sm" 
                      : "text-gray-600 hover:text-green-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="w-full h-[2px] bg-gray-300/80"></div>

      {/* 2. KONTEN GALERI */}
      <section className="py-16 lg:py-20 bg-[#F2F3E5] w-full">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[200px]">
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <Loader2 className="animate-spin text-[#227b13] mb-4" size={40} />
              <p className="text-gray-600 text-sm font-medium">Memuat data galeri...</p>
            </div>
          ) : filteredGallery.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-gray-200 shadow-sm p-8 text-center">
              <ImageIcon className="text-gray-400 mb-3" size={48} />
              <h3 className="text-lg font-bold text-gray-800 mb-1">Belum Ada Data Galeri</h3>
              <p className="text-gray-500 text-xs sm:text-sm">Tidak ada foto untuk kategori "{selectedCategory}".</p>
            </div>
          ) : (
            <>
              <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16"
              >
                <AnimatePresence>
                  {displayedGallery.map((item) => (
                    <motion.div 
                      key={item._id}
                      variants={fadeInUp}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ y: -5, transition: { duration: 0.15 } }}
                      className="group relative rounded-2xl overflow-hidden shadow-sm bg-white border border-green-600/30"
                    >
                      <div className="absolute top-0 left-0 w-16 h-16 bg-[#227b13] z-10" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
                      
                      <div className="h-[260px] sm:h-[340px] relative bg-gray-200">
                        {item.image && (
                          <Image 
                            src={item.image} 
                            alt={item.title || "Galeri Desa Buddih"} 
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                          />
                        )}
                      </div>
                      
                      <div className="p-4 sm:p-5 bg-white flex justify-between items-center relative border-t border-gray-100">
                        <span className="font-semibold text-gray-800 text-sm sm:text-base">{item.title}</span>
                        <div className="bg-[#227b13] text-white px-4 py-1.5 rounded-lg text-xs font-medium">
                          {item.date}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {filteredGallery.length > 6 && (
                <div className="flex justify-center">
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setShowAll(!showAll);
                      if (showAll) {
                        window.scrollTo({ top: 400, behavior: "smooth" });
                      }
                    }}
                    className="flex items-center gap-2 bg-white border-2 border-[#227b13] text-[#227b13] hover:bg-green-50 px-6 py-3 rounded-full text-xs font-bold shadow-sm transition-all cursor-pointer"
                  >
                    <span>{showAll ? "Muat Lebih Sedikit" : "Muat Lebih Banyak"}</span>
                    {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </motion.button>
                </div>
              )}
            </>
          )}

        </div>
      </section>

    </div>
  );
}