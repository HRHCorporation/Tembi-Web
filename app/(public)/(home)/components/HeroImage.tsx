import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { useMainContext } from "@/app/context/MainContext";

const heroImages = [
	"/images/homepage/homepage-hero1.webp",
	"/images/homepage/homepage-hero2.webp",
	"/images/homepage/homepage-hero3.webp",
];

export default function HeroImage() {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const { t, language } = useLanguage();
	const { carousel, carouselLoading } = useMainContext();

	const displayImages = useMemo(() => {
		const activeImages = carousel
			.filter((item) => item.getIsActive() && item.image)
			.map((item) => ({
				id: item.id,
				url: `${process.env.NEXT_PUBLIC_URL || ""}${item.image}`,
				title: item.getTitle(language === "id" ? "id" : "en"),
			}));

		return activeImages.length > 0
			? activeImages
			: heroImages.map((url, idx) => ({ id: idx, url, title: "Resort view" }));
	}, [carousel, language]);

	useEffect(() => {
		if (currentImageIndex >= displayImages.length) {
			setCurrentImageIndex(0);
		}
	}, [displayImages.length, currentImageIndex]);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
		}, 5000);

		return () => clearInterval(interval);
	}, [displayImages.length]);

	if (carouselLoading) {
		return (
			<section className="relative h-screen w-full overflow-hidden bg-gray-900">
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="text-white">Loading...</div>
				</div>
			</section>
		);
	}

	return (
		<section className="relative h-screen w-full overflow-hidden bg-gray-900">
			<div className="absolute inset-0 z-0">
				{displayImages.map((item, index) => (
					<div
						key={item.id}
						className={`absolute inset-0 transition-opacity duration-1000 ${
							index === currentImageIndex ? "opacity-100" : "opacity-0"
						}`}
					>
						<Image
							src={item.url}
							alt={item.title || "Resort view"}
							fill
							priority={index === 0}
							sizes="100vw"
							style={{ objectFit: "cover" }}
						/>
					</div>
				))}
			</div>
			<div className="absolute inset-0 bg-black/40 z-10"></div>
			<div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
				<h2 className="text-5xl md:text-8xl font-serif font-semibold mb-8 leading-tight md:drop-shadow-2xl">
					{/* {t.homepage.hero.title[0]} <br /> {t.homepage.hero.title[1]} */}
					{displayImages[currentImageIndex]?.title || t.homepage.hero.title[0]}
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
