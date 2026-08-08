"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import MapSection from "@/components/MapSection";
import MapLegend from "@/components/MapLegend";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Navigation, 
  Layers, 
  Send, 
  Clock,
  Store,
  AlertTriangle,
  Loader2,
  CheckCircle2,
  ChevronDown
} from "lucide-react";

const fadeInUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function HubungiKamiPage() {
  const [mapFilter, setMapFilter] = useState<"peta" | "umkm" | "evakuasi">("peta");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // State Formspree Integration
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("https://formspree.io/f/mjybvbbq", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSucceeded(true);
        setSubmitting(false);
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setSucceeded(false), 5000);
      } else {
        const data = await response.json();
        if (Object.hasOwn(data, "errors")) {
          setErrorMessage(data.errors.map((error: any) => error.message).join(", "));
        } else {
          setErrorMessage("Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.");
        }
        setSubmitting(false);
      }
    } catch (error) {
      setErrorMessage("Gagal terhubung ke server Formspree. Periksa koneksi internet Anda.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-[#F2F3E5] w-full overflow-x-hidden">
      
      {/* 1. HERO / SAMBUTAN SECTION */}
      <section className="py-16 lg:py-24 w-full">
        <div className="w-full max-w-[1000px] mx-auto px-6 sm:px-12 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="flex flex-col items-center">
            
            <div className="inline-block bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
              LAYANAN MASYARAKAT
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-4">
              HUBUNGI KAMI
            </h1>
            
            <p className="text-gray-600 max-w-2xl leading-relaxed text-sm sm:text-base">
              Pusat aspirasi, layanan pengaduan, serta informasi kontak resmi Pemerintah Desa Buddih, Kecamatan Pademawu, Kabupaten Pamekasan.
            </p>

          </motion.div>
        </div>
      </section>

      {/* 2. SECTION UTAMA: FORM KIRI (Formspree) & INFORMASI KONTAK KANAN */}
      <section className="pb-16 lg:pb-24 w-full">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[200px]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Kirim Pesan / Keluhan (Sebelah Kiri - Lebar 7 Kolom) */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-md border border-gray-200"
            >
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-6 tracking-tight">
                Kirim Pesan & Pengaduan
              </h3>

              {succeeded && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-700 shrink-0" />
                  <span>Pesan Anda berhasil dikirim melalui Formspree! Terima kasih telah menghubungi kami.</span>
                </div>
              )}

              {errorMessage && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Nama Lengkap</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      placeholder="Masukkan nama lengkap..." 
                      className="w-full bg-[#F2F3E5]/60 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#227b13] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Email Lengkap</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="Masukkan alamat email..." 
                      className="w-full bg-[#F2F3E5]/60 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#227b13] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Subjek</label>
                  <input 
                    type="text" 
                    name="subject"
                    required
                    placeholder="Tuliskan perihal pesan / subjek..." 
                    className="w-full bg-[#F2F3E5]/60 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#227b13] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Pesan / Aspirasi</label>
                  <textarea 
                    rows={5}
                    name="message"
                    required
                    placeholder="Tuliskan isi pesan atau keluhan Anda di sini..." 
                    className="w-full bg-[#F2F3E5]/60 border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#227b13] transition-colors resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={submitting}
                  className="flex items-center justify-center gap-2 bg-[#227b13] hover:bg-[#1b620f] text-white px-8 py-3.5 rounded-full text-sm font-bold shadow-md transition-all w-full sm:w-auto cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="animate-spin" size={16} /> Mengirim...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Kirim Pesan
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Informasi Kontak & Jam Operasional (Sebelah Kanan - Lebar 5 Kolom) */}
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="lg:col-span-5 bg-[#113f0a] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#227b13]"
            >
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-6 pb-4 border-b border-[#215e17]">
                Informasi Kontak
              </h3>

              <div className="space-y-6 text-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-2.5 rounded-xl text-green-300 shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="font-bold block text-white text-xs uppercase tracking-wider mb-0.5">Alamat Kantor Desa</span>
                    <p className="text-green-100/90 text-xs sm:text-sm leading-relaxed">Buddih, Kec. Pademawu, Kab. Pamekasan, Jawa Timur</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-2.5 rounded-xl text-green-300 shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="font-bold block text-white text-xs uppercase tracking-wider mb-0.5">Telepon / WhatsApp</span>
                    <p className="text-green-100/90 text-xs sm:text-sm">+62 878-8209-7733</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-2.5 rounded-xl text-green-300 shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="font-bold block text-white text-xs uppercase tracking-wider mb-0.5">Email Resmi</span>
                    <p className="text-green-100/90 text-xs sm:text-sm">webdesabuddih13@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Jam Operasional */}
              <div className="mt-8 pt-6 border-t border-[#215e17]">
                <div className="flex items-center gap-2 mb-4">
                  <Clock size={18} className="text-green-300" />
                  <h4 className="font-bold text-base tracking-tight">Jam Pelayanan Kantor Desa</h4>
                </div>

                <div className="space-y-2 text-xs sm:text-sm text-green-100/90">
                  <div className="flex justify-between py-1 border-b border-[#215e17]/50">
                    <span>Senin - Kamis</span>
                    <span className="font-semibold text-white">08.00 - 15.00 WIB</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#215e17]/50">
                    <span>Jumat</span>
                    <span className="font-semibold text-white">08.00 - 12.00 WIB</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Sabtu - Minggu</span>
                    <span className="font-semibold text-yellow-300">Libur / Tutup</span>
                  </div>
                </div>
              </div>

            </motion.div>

          </div>

        </div>
      </section>

      {/* 3. SECTION PETA WILAYAH, SEBARAN UMKM & JALUR E-MITIGASI BENCANA */}
      <section className="pb-20 w-full">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[200px]">
          
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Peta Wilayah & Informasi Spasial Desa Buddih
            </h3>
          </div>

          {/* Container Peta */}
          <div className="bg-[#E5E7DC] rounded-3xl p-4 sm:p-6 shadow-md border border-gray-300 relative">
            
            {/* Tombol Kontrol Peta (Navigasi Balai Desa & Filter Lapisan dengan Indikator Panah ke Bawah) */}
            <div className="flex flex-wrap items-center gap-3 mb-4 z-10 relative">
              
              {/* Tombol Langsung ke Balai Desa */}
              <a 
                href="https://maps.google.com/?q=Buddih,+Pademawu,+Pamekasan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white hover:bg-green-50 text-gray-800 px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm border border-gray-200 transition-all cursor-pointer"
              >
                <Navigation size={15} className="text-[#227b13]" />
                <span>Navigasi ke Balai Desa</span>
              </a>

              {/* Tombol Filter Peta dengan Ikon Panah Kebawah */}
              <div className="relative">
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 bg-white hover:bg-green-50 text-gray-800 px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm border border-gray-200 transition-all cursor-pointer"
                >
                  <Layers size={15} className="text-[#227b13]" />
                  <span>
                    {mapFilter === "peta" && "Peta Wilayah Standar"}
                    {mapFilter === "umkm" && "Sebaran Titik UMKM"}
                    {mapFilter === "evakuasi" && "Jalur Evakuasi & E-Mitigasi"}
                  </span>
                  <ChevronDown size={14} className={`text-gray-500 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
                </button>

                {isFilterOpen && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-30">
                    <button
                      onClick={() => { setMapFilter("peta"); setIsFilterOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors cursor-pointer"
                    >
                      🗺️ Peta Wilayah Standar (Google Maps)
                    </button>
                    <button
                      onClick={() => { setMapFilter("umkm"); setIsFilterOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors cursor-pointer"
                    >
                      🏪 Peta Sebaran Titik UMKM Desa
                    </button>
                    <button
                      onClick={() => { setMapFilter("evakuasi"); setIsFilterOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors cursor-pointer"
                    >
                      🚨 Peta E-Mitigasi & Jalur Evakuasi Bencana
                    </button>
                  </div>
                )}
              </div>

            </div>

            {/* Tampilan Peta Menggunakan Komponen MapSection */}
            <div className="w-full h-[420px] sm:h-[480px] bg-gray-300 rounded-2xl overflow-hidden relative shadow-inner">
              <MapSection filter={mapFilter} />
            </div>

            {/* Bagian Legenda Terpisah */}
            <MapLegend filter={mapFilter} />

          </div>

        </div>
      </section>

    </div>
  );
}