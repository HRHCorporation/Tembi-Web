"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";

export interface FeaturedRoomCardProps {
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  size: string;
  guests: number;
  view: string;
  detailsIcon: string;
  recommendationText: string;
}

const FeaturedRoomCard: React.FC<FeaturedRoomCardProps> = ({
  slug,
  name,
  description,
  imageUrl,
  size,
  guests,
  view,
  detailsIcon,
  recommendationText,
}) => {
  const { t } = useLanguage();
  return (
    <Link href={`/rooms/${slug}`} className="block group">
      <div className="flex flex-col md:flex-row bg-tembi rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
        <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center text-white">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium text-yellow-100 border border-white/10">
              <div className="relative w-4 h-4">
                <Image
                  src="/images/icons/crown.png"
                  alt="Crown Icon"
                  fill
                  className="object-contain"
                />
              </div>
              {recommendationText}
            </span>
          </div>

          <h2 className="text-4xl font-serif font-bold mb-4 tracking-wide">
            {name}
          </h2>

          <p className="text-gray-100/90 mb-8 text-sm leading-relaxed font-light opacity-90">
            {description}
          </p>

          <div className="flex flex-wrap items-center gap-6 mb-10 text-sm font-medium text-gray-100">
            <div className="flex items-center gap-2">
              <div className="relative w-4 h-4 opacity-80">
                <Image
                  src="/images/icons/size-gray.png"
                  alt="Size"
                  fill
                  className="object-contain"
                />
              </div>
              <span>{size || "45 m²"}</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-4 h-4 opacity-80">
                <Image
                  src="/images/icons/group-gray.png"
                  alt="Guests"
                  fill
                  className="object-contain"
                />
              </div>
              <span>
                {t.house.featuredCard.features.guest[0]} {guests}
                {t.house.featuredCard.features.guest[1]}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-4 h-4 opacity-80">
                <Image
                  src={detailsIcon}
                  alt="View"
                  fill
                  className="object-contain"
                />
              </div>
              <span>{view}</span>
            </div>
          </div>

          <div className="bg-white text-tembi font-bold py-3 px-8 rounded hover:bg-gray-100 transition-colors w-fit text-sm tracking-wide">
            {t.house.featuredCard.buttonText}
          </div>
        </div>

        <div className="md:w-1/2 h-87.5 md:h-auto relative">
          <Image
            src={imageUrl}
            alt={`View of ${name}`}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </Link>
  );
};

export default FeaturedRoomCard;
