'use client';

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext"; 

export function AmenitiesSection() {
  const { t } = useLanguage(); 

  // Mengambil data dinamis dari Context
  const mainAmenities = t.house.amenities.item;
  const resortAmenities = t.house.additional.item;

  return (
    <section className="py-20 bg-white text-gray-800">
      <div className="container mx-auto px-6">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-[#1A2B1E] mb-4">
            {t.house.amenities.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            {t.house.amenities.desc}
          </p>
        </div>

        {/* --- MAIN GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
          {mainAmenities.map((category, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {/* Icon Circle */}
              <div className="w-20 h-20 bg-[#EAF0E5] rounded-full flex items-center justify-center mb-6">
                <div className="relative w-8 h-8 opacity-80">
                  <Image 
                    src={category.icon} 
                    alt={category.title} 
                    fill 
                    className="object-contain"
                  />
                </div>
              </div>
              
              {/* Category Title */}
              <h3 className="text-xl font-serif font-bold mb-6 text-[#1A2B1E]">
                {category.title}
              </h3>

              {/* List Items */}
              <ul className="space-y-3 text-gray-600">
                {category.items.map((item, idx) => (
                  <li key={idx} className="text-sm md:text-base font-light">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* --- ADDITIONAL RESORT AMENITIES BOX --- */}
        <div className="bg-[#F8F9F7] rounded-[2rem] p-10 md:p-16">
          <h3 className="text-2xl md:text-5xl font-serif font-bold text-center text-[#1A2B1E] mb-12">
            {t.house.additional.title}
          </h3>

          <div className="flex flex-wrap justify-center gap-8 md:gap-32 text-center">
            {resortAmenities.map((amenity, index) => (
              <div key={index} className="flex flex-col items-center gap-4 group">
                 {/* Icon Wrapper */}
                 <div className="relative w-10 h-10 opacity-100 transition-opacity">
                    <Image 
                        src={amenity.icon} 
                        alt={amenity.name} 
                        fill 
                        className="object-contain"
                    />
                 </div>
                 <span className="text-sm font-bold text-gray-700">
                    {amenity.name}
                 </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}