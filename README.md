# MB Events digital experience

An early, private Phase 0/1 build of the MB Events platform. It includes a first-party marketing site, an event builder, a date inquiry flow, persistent anonymous drafts, lead capture, and a restricted lead dashboard. The full PRD is tracked in [`docs/prd-coverage.md`](docs/prd-coverage.md).

## Run locally

Use Node.js 22.13+ or 24. Install with `npm ci`, then run `npm run db:generate` after schema edits. Set `.openai/hosting.json` to use `DB` (already configured), build once with `npm run build`, and apply pending local SQL migrations in order:

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_cute_wolf_cub.sql
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0001_magenta_gateway.sql
npm run dev
```

Do not replay a migration already applied to a local or hosted database. Run `npx tsc --noEmit` and `npm run build` before publishing.

## Admin access

The lead dashboard lives at `/admin/leads`. It rejects all access until the Site runtime variable `MB_ADMIN_EMAIL` is set to the exact authorized administrator email. The account must also be signed in through the Sites identity layer. This single-email gate is a Phase 0 authorization skeleton, not the complete role model in the PRD. Do not make the site public until MB has approved operations, privacy, media, and security.

## Media and attribution

[`docs/legacy-media-map.md`](docs/legacy-media-map.md) summarizes the audit of the existing MB site. [`docs/legacy-inventory.json`](docs/legacy-inventory.json) holds observed URLs and alt text. [`docs/imported-media.json`](docs/imported-media.json) records source page, URL, hash, and local paths for imported media. Optimized assets are in `public/media`; copies of the served source files are retained locally in ignored `media-archive/`. No page hotlinks the old site for images or video.

Homepage testimonial excerpts and their attributions are recorded in [`docs/testimonial-sources.md`](docs/testimonial-sources.md). The footer accepts verified social profile URLs through `NEXT_PUBLIC_MB_INSTAGRAM_URL`, `NEXT_PUBLIC_MB_TIKTOK_URL`, and `NEXT_PUBLIC_MB_VIMEO_URL`. It renders a platform link only when its exact HTTPS profile URL has been configured; the existing MB website does not expose those profile URLs.

## What remains

Venue data, customer accounts, proposals, contracts, payments, invites, RSVPs, planning, memories, referrals, and provider integrations remain open as documented in the coverage register. The landing page presents MB's current planning and music coordination offer; integrating that portal into this platform is still pending.
