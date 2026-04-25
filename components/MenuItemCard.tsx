'use client';
import React from 'react';
import Image from 'next/image';

interface MenuItemCardProps {
  image: string;
  title: string;
  desc: string;
}

const MenuItemCard = ({ image, title, desc }: MenuItemCardProps) => {
  return (
    <div className="group rounded-2xl bg-white overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full flex flex-col">
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-500" 
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="mb-2 font-serif text-lg font-bold text-[#4A3B32] line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 flex-grow">{desc}</p>
      </div>
    </div>
  );
};

export default MenuItemCard;
