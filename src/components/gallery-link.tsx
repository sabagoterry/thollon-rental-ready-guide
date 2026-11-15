import { Link } from "@tanstack/react-router";
import { Images } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n";

export function GalleryLink({ className = "" }: { className?: string }) {
  const { tr } = useLang();
  const label = tr("Open photo Gallery", "Ouvrir la galerie photos");
  return (
    <Button
      asChild
      variant="outline"
      className={`h-10 px-4 rounded-md gap-2 bg-card/95 text-card-foreground hover:bg-card/95 hover:text-card-foreground ${className}`}
    >
      <Link to="/gallery" aria-label={label} title={label}>
        <Images aria-hidden="true" className="size-5" />
        <span>{tr("Open photo Gallery", "Ouvrir la galerie photos")}</span>
      </Link>
    </Button>
  );
}
