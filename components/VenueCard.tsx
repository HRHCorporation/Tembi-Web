import React from 'react';
import Image from 'next/image';
import { Calendar, Users } from 'lucide-react';

// Definisi Tipe Data (Interface) untuk Props
export interface VenueProps {
  imageSrc: string;
  title: string;
  description: string;
  capacity?: string;    
  facilities: string[];
}

const VenueCard: React.FC<VenueProps> = ({
  imageSrc,
  title,
  description,
  capacity,
  facilities,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
      
      {/*Bagian Gambar*/}
      <div className="relative h-64 w-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover"
        />
        {/* Badge Kapasitas (Jika ada prop capacity) */}
        {capacity && (
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-medium">
            <Users size={16} />
            <span>{capacity}</span>
          </div>
        )}
      </div>

      {/*Bagian Konten*/}
      <div className="p-6 flex flex-col flex-grow">
        
        {/* Judul & Deskripsi */}
        <div className="mb-6">
          <h3 className="text-2xl font-serif text-[#2C2420] font-bold mb-2">
            {title}
          </h3>
          <p className="text-[#5C5C5C] text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Fasilitas */}
        <div className="mb-8 flex-grow">
          <p className="text-[#2C2420] font-semibold text-sm mb-3">Included Facilities:</p>
          <div className="flex flex-wrap gap-2">
            {facilities.map((facility, index) => (
              <span 
                key={index}
                className="bg-[#94A373] text-white text-[11px] px-3 py-1 rounded-full font-medium"
              >
                {facility}
              </span>
            ))}
          </div>
        </div>

        {/* Tombol Detail */}
        <button className="w-full bg-[#8FA876] hover:bg-[#7D9465] text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 mt-auto">
          <Calendar size={18} />
          Detail Venue
        </button>

      </div>
    </div>
  );
};

export default VenueCard;