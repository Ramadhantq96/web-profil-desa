"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { 
  ArrowRight, 
  Quote, 
  Eye, 
  ClipboardList, 
  Users, 
  Home, 
  MapPin, 
  Tractor,
  CheckCircle2,
  ImageIcon,
  Loader2 
} from "lucide-react";
import { createClient } from "@sanity/client";

// Konfigurasi Client Sanity (Project ID: i2qhpr65, Dataset: production)
const sanityClient = createClient({
  projectId: "i2qhpr65",
  dataset: "production",
  apiVersion: "2026-08-05",
  useCdn: true,
});

// Komponen Counter untuk Efek Countdown Angka Statistik
function Counter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = value / (duration * 60);
      const handle = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(handle);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(handle);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString("id-ID")}</span>;
}

const fadeInUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

export default function BerandaPage() {
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(true);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(2);

  // Ambil data galeri secara real-time dari Sanity CMS
  useEffect(() => {
    async function fetchSanityGallery() {
      try {
        setLoadingGallery(true);
        const query = `*[_type == "gallery"] | order(_createdAt desc) {
          _id,
          title,
          date,
          category,
          "image": image.asset->url
        }`;
        const data = await sanityClient.fetch(query);
        setGalleryItems(data || []);
      } catch (error) {
        console.error("Gagal mengambil galeri beranda dari Sanity:", error);
      } finally {
        setLoadingGallery(false);
      }
    }
    fetchSanityGallery();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerSlide(1);
      } else {
        setItemsPerSlide(2);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(galleryItems.length / itemsPerSlide) || 1;

  useEffect(() => {
    if (galleryItems.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4500);
    return () => clearInterval(timer);
  }, [totalSlides, galleryItems.length]);

  const displayedGallery = galleryItems.slice(
    currentSlide * itemsPerSlide, 
    currentSlide * itemsPerSlide + itemsPerSlide
  );

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-white w-full overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden py-20 lg:py-32 w-full text-white">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?lib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
            alt="Desa Buddih Pamekasan" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#0c2c07]/80 mix-blend-multiply"></div>
        </div>

        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[200px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="lg:col-span-8 flex flex-col items-start">
              <div className="inline-block bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 shadow-sm border border-white/30">
                Website Profil Desa Buddih
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-white drop-shadow-md">
                SELAMAT DATANG DI WEBSITE PROFIL DESA BUDDIH
              </h1>
              <p className="text-green-100 mb-8 leading-relaxed text-base sm:text-lg max-w-2xl drop-shadow-sm">
                Desa Buddih adalah pusat kawasan agraris yang berkomitmen menghadirkan pelayanan publik transparan, tata kelola pemerintahan yang jujur, serta peningkatan fasilitas pertanian demi kesejahteraan masyarakat.
              </p>
              <div className="flex flex-wrap gap-4 w-full sm:w-auto">
                <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                  <Link 
                    href="/profil" 
                    className="flex items-center justify-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-white px-6 py-3.5 rounded-full text-sm font-bold transition-all shadow-lg w-full sm:w-auto"
                  >
                    Lihat Profil Desa <ArrowRight size={16} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                  <Link 
                    href="/potensi" 
                    className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border-2 border-white text-white px-6 py-3.5 rounded-full text-sm font-bold transition-all w-full sm:w-auto shadow-lg"
                  >
                    Lihat Potensi Lokal <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="w-full h-[2px] bg-[#227b13]"></div>

      {/* 2. SAMBUTAN KEPALA DESA */}
      <section className="py-16 lg:py-24 bg-white w-full">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[200px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Foto Kepala Desa */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-5 relative flex justify-center lg:justify-start"
            >
              <div className="relative w-full max-w-[380px] h-[400px] sm:h-[450px]">
                <div className="absolute -bottom-5 -right-5 w-2/3 h-2/3 bg-[#227b13] rounded-2xl -z-0"></div>
                <div className="absolute inset-0 bg-gray-100 rounded-2xl overflow-hidden shadow-xl border-[6px] border-white z-10">
                  <Image 
                    src="/pic_kades.webp" 
                    alt="Kepala Desa" 
                    fill
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </motion.div>

            {/* Teks Sambutan */}
            <motion.div 
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="lg:col-span-7 flex flex-col justify-center"
            >
              <div className="inline-block bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-xs font-bold mb-4 w-max">
                Sambutan Dari Kepala Desa
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
                Membangun Masa Depan Desa yang Lebih Berdaya
              </h2>
              
              <div className="relative pl-4 border-l-4 border-[#227b13] mb-6 space-y-4">
                <Quote className="absolute -top-3 -left-3 text-green-100 w-10 h-10 -z-10" />
                <p className="text-gray-600 italic text-sm sm:text-base leading-relaxed">
                  "Puji syukur ke hadirat Allah SWT. Website resmi Desa Buddih ini hadir sebagai wujud keterbukaan informasi publik serta sarana mendekatkan pelayanan pemerintahan kepada seluruh warga masyarakat secara cepat dan transparan."
                </p>
                <p className="text-gray-600 italic text-sm sm:text-base leading-relaxed">
                  "Mari bersama-sama kita dukung program pembangunan infrastruktur, peningkatan fasilitas pertanian, serta penjagaan kebersihan lingkungan demi kemajuan Desa Buddih tercinta."
                </p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 text-base sm:text-lg">MUKHLIS</h4>
                <p className="text-gray-500 text-xs sm:text-sm">Kepala Desa Buddih Periode 2019 - 2027</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. PROFIL DESA & VISI MISI (Background #F2F3E5) */}
      <section className="py-20 bg-[#F2F3E5] relative z-0 w-full">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[200px] text-center mb-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <p className="text-green-700 font-bold text-xs tracking-widest uppercase mb-1">PROFIL DESA</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Mengenal Lebih Dekat Desa Buddih</h2>
            <div className="w-16 h-1 bg-[#227b13] mx-auto mb-4 rounded-full"></div>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base">
              Arah kebijakan pembangunan Desa Buddih dirumuskan secara partisipatif guna mewujudkan tata kelola yang adil dan mandiri.
            </p>
          </motion.div>
        </div>

        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[200px]">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-28"
          >
            {/* Visi Kami */}
            <motion.div 
              variants={fadeInUp} 
              whileHover={{ y: -4, transition: { duration: 0.15 } }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-green-600 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-700 rounded-xl flex items-center justify-center text-white shadow-sm shrink-0">
                    <Eye size={22} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Visi Kami</h3>
                </div>
                <div className="border-l-4 border-green-600 pl-4 py-1 space-y-2">
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base font-semibold italic">
                    1. "Terwujudnya masyarakat desa yang maju, mandiri, adil, sehat, dan sejahtera."
                  </p>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base font-semibold italic">
                    2. "Membangun Desa sebagai pusat ekonomi lokal yang beriman, berkarakter, dan berkeadilan."
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Misi Kami */}
            <motion.div 
              variants={fadeInUp} 
              whileHover={{ y: -4, transition: { duration: 0.15 } }}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-green-600 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-700 rounded-xl flex items-center justify-center text-white shadow-sm shrink-0">
                    <ClipboardList size={22} />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Misi Kami</h3>
                </div>
                
                <ul className="space-y-3.5 text-sm sm:text-base text-gray-700">
                  <li className="flex items-start gap-3 bg-[#F2F3E5]/50 p-3 rounded-xl border border-gray-100">
                    <CheckCircle2 className="text-[#227b13] shrink-0 mt-0.5" size={18} />
                    <div>
                      <span className="font-bold text-gray-900 block text-xs uppercase tracking-wider">Pemerintahan</span>
                      <span className="text-gray-600 text-xs sm:text-sm">Memperbaiki pelayanan publik agar cepat, jujur, dan ramah.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-[#F2F3E5]/50 p-3 rounded-xl border border-gray-100">
                    <CheckCircle2 className="text-[#227b13] shrink-0 mt-0.5" size={18} />
                    <div>
                      <span className="font-bold text-gray-900 block text-xs uppercase tracking-wider">Pembangunan</span>
                      <span className="text-gray-600 text-xs sm:text-sm">Memperbaiki jalan, dan saluran air secara merata.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-[#F2F3E5]/50 p-3 rounded-xl border border-gray-100">
                    <CheckCircle2 className="text-[#227b13] shrink-0 mt-0.5" size={18} />
                    <div>
                      <span className="font-bold text-gray-900 block text-xs uppercase tracking-wider">Ekonomi</span>
                      <span className="text-gray-600 text-xs sm:text-sm">Meningkatkan dan memperbaiki fasilitas Usaha Pertanian agar produksi lebih baik dan lebih produktif.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-[#F2F3E5]/50 p-3 rounded-xl border border-gray-100">
                    <CheckCircle2 className="text-[#227b13] shrink-0 mt-0.5" size={18} />
                    <div>
                      <span className="font-bold text-gray-900 block text-xs uppercase tracking-wider">Sosial</span>
                      <span className="text-gray-600 text-xs sm:text-sm">Menjaga kebersihan lingkungan, keamanan, serta kegiatan gotong royong.</span>
                    </div>
                  </li>
                </ul>

              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. STATISTIK DESA */}
      <section className="relative z-10 -mt-20 mb-16 w-full">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[200px]">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-6 bg-[#113f0a] rounded-2xl shadow-2xl"
          >
            <motion.div variants={fadeInUp} whileHover={{ y: -3 }} transition={{ duration: 0.15 }} className="bg-[#489e3a] text-white rounded-xl p-4 sm:p-5 flex items-center gap-4 border border-[#227b13] shadow-md">
              <div className="bg-white/20 p-3 rounded-lg hidden sm:block shrink-0"><Users size={24} /></div>
              <div>
                <h4 className="text-xl sm:text-2xl font-extrabold"><Counter value={1300} /></h4>
                <p className="text-green-100 text-[10px] sm:text-xs font-bold tracking-wider uppercase mt-0.5">JUMLAH WARGA</p>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} whileHover={{ y: -3 }} transition={{ duration: 0.15 }} className="bg-[#489e3a] text-white rounded-xl p-4 sm:p-5 flex items-center gap-4 border border-[#227b13] shadow-md">
              <div className="bg-white/20 p-3 rounded-lg hidden sm:block shrink-0"><Home size={24} /></div>
              <div>
                <h4 className="text-xl sm:text-2xl font-extrabold"><Counter value={458} /></h4>
                <p className="text-green-100 text-[10px] sm:text-xs font-bold tracking-wider uppercase mt-0.5">JUMLAH KELUARGA (KK)</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} whileHover={{ y: -3 }} transition={{ duration: 0.15 }} className="bg-[#489e3a] text-white rounded-xl p-4 sm:p-5 flex items-center gap-4 border border-[#227b13] shadow-md">
              <div className="bg-white/20 p-3 rounded-lg hidden sm:block shrink-0"><MapPin size={24} /></div>
              <div>
                <h4 className="text-xl sm:text-2xl font-extrabold">1,037 km³</h4>
                <p className="text-green-100 text-[10px] sm:text-xs font-bold tracking-wider uppercase mt-0.5">LUAS DESA</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} whileHover={{ y: -3 }} transition={{ duration: 0.15 }} className="bg-[#489e3a] text-white rounded-xl p-4 sm:p-5 flex items-center gap-4 border border-[#227b13] shadow-md">
              <div className="bg-white/20 p-3 rounded-lg hidden sm:block shrink-0"><Tractor size={24} /></div>
              <div>
                <h4 className="text-base sm:text-lg font-extrabold">PADI INBRIDA</h4>
                <p className="text-green-100 text-[10px] sm:text-xs font-bold tracking-wider uppercase mt-0.5">KOMODITAS UTAMA</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. GALERI DESA BUDDIH (Terhubung Real-Time dengan Sanity CMS) */}
      <section className="py-16 lg:py-20 bg-[#F2F3E5] w-full">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[200px]">
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6"
          >
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Galeri Desa Buddih</h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Dokumentasi kegiatan warga, pembangunan infrastruktur, dan program kerja di Desa Buddih.
              </p>
            </div>
            <Link href="/galeri" className="flex items-center gap-1 text-gray-900 font-bold hover:text-green-700 transition-colors text-sm whitespace-nowrap">
              Lihat Semua Galeri <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Garis Pemisah Hijau */}
          <div className="w-full h-[2px] bg-[#227b13] mb-8"></div>

          {loadingGallery ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="animate-spin text-[#227b13] mb-3" size={36} />
              <p className="text-gray-600 text-xs sm:text-sm font-medium">Memuat galeri terbaru dari Sanity CMS...</p>
            </div>
          ) : galleryItems.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm">
              <ImageIcon className="mx-auto text-gray-400 mb-2" size={40} />
              <h4 className="font-bold text-gray-800 text-base mb-1">Belum Ada Foto Galeri</h4>
              <p className="text-gray-500 text-xs sm:text-sm">
                Foto yang diunggah melalui halaman admin Sanity Studio akan otomatis tampil di sini.
              </p>
            </div>
          ) : (
            <>
              {/* Area Slider Galeri */}
              <div className="relative min-h-[360px]">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`grid grid-cols-1 ${itemsPerSlide === 2 ? "md:grid-cols-2" : "grid-cols-1"} gap-8`}
                  >
                    {displayedGallery.map((item) => (
                      <motion.div 
                        key={item._id}
                        whileHover={{ y: -4, transition: { duration: 0.15 } }}
                        className="group relative rounded-2xl overflow-hidden shadow-md bg-white border border-gray-200"
                      >
                        <div className="absolute top-0 left-0 w-16 h-16 bg-[#227b13] z-10" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
                        
                        <div className="h-[260px] sm:h-[320px] relative bg-gray-200">
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
                        
                        <div className="p-4 sm:p-5 bg-white flex justify-between items-center relative">
                          <span className="font-semibold text-gray-800 text-sm sm:text-base">{item.title}</span>
                          <div className="bg-[#227b13] text-white px-4 py-1.5 rounded-lg text-xs font-medium">
                            {item.date}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Pagination Dots */}
              <div className="flex justify-center items-center gap-2 mt-8">
                {Array.from({ length: totalSlides }).map((_, dotIndex) => (
                  <button
                    key={dotIndex}
                    onClick={() => setCurrentSlide(dotIndex)}
                    className={`transition-all duration-300 rounded-full ${
                      currentSlide === dotIndex ? "w-8 h-3 bg-[#227b13]" : "w-3 h-3 bg-green-300 hover:bg-green-400"
                    }`}
                    aria-label={`Slide ${dotIndex + 1}`}
                  />
                ))}
              </div>
            </>
          )}

        </div>
      </section>

    </div>
  );
}