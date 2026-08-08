"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingPage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 2));
    }, 80); // Mengatur kecepatan loading bar
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-[#113f0a] flex flex-col items-center justify-center"
    >
      <div className="text-center px-6">
        <h1 className="text-white text-2xl sm:text-4xl font-extrabold mb-8 animate-pulse">
          SELAMAT DATANG DI WEBSITE<br/>PROFIL DESA BUDDIH
        </h1>
        
        {/* Loading Bar */}
        <div className="w-64 sm:w-80 h-2 bg-white/20 rounded-full overflow-hidden mx-auto">
          <motion.div 
            className="h-full bg-white rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white/60 text-xs font-bold mt-4 tracking-widest uppercase">
          Memuat Konten... {progress}%
        </p>
      </div>
    </motion.div>
  );
}