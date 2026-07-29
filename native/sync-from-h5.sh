#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ASSETS="$ROOT/native/assets"
python3 << PY
import re
from pathlib import Path
root = Path("$ROOT/index.html").read_text(encoding="utf-8")
m = re.search(r"const LOCATIONS = (\[[\s\S]*?\n    \]);\n\n    /\*\* @type", root)
assert m, "LOCATIONS not found"
body = m.group(1).replace('cover: "assets/', 'cover: "/assets/')
# 真机本地包优先用 jpg（webp 兼容性不稳定）
body = body.replace(".webp", ".jpg")
js = "module.exports = " + body + ";\n"
out = Path("$ROOT/native/_src/data/locations.js")
out.write_text(js, encoding="utf-8")
print("✓", out)
PY
rm -rf "$ASSETS/tasks"
cp -R "$ROOT/assets/tasks" "$ASSETS/"
rm -f "$ASSETS/tasks/header_center.jpg" "$ASSETS/checklist-hero.jpg" "$ASSETS/hero-bg.jpg" 2>/dev/null || true
echo "✓ assets synced"

# 压缩为较小 JPEG，兼顾主包体积与真机兼容
while IFS= read -r -d '' f; do
  tmp="${f}.tmp.jpg"
  sips -Z 560 -s format jpeg -s formatOptions 45 "$f" --out "$tmp" >/dev/null 2>&1 || true
  if [[ -f "$tmp" ]]; then
    base="${f%.*}.jpg"
    mv -f "$tmp" "$base"
    if [[ "$f" != "$base" ]]; then rm -f "$f"; fi
  fi
done < <(find "$ASSETS" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) -print0)
find "$ASSETS" -iname '*.webp' -delete
echo "✓ assets compressed for mobile"
du -sh "$ASSETS"
