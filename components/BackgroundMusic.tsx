'use client';

import { useEffect, useRef } from 'react';

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.3; // Set volume 30%

    // Fungsi Play
    const playAudio = () => {
      // Kita gunakan Promise untuk menangani error autoplay
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Error ini normal jika user belum interaksi (klik/scroll)
          console.log("Menunggu interaksi user untuk memutar musik...");
        });
      }
    };

    // Coba putar langsung
    playAudio();

    // Listener: Jika gagal di awal, putar saat user pertama kali klik apa saja
    const handleInteraction = () => {
      playAudio();
      // Hapus listener agar tidak dijalankan berulang kali
      ['click', 'scroll', 'keydown', 'touchstart'].forEach(event => 
        document.removeEventListener(event, handleInteraction)
      );
    };

    ['click', 'scroll', 'keydown', 'touchstart'].forEach(event => 
      document.addEventListener(event, handleInteraction)
    );

    return () => {
      ['click', 'scroll', 'keydown', 'touchstart'].forEach(event => 
        document.removeEventListener(event, handleInteraction)
      );
    };
  }, []);

  return (
    <audio ref={audioRef} loop hidden>
      {/* PENTING: Gunakan source dengan type yang jelas */}
      <source src="/audio/backsound.mp3" type="audio/mpeg" />
      Browser Anda tidak mendukung elemen audio.
    </audio>
  );
};

export default BackgroundMusic;