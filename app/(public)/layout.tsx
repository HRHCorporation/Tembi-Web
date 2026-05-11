<<<<<<< HEAD
import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import type { Metadata } from "next";
<<<<<<<< HEAD:app/(public)/layout.tsx
import { Geist, Geist_Mono, Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import BackgroundMusic from "@/components/BackgroundMusic";
import { LanguageProvider } from "./context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});
========
import type { PropsWithChildren } from "react";
>>>>>>>> origin/feature/admin-dashboard:app/layout.tsx

export const metadata: Metadata = {
  title: "Tembi",
  description: "Tembi Website",
};

export default function RootLayout({
  children,
}: PropsWithChildren) {
  return (
<<<<<<<< HEAD:app/(public)/layout.tsx
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${lato.variable} antialiased overflow-x-hidden`}
      >
        <BackgroundMusic />
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
========
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
>>>>>>>> origin/feature/admin-dashboard:app/layout.tsx
    </html>
  );
=======
import "@/app/globals.css";
import type { PropsWithChildren } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/app/context/LanguageContext";
import BackgroundMusic from "@/components/BackgroundMusic";

export default function PublicLayout({
    children,
}: PropsWithChildren) {
    return (
        <LanguageProvider>
            <BackgroundMusic />

            <Header />

            {children}

            <Footer />
        </LanguageProvider>
    );
>>>>>>> origin/feature/admin-dashboard
}