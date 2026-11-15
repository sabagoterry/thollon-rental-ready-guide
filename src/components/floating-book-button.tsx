import { Link } from "@tanstack/react-router";
import { CalendarCheck } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "@/components/mobile-menu";

export function FloatingBookButton() {
  const { tr } = useLang();
  return (
    <div className="fixed right-3 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-3 md:bottom-6 md:top-auto md:translate-y-0">
      <MobileMenu includeSections />
      <Button asChild size="icon" className="size-12 rounded-full shadow-lg">
        <Link
          to="/book"
          aria-label={tr("Check dates and book", "Voir les dates et réserver")}
          title={tr("Check dates and book", "Voir les dates et réserver")}
        >
          <CalendarCheck className="size-6!" aria-hidden="true" />
        </Link>
      </Button>
    </div>
  );
}
