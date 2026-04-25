import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PackageCardProps {
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  linkUrl: string;
  buttonText: string;
}

export default function PackageCard({ 
  image, 
  badge, 
  title, 
  subtitle, 
  desc, 
  features, 
  linkUrl, 
  buttonText 
}: PackageCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full">
      {/* Image Header */}
      <div className="relative h-56 w-full">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover" 
        />
        {/* Badge Pax */}
        <div className="absolute top-4 right-4 bg-[#8F9E75] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
          {badge}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="font-serif text-2xl font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm font-medium text-gray-500 mb-4">{subtitle}</p>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">{desc}</p>

        {/* Features List */}
        <div className="space-y-3 mb-8 flex-grow">
          {features.map((feat, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-4 h-4 flex items-center justify-center overflow-hidden relative">
                 <Image 
                    src="/images/icons/check-black.png" 
                    alt="check" 
                    fill 
                 />
              </div>
              <span className="text-sm text-gray-700">{feat}</span>
            </div>
          ))}
        </div>

        {/* Button Link */}
        <Link 
          href={linkUrl}
          className="w-full text-center bg-[#8F9E75] hover:bg-[#7A8B60] text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Image 
            src="/images/icons/view-white.png" 
            alt="view" 
            width={18} 
            height={16} 
          />
          {buttonText}
        </Link>
      </div>
    </div>
  );
}