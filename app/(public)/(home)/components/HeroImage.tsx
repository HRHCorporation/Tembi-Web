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
    <section className="relative h-screen w-full overflow-hidden bg-gray-900">
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt="Resort view"
              fill
              priority={index === 0}
              sizes="100vw"
              style={{ objectFit: "cover" }}
              className="z-0"
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h2 className="text-5xl md:text-8xl font-serif font-semibold mb-8 leading-tight md:drop-shadow-2xl">
          {t.homepage.hero.title[0]} <br /> {t.homepage.hero.title[1]}
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
          <Link
            href="/rooms"
            className="bg-tembi hover:bg-darktembi text-white font-semibold text-sm sm:text-base py-3 px-8 rounded-full transition-all duration-300 shadow-lg text-center w-full sm:w-auto"
          >
            {t.homepage.hero.explore}
          </Link>

          <Link
            href="/rooms"
            className="border-2 border-white bg-transparent hover:bg-white hover:text-gray-900 text-white font-semibold text-sm sm:text-base py-3 px-8 rounded-full transition-all duration-300 shadow-lg text-center w-full sm:w-auto"
          >
            {t.homepage.hero.gallery}
          </Link>
        </div>
      </div>
    </section>
  );
}
