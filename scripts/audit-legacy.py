"""Inventory MB's legacy pages and first-party media without copying claims."""
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen
import json

BASE = "https://www.mbeventsny.com/"


class Inventory(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = set()
        self.media = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "a" and a.get("href"):
            url = urljoin(BASE, a["href"])
            if urlparse(url).netloc == urlparse(BASE).netloc:
                self.links.add(url.split("#")[0].split("?")[0])
        if tag in ("img", "video", "source"):
            url = a.get("data-dm-image-path") or a.get("data-src") or a.get("src")
            if url and url.startswith("http"):
                self.media.append({"url": url, "alt": a.get("alt", ""), "tag": tag})


if __name__ == "__main__":
    queue = [BASE]
    seen = set()
    inventory = {}
    while queue and len(seen) < 20:
        url = queue.pop(0)
        if url in seen:
            continue
        seen.add(url)
        try:
            html = urlopen(Request(url, headers={"User-Agent": "Mozilla/5.0"}), timeout=15).read().decode("utf-8", "replace")
            p = Inventory()
            p.feed(html)
            inventory[url] = {"links": sorted(p.links), "media": p.media}
            for link in sorted(p.links):
                if link not in seen and link not in queue and len(queue) < 30:
                    queue.append(link)
            print(url, len(p.media), "media", len(p.links), "links", flush=True)
        except Exception as e:
            inventory[url] = {"error": str(e)}
            print(url, "ERROR", str(e), flush=True)
    with open("legacy-inventory.json", "w", encoding="utf-8") as f:
        json.dump(inventory, f, ensure_ascii=False, indent=2)
