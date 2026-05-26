"use client";
import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
} from "react";
import { pipe } from "fp-ts/lib/function";
import { fold } from "fp-ts/lib/Either";
import Banner from "@/feature/core/banner/domain/entity/banner.entity";
import FoodList from "@/feature/core/food/domain/entity/food-list.entity";
import FoodHighlight from "@/feature/core/food/domain/entity/food-highlight.entity";
import FoodCelebrate from "@/feature/core/food/domain/entity/food-celebrate.entity";
import fetchFoodBannersUsecase from "@/feature/core/banner/domain/usecase/fetch-food.usecase";
import fetchFoodListUsecase from "@/feature/core/food/domain/usecase/fetch-food-list.usecase";
import fetchFoodHighlightUsecase from "@/feature/core/food/domain/usecase/fetch-food-highlight.usecase";
import fetchFoodCelebrateUsecase from "@/feature/core/food/domain/usecase/fetch-food-celebrate.usecase";
import FoodSlug from "@/feature/core/food/domain/entity/food-slug.entity";
import fetchFoodBySlugUsecase from "@/feature/core/food/domain/usecase/fetch-food-by-slug.usecase";

interface FoodContextType {
	foodBanner: Banner | null;
	bannerLoading: boolean;
	bannerError: string | null;

	foodList: FoodList[];
	foodListLoading: boolean;
	foodListError: string | null;

	foodHighlight: FoodHighlight[];
	foodHighlightLoading: boolean;
	foodHighlightError: string | null;

	foodCelebrate: FoodCelebrate[];
	foodCelebrateLoading: boolean;
	foodCelebrateError: string | null;

	foodSlug: FoodSlug | null;
	foodSlugLoading: boolean;
	foodSlugError: string | null;

	refreshBanner: () => void;
	refreshFoodList: () => void;
	refreshHighlight: () => void;
	refreshCelebrate: () => void;
	refreshSlug: (slug: string) => void;
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export function FoodProvider({ children }: { children: React.ReactNode }) {
	const [foodBanner, setFoodBanner] = useState<Banner | null>(null);
	const [bannerLoading, setBannerLoading] = useState(true);
	const [bannerError, setBannerError] = useState<string | null>(null);

	const [foodList, setFoodList] = useState<FoodList[]>([]);
	const [foodListLoading, setFoodListLoading] = useState(true);
	const [foodListError, setFoodListError] = useState<string | null>(null);

	const [foodHighlight, setFoodHighlight] = useState<FoodHighlight[]>([]);
	const [foodHighlightLoading, setFoodHighlightLoading] = useState(true);
	const [foodHighlightError, setFoodHighlightError] = useState<string | null>(
		null,
	);

	const [foodCelebrate, setFoodCelebrate] = useState<FoodCelebrate[]>([]);
	const [foodCelebrateLoading, setFoodCelebrateLoading] = useState(true);
	const [foodCelebrateError, setFoodCelebrateError] = useState<string | null>(
		null,
	);

	const [foodSlug, setFoodSlug] = useState<FoodSlug | null>(null);
	const [foodSlugLoading, setFoodSlugLoading] = useState(true);
	const [foodSlugError, setFoodSlugError] = useState<string | null>(null);

	const loadBanner = async () => {
		setBannerLoading(true);

		const result = await fetchFoodBannersUsecase()();

		pipe(
			result,
			fold(
				(failure) => {
					setBannerError(failure.message);
					setBannerLoading(false);
				},
				(banners) => {
					setFoodBanner(banners[0] ?? null);
					setBannerLoading(false);
				},
			),
		);
	};

	const loadFoodList = async () => {
		setFoodListError(null);

		try {
			const result = await fetchFoodListUsecase()();

			pipe(
				result,
				fold(
					(failure) => {
						setFoodListError(failure.message);
					},
					(foods) => {
						setFoodList(foods);
					},
				),
			);
		} finally {
			setFoodListLoading(false);
		}
	};

	const loadHighlight = async () => {
		if (foodHighlight.length === 0) {
			setFoodHighlightLoading(true);
		}

		const result = await fetchFoodHighlightUsecase()();

		pipe(
			result,
			fold(
				(failure) => {
					console.error("Failed to fetch food highlight:", failure);
					setFoodHighlightError(failure.message);
					setFoodHighlightLoading(false);
				},
				(highlights) => {
					setFoodHighlight(highlights);
					setFoodHighlightLoading(false);
				},
			),
		);
	};

	const loadCelebrate = async () => {
		if (foodCelebrate.length === 0) {
			setFoodCelebrateLoading(true);
		}

		const result = await fetchFoodCelebrateUsecase()();

		pipe(
			result,
			fold(
				(failure) => {
					console.error("Failed to fetch food celebrate:", failure);
					setFoodCelebrateError(failure.message);
					setFoodCelebrateLoading(false);
				},
				(celebrates) => {
					setFoodCelebrate(celebrates);
					setFoodCelebrateLoading(false);
				},
			),
		);
	};

	const loadSlug = useCallback(async (slug: string) => {
		if (!slug) {
			console.error("Slug is required");
			return;
		}

		setFoodSlugLoading(true);
		setFoodSlugError(null);

		const result = await fetchFoodBySlugUsecase(slug)();

		pipe(
			result,
			fold(
				(failure) => {
					console.error("Failed to fetch food by slug:", failure);
					setFoodSlugError(failure.message);
					setFoodSlugLoading(false);
				},
				(food) => {
					console.log("Food data loaded:", food);
					setFoodSlug(food);
					setFoodSlugLoading(false);
				},
			),
		);
	}, []);

	useEffect(() => {
		loadBanner();
		loadFoodList();
		loadHighlight();
		loadCelebrate();
	}, []);

	const value: FoodContextType = {
		foodBanner,
		bannerLoading,
		bannerError,
		foodList,
		foodListLoading,
		foodListError,
		foodHighlight,
		foodHighlightLoading,
		foodHighlightError,
		foodCelebrate,
		foodCelebrateLoading,
		foodCelebrateError,
		foodSlug,
		foodSlugLoading,
		foodSlugError,
		refreshBanner: loadBanner,
		refreshFoodList: loadFoodList,
		refreshHighlight: loadHighlight,
		refreshCelebrate: loadCelebrate,
		refreshSlug: loadSlug,
	};

	return <FoodContext.Provider value={value}>{children}</FoodContext.Provider>;
}

export function useFoodContext() {
	const context = useContext(FoodContext);
	if (context === undefined) {
		throw new Error("useFoodContext must be used within a FoodProvider");
	}
	return context;
}
