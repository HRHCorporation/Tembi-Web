"use client";

import { useEffect, useRef } from "react";
import { useMusic } from "@/app/context/MusicContext";

const BackgroundMusic = () => {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const { isMuted } = useMusic();

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		audio.volume = 0.3;

		const triggerEvents = ["click", "keydown", "touchstart"];

		const handleInteraction = () => {
			audio.play().then(() => {
				triggerEvents.forEach((event) =>
					document.removeEventListener(event, handleInteraction),
				);
			}).catch(() => {
				// gagal, biarkan listener tetap aktif untuk percobaan berikutnya
			});
		};

		// Coba langsung tanpa interaksi (beberapa browser mengizinkan)
		audio.play().catch(() => {
			triggerEvents.forEach((event) =>
				document.addEventListener(event, handleInteraction),
			);
		});

		return () => {
			triggerEvents.forEach((event) =>
				document.removeEventListener(event, handleInteraction),
			);
		};
	}, []);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;
		audio.muted = isMuted;
	}, [isMuted]);

	return (
		<audio
			ref={audioRef}
			src="/audio/backsound.mp3"
			loop
			autoPlay
			className="hidden"
		/>
	);
};

export default BackgroundMusic;
