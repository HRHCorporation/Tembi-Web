"use client";

import React from "react";
import Image from "next/image";
import CollectionCard from "@/components/CollectionCard";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/app/context/LanguageContext";
import { useCollectionContext } from "@/app/context/CollectionContext";

export default function CollectionsPage() {
	const { t, language } = useLanguage();

	const {
		collectionBanner,
		bannerLoading,
		bannerError,
		collectionList,
		collectionListLoading,
		collectionListError,
	} = useCollectionContext();

	return (
		<main className="w-full">
			<section className="relative h-screen w-full overflow-hidden">
				<div className="absolute inset-0 z-0">
					{bannerLoading ? (
						<div className="w-full h-full bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse">
							<div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />
						</div>
					) : (
						<>
							<Image
								src={
									collectionBanner?.image ||
									"/images/collection/koleksicover.webp"
								}
								alt={
									collectionBanner?.getTitle(language) ||
									"Tembi Historical Background"
								}
								fill
								sizes="100vw"
								priority
								quality={90}
								className="object-cover object-center"
							/>
							<div className="absolute inset-0 bg-black/60 sm:bg-linear-to-r sm:from-black/80 sm:to-black/40" />
						</>
					)}
				</div>

				<div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-8 flex flex-col justify-center">
					<div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 text-gray-100 px-4 py-1.5 rounded-full w-fit mb-6">
						<div className="relative flex items-center justify-center">
							<Image
								src="/images/icons/museum-white.png"
								alt="Heritage Icon"
								width={18}
								height={18}
								className="w-4.5 h-4.5 object-contain"
							/>
						</div>
						<span className="text-xs sm:text-sm font-medium tracking-wide uppercase">
							{t.collection.hero.badge}
						</span>
					</div>

					<h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-6">
						{collectionBanner?.getTitle(language) || t.collection.hero.title}
					</h1>

					<div className="max-w-2xl text-gray-200 text-base sm:text-lg leading-relaxed space-y-4 mb-10">
						<p>
							{collectionBanner?.getSubtitle(language) ||
								t.collection.hero.desc[0]}
						</p>
						<p className="hidden sm:block text-gray-300/90">
							{collectionBanner?.getDescription(language) ||
								t.collection.hero.desc[1]}
						</p>
					</div>

					<div>
						<button className="group flex items-center gap-3 bg-[#8F9F6A] hover:bg-[#7d8c5c] text-white px-6 py-3.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
							<div className="relative w-5 h-5 group-hover:scale-110 transition-transform duration-300">
								<Image
									src="/images/icons/view-white.png"
									alt="Explore Icon"
									width={20}
									height={20}
									className="w-full h-full object-contain"
								/>
							</div>
							<span className="font-semibold tracking-wide">
								{t.collection.hero.buttonText}
							</span>
						</button>
					</div>
				</div>
			</section>

			<div className="w-full bg-[#FAFAFA] py-16 sm:py-24">
				<div className="max-w-7xl mx-auto px-6 sm:px-8">
					{collectionListLoading && (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
							{[1, 2, 3, 4, 5, 6].map((i) => (
								<div
									key={i}
									className="h-96 bg-gray-200 animate-pulse rounded-lg"
								/>
							))}
						</div>
					)}

					{collectionListError && (
						<div className="text-center py-12">
							<p className="text-red-500">
								Failed to load collections: {collectionListError}
							</p>
						</div>
					)}

					{!collectionListLoading &&
						!collectionListError &&
						collectionList!.length > 0 && (
							<>
								{collectionList!.map((category, categoryIndex) => (
									<div key={category.id} className="mb-20 last:mb-0">
										<ScrollReveal animation="fadeUp" duration={800}>
											<div className="text-center mb-12">
												<h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#433422] mb-4">
													{category.getName(language)}
												</h2>
											</div>
										</ScrollReveal>

										{category.hasItems() && (
											<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
												{category.getItems().map((item, itemIndex) => (
													<ScrollReveal
														key={item.id}
														animation="fadeUp"
														delay={itemIndex * 100}
														duration={700}
													>
														<CollectionCard
															item={{
																id: item.id,
																imageUrl: item.hasImage()
																	? `${process.env.NEXT_PUBLIC_API_URL || ""}${item.image}`
																	: "/images/placeholder.jpg",
																title: item.getName(language),
																description: item.getDescription(language),
																category: category.getName(language),
															}}
														/>
													</ScrollReveal>
												))}
											</div>
										)}

										{!category.hasItems() && (
											<div className="text-center py-12">
												<p className="text-gray-500">
													No items available in this category.
												</p>
											</div>
										)}
									</div>
								))}
							</>
						)}

					{!collectionListLoading &&
						!collectionListError &&
						collectionList!.length === 0 && (
							<div className="text-center py-12">
								<p className="text-gray-500">
									No collections available at the moment.
								</p>
							</div>
						)}
				</div>
			</div>
		</main>
	);
}
