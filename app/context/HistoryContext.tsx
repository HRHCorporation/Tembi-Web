import Banner from "@/feature/core/banner/domain/entity/banner.entity";
import fetchHistoryUsecase from "@/feature/core/banner/domain/usecase/fetch-history.usecase";
import { pipe } from "fp-ts/lib/function";
import { fold } from "fp-ts/lib/Either";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

interface HistoryContextType {
	historyBanner: Banner | null;
	historyBannerLoading: boolean;
	historyBannerError: string | null;

	refreshBanner: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryProvider({ children }: { children: React.ReactNode }) {
	const [historyBanner, setHistoryBanner] = useState<Banner | null>(null);
	const [historyBannerLoading, setHistoryBannerLoading] = useState(true);
	const [historyBannerError, setHistoryBannerError] = useState<string | null>(
		null,
	);

	const loadBanner = useCallback(async () => {
		setHistoryBannerLoading(true);
		setHistoryBanner(null);
		setHistoryBannerError(null);

		const result = await fetchHistoryUsecase()();

		pipe(
			result,
			fold(
				(error) => {
					setHistoryBannerError(error.message);
					setHistoryBannerLoading(false);
				},
				(banner) => {
					setHistoryBanner(banner.length > 0 ? banner[0] : null);
					setHistoryBannerLoading(false);
				},
			),
		);
	}, []);

	useEffect(() => {
		loadBanner();
	}, []);

	const value: HistoryContextType = {
		historyBanner,
		historyBannerLoading,
		historyBannerError,
		refreshBanner: loadBanner,
	};

	return (
		<HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
	);
}

export const useHistoryContext = () => {
	const context = useContext(HistoryContext);

	if (context === undefined) {
		throw new Error("useHistoryContext must be used within a HistoryProvider");
	}

	return context;
};
