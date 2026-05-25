"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/app/context/LanguageContext";
import HouseCard from "./HouseCard";
import Image from "next/image";
import Link from "next/link";
import { useMainContext } from "@/app/context/MainContext";

export default function Accomodation() {
	const { t } = useLanguage();
	const { house, houseLoading, houseError } = useMainContext();

	const icons = [
		{
			icon: "/images/icons/wifi-green.png",
			text: t.homepage.pavillion.desc[0],
		},
		{
			icon: "/images/icons/cup-green.png",
			text: t.homepage.pavillion.desc[1],
		},
		{
			icon: "/images/icons/music-green.png",
			text: t.homepage.pavillion.desc[2],
		},
	];

	if (!houseLoading && !houseError && house.length === 0) {
		return null;
	}

	const getGridClass = () => {
		if (house.length === 1) return "grid grid-cols-1 max-w-md mx-auto";
		if (house.length === 2)
			return "grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto";
		return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
	};

	return (
		<section className="py-24 bg-white">
			<div className="container mx-auto px-6">
				<ScrollReveal animation="fadeUp" duration={800}>
					<div className="text-center max-w-3xl mx-auto mb-16">
						<h4 className="text-xs font-bold tracking-[0.2em] text-tembi uppercase mb-3">
							{t.homepage.accommodation.label}
						</h4>
						<h2 className="text-5xl font-serif text-gray-900 mb-6">
							{t.homepage.accommodation.title}
						</h2>
						<p className="text-gray-600 leading-relaxed text-lg">
							{t.homepage.accommodation.desc}
						</p>
					</div>
				</ScrollReveal>

				{houseLoading && (
					<div className="grid md:grid-cols-3 gap-8 mb-20 mx-auto max-w-7xl px-4">
						{[1, 2, 3].map((i) => (
							<div
								key={i}
								className="h-150 bg-gray-200 animate-pulse rounded-sm"
							/>
						))}
					</div>
				)}

				{houseError && (
					<div className="text-center py-12 mb-20">
						<p className="text-red-500">Failed to load houses: {houseError}</p>
					</div>
				)}

				{!houseLoading && !houseError && house.length > 0 && (
					<div className={`${getGridClass()} gap-8 mb-20 px-4`}>
						{house.map((item, index) => (
							<ScrollReveal
								key={item.id}
								animation="fadeUp"
								delay={index * 150}
								duration={700}
							>
								<HouseCard house={item} />
							</ScrollReveal>
						))}
					</div>
				)}

				{/* <div className="mx-auto max-w-7xl px-4">
					<div className="bg-stone-50 rounded-lg p-10 md:p-14">
						<div className="grid md:grid-cols-4 gap-12 items-center">
							<div>
								<h3 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 space-y-1 md:space-y-0 md:leading-tight">
									<span className="block">{t.homepage.pavillion.title[0]}</span>
									<span className="block">{t.homepage.pavillion.title[1]}</span>
								</h3>
							</div>
							<div className="md:col-span-2">
								<div className="grid grid-cols-3 gap-y-6">
									{icons.map((item, idx) => (
										<div
											key={idx}
											className="flex flex-col items-center gap-2 text-gray-600 text-base text-center"
										>
											<div className="relative w-16 h-16 shrink-0">
												<Image
													src={item.icon}
													alt={item.text}
													fill
													className="object-contain"
													sizes="64px"
												/>
											</div>
											<span className="leading-tight">{item.text}</span>
										</div>
									))}
								</div>
							</div>
							<div className="text-center md:text-right md:border-l md:border-gray-200 md:pl-12 flex flex-col items-center md:items-end justify-center">
								<Link
									href="/rooms"
									className="inline-block bg-tembi hover:bg-darktembi text-white py-3 px-8 rounded-sm text-sm font-medium transition-colors whitespace-nowrap"
								>
									{t.homepage.pavillion.button}
								</Link>
							</div>
						</div>
					</div>
				</div> */}
			</div>
			<div className="bg-stone-50 rounded-lg p-10 md:p-14">
				<div className="grid md:grid-cols-4 gap-12 items-center">
					<div>
						<h3 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 space-y-1 md:space-y-0 md:leading-tight">
							<span className="block">{t.homepage.pavillion.title[0]}</span>
							<span className="block">{t.homepage.pavillion.title[1]}</span>
						</h3>
					</div>
					<div className="md:col-span-2">
						<div className="grid grid-cols-3 gap-y-6">
							{icons.map((item, idx) => (
								<div
									key={idx}
									className="flex flex-col items-center gap-2 text-gray-600 text-base text-center"
								>
									<div className="relative w-16 h-16 shrink-0">
										<Image
											src={item.icon}
											alt={item.text}
											fill
											className="object-contain"
											sizes="64px"
										/>
									</div>
									<span className="leading-tight">{item.text}</span>
								</div>
							))}
						</div>
					</div>
					<div className="text-center md:text-right md:border-l md:border-gray-200 md:pl-12 flex flex-col items-center md:items-end justify-center">
						<Link
							href="/rooms"
							className="inline-block bg-tembi hover:bg-darktembi text-white py-3 px-8 rounded-sm text-sm font-medium transition-colors whitespace-nowrap"
						>
							{t.homepage.pavillion.button}
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
