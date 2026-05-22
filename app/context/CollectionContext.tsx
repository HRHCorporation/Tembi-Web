import Banner from "@/feature/core/banner/domain/entity/banner.entity";
import fetchCollectionBannersUsecase from "@/feature/core/banner/domain/usecase/fetch-collection.usecase";
import Collection from "@/feature/core/collection/domain/entity/collection.entity";
import fetchCollectionListUsecase from "@/feature/core/collection/domain/usecase/fetch-collection-list.usecase";
import { fold } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { createContext, useContext, useEffect, useState } from "react";

interface CollectionContextType {
	collectionBanner: Banner | null;
	bannerLoading: boolean;
	bannerError: string | null;

	collectionList: Collection[] | null;
	collectionListLoading: boolean;
	collectionListError: string | null;

	refreshBanner: () => void;
	refreshCollectionList: () => void;
}

const CollectionContext = createContext<CollectionContextType | undefined>(
	undefined,
);

export function CollectionProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [collectionBanner, setCollectionBanner] = useState<Banner | null>(null);
	const [bannerLoading, setBannerLoading] = useState(true);
	const [bannerError, setBannerError] = useState<string | null>(null);

	const [collectionList, setCollectionList] = useState<Collection[]>([]);
	const [collectionListLoading, setCollectionListLoading] = useState(true);
	const [collectionListError, setCollectionListError] = useState<string | null>(
		null,
	);

	const loadBanner = async () => {
		setBannerLoading(true);
		setCollectionBanner(null);
		setBannerError(null);

		const result = await fetchCollectionBannersUsecase()();

		pipe(
			result,
			fold(
				(error) => {
					setBannerError(error.message);
					setBannerLoading(false);
				},
				(banner) => {
					setCollectionBanner(banner[0] || null);
					setBannerLoading(false);
				},
			),
		);
	};

	const loadCollectionList = async () => {
		setCollectionListLoading(true);
		setCollectionList([]);
		setCollectionListError(null);

		const result = await fetchCollectionListUsecase()();

		pipe(
			result,
			fold(
				(error) => {
					setCollectionListError(error.message);
					setCollectionListLoading(false);
				},
				(collections) => {
					setCollectionList(collections);
					setCollectionListLoading(false);
				},
			),
		);
	};

	useEffect(() => {
		loadBanner();
		loadCollectionList();
	}, []);

	const value: CollectionContextType = {
		collectionBanner,
		bannerLoading,
		bannerError,
		collectionList,
		collectionListLoading,
		collectionListError,
		refreshBanner: loadBanner,
		refreshCollectionList: loadCollectionList,
	};

	return (
		<CollectionContext.Provider value={value}>
			{children}
		</CollectionContext.Provider>
	);
}

export function useCollectionContext() {
	const context = useContext(CollectionContext);
	if (context === undefined) {
		throw new Error(
			"useCollectionContext must be used within a CollectionProvider",
		);
	}
	return context;
}
