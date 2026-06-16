"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { FACILITY_ICONS } from "./admin/constants/facility-icons";

export interface StandardRoomCardProps {
  slug: string;
  imageUrl: string;
  badge: string;
  name: string;
  description: string;
  size: string;
  guests: number;
  facilities: Array<{ name: string; icon: string }>;
  galleryCount?: number;
}

const StandardRoomCard: React.FC<StandardRoomCardProps> = ({
  slug,
  imageUrl,
  badge,
  name,
  description,
  size,
  guests,
  facilities,
  galleryCount = 6,
}) => {
  const { t } = useLanguage();

  const imageSource =
    imageUrl && imageUrl.trim() !== ""
      ? imageUrl
      : "/images/placeholder-room.jpg";

  return (
    <Link href={`/rooms/${slug}`} className="block group h-full">
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full relative">
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={imageSource}
            alt={`View of ${name}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute top-4 left-4 bg-tembi text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {badge}
          </div>

          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-md flex items-center gap-1.5 text-xs font-medium">
            <div className="relative w-3.5 h-3.5">
              <Image
                src="/images/icons/image-white.png"
                alt="camera"
                fill
                className="object-contain invert brightness-0 filter"
              />
            </div>
            <span>{galleryCount} photos</span>
          </div>
        </div>

        <div className="p-6 flex flex-col grow">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-serif font-bold text-gray-800 leading-tight group-hover:text-[#8B9D68] transition-colors">
              {name}
            </h3>
          </div>
          <div
            className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <div className="relative w-4 h-4 opacity-80">
                <Image
                  src="/images/icons/size-green.png"
                  alt="size"
                  fill
                  className="object-contain"
                />
              </div>
              <span>{size || "45 m²"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-4 h-4 opacity-80">
                <Image
                  src="/images/icons/group-green.png"
                  alt="guests"
                  fill
                  className="object-contain"
                />
              </div>
              <span>
                {guests} {t.house.standardCard.features.guest}
              </span>
            </div>
            {/* {facilities.slice(0, 2).map((facility, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="relative w-4 h-4 opacity-80">
                  <Image
                    src={`/images/icons/${facility.icon}`}
                    alt={facility.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span>{facility.name}</span>
              </div>
            ))} */}
            {facilities.slice(0, 2).map((facility, idx) => {
              const iconConfig = FACILITY_ICONS.find(
                (item) => item.value === facility.icon,
              );
              const IconComponent = iconConfig?.icon;

              return (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-4 h-4 flex items-center justify-center shrink-0">
                    {IconComponent ? (
                      <IconComponent
                        size={18}
                        color="#a2ab80"
                        weight={iconConfig.weight}
                      />
                    ) : (
                      <div className="relative w-4 h-4 opacity-80">
                        <Image
                          src={
                            facility.icon.startsWith("/images") ||
                            facility.icon.startsWith("http")
                              ? facility.icon
                              : `/images/icons/${facility.icon.replace("Icon", "").toLowerCase()}.png`
                          }
                          alt={facility.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                  <span>{facility.name}</span>
                </div>
              );
            })}
          </div>
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
