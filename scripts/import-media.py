"""Copy selected existing MB site imagery into first-party project assets."""
from pathlib import Path
from urllib.request import Request, urlopen
from PIL import Image
import hashlib
import io
import json

root = Path(__file__).resolve().parents[1]
inventory = json.loads((root / "legacy-inventory.json").read_text(encoding="utf-8"))
all_media = [dict(item, page=page) for page, data in inventory.items() for item in data.get("media", [])]
selection = {
    "hero-ballroom": "hero1-scaled",
    "dj-production": "hero2-1",
    "sweet-sixteen": "colts-neck-sweet-16-photographer-78",
    "mitzvah-celebration": "jessica-bat-mat-111",
    "wedding-dance": "img_5739",
    "wedding-cake": "img_6884",
    "photo-booth": "130630_165104",
    "corporate-party": "others-pf6wrdt4q5beyt39aj0b5jm94x04bdgaaxpics1p4g",
    "mb-logo": "logo+%281%29.png",
}
target = root / "public" / "media"
target.mkdir(parents=True, exist_ok=True)
archive = root / "media-archive"
archive.mkdir(exist_ok=True)
metadata = []
for name, needle in selection.items():
    matches = [m for m in all_media if needle.lower() in m["url"].lower()]
    if not matches:
        print("MISSING", name)
        continue
    media = matches[0]
    source = media["url"]
    try:
        raw = urlopen(Request(source, headers={"User-Agent": "Mozilla/5.0"}), timeout=30).read()
        ext = ".png" if ".png" in source.lower() else ".jpg"
        original = archive / f"{name}-source{ext}"
        original.write_bytes(raw)
        image = Image.open(io.BytesIO(raw))
        image.thumbnail((1920, 1920))
        derivative = target / f"{name}.webp"
        image.convert("RGB").save(derivative, "WEBP", quality=84, method=6)
        metadata.append({"name": name, "source_page": media["page"], "source_url": source, "alt": media["alt"], "original_file": str(original.relative_to(root)), "webp_file": str(derivative.relative_to(root)), "sha256": hashlib.sha256(raw).hexdigest(), "pixel_size": list(image.size)})
        print(name, len(raw), image.size, flush=True)
    except Exception as e:
        print("ERROR", name, str(e), flush=True)
(root / "docs").mkdir(exist_ok=True)
(root / "docs" / "imported-media.json").write_text(json.dumps(metadata, ensure_ascii=False, indent=2), encoding="utf-8")
