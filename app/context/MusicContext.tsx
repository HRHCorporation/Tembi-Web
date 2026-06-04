"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type MusicContextType = {
	isMuted: boolean;
	toggleMute: () => void;
};

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
	const [isMuted, setIsMuted] = useState(false);

	const toggleMute = () => setIsMuted((prev) => !prev);

	return (
		<MusicContext.Provider value={{ isMuted, toggleMute }}>
			{children}
		</MusicContext.Provider>
	);
}

export function useMusic() {
	const ctx = useContext(MusicContext);
	if (!ctx) throw new Error("useMusic must be used within MusicProvider");
	return ctx;
}
