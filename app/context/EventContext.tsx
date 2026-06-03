"use client";
import React, {
	createContext,
	useContext,
	useState,
	useEffect,
} from "react";

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
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: React.ReactNode }) {
	const [events, setEvents] = useState<Event[]>([]);
	const [eventsLoading, setEventsLoading] = useState(true);
	const [eventsError, setEventsError] = useState<string | null>(null);

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

	useEffect(() => {
		loadEvents();
	}, []);

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
