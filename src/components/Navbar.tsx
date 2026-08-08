"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="w-full px-6 sm:px-12 lg:px-[200px]">
        <div className="flex items-center justify-between h-20">
          
          {/* Bagian Kiri: Logo Unira & Lambang Daerah */}
          <Link href="/" className="flex items-center space-x-3 cursor-pointer">
            <div className="flex items-center space-x-2">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11">
                <Image
                  src="/Logo_unira.png"
                  alt="Logo Unira"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="relative w-10 h-10 sm:w-11 sm:h-11">
                <Image
                  src="/Lambang_daerah.png"
                  alt="Lambang Daerah"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <div className="h-8 w-[1px] bg-gray-300 mx-1" />

            <div className="flex flex-col">
              <span className="font-bold text-gray-900 text-sm sm:text-base leading-tight">
                Desa Buddih
              </span>
              <span className="text-xs sm:text-sm text-gray-600 font-normal">
                Kabupaten Pamekasan
              </span>
            </div>
          </Link>

          {/* Bagian Tengah & Kanan: Menu Navigasi & Tombol Hubungi Kami (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-6">
              <Link 
                href="/" 
                className={`text-sm relative py-2 transition-colors ${
                  isActive('/') ? 'text-green-700 font-semibold border-b-2 border-green-700' : 'text-gray-500 hover:text-green-700 font-medium'
                }`}
              >
                Beranda
              </Link>
              <Link 
                href="/profil" 
                className={`text-sm relative py-2 transition-colors ${
                  isActive('/profil') ? 'text-green-700 font-semibold border-b-2 border-green-700' : 'text-gray-500 hover:text-green-700 font-medium'
                }`}
              >
                Profil Desa
              </Link>
              <Link 
                href="/potensi" 
                className={`text-sm relative py-2 transition-colors ${
                  isActive('/potensi') ? 'text-green-700 font-semibold border-b-2 border-green-700' : 'text-gray-500 hover:text-green-700 font-medium'
                }`}
              >
                Potensi Lokal
              </Link>
              <Link 
                href="/galeri" 
                className={`text-sm relative py-2 transition-colors ${
                  isActive('/galeri') ? 'text-green-700 font-semibold border-b-2 border-green-700' : 'text-gray-500 hover:text-green-700 font-medium'
                }`}
              >
                Galeri
              </Link>
            </nav>

            <Link
              href="/hubungi-kami" 
              className="flex items-center space-x-2 bg-[#227b13] hover:bg-[#1b620f] text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-sm transition-all"
            >
              <Phone className="h-4 w-4" />
              <span>Hubungi Kami</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <Link
              href="/hubungi-kami" 
              className="flex items-center space-x-1.5 bg-[#227b13] text-white px-3 py-1.5 rounded-full text-xs font-medium"
            >
              <Phone className="h-3 w-3" />
              <span>Hubungi</span>
            </Link>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-green-700 focus:outline-none p-1"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 pt-2 pb-4 space-y-2">
          <Link href="/" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'text-green-700 bg-green-50 font-semibold' : 'text-gray-700 hover:bg-green-50 hover:text-green-700'}`}>Beranda</Link>
          <Link href="/profil" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/profil') ? 'text-green-700 bg-green-50 font-semibold' : 'text-gray-700 hover:bg-green-50 hover:text-green-700'}`}>Profil Desa</Link>
          <Link href="/potensi" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/potensi') ? 'text-green-700 bg-green-50 font-semibold' : 'text-gray-700 hover:bg-green-50 hover:text-green-700'}`}>Potensi Lokal</Link>
          <Link href="/galeri" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/galeri') ? 'text-green-700 bg-green-50 font-semibold' : 'text-gray-700 hover:bg-green-50 hover:text-green-700'}`}>Galeri</Link>
          <Link href="/hubungi-kami" onClick={() => setIsOpen(false)} className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/hubungi-kami') ? 'text-green-700 bg-green-50 font-semibold' : 'text-gray-700 hover:bg-green-50 hover:text-green-700'}`}>Hubungi Kami</Link>
        </div>
      )}
      
      <div className="w-full h-1 bg-[#227b13]"></div>
    </header>
  );
}