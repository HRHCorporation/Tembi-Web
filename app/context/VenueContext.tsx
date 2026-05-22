import Banner from "@/feature/core/banner/domain/entity/banner.entity";
import fetchVenueBannersUsecase from "@/feature/core/banner/domain/usecase/fetch-venue-banners.usecase";
import VenueBySlug from "@/feature/core/venue/domain/entity/venue-by-slug.entity";
import Venue from "@/feature/core/venue/domain/entity/venue-list.entity";
import { pipe } from "fp-ts/lib/function";
import { fold } from "fp-ts/lib/Either";
import React, { createContext, useEffect, useState } from "react";
import fetchVenueUsecase from "@/feature/core/venue/domain/usecase/fetch-venue-list.usecase";
import fetchVenueBySlugUsecase from "@/feature/core/venue/domain/usecase/fetch-venue-by-slug.usecase";
import fetchGalleryVenueListUsecase from "@/feature/core/venue/domain/usecase/fetch-gallery-venue-list.usecase";

interface VenueContextType {
	venueBanner: Banner | null;
	venueBannerLoading: boolean;
	venueBannerError: string | null;

	venueList: Venue[] | null;
	venueListLoading: boolean;
	venueListError: string | null;

	venueSlug: VenueBySlug | null;
	venueSlugLoading: boolean;
	venueSlugError: string | null;

	venuGallery: string[] | null;
	venuGalleryLoading: boolean;
	venuGalleryError: string | null;

	refreshBanner: () => void;
	refreshVenueList: () => void;
	refreshVenueSlug: (slug: string) => void;
	refreshVenueGallery: () => void;
}

const VenueContext = createContext<VenueContextType | undefined>(undefined);

export function VenueProvider({ children }: { children: React.ReactNode }) {
	const [venueBanner, setVenueBanner] = useState<Banner | null>(null);
	const [venueBannerLoading, setVenueBannerLoading] = useState(true);
	const [venueBannerError, setVenueBannerError] = useState<string | null>(null);

	const [venueList, setVenueList] = useState<Venue[] | null>(null);
	const [venueListLoading, setVenueListLoading] = useState(true);
	const [venueListError, setVenueListError] = useState<string | null>(null);

	const [venueSlug, setVenueSlug] = useState<VenueBySlug | null>(null);
	const [venueSlugLoading, setVenueSlugLoading] = useState(true);
	const [venueSlugError, setVenueSlugError] = useState<string | null>(null);

	const [venuGallery, setVenuGallery] = useState<string[] | null>(null);
	const [venuGalleryLoading, setVenuGalleryLoading] = useState(true);
	const [venuGalleryError, setVenuGalleryError] = useState<string | null>(null);

	const loadBanner = async () => {
		setVenueBannerLoading(true);
		setVenueBanner(null);
		setVenueBannerError(null);

		const result = await fetchVenueBannersUsecase()();

		pipe(
			result,
			fold(
				(error) => {
					setVenueBannerError(error.message);
					setVenueBannerLoading(false);
				},
				(banners) => {
					setVenueBanner(banners.length > 0 ? banners[0] : null);
					setVenueBannerLoading(false);
				},
			),
		);
	};

	const loadVenueList = async () => {
		setVenueListLoading(true);
		setVenueList(null);
		setVenueListError(null);

		const result = await fetchVenueUsecase()();

		pipe(
			result,
			fold(
				(error) => {
					setVenueListError(error.message);
					setVenueListLoading(false);
				},
				(venues) => {
					setVenueList(venues);
					setVenueListLoading(false);
				},
			),
		);
	};

	const loadVenueGallery = async () => {
		setVenuGalleryLoading(true);
		setVenuGallery(null);
		setVenuGalleryError(null);

		const result = await fetchGalleryVenueListUsecase()();

		pipe(
			result,
			fold(
				(error) => {
					setVenuGalleryError(error.message);
					setVenuGalleryLoading(false);
				},
				(galleryList) => {
					setVenuGallery(galleryList);
					setVenuGalleryLoading(false);
				},
			),
		);
	};

	const loadVenueSlug = async (slug: string) => {
		if (!slug) {
			console.warn("Slug is empty, skipping fetchVenueBySlug");
		}
		setVenueSlugLoading(true);
		setVenueSlug(null);
		setVenueSlugError(null);

		const result = await fetchVenueBySlugUsecase(slug)();

		pipe(
			result,
			fold(
				(error) => {
					setVenueSlugError(error.message);
					setVenueSlugLoading(false);
				},
				(venue) => {
					setVenueSlug(venue);
					setVenueSlugLoading(false);
				},
			),
		);
	};

	useEffect(() => {
		loadBanner();
		loadVenueList();
		loadVenueGallery();
	}, []);

	const value: VenueContextType = {
		venueBanner,
		venueBannerLoading,
		venueBannerError,
		venueList,
		venueListLoading,
		venueListError,
		venueSlug,
		venueSlugLoading,
		venueSlugError,
		venuGallery,
		venuGalleryLoading,
		venuGalleryError,
		refreshBanner: loadBanner,
		refreshVenueList: loadVenueList,
		refreshVenueSlug: loadVenueSlug,
		refreshVenueGallery: loadVenueGallery,
	};

	return (
		<VenueContext.Provider value={value}>{children}</VenueContext.Provider>
	);
}

export const useVenueContext = () => {
	const context = React.useContext(VenueContext);
	if (context === undefined) {
		throw new Error("useVenueContext must be used within a VenueProvider");
	}
	return context;
};
