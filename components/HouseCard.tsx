"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import NextImage from "next/image"; // Import yang benar untuk Image
import Link from "next/link";

// Definisikan tipe props
interface HouseProps {
  house: {
    name: string;
    images: string[];
    desc: string;
    path: string;
    features: string[];
    icons: string[];
  };
}

export default function HouseCard({ house }: HouseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // useRef untuk menyimpan ID timer interval agar tidak hilang antar render
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const images = house.images;
  const hasMultipleImages = images.length > 1;

  // --- LOGIKA PINDAH SLIDE ---

  // Menggunakan useCallback agar fungsi ini stabil dan tidak dibuat ulang setiap render
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  // --- LOGIKA HOVER AUTO-SLIDE ---

  const startAutoSlide = () => {
    // Hentikan timer sebelumnya jika ada, untuk menghindari timer ganda
    if (timerRef.current) clearInterval(timerRef.current);
    // Ganti gambar setiap 1.5 detik (ubah angka 1500 sesuai kebutuhan)
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 1000);
  };

  const stopAutoSlide = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Cleanup: Pastikan timer mati jika komponen dihapus dari layar (unmount)
  useEffect(() => {
    return () => stopAutoSlide();
  }, []);

  // --- HANDLER TOMBOL MANUAL ---
  // Saat tombol ditekan manual, kita hentikan dulu auto-slide agar tidak bentrok
  const handleManualPrev = (e: React.MouseEvent) => {
    e.stopPropagation(); // Mencegah klik tembus ke Link parent
    stopAutoSlide();
    prevSlide();
  };

  const handleManualNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopAutoSlide();
    nextSlide();
  };

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    stopAutoSlide();
    setCurrentIndex(index);
  }


  return (
    // Tambahkan 'group' di sini untuk hover detection
    <div className="bg-white border border-gray-100 rounded-sm hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full overflow-hidden">
      
      {/* --- AREA GAMBAR (SLIDER CONTAINER) --- */}
      {/* Pasang event listener hover di container utama gambar */}
      <div 
        className="relative h-80 overflow-hidden group/slider"
        onMouseEnter={hasMultipleImages ? startAutoSlide : undefined}
        onMouseLeave={hasMultipleImages ? stopAutoSlide : undefined}
      >
        
        {/* --- TRACK SLIDER (Inilah yang bergeser) --- */}
        {/* Kita gunakan flex untuk menata gambar sejajar horizontal */}
        <div 
          className="flex h-full transition-transform duration-500 ease-out"
           // Rumus geser: index * 100%. Misal index 1, geser -100% ke kiri.
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            // min-w-full SANGAT PENTING: agar setiap gambar selebar container induknya
            <div key={index} className="relative h-full min-w-full">
              <NextImage
                src={img}
                alt={`${house.name} - ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0} // Prioritaskan load gambar pertama
              />
             {/* Label Recommendation (Dimasukkan ke tiap slide atau di luar track) */}
             <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-gray-700 rounded-sm shadow-sm z-10">
                  Recommendation
              </div>
            </div>
          ))}
        </div>

        {/* --- TOMBOL NAVIGASI (Hanya jika gambar > 1) --- */}
        {hasMultipleImages && (
          <>
            {/* Tombol Kiri */}
            <button
              onClick={handleManualPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all duration-300 z-20 shadow-md cursor-pointer hover:scale-110"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>

            {/* Tombol Kanan */}
            <button
              onClick={handleManualNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all duration-300 z-20 shadow-md cursor-pointer hover:scale-110"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>

            {/* --- DOTS INDICATOR --- */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-20">
              {images.map((_, slideIndex) => (
                <button
                  key={slideIndex}
                  onClick={(e) => handleDotClick(e, slideIndex)}
                  className={`transition-all duration-300 h-1.5 rounded-full cursor-pointer shadow-sm ${
                    currentIndex === slideIndex ? "bg-white w-5" : "bg-white/50 w-1.5 hover:bg-white/80"
                  }`}
                ></button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* --- KONTEN KARTU (Tidak berubah) --- */}
      <div className="p-8 flex flex-col flex-grow relative z-30 bg-white">
        <h3 className="text-xl font-serif font-bold mb-3 text-gray-900">
          {house.name}
        </h3>
        {/* ... sisa konten sama ... */}
        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-4 flex-grow">
          {house.desc}
        </p>
         {/* Facilities */}
         <div className="flex gap-5 text-xs text-gray-500 mb-8 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2">
            <div className="relative w-3 h-3">
              <NextImage src={house.icons[0]} alt="Icon" fill className="object-contain" />
            </div>
            <span>{house.features[0]}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-3 h-3">
              <NextImage src={house.icons[1]} alt="Icon" fill className="object-contain" />
            </div>
            <span>{house.features[1]}</span>
          </div>
        </div>

        <Link
          href={house.path}
          className="w-28 bg-tembi hover:bg-darktembi text-white text-sm font-medium py-3 px-6 rounded-sm transition-colors mx-auto flex items-center justify-center"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
} 