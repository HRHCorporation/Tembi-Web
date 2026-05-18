"use client";

import React, { use } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";

const formatRupiah = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  }).format(price);
};

const getAmenityIcon = (amenity: string) => {
  const lower = amenity.toLowerCase();

  let iconPath = "/images/icons/star.png";

  if (lower.includes("wifi")) iconPath = "/images/icons/wifi-green.png";
  else if (lower.includes("air") || lower.includes("snow"))
    iconPath = "/images/icons/snow-green.png";
  else if (lower.includes("bath") || lower.includes("mandi"))
    iconPath = "/images/icons/bathub-green.png";
  else if (
    lower.includes("rice") ||
    lower.includes("taman") ||
    lower.includes("garden") ||
    lower.includes("sawah")
  )
    iconPath = "/images/icons/leaf-green.png";
  else if (lower.includes("bar") || lower.includes("mini"))
    iconPath = "/images/icons/minibar-green.png";
  else if (lower.includes("terrace") || lower.includes("teras"))
    iconPath = "/images/icons/terrace-green.png";
  else if (lower.includes("pool") || lower.includes("kolam"))
    iconPath = "/images/icons/swim-green.png";

  return (
    <Image
      src={iconPath}
      alt={amenity}
      width={20}
      height={20}
      className="object-contain"
    />
  );
};

export default function RoomDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { t } = useLanguage();
  const { slug } = use(params);

  const room = t.house.item.find((v) => v.slug === slug);

  if (!room) {
    return notFound();
  }

  return (
    <main className="bg-[#F8F9FA] min-h-screen pb-20">
      <section className="relative h-[60vh] min-h-125 w-full">
        <Image
          src={room.imageUrl}
          alt={room.name}
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

        <Link
          href="/rooms"
          className="absolute top-24 left-6 z-20 text-white hover:text-gray-200 flex items-center gap-2 transition-colors"
        >
          <ArrowLeft size={24} />
          <span className="font-medium">{t.houseDetail.back}</span>
        </Link>

        <div className="absolute bottom-0 left-0 w-full z-20 pb-12">
          <div className="container mx-auto px-4 md:px-10">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="bg-[#8B9D68] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Recommendation
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2 drop-shadow-md">
              {room.name}
            </h1>
            <p className="text-gray-300 text-lg font-light tracking-wide">
              {room.tagline}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-10 py-12 space-y-8">
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-10">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">
                {room.name}
              </h2>

              <div className="flex items-center gap-6 text-gray-500 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <div className="relative w-5 h-5 opacity-80">
                    <Image
                      src="/images/icons/bed-green.png"
                      alt="Bed Size"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>{room.details.bed}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative w-5 h-5 opacity-80">
                    <Image
                      src="/images/icons/group-green.png"
                      alt="Guests Capacity"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>
                    {room.details.guests} {t.houseDetail.guest}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative w-5 h-5 opacity-80">
                    <Image
                      src="/images/icons/corner-green.png"
                      alt="Room Size"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>{room.details.size}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 md:mt-0 text-left md:text-right">
              <div className="text-3xl font-bold text-[#8B9D68]">
                {formatRupiah(room.price)}
              </div>
              <p className="text-gray-400 text-sm mt-1">
                {t.houseDetail.night}
              </p>
            </div>
          </div>

          <div className="space-y-6 text-gray-600 leading-relaxed mb-10 text-justify md:text-left">
            {room.longDescription.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <hr className="border-gray-100 mb-10" />

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6 font-serif">
              {t.houseDetail.facilities}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {room.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-[#F8F9FA] rounded-lg"
                >
                  <div className="text-[#8B9D68] opacity-80">
                    {getAmenityIcon(amenity)}
                  </div>
                  <span className="text-gray-600 text-sm font-medium">
                    {amenity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-10">
          <div className="flex justify-between items-end mb-8">
            <h3 className="text-2xl font-bold text-gray-800 font-serif">
              {t.houseDetail.gallery}
            </h3>
            <button className="text-[#8B9D68] font-semibold hover:underline cursor-pointer text-sm">
              {t.houseDetail.viewall}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
            {room.galleryImages?.map((imageSrc, index) => {
              const isFirst = index === 0;

              return (
                <div
                  key={index}
                  className={`relative rounded-xl overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-300
                    ${isFirst ? "sm:col-span-2 sm:row-span-2" : ""} 
                  `}
                >
                  <Image
                    src={imageSrc}
                    alt={`${room.name} room ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 font-serif">
            {t.houseDetail.policy.title}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            <div>
              <h4 className="font-bold text-gray-800 mb-4 text-sm">
                Check-in & Check-out
              </h4>
              <ul className="space-y-4 text-gray-600 text-sm">
                <li className="flex items-center gap-3">
                  <div className="relative w-4 h-4 opacity-70">
                    <Image
                      src="/images/icons/clock-green.png"
                      alt="-green"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>Check-in: {room.policies.checkIn}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="relative w-4 h-4 opacity-70">
                    <Image
                      src="/images/icons/clock-green.png"
                      alt="clock"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>Check-out: {room.policies.checkOut}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="relative w-4 h-4 opacity-70">
                    <Image
                      src="/images/icons/id-green.png"
                      alt="id"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>{t.houseDetail.policy.id}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-800 mb-4 text-sm">
                {t.houseDetail.policy.cancelPolicy}
              </h4>
              <ul className="space-y-4 text-gray-600 text-sm">
                <li className="flex items-center gap-3">
                  <div className="relative w-4 h-4">
                    <Image
                      src="/images/icons/check.png"
                      alt="check"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>{t.houseDetail.policy.cancel}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="relative w-4 h-4">
                    <Image
                      src="/images/icons/info.png"
                      alt="info"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>{t.houseDetail.policy.refund}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="relative w-4 h-4">
                    <Image
                      src="/images/icons/warning.png"
                      alt="warning"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>{t.houseDetail.policy.sameday}</span>
                </li>
              </ul>
            </div>
          </div>

          <hr className="border-gray-100 mb-8" />

          <div>
            <h4 className="font-bold text-gray-800 mb-4 text-sm">
              {t.houseDetail.houseRules.title}
            </h4>
            <div className="flex flex-wrap gap-8 text-gray-600 text-sm">
              <div className="flex items-center gap-3">
                <div className="relative w-4 h-4 opacity-60">
                  <Image
                    src="/images/icons/no-smoking.png"
                    alt="smoking"
                    fill
                    className="object-contain"
                  />
                </div>
                <span>
                  {room.houseRules.smoking
                    ? t.houseDetail.houseRules.smokingtrue
                    : t.houseDetail.houseRules.smokingfalse}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-4 h-4 opacity-60">
                  <Image
                    src="/images/icons/pet-green.png"
                    alt="pets"
                    fill
                    className="object-contain"
                  />
                </div>
                <span>
                  {room.houseRules.pets
                    ? t.houseDetail.houseRules.petstrue
                    : t.houseDetail.houseRules.petsfalse}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-4 h-4 opacity-60">
                  <Image
                    src="/images/icons/sound-green.png"
                    alt="quiet"
                    fill
                    className="object-contain"
                  />
                </div>
                <span>{t.houseDetail.houseRules.quiet}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:px-10 md:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 font-serif self-start md:self-auto">
              {room.name}
            </h3>
            <div className="mt-6 md:mt-0 text-left md:text-right">
              <div className="text-3xl font-bold text-[#8B9D68]">
                {formatRupiah(room.price)}
              </div>
              <p className="text-gray-400 text-sm mt-1">
                {t.houseDetail.night}
              </p>
            </div>
          </div>

          <Link
            href="/booking"
            className="block w-full bg-[#8B9D68] hover:bg-[#738354] text-white text-lg font-bold py-4 rounded-lg shadow-sm transition-all duration-300 text-center"
          >
            {t.houseDetail.booking}
          </Link>
        </section>
      </div>
    </main>
  );
}
