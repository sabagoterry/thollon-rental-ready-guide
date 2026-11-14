<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Availability is fetched through a no-input public server function from a server-only secret; visitors cannot supply a URL or event data, preventing arbitrary fetches and cache poisoning.
- Store only sanitized date intervals in the public read-only availability cache; service-role access is limited to fixed-source cache refreshes, never ordinary public reads.
- Parse iCalendar with ical.js and preserve exclusive checkout dates; failed or stale syncs must not imply dates are available.
- Owner-confirmed balcony data lives in a shared apartment module used by the facts and layout descriptions so count and orientation stay consistent.
- Local visitor links live in a focused guide component, using official venue or tourism pages and a directory link rather than claiming an exhaustive business list.
- Keep destination-specific owner travel times with their shared destination entry so displayed timing and guest knowledge stay consistent.
- Render the detailed local guide on its own public route and link to it from home and shared navigation so local information has one maintained presentation.
- Enquiries are validated public server calls to a fixed CallMeBot recipient with server-only credentials; store private enquiry rows and idempotent request IDs before sending, and distinguish provider queue acceptance from unconfirmed delivery.
- All visible logos use the shared home-link LogoMark and one image import; the favicon is a square derivative of that image to keep branding and navigation consistent.
- The guest Q&A assistant streams from a server route that loads history server-side by an unguessable browser conversation ID and stores messages in a private table; its knowledge comes from shared apartment and local-links modules so the page and the assistant stay consistent.
- Owner-only pages live under the _authenticated layout and read private tables through admin-only RLS (has_role) using the browser client; guests never sign in.
- Mount background audio once in the root layout and use client-side links for internal page navigation so playback survives page changes.
- Use the shared LogoMark for public-page header branding so the owner's supplied artwork has consistent prominence.
- Guest chat restores only a recent tab-scoped conversation; old persistent browser IDs must not repopulate the public Questions section.
- Keep source-backed local Q&A in a browser-safe knowledge module used by the assistant; separate review opinions from official facts and never present research as live availability.
- Site text is bilingual (EN/FR) via a LanguageProvider in the root layout and inline tr(en, fr) pairs; data modules carry *Fr fields. Choice persists in localStorage, so new copy must supply both languages.
- Display Airbnb reviews and recognition from a dated browser-safe source snapshot; never round a rating up to five stars or fabricate testimonials.
- Use a shared gallery icon link on home photo sections so accessible labels and destinations stay consistent.
- Keep the home photo slideshow in a focused browser-safe component with its own cleaned-up timer so navigation and manual browsing never leave orphaned playback timers.
- Use one shared FindUs component and browser-safe coordinate module for map embeds and directions; only the managed public browser key enters map URLs, never server credentials.
- Keep Getting here as a separate bilingual public route with official transport links; never reuse another property's directions, travel distances or credentials from reference HTML.
- Share owner-confirmed washing facilities between page facts and guest knowledge to prevent contradictory bathroom descriptions.
- Keep owner-confirmed amenities and sleeping capacity in the browser-safe apartment module so guest answers use the same maintained facts.
- Keep the gallery lightbox timer in its mounted component with cleanup, so closing it stops automatic advancement.
- Treat generated 3D floor-plan views as illustrations, not measured architectural drawings; retain the original source plan for future corrections.
- Keep the home navigation in a focused component that compacts on scroll and retains section links in its mobile menu so navigation stays available without covering photos.
- Share the date picker and stay summary between booking and Direct Booking, carrying validated date/guest search parameters through confirmation so the two pages cannot drift.
- Share the default Airbnb booking destination through the booking module so public navigation and availability buttons use the same listing and guest parameters.
- Direct booking requests use validated public server calls, recheck the fresh read-only availability cache, and store name, email, dates and guests in the private enquiries inbox before fixed-recipient WhatsApp notification; requests never imply a confirmed reservation.
- Owner booking receipt emails use fixed-recipient React Email templates and the managed send helper with per-request idempotency keys; email failures never discard saved requests and no local email queue is created.
