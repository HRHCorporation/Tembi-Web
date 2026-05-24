"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import NextImage from "next/image";
import Link from "next/link";
import House from "@/feature/core/main/domain/entity/house.entity";
import { useLanguage } from "@/app/context/LanguageContext";

interface HouseCardProps {
  house: House;
}

export default function HouseCard({ house }: HouseCardProps) {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const images = (house.getGalleries() || [])
    .filter((gallery) => gallery?.image && gallery.image.trim() !== "")
    .map((gallery) => {
      return gallery.image;
    });

  const hasMultipleImages = images.length > 1;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  }, [images.length]);

  const startAutoSlide = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopAutoSlide();
  }, []);

  const handleManualPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopAutoSlide();
    prevSlide();
  };

  const handleManualNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    stopAutoSlide();
    nextSlide();
  };

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    stopAutoSlide();
    setCurrentIndex(index);
  };

  if (images.length === 0) {
    return null;
  }

  const description = house.getDescription(language === "id" ? "id" : "en");

  return (
    <div className="bg-white border border-gray-100 rounded-sm hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full overflow-hidden">
      <div
        className="relative h-80 overflow-hidden group/slider"
        onMouseEnter={hasMultipleImages ? startAutoSlide : undefined}
        onMouseLeave={hasMultipleImages ? stopAutoSlide : undefined}
      >
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <div key={index} className="relative h-full min-w-full">
              <NextImage
                src={img || "/images/homepage/content3.webp"}
                alt={`${house.getTitle(language === "id" ? "id" : "en")} - ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />

              {house.getIsRecommendation() && (
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-gray-700 rounded-sm shadow-sm z-10">
                  Recommendation
                </div>
              )}
            </div>
          ))}
        </div>

        {hasMultipleImages && (
          <>
            <button
              onClick={handleManualPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all duration-300 z-20 shadow-md cursor-pointer hover:scale-110"
              aria-label="Previous image"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={handleManualNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full opacity-0 group-hover/slider:opacity-100 transition-all duration-300 z-20 shadow-md cursor-pointer hover:scale-110"
              aria-label="Next image"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-20">
              {images.map((_, slideIndex) => (
                <button
                  key={slideIndex}
                  onClick={(e) => handleDotClick(e, slideIndex)}
                  className={`transition-all duration-300 h-1.5 rounded-full cursor-pointer shadow-sm ${
                    currentIndex === slideIndex
                      ? "bg-white w-5"
                      : "bg-white/50 w-1.5 hover:bg-white/80"
                  }`}
                  aria-label={`Go to image ${slideIndex + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-8 flex flex-col grow relative z-30 bg-white">
        <h3 className="text-xl font-serif font-bold mb-3 text-gray-900">
          {house.getTitle(language === "id" ? "id" : "en")}
        </h3>

        <div
          className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-4 grow prose prose-sm max-w-none prose-p:my-1 prose-strong:text-gray-700 prose-strong:font-semibold"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        <div className="flex gap-5 text-xs text-gray-500 mb-8 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-tembi"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>King Bed</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-tembi"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Pool View</span>
          </div>
        </div>

        <Link
          href={`/rooms/${house.slug}`}
          className="w-28 bg-tembi hover:bg-darktembi text-white text-sm font-medium py-3 px-6 rounded-sm transition-colors mx-auto flex items-center justify-center"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}
