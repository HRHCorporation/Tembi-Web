"use client";

import { FoodProvider } from "./FoodContext";
import { LanguageProvider } from "./LanguageContext";
import { BlogProvider } from "./BlogContext";
import { EventProvider } from "./EventContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <FoodProvider>
        <BlogProvider>
          <EventProvider>
            {children}
          </EventProvider>
        </BlogProvider>
      </FoodProvider>
    </LanguageProvider>
  )
}
