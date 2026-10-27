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
