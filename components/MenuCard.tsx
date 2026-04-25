import React from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';

type MenuCardProps = {
  icon: string;
  title: string;
  subtitle: string;
  items: string[];
  className?: string;
};

const MenuCard = ({ icon, title, subtitle, items, className = "" }: MenuCardProps) => {
  return (
    <div className={`group rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full flex flex-col ${className}`}>
      {/* Icon Circle */}
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#96A66D]">
        <div className="relative h-8 w-8">
           {/* Menggunakan Image dari Next.js */}
           <Image 
              src={icon} 
              alt={title} 
              fill 
              sizes="32px"
              className="object-contain brightness-0 invert" 
           />
        </div>
      </div>
      
      {/* Header Text */}
      <div className="mb-6 text-center">
        <h3 className="mb-1 font-serif text-2xl font-bold text-[#4A3B32]">{title}</h3>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>

      {/* List Items */}
      {/* flex-grow memastikan list mengisi ruang agar tinggi kartu konsisten */}
      <ul className="space-y-3 flex-grow">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-gray-600">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#96A66D]" strokeWidth={3} />
            <span className="text-sm font-medium leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuCard;