# Legacy MB media map

Audit date: 2026-09-25. Source: [mbeventsny.com](https://www.mbeventsny.com/) and its linked pages. The machine-readable inventory with page, URL, alt text, and media type is [`legacy-inventory.json`](legacy-inventory.json).

The crawl covered 10 public pages and found 1103 unique media URLs. Category counts below are keyword matches from filenames and alt text; items can belong to several categories, and an unmatched asset needs manual review.

| Category | Matching URLs |
|---|---:|
| Wedding | 95 |
| Sweet 16 | 7 |
| Quinceañera | 2 |
| Mitzvah | 68 |
| Corporate | 2 |
| School | 7 |
| Private Events | 200 |
| DJ setups | 43 |
| Lighting | 135 |
| Dance floors | 129 |
| Lounge furniture | 25 |
| Photo booths | 38 |
| Casino | 1 |
| Karaoke | 1 |
| Venues | 72 |
| Transformations | 0 |
| Team | 0 |
| Testimonials | 0 |
| Historical archive | 82 |

## Reused in the new site

The site uses local WebP derivatives. The served legacy files are retained locally in `media-archive/` (excluded from deployment) with SHA-256 hashes and source URLs in [`imported-media.json`](imported-media.json). The CDN often exposes optimized copies rather than camera originals; MB should supply originals for a final media library.

| Asset | Legacy page | Local derivative |
|---|---|---|
| hero-ballroom | https://www.mbeventsny.com/ | `public/media/hero-ballroom.webp` |
| dj-production | https://www.mbeventsny.com/ | `public/media/dj-production.webp` |
| sweet-sixteen | https://www.mbeventsny.com/ | `public/media/sweet-sixteen.webp` |
| mitzvah-celebration | https://www.mbeventsny.com/photos | `public/media/mitzvah-celebration.webp` |
| wedding-dance | https://www.mbeventsny.com/photos | `public/media/wedding-dance.webp` |
| wedding-cake | https://www.mbeventsny.com/ | `public/media/wedding-cake.webp` |
| photo-booth | https://www.mbeventsny.com/ | `public/media/photo-booth.webp` |
| corporate-party | https://www.mbeventsny.com/ | `public/media/corporate-party.webp` |
| mb-logo | https://www.mbeventsny.com/ | `public/media/mb-logo.webp` |

## Video found

14 distinct video URLs were exposed by the existing site. A 10-second muted Sparkler Entrance excerpt is stored locally as `public/media/mb-hero-sparkler.mp4`, with its served source in `media-archive/`. The excerpt is displayed with a still-image fallback and respects reduced motion. Other clips are inventoried but not presented as verified named event stories.

| Legacy clip | Source page |
|---|---|
| [Wo1GjBIySfarlS1hLnOg_Rob+&+Krista+Wedding+8.17.25-v.mp4](https://vid.cdn-website.com/9a593b08/videos/Wo1GjBIySfarlS1hLnOg_Rob+%26+Krista+Wedding+8.17.25-v.mp4) | https://www.mbeventsny.com/ |
| [Vq1C31MwSo27YAmgs9Qr_Dan+&+Cindy-s+Wedding+8.2.25-v.mp4](https://vid.cdn-website.com/9a593b08/videos/Vq1C31MwSo27YAmgs9Qr_Dan+%26+Cindy-s+Wedding+8.2.25-v.mp4) | https://www.mbeventsny.com/ |
| [b2g7y59UQEq4GYE1am2D_Emily-s+Sweet+16+3.15.2025-v.mp4](https://vid.cdn-website.com/9a593b08/videos/b2g7y59UQEq4GYE1am2D_Emily-s+Sweet+16+3.15.2025-v.mp4) | https://www.mbeventsny.com/ |
| [vIFM25lSjurWLMFdUHLw_mb+show-v.mp4](https://vid.cdn-website.com/9a593b08/videos/vIFM25lSjurWLMFdUHLw_mb+show-v.mp4) | https://www.mbeventsny.com/photobooths |
| [MatJlN5GT5ONImMBFkxm_20251025_211558-v.mp4](https://vid.cdn-website.com/9a593b08/videos/MatJlN5GT5ONImMBFkxm_20251025_211558-v.mp4) | https://www.mbeventsny.com/services |
| [K58X2NEtRYOM8v5VrLgY_20251025_204848-v.mp4](https://vid.cdn-website.com/9a593b08/videos/K58X2NEtRYOM8v5VrLgY_20251025_204848-v.mp4) | https://www.mbeventsny.com/services |
| [gTbScOriRReuOjApj6e1_20251102_144111-v.mp4](https://vid.cdn-website.com/9a593b08/videos/gTbScOriRReuOjApj6e1_20251102_144111-v.mp4) | https://www.mbeventsny.com/services |
| [rVxmnPvVRxep5BDvRwU8_20250710_165019-v.mp4](https://vid.cdn-website.com/9a593b08/videos/rVxmnPvVRxep5BDvRwU8_20250710_165019-v.mp4) | https://www.mbeventsny.com/services |
| [N0RTIidWSlqlZsr0Elqk_20250710_164933-v.mp4](https://vid.cdn-website.com/9a593b08/videos/N0RTIidWSlqlZsr0Elqk_20250710_164933-v.mp4) | https://www.mbeventsny.com/services |
| [y9aSq4toQlO4rWK1Xwt3_20250517_182214-v.mp4](https://vid.cdn-website.com/9a593b08/videos/y9aSq4toQlO4rWK1Xwt3_20250517_182214-v.mp4) | https://www.mbeventsny.com/services |
| [D1n8oE52T1eFbr05cgNC_20250517_182130-v.mp4](https://vid.cdn-website.com/9a593b08/videos/D1n8oE52T1eFbr05cgNC_20250517_182130-v.mp4) | https://www.mbeventsny.com/services |
| [9GfTIFYQLCulbW4HLtr6_20250628_111619-v.mp4](https://vid.cdn-website.com/9a593b08/videos/9GfTIFYQLCulbW4HLtr6_20250628_111619-v.mp4) | https://www.mbeventsny.com/services |
| [wHZyCm06QaWew1uIeXYg_Sparkler+Entrance-v.mp4](https://vid.cdn-website.com/9a593b08/videos/wHZyCm06QaWew1uIeXYg_Sparkler+Entrance-v.mp4) | https://www.mbeventsny.com/services |
| [HSygfz6uTce2qOYOgobl_Dancing+on+the+clouds-v.mp4](https://vid.cdn-website.com/9a593b08/videos/HSygfz6uTce2qOYOgobl_Dancing+on+the+clouds-v.mp4) | https://www.mbeventsny.com/services |

## Content and rights review needed

- MB should confirm rights and publication consent for identifiable guests, especially minors, before broad public launch or event stories.
- No matched before/after photo pair, verified venue profile, current team portrait, or approved partner profile was established from the public pages. Those slots remain unfilled.
- The legacy logo's alt text is inconsistent with the site title. The new site uses a text monogram until MB supplies the current approved logo file.
- Existing review excerpts should be checked with MB before broader reuse. The homepage carries one short quote from the existing reviews page with a link back to its source.
- The gallery contains many repeated resized images. The JSON inventory preserves every observed URL and its page context; it is not a rights ledger or a guarantee of ownership.
