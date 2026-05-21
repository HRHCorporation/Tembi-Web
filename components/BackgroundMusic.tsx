"use client";

import { useEffect, useRef } from "react";

const BackgroundMusic = () => {
	const audioRef = useRef<HTMLAudioElement | null>(null);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		audio.volume = 0.3;

		const playAudio = () => {
			const playPromise = audio.play();

			if (playPromise !== undefined) {
				playPromise.catch((error) => {
					console.log("Menunggu interaksi user untuk memutar musik...");
				});
			}
		};

		playAudio();

		const handleInteraction = () => {
			playAudio();

			["click", "scroll", "keydown", "touchstart"].forEach((event) =>
				document.removeEventListener(event, handleInteraction),
			);
		};

		["click", "scroll", "keydown", "touchstart"].forEach((event) =>
			document.addEventListener(event, handleInteraction),
		);

		return () => {
			["click", "scroll", "keydown", "touchstart"].forEach((event) =>
				document.removeEventListener(event, handleInteraction),
			);
		};
	}, []);
	return (
		<audio src="/audio/background-music.mp3" loop autoPlay className="hidden" />
	);
};

export default BackgroundMusic;
