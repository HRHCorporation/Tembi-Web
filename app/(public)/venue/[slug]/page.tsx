"use client";

import React, { use, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { Info, X, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import ScrollReveal from "@/components/ScrollReveal";
import { useVenueContext } from "@/app/context/VenueContext";

export default function VenueDetailPage() {
	const { t, language } = useLanguage();
	const params = useParams();
	const slug = params.slug as string;

	const { venueSlug, venueSlugLoading, venueSlugError, refreshVenueSlug } =
		useVenueContext();

	useEffect(() => {
		if (slug) {
			refreshVenueSlug(slug);
		}
	}, [slug, refreshVenueSlug]);

	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [lightboxIndex, setLightboxIndex] = useState(0);

	const resolvedGalleries = (venueSlug?.all_galleries || []).map((imageSrc) =>
		typeof imageSrc === "string"
			? imageSrc
			: (imageSrc as { getImage?: () => string; image?: string; image_url?: string; url?: string })
					.getImage?.() ||
				(imageSrc as { image?: string }).image ||
				(imageSrc as { image_url?: string }).image_url ||
				(imageSrc as { url?: string }).url ||
				""
	);

	const openLightbox = useCallback((index: number) => {
		setLightboxIndex(index);
		setLightboxOpen(true);
	}, []);

	const closeLightbox = useCallback(() => setLightboxOpen(false), []);

	const goPrev = useCallback(
		() => setLightboxIndex((i) => (i - 1 + resolvedGalleries.length) % resolvedGalleries.length),
		[resolvedGalleries.length]
	);

	const goNext = useCallback(
		() => setLightboxIndex((i) => (i + 1) % resolvedGalleries.length),
		[resolvedGalleries.length]
	);

	useEffect(() => {
		if (!lightboxOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "ArrowLeft") goPrev();
			else if (e.key === "ArrowRight") goNext();
			else if (e.key === "Escape") closeLightbox();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [lightboxOpen, goPrev, goNext, closeLightbox]);

	const facilityIcons = [
		"/images/icons/build-green.png",
		"/images/icons/chair-green.png",
		"/images/icons/volume-green.png",
		"/images/icons/gender-green.png",
		"/images/icons/brush-green.png",
		"/images/icons/parking-green.png",
	];

	const addonIcons = [
		"/images/icons/video-green.png",
		"/images/icons/mic-green.png",
		"/images/icons/food-green.png",
		"/images/icons/paint-green.png",
	];

	return (
		<main className="min-h-screen bg-white pb-20">
			<section className="relative h-screen w-full">
				{/* <Image
					src={venue.heroImage}
					alt={venue.title}
					fill
					className="object-cover"
					priority
				/> */}
				{venueSlugLoading ? (
					<div className="w-full h-full bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse">
						<div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />
					</div>
				) : (
					<>
						<Image
							src={venueSlug?.imagebanner || ""}
							alt={venueSlug?.getName(language) || ""}
							fill
							className="object-cover"
							priority
						/>
					</>
				)}

				<div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

				<div className="absolute bottom-16 left-0 w-full p-6 md:p-12 text-white">
					<div className="container mx-auto">
						<h1 className="text-4xl md:text-6xl font-serif mb-4">
							{venueSlug?.getName(language) || ""}
						</h1>

						<div className="max-w-3xl mb-8">
							{/* {venue.heroDescription.map((paragraph, index) => (
								<p
									key={index}
									className="text-gray-200 text-lg md:text-xl leading-relaxed mb-2 last:mb-0"
								>
									{paragraph}
								</p>
							))} */}
							{venueSlug?.getDescription(language) ? (
								<p className="text-gray-200 text-lg md:text-xl leading-relaxed mb-2 last:mb-0">
									{venueSlug.getDescription(language)}
								</p>
							) : null}
						</div>

						{/* <div className="flex flex-wrap gap-6 text-sm md:text-base font-medium text-[#A4AC86]">
							<div className="flex items-center gap-2">
								<div className="relative w-5 h-5">
									<Image
										src="/images/icons/group-green.png"
										alt="Capacity"
										fill
										className="object-contain"
									/>
								</div>
								<span>{venueSlug?.keys.}</span>
							</div>
						</div> */}
						<div className="flex flex-wrap gap-6 text-sm md:text-base font-medium text-[#A4AC86]">
							{venueSlug?.keys
								?.filter(
									(key) =>
										key.label_eng.toLowerCase().includes("capacity") ||
										key.label_ind.toLowerCase().includes("kapasitas"),
								)
								.map((key, index) => (
									<div key={index} className="flex items-center gap-2">
										<div className="relative w-5 h-5">
											<Image
												src={`/images/icons/${key.icon}`}
												alt={key.label_eng}
												fill
												className="object-contain"
											/>
										</div>
										<span>
											{language === "id" ? key.value_ind : key.value_eng}
										</span>
									</div>
								))}
						</div>
					</div>
				</div>
			</section>

			<section className="container mx-auto px-6 py-16">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
					<div className="lg:col-span-5 flex flex-col gap-4">
						<div className="grid grid-cols-2 gap-4">
							{venueSlug?.preview_images?.slice(0, 3).map((preview, index) => (
								<div
									key={preview.id || index}
									className={`relative rounded-xl overflow-hidden ${
										index === 2 ? "h-64 col-span-2" : "h-48"
									}`}
								>
									<Image
										src={preview.image || venueSlug?.imagebanner || ""}
										alt={`${venueSlug?.getName(language)} Preview ${index + 1}`}
										fill
										className="object-cover hover:scale-105 transition duration-500"
									/>
								</div>
							))}

							{/* Fallback jika preview_images kosong atau kurang dari 3 */}
							{(!venueSlug?.preview_images ||
								venueSlug.preview_images.length === 0) && (
								<>
									<div className="relative h-48 rounded-xl overflow-hidden">
										<Image
											src={venueSlug?.imagebanner || "/images/venue/venue1.jpg"}
											alt="Detail 1"
											fill
											className="object-cover hover:scale-105 transition duration-500"
										/>
									</div>
									<div className="relative h-48 rounded-xl overflow-hidden">
										<Image
											src={venueSlug?.imagebanner || "/images/venue/venue1.jpg"}
											alt="Detail 2"
											fill
											className="object-cover hover:scale-105 transition duration-500"
										/>
									</div>
									<div className="relative h-64 col-span-2 rounded-xl overflow-hidden">
										<Image
											src={venueSlug?.imagebanner || "/images/venue/venue1.jpg"}
											alt="Wide Detail"
											fill
											className="object-cover hover:scale-105 transition duration-500"
										/>
									</div>
								</>
							)}
						</div>
					</div>

					<div className="lg:col-span-7 space-y-10">
						<div>
							<h2 className="text-3xl font-serif text-[#2C2420] mb-6">
								{t.detailVenue.intro.title}
							</h2>
							<div className="text-[#5C5C5C] space-y-4 leading-relaxed">
								{/* {venue.longDescription.map((paragraph, index) => (
									<p key={index}>{paragraph}</p>
								))} */}
								{venueSlug?.getDescription(language) ? (
									<p>{venueSlug.getDescription(language)}</p>
								) : null}
							</div>
						</div>

						<div className="bg-[#F9F9F0] p-8 rounded-xl border border-[#EBEBE0]">
							<h3 className="text-xl font-serif text-[#2C2420] mb-6 font-semibold">
								{t.detailVenue.intro.cardTitle}
							</h3>

							
								{/* <div className="flex gap-4">
									<div className="mt-1 relative w-6 h-6 shrink-0">
										<Image
											src="/images/icons/group-green.png"
											alt="Capacity Icon"
											fill
											className="object-contain"
										/>
									</div>
									<div>
										<p className="font-bold text-[#2C2420] text-sm">
											{t.detailVenue.intro.item1}
										</p>
										<p className="text-[#5C5C5C] text-sm">{venue.capacity}</p>
									</div>
								</div>

								<div className="flex gap-4">
									<div className="mt-1 relative w-6 h-6 shrink-0">
										<Image
											src="/images/icons/heart-green.png"
											alt="Heart Icon"
											fill
											className="object-contain"
										/>
									</div>
									<div>
										<p className="font-bold text-[#2C2420] text-sm">
											{t.detailVenue.intro.item2}
										</p>
										<p className="text-[#5C5C5C] text-sm">{venue.bestFor}</p>
									</div>
								</div> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4">
                  {venueSlug?.keys?.map((key, index) => {
                    const iconConfig = key.getIconConfig?.() || null;
                    const IconComponent = iconConfig?.icon;

                    return (
                      <div key={index} className="flex gap-4">
                        <div className="mt-1 w-6 h-6 flex items-center justify-center relative shrink-0">
                          {IconComponent ? (
                            React.createElement(IconComponent, {
                              size: 22,
                              color: "#8FA876",
                              weight: "fill",
                            })
                          ) : (
                            <div className="relative w-6 h-6">
                              <Image
                                src={`/images/icons/${key.icon}`}
                                alt={key.label_eng}
                                fill
                                className="object-contain"
                              />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-[#2C2420] text-sm">
                            {language === "id" ? key.label_ind : key.label_eng}
                          </p>
                          <p className="text-[#5C5C5C] text-sm">
                            {language === "id" ? key.value_ind : key.value_eng}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
        {venueSlug?.facilities && venueSlug.facilities.length > 0 ? (
          <section className="py-20 bg-[#F9F9F0]">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif text-[#2C2420] mb-3">
                  {t.detailVenue.features.title}
                </h2>
                <p className="text-[#5C5C5C]">
                  {t.detailVenue.features.subtitle}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-6 mb-16">
                {venueSlug.facilities.map((facility, idx) => {
                  const iconConfig = facility.getIconConfig?.() || null;

                  return (
                    <div
                      key={idx}
                      className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] flex flex-col"
                    >
                      <FacilityCard
                        icon={iconConfig?.icon}
                        iconFallbackSrc={
                          facilityIcons[idx] || "/images/icons/check-green.png"
                        }
                        title={facility.getName(language)}
                        description={facility.getDescription(language) || ""}
                      />
                    </div>
                  );
                })}
              </div>

              {venueSlug?.facility_add_ons &&
              venueSlug.facility_add_ons.length > 0 ? (
                <div className="bg-white rounded-xl p-8 md:p-10 shadow-sm border border-[#EBEBE0]">
                  <h3 className="text-2xl font-serif text-[#2C2420] mb-8 font-semibold">
                    {t.detailVenue.features.addons.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {venueSlug.facility_add_ons.map((addon, idx) => {
                      const iconConfig = addon.getIconConfig?.() || null;

                      return (
                        <AddOnItem
                          key={idx}
                          icon={iconConfig?.icon}
                          iconFallbackSrc={
                            addon.getIcon() || "/images/icons/check-green.png"
                          }
                          label={addon.getName(language) || ""}
                        />
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

					<div className="bg-white rounded-2xl shadow-sm border border-[#EBEBE0] overflow-hidden max-w-5xl mx-auto">
						<div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b border-gray-100 bg-white font-serif text-[#2C2420] font-bold">
							<div className="col-span-4">
								{t.detailVenue.service.table.col1}
							</div>
							<div className="col-span-5">
								{t.detailVenue.service.table.col2}
							</div>
						</div>

						<div className="divide-y divide-gray-100">
							{t.detailVenue.service.table.item.map((item, index) => (
								<div
									key={index}
									className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:bg-gray-50 transition-colors"
								>
									<div className="col-span-1 md:col-span-4">
										<span className="font-semibold text-[#2C2420] block">
											{item.name}
										</span>
									</div>
									<div className="col-span-1 md:col-span-5">
										<span className="text-sm text-[#5C5C5C]">
											{item.description}
										</span>
									</div>
								</div>
							))}
						</div>

						<div className="bg-[#F9F9F0] p-6 md:p-8 border-t border-[#EBEBE0]">
							<div className="flex items-start gap-3">
								<Info className="w-5 h-5 text-[#8FA876] mt-0.5 shrink-0" />
								<div>
									<h4 className="text-[#5C5C5C] font-bold mb-2 text-sm">
										{t.detailVenue.service.table.note.title}
									</h4>
									<ul className="text-sm text-[#5C5C5C] space-y-1 list-disc list-inside marker:text-[#8FA876]">
										{t.detailVenue.service.table.note.item.map((note, idx) => (
											<li key={idx}>{note}</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-20 bg-white">
				<div className="container mx-auto px-6">
					<ScrollReveal animation="fadeUp" duration={800}>
						<div className="text-center mb-12">
							<h2 className="text-3xl md:text-4xl font-serif text-[#2C2420] mb-3">
								{t.homepage.location.title}
							</h2>
							<p className="text-[#5C5C5C]">{t.homepage.location.subtitle}</p>
						</div>
					</ScrollReveal>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
						<div className="space-y-6">
							<ScrollReveal animation="slideLeft" duration={800}>
								<div className="bg-[#F9F9F0] p-8 rounded-2xl">
									<div className="flex items-center gap-3 mb-4">
										<div className="relative w-6 h-6 shrink-0">
											<Image
												src="/images/icons/gps-green.png"
												alt="Address"
												fill
												className="object-contain"
											/>
										</div>
										<h3 className="text-xl font-serif font-bold text-[#2C2420]">
											{t.homepage.location.cardTitle.item1}
										</h3>
									</div>
									<p className="text-[#5C5C5C] leading-relaxed pl-9">
										{t.homepage.location.cardDesc.item1}
									</p>
								</div>
							</ScrollReveal>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<ScrollReveal animation="slideLeft" duration={800} delay={100}>
									<div className="bg-[#F9F9F0] p-8 rounded-2xl">
										<div className="flex items-center gap-3 mb-4">
											<div className="relative w-6 h-6 shrink-0">
												<Image
													src="/images/icons/plane-green.png"
													alt="Airport"
													fill
													className="object-contain"
												/>
											</div>
											<h3 className="text-lg font-serif font-bold text-[#2C2420]">
												{t.homepage.location.cardTitle.item2}
											</h3>
										</div>
										<p className="text-[#5C5C5C] text-sm leading-relaxed">
											{t.homepage.location.cardDesc.item2}
										</p>
									</div>
								</ScrollReveal>

								<ScrollReveal animation="slideRight" duration={800} delay={100}>
									<div className="bg-[#F9F9F0] p-8 rounded-2xl">
										<div className="flex items-center gap-3 mb-4">
											<div className="relative w-6 h-6 shrink-0">
												<Image
													src="/images/icons/city-green.png"
													alt="City"
													fill
													className="object-contain"
												/>
											</div>
											<h3 className="text-lg font-serif font-bold text-[#2C2420]">
												{t.homepage.location.cardTitle.item3}
											</h3>
										</div>
										<p className="text-[#5C5C5C] text-sm leading-relaxed">
											{t.homepage.location.cardDesc.item3}
										</p>
									</div>
								</ScrollReveal>
							</div>

							<ScrollReveal animation="slideLeft" duration={800} delay={200}>
								<div className="bg-[#F9F9F0] p-8 rounded-2xl">
									<div className="flex items-center gap-3 mb-6">
										<div className="relative w-6 h-6 shrink-0">
											<Image
												src="/images/icons/car-green.png"
												alt="Transport"
												fill
												className="object-contain"
											/>
										</div>
										<h3 className="text-xl font-serif font-bold text-[#2C2420]">
											{t.homepage.location.transport.title}
										</h3>
									</div>

									<ul className="space-y-4">
										<li className="flex items-start gap-3">
											<div className="relative w-5 h-5 shrink-0 mt-0.5">
												<Image
													src="/images/icons/taxi-green.png"
													alt="Taxi"
													fill
													className="object-contain"
												/>
											</div>
											<span className="text-[#5C5C5C]">
												{t.homepage.location.transport.item1}
											</span>
										</li>

										<li className="flex items-start gap-3">
											<div className="relative w-5 h-5 shrink-0 mt-0.5">
												<Image
													src="/images/icons/bus-green.png"
													alt="Bus"
													fill
													className="object-contain"
												/>
											</div>
											<span className="text-[#5C5C5C]">
												{t.homepage.location.transport.item2}
											</span>
										</li>

										<li className="flex items-start gap-3">
											<div className="relative w-5 h-5 shrink-0 mt-0.5">
												<Image
													src="/images/icons/parking-green.png"
													alt="Parking"
													fill
													className="object-contain"
												/>
											</div>
											<span className="text-[#5C5C5C]">
												{t.homepage.location.transport.item3}
											</span>
										</li>
									</ul>
								</div>
							</ScrollReveal>
						</div>

						<ScrollReveal animation="slideRight" duration={800}>
							<div className="relative h-125 lg:h-full min-h-125 rounded-2xl overflow-hidden shadow-lg bg-gray-100">
								<iframe
									title="Location Map"
									src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.2385536997226!2d110.35363067455535!3d-7.870087878251126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a560cf1551d0b%3A0x1db36094db031949!2sTembi%20-%20Historical%20Home!5e0!3m2!1sid!2sid!4v1764903906866!5m2!1sid!2sid"
									width="100%"
									height="100%"
									style={{ border: 0 }}
									allowFullScreen
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									className="absolute inset-0 w-full h-full"
								/>

								<div className="absolute top-0 left-0 w-full h-12 pointer-events-none bg-linear-to-b from-black/10 to-transparent" />
							</div>
						</ScrollReveal>
					</div>
				</div>
			</section>

			<section className="py-24 px-6 sm:px-12 lg:px-24 max-w-full bg-white">
				<div className="max-w-7xl mx-auto">
					<div className="text-center max-w-2xl mx-auto mb-16">
						<h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
							{t.foods.contact.title}
						</h2>
						<p className="text-gray-600 text-lg leading-relaxed">
							{t.foods.contact.subtitle}
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
						<div className="bg-[#F8F9F5] rounded-3xl p-10 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300">
							<div className="w-16 h-16 bg-[#8F9E75] rounded-full flex items-center justify-center mb-6 shadow-md shadow-[#8F9E75]/20">
								<Image
									src="/images/icons/phone-white.png"
									alt="phone"
									width={24}
									height={24}
									className="brightness-0 invert"
								/>
							</div>
							<h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">
								{t.foods.contact.card1.title}
							</h3>
							<p className="text-gray-500 mb-4 text-sm">
								{t.foods.contact.card1.subtitle}
							</p>

							<p className="text-gray-900 font-bold text-lg mb-2">
								{t.foods.contact.card1.phone}
							</p>
							<p className="text-gray-400 text-xs font-medium">
								{t.foods.contact.card1.desc}
							</p>
						</div>

						<div className="bg-[#F8F9F5] rounded-3xl p-10 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300">
							<div className="w-16 h-16 bg-[#8F9E75] rounded-full flex items-center justify-center mb-6 shadow-md shadow-[#8F9E75]/20">
								<Image
									src="/images/icons/whatsapp-white.png"
									alt="wa"
									width={28}
									height={28}
									className="brightness-0 invert"
								/>
							</div>
							<h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">
								{t.foods.contact.card2.title}
							</h3>
							<p className="text-gray-500 mb-4 text-sm">
								{t.foods.contact.card2.subtitle}
							</p>

							<p className="text-gray-900 font-bold text-lg mb-6">
								{t.foods.contact.card2.phone}
							</p>

							<Link
								href="https://wa.me/6282225142729"
								className="bg-[#8F9E75] text-white text-sm font-bold py-3 px-8 rounded-lg hover:bg-[#7A8B60] transition-colors shadow-sm"
							>
								{t.foods.contact.card2.desc}
							</Link>
						</div>

						<div className="bg-[#F8F9F5] rounded-3xl p-10 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300">
							<div className="w-16 h-16 bg-[#8F9E75] rounded-full flex items-center justify-center mb-6 shadow-md shadow-[#8F9E75]/20">
								<Image
									src="/images/icons/mail-white.png"
									alt="email"
									width={24}
									height={24}
									className="brightness-0 invert"
								/>
							</div>
							<h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">
								{t.foods.contact.card3.title}
							</h3>
							<p className="text-gray-500 mb-4 text-sm">
								{t.foods.contact.card3.subtitle}
							</p>

							<a
								href="mailto:catering@tembihistoricalhome.com"
								className="text-[#8F9E75] font-bold text-lg mb-2 hover:underline break-all"
							>
								{t.foods.contact.card3.phone}
							</a>
							<p className="text-gray-400 text-xs font-medium">
								{t.foods.contact.card3.desc}
							</p>
						</div>
					</div>

					<div className="bg-[#F8F9F5] rounded-3xl p-12 text-center w-full">
						<h3 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-4">
							{t.foods.contact.footer.title}
						</h3>
						<p className="text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
							{t.foods.contact.footer.desc}
						</p>
						<Link
							href="https://wa.me/6282225142729"
							className="bg-[#8F9E75] text-white font-bold py-4 px-10 rounded-lg hover:bg-[#7A8B60] transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300"
						>
							{t.foods.contact.footer.button}
						</Link>
					</div>
				</div>
			</section>
		{/* Lightbox */}
		{lightboxOpen && resolvedGalleries.length > 0 && (
			<div
				className="fixed inset-0 z-50 flex flex-col bg-black/65 backdrop-blur-sm"
				onClick={closeLightbox}
			>
				{/* Top bar */}
				<div
					className="flex items-center justify-between px-6 py-3 shrink-0 border-b border-white/10"
					onClick={(e) => e.stopPropagation()}
				>
					<span className="text-white font-medium text-sm">
						{venueSlug?.getName(language) || "Event Gallery"}
					</span>
					<button
						onClick={closeLightbox}
						className="text-white hover:text-gray-300 transition-colors"
					>
						<X size={24} />
					</button>
				</div>

				{/* Area tengah: gambar + arrows */}
				<div className="relative flex-1 flex items-center justify-center min-h-0 py-4">
					<button
						onClick={(e) => { e.stopPropagation(); goPrev(); }}
						className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors z-10"
					>
						<ChevronLeft size={30} />
					</button>

					<div
						className="relative h-full w-full max-w-2xl mx-16"
						onClick={(e) => e.stopPropagation()}
					>
						<Image
							key={lightboxIndex}
							src={resolvedGalleries[lightboxIndex] || "/images/homepage/content3.webp"}
							alt={`${venueSlug?.getName(language)} ${lightboxIndex + 1}`}
							fill
							className="object-contain"
						/>
					</div>

					<button
						onClick={(e) => { e.stopPropagation(); goNext(); }}
						className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors z-10"
					>
						<ChevronRight size={30} />
					</button>
				</div>

				{/* Counter */}
				<div
					className="flex items-center justify-end px-6 py-2 shrink-0"
					onClick={(e) => e.stopPropagation()}
				>
					<span className="text-gray-400 text-sm">
						{lightboxIndex + 1}/{resolvedGalleries.length}
					</span>
				</div>

				{/* Thumbnail strip */}
				<div
					className="flex justify-center gap-2 px-6 pb-4 overflow-x-auto shrink-0"
					onClick={(e) => e.stopPropagation()}
				>
					{resolvedGalleries.map((img, i) => (
						<button
							key={i}
							onClick={() => setLightboxIndex(i)}
							className={`relative shrink-0 w-24 h-16 rounded overflow-hidden border-2 transition-all ${
								i === lightboxIndex
									? "border-white opacity-100"
									: "border-transparent opacity-50 hover:opacity-80"
							}`}
						>
							<Image
								src={img || "/images/homepage/content3.webp"}
								alt={`thumb ${i + 1}`}
								fill
								className="object-cover"
							/>
						</button>
					))}
				</div>
			</div>
		)}
		</main>
	);
}

const FacilityCard = ({
  icon: IconComponent,
  iconFallbackSrc,
  title,
  description,
}: {
  icon: React.ElementType | null | undefined;
  iconFallbackSrc: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center border border-[#EBEBE0] h-full">
      <div className="w-16 h-16 rounded-full bg-[#F4F6E6] flex items-center justify-center mb-6 shrink-0">
        <div className="w-8 h-8 flex items-center justify-center relative">
          {IconComponent ? (
            React.createElement(IconComponent, {
              size: 28,
              color: "#8FA876",
              weight: "fill",
            })
          ) : (
            <div className="relative w-8 h-8">
              <Image
                src={iconFallbackSrc}
                alt={title}
                fill
                className="object-contain"
              />
            </div>
          )}
        </div>
      </div>
      <h3 className="text-lg font-serif text-[#2C2420] font-bold mb-3">
        {title}
      </h3>
      <p className="text-[#5C5C5C] text-sm leading-relaxed">{description}</p>
    </div>
  );
};

const AddOnItem = ({
  icon: IconComponent,
  iconFallbackSrc,
  label,
}: {
  icon: React.ElementType | null | undefined;
  iconFallbackSrc: string;
  label: string;
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-6 h-6 flex items-center justify-center relative shrink-0">
        {IconComponent ? (
          React.createElement(IconComponent, {
            size: 22,
            color: "#8FA876",
            weight: "fill",
          })
        ) : (
          <div className="relative w-6 h-6">
            <Image
              src={iconFallbackSrc}
              alt={label}
              fill
              className="object-contain"
            />
          </div>
        )}
      </div>
      <span className="text-[#5C5C5C] font-medium text-sm md:text-base">
        {label}
      </span>
    </div>
  );
};
