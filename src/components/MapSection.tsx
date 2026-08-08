import React from 'react';

interface MapSectionProps {
  filter: "peta" | "umkm" | "evakuasi";
}

export default function MapSection({ filter }: MapSectionProps) {
  // Peta Standar
  const defaultMap = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15826.5492211145!2d113.4835!3d-7.1891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7915555555555%3A0x5555555555555555!2sBuddih%2C%20Pademawu%2C%20Pamekasan%20Regency%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1650000000000!5m2!1sen!2sid";
  
  // Peta UMKM (Menggunakan iframe yang Anda berikan)
  const umkmMap = "https://www.google.com/maps/d/u/0/embed?mid=1DqMOGITFUNy9dCBelcyFL5EbDZxY1D8&ehbc=2E312F";
  
  // Peta E-Mitigasi (Menggunakan iframe yang Anda berikan)
  const evakuasiMap = "https://www.google.com/maps/d/u/0/embed?mid=1U8rZZ78IoTnEZJQXuDzlpHzh77lgnCw&ehbc=2E312F";

  const getMapSrc = () => {
    switch (filter) {
      case "umkm": return umkmMap;
      case "evakuasi": return evakuasiMap;
      default: return defaultMap;
    }
  };

  return (
    <iframe 
      title="Peta Desa Buddih Pamekasan"
      src={getMapSrc()}
      width="100%" 
      height="100%" 
      style={{ border: 0 }} 
      allowFullScreen={false} 
      loading="lazy" 
      referrerPolicy="no-referrer-when-downgrade"
      className="w-full h-full"
    ></iframe>
  );
}