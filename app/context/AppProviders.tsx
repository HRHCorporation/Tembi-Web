"use client";

import { FoodProvider } from "./FoodContext";
import { LanguageProvider } from "./LanguageContext";
import { BlogProvider } from "./BlogContext";
import { EventProvider } from "./EventContext";
import { VenueProvider } from "./VenueContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
	return (
		<LanguageProvider>
			<FoodProvider>
				<BlogProvider>
					<EventProvider>
						<VenueProvider>{children}</VenueProvider>
					</EventProvider>
				</BlogProvider>
			</FoodProvider>
		</LanguageProvider>
	);
}
