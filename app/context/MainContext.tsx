import Carousel from "@/feature/core/main/domain/entity/carousel.entity";
import Collection from "@/feature/core/main/domain/entity/collection.entity";
import House from "@/feature/core/main/domain/entity/house.entity";
import Venue from "@/feature/core/main/domain/entity/venue.entity";
import fetchCarouselUsecase from "@/feature/core/main/domain/usecase/fetch-carousel.usecase";
import fetchCollectionUsecase from "@/feature/core/main/domain/usecase/fetch-collection.usecase";
import fetchHouseUsecase from "@/feature/core/main/domain/usecase/fetch-house.usecase";
import fetchVenueUsecase from "@/feature/core/main/domain/usecase/fetch-venue.usecase";
import { fold } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

interface MainContextType {
	carousel: Carousel[];
	carouselLoading: boolean;
	carouselError: string | null;

	collection: Collection[];
	collectionLoading: boolean;
	collectionError: string | null;

	house: House[];
	houseLoading: boolean;
	houseError: string | null;

	venue: Venue[];
	venueLoading: boolean;
	venueError: string | null;

	refreshCarousel: () => void;
	refreshCollection: () => void;
	refreshHouse: () => void;
	refreshVenue: () => void;
}

const MainContext = createContext<MainContextType | undefined>(undefined);

export function MainProvider({ children }: { children: React.ReactNode }) {
	const [carousel, setCarousel] = useState<Carousel[]>([]);
	const [carouselLoading, setCarouselLoading] = useState(true);
	const [carouselError, setCarouselError] = useState<string | null>(null);

	const [collection, setCollection] = useState<Collection[]>([]);
	const [collectionLoading, setCollectionLoading] = useState(true);
	const [collectionError, setCollectionError] = useState<string | null>(null);

	const [house, setHouse] = useState<House[]>([]);
	const [houseLoading, setHouseLoading] = useState(true);
	const [houseError, setHouseError] = useState<string | null>(null);

	const [venue, setVenue] = useState<Venue[]>([]);
	const [venueLoading, setVenueLoading] = useState(true);
	const [venueError, setVenueError] = useState<string | null>(null);

	const loadCarousel = useCallback(async () => {
		setCarouselLoading(true);
		setCarousel([]);
		setCarouselError(null);

		const result = await fetchCarouselUsecase()();
		pipe(
			result,
			fold(
				(error) => {
					setCarouselError(error.message);
					setCarouselLoading(false);
				},
				(carousel) => {
					setCarousel(carousel);
					setCarouselLoading(false);
				},
			),
		);
	}, []);

	const loadCollection = useCallback(async () => {
		setCollectionLoading(true);
		setCollection([]);
		setCollectionError(null);

		const result = await fetchCollectionUsecase()();
		pipe(
			result,
			fold(
				(error) => {
					setCollectionError(error.message);
					setCollectionLoading(false);
				},
				(collection) => {
					setCollection(collection);
					setCollectionLoading(false);
				},
			),
		);
	}, []);

	const loadHouse = useCallback(async () => {
		setHouseLoading(true);
		setHouse([]);
		setHouseError(null);

		const result = await fetchHouseUsecase()();
		pipe(
			result,
			fold(
				(error) => {
					setHouseError(error.message);
					setHouseLoading(false);
				},
				(house) => {
					setHouse(house);
					setHouseLoading(false);
				},
			),
		);
	}, []);

	const loadVenue = useCallback(async () => {
		setVenueLoading(true);
		setVenue([]);
		setVenueError(null);

		const result = await fetchVenueUsecase()();
		pipe(
			result,
			fold(
				(error) => {
					setVenueError(error.message);
					setVenueLoading(false);
				},
				(venue) => {
					setVenue(venue);
					setVenueLoading(false);
				},
			),
		);
	}, []);

	useEffect(() => {
		loadCarousel();
		loadCollection();
		loadHouse();
		loadVenue();
	}, [loadCarousel, loadCollection, loadHouse, loadVenue]);

	const value: MainContextType = {
		carousel,
		carouselLoading,
		carouselError,
		collection,
		collectionLoading,
		collectionError,
		house,
		houseLoading,
		houseError,
		venue,
		venueLoading,
		venueError,
		refreshCarousel: loadCarousel,
		refreshCollection: loadCollection,
		refreshHouse: loadHouse,
		refreshVenue: loadVenue,
	};

	return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
}

export function useMainContext() {
	const context = useContext(MainContext);
	if (context === undefined) {
		throw new Error("useMainContext must be used within a MainProvider");
	}
	return context;
}
