"""Produce a categorized legacy media map from the captured site inventory."""
from pathlib import Path
from urllib.parse import unquote
import json
import re

root = Path(__file__).resolve().parents[1]
inventory = json.loads((root / "docs" / "legacy-inventory.json").read_text(encoding="utf-8"))
imported = json.loads((root / "docs" / "imported-media.json").read_text(encoding="utf-8"))
unique = {}
for page, record in inventory.items():
    for media in record.get("media", []):
        unique.setdefault(media["url"], dict(media, page=page))
categories = {
    "Wedding": r"wedding|bride|groom|ceremony|first dance",
    "Sweet 16": r"sweet.?16|sweet.?sixteen|colts.neck",
    "Quinceañera": r"quince|sweet.?15|sweet.?fifteen",
    "Mitzvah": r"mitzvah|bat.mat|yarmulke|prayer shawl",
    "Corporate": r"corporate|awards|employee|conference",
    "School": r"school|graduation|prom|field day",
    "Private Events": r"birthday|party|anniversary|celebrat",
    "DJ setups": r"\bdj\b|disc jockey|sound system|mixing",
    "Lighting": r"light|uplight|sparkler|clouds|laser|glow",
    "Dance floors": r"dance floor|dancing|dancefloor",
    "Lounge furniture": r"lounge|sofa|couch|furniture",
    "Photo booths": r"photo.?booth|photo strip|selfie",
    "Casino": r"casino|roulette|blackjack|poker",
    "Karaoke": r"karaoke|singing into a microphone",
    "Venues": r"venue|ballroom|banquet hall|restaurant",
    "Transformations": r"before|after|transform",
    "Team": r"team|staff|michael bryan|\bmc\b",
    "Testimonials": r"testimonial|review|client letter",
    "Historical archive": r"noa-1-15-11|1306|1403|1310",
}
lines = ["# Legacy MB media map", "", "Audit date: 2026-09-25. Source: [mbeventsny.com](https://www.mbeventsny.com/) and its linked pages. The machine-readable inventory with page, URL, alt text, and media type is [`legacy-inventory.json`](legacy-inventory.json).", "", f"The crawl covered {len(inventory)} public pages and found {len(unique)} unique media URLs. Category counts below are keyword matches from filenames and alt text; items can belong to several categories, and an unmatched asset needs manual review.", "", "| Category | Matching URLs |", "|---|---:|"]
for category, pattern in categories.items():
    count = sum(bool(re.search(pattern, unquote(item["url"] + " " + item.get("alt", "")), re.I)) for item in unique.values())
    lines.append(f"| {category} | {count} |")
lines += ["", "## Reused in the new site", "", "The site uses local WebP derivatives. The served legacy files are retained locally in `media-archive/` (excluded from deployment) with SHA-256 hashes and source URLs in [`imported-media.json`](imported-media.json). The CDN often exposes optimized copies rather than camera originals; MB should supply originals for a final media library.", "", "| Asset | Legacy page | Local derivative |", "|---|---|---|"]
for item in imported:
    lines.append(f"| {item['name']} | {item['source_page']} | `{item['webp_file'].replace(chr(92), '/')}` |")
videos = [item for item in unique.values() if item["tag"] == "video"]
lines += ["", "## Video found", "", f"{len(videos)} distinct video URLs were exposed by the existing site. A 10-second muted Sparkler Entrance excerpt is stored locally as `public/media/mb-hero-sparkler.mp4`, with its served source in `media-archive/`. The excerpt is displayed with a still-image fallback and respects reduced motion. Other clips are inventoried but not presented as verified named event stories.", "", "| Legacy clip | Source page |", "|---|---|"]
for item in videos:
    lines.append(f"| [{unquote(item['url'].split('/')[-1])}]({item['url']}) | {item['page']} |")
lines += ["", "## Content and rights review needed", "", "- MB should confirm rights and publication consent for identifiable guests, especially minors, before broad public launch or event stories.", "- No matched before/after photo pair, verified venue profile, current team portrait, or approved partner profile was established from the public pages. Those slots remain unfilled.", "- The legacy logo's alt text is inconsistent with the site title. The new site uses a text monogram until MB supplies the current approved logo file.", "- Existing review excerpts should be checked with MB before broader reuse. The homepage carries one short quote from the existing reviews page with a link back to its source.", "- The gallery contains many repeated resized images. The JSON inventory preserves every observed URL and its page context; it is not a rights ledger or a guarantee of ownership.", ""]
(root / "docs" / "legacy-media-map.md").write_text("\n".join(lines), encoding="utf-8")
print(len(unique), "unique media;", len(videos), "distinct videos")
