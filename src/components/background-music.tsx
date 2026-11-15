import { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import track from "@/assets/music/ski-sunday.mp3.asset.json";
import { useLang } from "@/lib/i18n";

/**
 * Owner-supplied track. Low volume, looping. Starts only via its own button.
 * Mounted in the root layout
 * so navigation never replaces the audio instance; the button can pause it.
 */
export function BackgroundMusic() {
  const { tr } = useLang();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const audio = new Audio(track.url);
    audio.loop = true;
    audio.volume = 0.25;
    audio.preload = "auto";
    const onPlay = () => {
      setPlaying(true);
      setStarted(true);
    };
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
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
      data-background-music
      onClick={toggle}
      aria-pressed={playing}
      title={playing ? tr("Pause the music", "Mettre la musique en pause") : tr("Play the music", "Lancer la musique")}
      className="sr-only"
    >
      {playing && (
        <span
          aria-hidden
          className="absolute inset-0 -z-10 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-primary/15 motion-reduce:hidden"
        />
      )}
      {playing ? <Pause className="size-5" /> : <Music className="size-5" />}
      <span className="whitespace-normal text-left">
        {playing
          ? tr("Pause Ski Sunday", "Pause Ski Sunday")
          : started
            ? tr("Resume Ski Sunday", "Reprendre Ski Sunday")
            : tr("click here if you like ski sunday", "cliquez ici si vous aimez Ski Sunday")}
      </span>
    </Button>
  );
}
