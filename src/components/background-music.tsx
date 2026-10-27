import { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";
import track from "@/assets/music/chill-ambient.mp3.asset.json";

/**
 * Discreet background music player. Chill ambient track, low volume, looping.
 * Starts on the visitor's first interaction (browsers block sound before
 * that) and can be paused with the floating button.
 */
export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const triedAuto = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(track.url);
    audio.loop = true;
    audio.volume = 0.25;
    audio.preload = "auto";
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audioRef.current = audio;
    // Exposed for diagnostics; not used by the UI.
    (window as any).__lesCyclamensAudio = audio;

    const start = (e?: Event) => {
      const target = e?.target as HTMLElement | null;
      // Clicks on the music button itself are handled by toggle() instead,
      // otherwise a single click starts and instantly pauses the track.
      if (target?.closest("[data-background-music]")) return;
      triedAuto.current = true;
      audio.play().catch((err: unknown) => {
        const e2 = err as { name?: string; message?: string };
        console.debug("background music start blocked:", e2?.name, e2?.message);
      });
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
    window.addEventListener("pointerdown", start);
    window.addEventListener("keydown", start);

    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
      audio.pause();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    console.debug("music toggle, audio present:", !!audio);
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch((err: unknown) => {
        const e2 = err as { name?: string; message?: string };
        console.debug("background music play blocked:", e2?.name, e2?.message);
      });
    } else audio.pause();
  };

  return (
    <button
      type="button"
      data-background-music
      onClick={toggle}
      aria-label={playing ? "Turn background music off" : "Turn background music on"}
      title={playing ? "Pause the music" : "Play the music"}
      className="fixed bottom-5 right-5 z-40 flex size-12 items-center justify-center rounded-full border bg-card text-primary shadow-lg transition hover:scale-105 md:bottom-6 md:right-6"
    >
      {playing && (
        <span
          aria-hidden
          className="absolute inset-0 -z-10 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-primary/15 motion-reduce:hidden"
        />
      )}
      {playing ? <Pause className="size-5" /> : <Music className="size-5" />}
    </button>
  );
}
