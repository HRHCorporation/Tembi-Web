import Banner from "@/feature/core/banner/domain/entity/banner.entity";
import fetchRoomBannersUsecase from "@/feature/core/banner/domain/usecase/fetch-room.usecase";
import RoomList from "@/feature/core/house/domain/entity/room-list.entity";
import RoomRecommendation from "@/feature/core/house/domain/entity/room-recomendation.entity";
import RoomSlug from "@/feature/core/house/domain/entity/room-slug.entity";
import ServicesAdd from "@/feature/core/house/domain/entity/services-add.entity";
import Services from "@/feature/core/house/domain/entity/services.entity";
import fetchRoomBySlugUsecase from "@/feature/core/house/domain/usecase/fetch-room-by-slug.usecase";
import fetchRoomListUsecase from "@/feature/core/house/domain/usecase/fetch-room-list.usecase";
import fetchRoomRecommendationUsecase from "@/feature/core/house/domain/usecase/fetch-room-recommendation.usecase";
import fetchRoomSlugUsecase from "@/feature/core/house/domain/usecase/fetch-room-recommendation.usecase";
import fetchServicesAddUsecase from "@/feature/core/house/domain/usecase/fetch-services-add.usecase";
import fetchServicesUsecase from "@/feature/core/house/domain/usecase/fetch-services.usecase";
import { fold } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

interface HouseContextType {
	houseBanner: Banner | null;
	bannerLoading: boolean;
	bannerError: string | null;

	houseList: RoomList[];
	houseListLoading: boolean;
	houseListError: string | null;

	serviceAdd: ServicesAdd[];
	serviceAddLoading: boolean;
	serviceAddError: string | null;

	services: Services[];
	servicesLoading: boolean;
	servicesError: string | null;

	houseSlug: RoomSlug | null;
	houseSlugLoading: boolean;
	houseSlugError: string | null;

	houseRecommendation: RoomRecommendation[];
	houseRecommendationLoading: boolean;
	houseRecommendationError: string | null;

	refreshBanner: () => void;
	refreshHouseList: () => void;
	refreshServiceAdd: () => void;
	refreshServices: () => void;
	refreshHouseSlug: (slug: string) => void;
	refreshHouseRecommendation: () => void;
}

const HouseContext = createContext<HouseContextType | undefined>(undefined);

export function HouseProvider({ children }: { children: React.ReactNode }) {
	const [houseBanner, setHouseBanner] = useState<Banner | null>(null);
	const [bannerLoading, setBannerLoading] = useState(true);
	const [bannerError, setBannerError] = useState<string | null>(null);

	const [houseList, setHouseList] = useState<RoomList[]>([]);
	const [houseListLoading, setHouseListLoading] = useState(true);
	const [houseListError, setHouseListError] = useState<string | null>(null);

	const [serviceAdd, setServiceAdd] = useState<ServicesAdd[]>([]);
	const [serviceAddLoading, setServiceAddLoading] = useState(true);
	const [serviceAddError, setServiceAddError] = useState<string | null>(null);

	const [services, setServices] = useState<Services[]>([]);
	const [servicesLoading, setServicesLoading] = useState(true);
	const [servicesError, setServicesError] = useState<string | null>(null);

	const [houseSlug, setHouseSlug] = useState<RoomSlug | null>(null);
	const [houseSlugLoading, setHouseSlugLoading] = useState(true);
	const [houseSlugError, setHouseSlugError] = useState<string | null>(null);

	const [houseRecommendation, setHouseRecommendation] = useState<
		RoomRecommendation[]
	>([]);
	const [houseRecommendationLoading, setHouseRecommendationLoading] =
		useState(true);
	const [houseRecommendationError, setHouseRecommendationError] = useState<
		string | null
	>(null);

	const loadBanner = useCallback(async () => {
		setBannerLoading(true);

		const result = await fetchRoomBannersUsecase()();

		pipe(
			result,
			fold(
				(failure) => {
					setBannerError(failure.message);
					setBannerLoading(false);
				},
				(banners) => {
					setHouseBanner(banners.length > 0 ? banners[0] : null);
					setBannerLoading(false);
				},
			),
		);
	}, []);

	const loadHouseList = useCallback(async () => {
		setHouseListLoading(true);
		setHouseList([]);
		setHouseListError(null);

		const result = await fetchRoomListUsecase()();

		pipe(
			result,
			fold(
				(failure) => {
					setHouseListError(failure.message);
					setHouseListLoading(false);
				},
				(houses) => {
					setHouseList(houses);
					setHouseListLoading(false);
				},
			),
		);
	}, []);

	const loadServiceAdd = useCallback(async () => {
		setServiceAddLoading(true);
		setServiceAdd([]);
		setServiceAddError(null);

		const result = await fetchServicesAddUsecase()();

		pipe(
			result,
			fold(
				(failure) => {
					setServiceAddError(failure.message);
					setServiceAddLoading(false);
				},
				(servicesAdd) => {
					setServiceAdd(servicesAdd);
					setServiceAddLoading(false);
				},
			),
		);
	}, []);

	const loadServices = useCallback(async () => {
		setServicesLoading(true);
		setServices([]);
		setServicesError(null);

		const result = await fetchServicesUsecase()();
		pipe(
			result,
			fold(
				(failure) => {
					setServicesError(failure.message);
					setServicesLoading(false);
				},
				(services) => {
					setServices(services);
					setServicesLoading(false);
				},
			),
		);
	}, []);

	const loadHouseSlug = useCallback(async (slug: string) => {
		if (!slug) {
			console.error("Slug is required");
			return;
		}
		setHouseSlugLoading(true);
		setHouseSlug(null);
		setHouseSlugError(null);

		const result = await fetchRoomBySlugUsecase(slug)();

		pipe(
			result,
			fold(
				(failure) => {
					setHouseSlugError(failure.message);
					setHouseSlugLoading(false);
				},
				(house) => {
					setHouseSlug(house);
					setHouseSlugLoading(false);
				},
			),
		);
	}, []);

	const loadHouseRecommendation = useCallback(async () => {
		setHouseRecommendationLoading(true);
		setHouseRecommendation([]);
		setHouseRecommendationError(null);

		const result = await fetchRoomRecommendationUsecase()();

		pipe(
			result,
			fold(
				(failure) => {
					setHouseRecommendationError(failure.message);
					setHouseRecommendationLoading(false);
				},
				(recommendations) => {
					setHouseRecommendation(recommendations);
					setHouseRecommendationLoading(false);
				},
			),
		);
	}, []);

	useEffect(() => {
		loadBanner();
		loadHouseList();
		loadServiceAdd();
		loadServices();
		loadHouseRecommendation();
	}, []);

	const value: HouseContextType = {
		houseBanner,
		bannerLoading,
		bannerError,
		houseList,
		houseListLoading,
		houseListError,
		serviceAdd,
		serviceAddLoading,
		serviceAddError,
		services,
		servicesLoading,
		servicesError,
		houseSlug,
		houseSlugLoading,
		houseSlugError,
		houseRecommendation,
		houseRecommendationLoading,
		houseRecommendationError,
		refreshBanner: loadBanner,
		refreshHouseList: loadHouseList,
		refreshServiceAdd: loadServiceAdd,
		refreshServices: loadServices,
		refreshHouseSlug: loadHouseSlug,
		refreshHouseRecommendation: loadHouseRecommendation,
	};

	return (
		<HouseContext.Provider value={value}>{children}</HouseContext.Provider>
	);
}

export function useHouseContext() {
	const context = useContext(HouseContext);
	if (context === undefined) {
		throw new Error("useHouseContext must be used within a HouseProvider");
	}
	return context;
}
