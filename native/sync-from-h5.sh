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
js = "module.exports = " + m.group(1).replace('cover: "assets/', 'cover: "/assets/') + ";\n"
out = Path("$ROOT/native/_src/data/locations.js")
out.write_text(js, encoding="utf-8")
print("✓", out)
PY
rm -rf "$ASSETS/tasks"
cp -R "$ROOT/assets/tasks" "$ASSETS/"
cp -f "$ROOT/assets/checklist-hero.png" "$ROOT/assets/hero-bg.jpg" "$ASSETS/" 2>/dev/null || true
echo "✓ assets synced"

# 手机端压缩：最长边约 750，JPEG 质量约 65
if command -v sips >/dev/null 2>&1; then
  while IFS= read -r -d '' f; do
    sips -Z 750 "$f" >/dev/null 2>&1 || true
    sips -s format jpeg -s formatOptions 65 "$f" --out "$f" >/dev/null 2>&1 || true
  done < <(find "$ASSETS" -type f \( -iname '*.jpg' -o -iname '*.jpeg' \) -print0)
  # 无透明 PNG 转 JPEG（同名替换扩展名）
  while IFS= read -r -d '' f; do
    out="${f%.*}.jpg"
    sips -Z 750 -s format jpeg -s formatOptions 65 "$f" --out "$out" >/dev/null 2>&1 || true
    if [[ -f "$out" && "$out" != "$f" ]]; then rm -f "$f"; fi
  done < <(find "$ASSETS" -type f -iname '*.png' -print0)
  echo "✓ assets compressed for mobile"
fi
du -sh "$ASSETS"
