import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

const heroImages = [
  "/images/homepage/homepage-hero1.webp",
  "/images/homepage/homepage-hero2.webp",
  "/images/homepage/homepage-hero3.webp",
];

export default function HeroImage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentImageIndex
                ? "opacity-100 translate-x-0"
                : index < currentImageIndex
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
            }`}
          >
            <Image
              src={image}
              alt="Beautiful resort view"
              layout="fill"
              objectFit="cover"
              className="z-0"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h2 className="text-5xl md:text-8xl font-serif font-semibold mb-8 leading-10 md:leading-[1] md:drop-shadow-2xl">
          {t.homepage.hero.title[0]} <br /> {t.homepage.hero.title[1]}
        </h2>
        {/* <div className="flex space-x-4">
          <Link
            href="/rooms"
            className="bg-tembi hover:bg-darktembi text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 shadow-lg"
          >
            {t.homepage.hero.explore}
          </Link>
          <Link
            href="/rooms"
            className="border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white hover:text-gray-800 transition-colors duration-300 shadow-lg"
          >
            {t.homepage.hero.gallery}
          </Link>
        </div> */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
          <Link
            href="/rooms"
            className="
      bg-tembi hover:bg-darktembi
      text-white font-semibold
      text-sm sm:text-base
      py-2.5 sm:py-3
      px-5 sm:px-8
      rounded-full
      transition-colors duration-300
      shadow-lg
      text-center
      w-full sm:w-auto
    "
          >
            {t.homepage.hero.explore}
          </Link>

          <Link
            href="/rooms"
            className="
      border-2 border-white
      text-white font-semibold
      text-sm sm:text-base
      py-2.5 sm:py-3
      px-5 sm:px-8
      rounded-full
      hover:bg-white hover:text-gray-800
      transition-colors duration-300
      shadow-lg
      text-center
      w-full sm:w-auto
    "
          >
            {t.homepage.hero.gallery}
          </Link>
        </div>
      </div>
    </section>
  );
}
