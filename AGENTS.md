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
- Enquiries are validated public server calls to a fixed CallMeBot recipient with server-only credentials; store private enquiry rows and idempotent request IDs before sending, and distinguish provider queue acceptance from unconfirmed delivery.
- Site logo placements share a single uploaded asset pointer; the favicon is a padded square derivative of the same source so branding remains consistent.
- The guest Q&A assistant streams from a server route that loads history server-side by an unguessable browser conversation ID and stores messages in a private table; its knowledge comes from shared apartment and local-links modules so the page and the assistant stay consistent.
- Owner-only pages live under the _authenticated layout and read private tables through admin-only RLS (has_role) using the browser client; guests never sign in.
- Mount background audio once in the root layout and use client-side links for internal page navigation so playback survives page changes.
- Use the shared LogoMark for public-page header branding so the owner's supplied artwork has consistent prominence.
