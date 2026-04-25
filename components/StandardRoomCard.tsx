'use client';

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";

// 1. Definisi Tipe Data Props (Eksplisit seperti VenueCard)
export interface StandardRoomCardProps {
  slug: string;
  imageUrl: string;
  badge: string;
  name: string;
  description: string;
  size: string;
  guests: number;
  view: string;
  detailsIcon: string; // Icon untuk view
}

const StandardRoomCard: React.FC<StandardRoomCardProps> = ({
  slug,
  imageUrl,
  badge,
  name,
  description,
  size,
  guests,
  view,
  detailsIcon,
}) => {
  const { t } = useLanguage();
  return (
    
    <Link href={`/rooms/${slug}`} className="block group h-full">
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full relative">
        
        {/* --- IMAGE SECTION --- */}
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={`View of ${name}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Badge */}
          <div className={`absolute top-4 left-4 bg-tembi text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm`}>
            {badge}
          </div>

          {/* Photos Count Badge */}
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-md flex items-center gap-1.5 text-xs font-medium">
            <div className="relative w-3.5 h-3.5">
              <Image 
                src="/images/icons/image-white.png" 
                alt="camera" 
                fill 
                className="object-contain invert brightness-0 filter" 
              />
            </div>
            <span>6 photos</span>
          </div>
        </div>

        {/* --- CONTENT SECTION --- */}
        <div className="p-6 flex flex-col flex-grow">
          
          {/* Title */}
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-serif font-bold text-gray-800 leading-tight group-hover:text-[#8B9D68] transition-colors">
              {name}
            </h3>
          </div>

          {/* Description */}
          <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">
            {description}
          </p>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-gray-600 mb-8">
            {/* Size */}
            <div className="flex items-center gap-2">
              <div className="relative w-4 h-4 opacity-80">
                 <Image src="/images/icons/size-green.png" alt="size" fill className="object-contain" />
              </div>
              <span>{size || "45 m²"}</span>
            </div>

            {/* Guests */}
            <div className="flex items-center gap-2">
              <div className="relative w-4 h-4 opacity-80">
                 <Image src="/images/icons/group-green.png" alt="guests" fill className="object-contain" />
              </div>
              <span>{guests} {t.house.standardCard.features.guest}</span>
            </div>

            {/* View */}
            <div className="flex items-center gap-2">
              <div className="relative w-4 h-4 opacity-80">
                 <Image src={detailsIcon} alt="view" fill className="object-contain" />
              </div>
              <span>{view}</span>
            </div>

            {/* Wifi */}
            <div className="flex items-center gap-2">
              <div className="relative w-4 h-4 opacity-80">
                 <Image src="/images/icons/wifi-green.png" alt="wifi" fill className="object-contain" />
              </div>
              <span>{t.house.standardCard.features.wifi}</span>
            </div>
          </div>

          {/* Footer Button */}
          <div className="mt-auto pt-6 border-t border-gray-100">
            <button className="w-full bg-[#8B9D68] hover:bg-[#738354] text-white font-semibold py-2.5 px-4 rounded transition-colors duration-300 text-sm tracking-wide shadow-sm hover:shadow-md">
              {t.house.standardCard.buttonText}
            </button>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default StandardRoomCard;