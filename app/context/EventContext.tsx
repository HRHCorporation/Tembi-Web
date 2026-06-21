"use client";
import React, {
	createContext,
	useContext,
	useCallback,
	useState,
	useEffect,
} from "react";
import Banner from "@/feature/core/banner/domain/entity/banner.entity";
import fetchEventBannersUsecase from "@/feature/core/banner/domain/usecase/fetch-event-banners.usecase";
import { pipe } from "fp-ts/lib/function";
import { fold } from "fp-ts/lib/Either";

interface Event {
	id: number;
	title_ind: string;
	title_eng: string;
	about_ind: string;
	about_eng: string;
	thumbnail: string;
	slug: string;
	date_event: string;
	hosted_by: string;
	time_event: string;
	location?: string;
}

interface EventContextType {
	events: Event[];
	eventsLoading: boolean;
	eventsError: string | null;
	refreshEvents: () => void;
	eventBanner: Banner | null;
	eventBannerLoading: boolean;
	eventBannerError: string | null;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: React.ReactNode }) {
	const [events, setEvents] = useState<Event[]>([]);
	const [eventsLoading, setEventsLoading] = useState(true);
	const [eventsError, setEventsError] = useState<string | null>(null);

	const [eventBanner, setEventBanner] = useState<Banner | null>(null);
	const [eventBannerLoading, setEventBannerLoading] = useState(true);
	const [eventBannerError, setEventBannerError] = useState<string | null>(null);

	const loadEvents = async () => {
		setEventsLoading(true);
		setEventsError(null);

		try {
			const response = await fetch('/api/public/event');
			const result = await response.json();

			if (result.success) {
				setEvents(result.data);
			} else {
				setEventsError(result.message || 'Failed to fetch events');
			}
		} catch (error) {
			console.error('Error fetching events:', error);
			setEventsError('Failed to fetch events');
		} finally {
			setEventsLoading(false);
		}
	};

	const loadBanner = useCallback(async () => {
		setEventBannerLoading(true);
		setEventBanner(null);
		setEventBannerError(null);

		const result = await fetchEventBannersUsecase()();

		pipe(
			result,
			fold(
				(error) => {
					setEventBannerError(error.message);
					setEventBannerLoading(false);
				},
				(banners) => {
					setEventBanner(banners.length > 0 ? banners[0] : null);
					setEventBannerLoading(false);
				},
			),
		);
	}, []);

	useEffect(() => {
		loadEvents();
		loadBanner();
	}, [loadBanner]);

	const refreshEvents = () => {
		loadEvents();
	};

	return (
		<EventContext.Provider
			value={{
				events,
				eventsLoading,
				eventsError,
				refreshEvents,
				eventBanner,
				eventBannerLoading,
				eventBannerError,
			}}
		>
			{children}
		</EventContext.Provider>
	);
}

export function useEventContext() {
	const context = useContext(EventContext);
	if (context === undefined) {
		throw new Error("useEventContext must be used within an EventProvider");
	}
	return context;
}
