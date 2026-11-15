import type { ReactElement } from "react";
import { useLang, type Lang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

// Flag colours are fixed national colours, not theme tokens.
function UnionJack() {
  return (
    <svg viewBox="0 0 60 40" className="h-full w-full" aria-hidden="true" preserveAspectRatio="none">
      <clipPath id="uj-s">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="uj-t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g transform="scale(1 1.33334)">
        <g clipPath="url(#uj-s)">
          <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uj-t)" stroke="#C8102E" strokeWidth="4" />
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </g>
      </g>
    </svg>
  );
}

function Tricolore() {
  return (
    <svg viewBox="0 0 3 2" className="h-full w-full" aria-hidden="true" preserveAspectRatio="none">
      <rect width="1" height="2" x="0" fill="#002654" />
      <rect width="1" height="2" x="1" fill="#fff" />
      <rect width="1" height="2" x="2" fill="#CE1126" />
    </svg>
  );
}

const options: { lang: Lang; label: string; Flag: () => ReactElement }[] = [
  { lang: "en", label: "English", Flag: UnionJack },
  { lang: "fr", label: "Français", Flag: Tricolore },
];

export function LanguageToggle() {
  const handleFlagClick = (selectedLang: Lang) => {
    setLang(selectedLang);
    const musicBtn = document.querySelector<HTMLButtonElement>("[data-background-music]");
    if (!musicBtn) return;

    const isPlaying = musicBtn.getAttribute("aria-pressed") === "true";

    if (selectedLang === "en") {
      // Toggle on or off when clicking the Union Jack
      musicBtn.click();
    } else if (selectedLang === "fr" && isPlaying) {
      // Only stop the music when clicking the Tricolore if it is already playing
      musicBtn.click();
    }
  };

  return (
    <div role="group" aria-label="Language / Langue" className="flex items-center gap-2">
      {options.map(({ lang: l, label, Flag }) => (
        <Button
          variant="ghost"
          key={l}
          type="button"
          onClick={() => handleFlagClick(l)}
          aria-pressed={lang === l}
          aria-label={label}
          title={label}
          className={`language-flag h-9 w-12 shrink-0 overflow-hidden rounded-sm p-0 [&_svg]:h-full [&_svg]:w-full ${lang === l ? "opacity-100" : "opacity-70 hover:opacity-100"}`}
        >
          <Flag />
        </Button>
      ))}
    </div>
  );
}
