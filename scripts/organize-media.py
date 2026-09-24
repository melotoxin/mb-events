"""Keep source media locally while deploying only optimized public derivatives."""
from pathlib import Path
import json
import shutil

root = Path(__file__).resolve().parents[1]
public = root / "public" / "media"
archive = root / "media-archive"
archive.mkdir(exist_ok=True)
assert public.resolve().is_relative_to(root.resolve())
assert archive.resolve().is_relative_to(root.resolve())
for source in public.glob("*-source.*"):
    destination = archive / source.name
    assert source.resolve().is_relative_to(root.resolve())
    assert destination.resolve().is_relative_to(root.resolve())
    shutil.move(str(source), str(destination))
for name in ["mb-hero-teaser.mp4", "mb-show-frame.jpg", "wedding-frame.jpg", "sparkler-frame.jpg", "sparkler-frame-8.jpg"]:
    target = public / name
    assert target.resolve().is_relative_to(root.resolve())
    if target.exists(): target.unlink()
for name in ["legacy-home.html", "legacy-services.html"]:
    target = root / name
    assert target.resolve().is_relative_to(root.resolve())
    if target.exists(): target.unlink()
inventory = root / "legacy-inventory.json"
if inventory.exists(): shutil.move(str(inventory), str(root / "docs" / inventory.name))
metadata_path = root / "docs" / "imported-media.json"
metadata = json.loads(metadata_path.read_text(encoding="utf-8"))
for item in metadata:
    item["original_file"] = str(Path("media-archive") / Path(item["original_file"]).name)
metadata_path.write_text(json.dumps(metadata, indent=2, ensure_ascii=False), encoding="utf-8")
print("Archived selected source media and retained optimized public assets.")
