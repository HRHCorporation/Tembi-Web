"use client";

import { FoodProvider } from "./FoodContext";
import { LanguageProvider } from "./LanguageContext";
import { BlogProvider } from "./BlogContext";
import { EventProvider } from "./EventContext";
import { VenueProvider } from "./VenueContext";
import { MainProvider } from "./MainContext";
import { CollectionProvider } from "./CollectionContext";
import { HouseProvider } from "./HouseContext";
import { HistoryProvider } from "./HistoryContext";
import { MusicProvider } from "./MusicContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
	// return (
	// 	<LanguageProvider>
	// 		<FoodProvider>
	// 			<BlogProvider>
	// 				<EventProvider>
	// 					<VenueProvider>{children}</VenueProvider>
	// 				</EventProvider>
	// 			</BlogProvider>
	// 		</FoodProvider>
	// 	</LanguageProvider>
	// );
	return (
		<MusicProvider>
			<LanguageProvider>
				<MainProvider>
					<BlogProvider>
						<CollectionProvider>
							<EventProvider>
								<FoodProvider>
									<HouseProvider>
										<VenueProvider>
											<HistoryProvider>{children}</HistoryProvider>
										</VenueProvider>
									</HouseProvider>
								</FoodProvider>
							</EventProvider>
						</CollectionProvider>
					</BlogProvider>
				</MainProvider>
			</LanguageProvider>
		</MusicProvider>
	);
}
