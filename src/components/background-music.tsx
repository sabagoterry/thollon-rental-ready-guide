import { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import track from "@/assets/music/ski-sunday.mp3.asset.json";

/**
 * Owner-supplied track. Low volume, looping. Starts on the visitor's first
 * interaction (browsers block sound before that). Mounted in the root layout
 * so navigation never replaces the audio instance; the button can pause it.
 */
export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
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

    const start = (e?: Event) => {
      const target = e?.target;
      // Clicks on the music button itself are handled by toggle() instead,
      // otherwise a single click starts and instantly pauses the track.
      if (target instanceof Element && target.closest("[data-background-music]")) return;
      void audio.play().then(stopListening).catch(() => {});
    };
    const stopListening = () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
    audio.addEventListener("play", stopListening);
    window.addEventListener("pointerdown", start);
    window.addEventListener("keydown", start);

    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
      audio.pause();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("play", stopListening);
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) void audio.play().catch(() => {});
    else audio.pause();
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
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
    </Button>
  );
}
