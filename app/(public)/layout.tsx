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
}