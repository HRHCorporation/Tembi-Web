"use client";

import { FoodProvider } from "./FoodContext";
import { LanguageProvider } from "./LanguageContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <FoodProvider>
        {children}
      </FoodProvider>
    </LanguageProvider>
  )
}
