'use client';

import React from 'react';
import Image from 'next/image';

// Tipe data untuk props card
export interface CollectionItem {
  id: string | number;
  imageUrl: string;
  category: string;
  title: string;
  description: string;
}

interface CollectionCardProps {
  item: CollectionItem;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ item }) => {
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      
      <div className="relative aspect-[4/3] w-full bg-gray-50 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-110 mix-blend-multiply"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-6">
        <span className="inline-block text-[10px] sm:text-xs font-bold tracking-widest text-[#8F9F6A] uppercase mb-2">
          {item.category}
        </span>

        <h3 className="font-serif text-xl font-bold text-[#433422] mb-3">
          {item.title}
        </h3>

        <p className="text-sm text-gray-500 leading-relaxed line-clamp-4">
          {item.description}
        </p>
      </div>
    </div>
  );
};

export default CollectionCard;