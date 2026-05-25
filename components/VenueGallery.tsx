"use client";

import Image from "next/image";
import { useVenueContext } from "@/app/context/VenueContext";

const VenueGallery = () => {
	const { venuGallery, venuGalleryLoading, venuGalleryError } =
		useVenueContext();

	if (venuGalleryLoading) {
		return (
			<section className="w-full bg-[#FDFDF7] py-20 px-6 sm:px-8">
				<div className="mx-auto max-w-350">
					<div className="text-center mb-12">
						<h2 className="font-serif text-4xl md:text-5xl font-bold text-[#4A3B32] mb-4">
							Galeri Venue
						</h2>
						<p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
							Memuat galeri...
						</p>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						{[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
							<div
								key={i}
								className="aspect-4/3 w-full rounded-xl bg-gray-200 animate-pulse"
							/>
						))}
					</div>
				</div>
			</section>
		);
	}

	if (venuGalleryError) {
		return (
			<section className="w-full bg-[#FDFDF7] py-20 px-6 sm:px-8">
				<div className="mx-auto max-w-350 text-center">
					<p className="text-red-500 mb-4">{venuGalleryError}</p>
					<button
						onClick={() => window.location.reload()}
						className="bg-[#8F9F6A] text-white px-6 py-2 rounded-lg hover:bg-[#7d8c5c]"
					>
						Coba Lagi
					</button>
				</div>
			</section>
		);
	}
	if (!venuGallery || !venuGallery.hasImages()) {
		return null;
	}

	return (
		<section className="w-full bg-[#FDFDF7] py-20 px-6 sm:px-8">
			<div className="mx-auto max-w-350">
				<div className="text-center mb-12">
					<h2 className="font-serif text-4xl md:text-5xl font-bold text-[#4A3B32] mb-4">
						Galeri Venue
					</h2>
					<p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
						Lihat keindahan dan keanggunan venue kami lewat galeri foto yang
						sudah kami pilih khusus untuk anda
					</p>
				</div>
				<div className="flex flex-wrap justify-center gap-4">
					{venuGallery.getImages().map((imageSrc: string, index: number) => (
						<div
							key={index}
							className="group relative aspect-4/3 w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.67rem)] lg:w-[calc(25%-0.75rem)] overflow-hidden rounded-xl bg-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg"
						>
							<Image
								src={imageSrc}
								alt={`Venue Gallery ${index + 1}`}
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
								className="object-cover transition-transform duration-700 group-hover:scale-110"
							/>
							<div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default VenueGallery;
