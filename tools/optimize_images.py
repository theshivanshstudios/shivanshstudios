#!/usr/bin/env python3
"""
Shivansh Studios - image optimizer.

Reads the original photographs, auto-rotates them (using EXIF data), strips
metadata, resizes them to web-friendly sizes and saves two versions of each:

  * full   -> max 1920px on the long edge   (shown in the lightbox)
  * thumb  -> max 900px  on the long edge   (shown in the gallery grid)

It also builds the hero slideshow images and the "about" studio photo, and
writes js/gallery-data.js so the website always matches the files on disk.

HOW TO ADD NEW PHOTOS LATER
---------------------------
1. Put the new photo files into the matching folder under SOURCE_ROOT
   (see CATEGORIES below), or just drop already-web-sized .jpg files straight
   into site/images/portfolio/<category>/full and /thumb.
2. Re-run:  python tools/optimize_images.py
That's it - the gallery list updates automatically.
"""

import os
import sys
from PIL import Image, ImageOps

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)                                  # .../site
SOURCE_ROOT = os.path.join(
    SITE, "..", "OldData", "new_Anurag", "Anurag", "uploads", "services"
)
SLIDER_ROOT = os.path.join(
    SITE, "..", "OldData", "new_Anurag", "Anurag", "uploads", "slider"
)
IMAGES = os.path.join(SITE, "images")

FULL_MAX = 1920
THUMB_MAX = 900
HERO_MAX = 2400
FULL_Q = 82
THUMB_Q = 80

# ---------------------------------------------------------------------------
# Category  ->  source sub-folder(s) under SOURCE_ROOT
# The order here is the order categories appear on the site.
# ---------------------------------------------------------------------------
CATEGORIES = {
    "weddings":         ["wedding"],
    "pre-wedding":      ["PREWED1", "prewed2", "prwed 3", "prewed4", "prewed5"],
    "bridal":           ["bridal"],
    "couple-portraits": ["coupleportraits"],
    "haldi":            ["haldi"],
    "baby-shoots":      ["babyshoot"],
}

# Hero slideshow - hand-picked striking shots (from the slider folder).
HERO_SOURCES = [
    ("MKS_2896.jpg",          SLIDER_ROOT),
    ("DSC_5370.jpg",          SLIDER_ROOT),
    ("DSC00507 copy.jpg",     SLIDER_ROOT),
    ("about_us_image1.jpg",   SLIDER_ROOT),
    ("img05.jpg.jpg",         SLIDER_ROOT),
    ("MKS_28961.jpg",         SLIDER_ROOT),
]
ABOUT_SOURCE = ("about_us_image1.jpg", SLIDER_ROOT)

IMG_EXT = (".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG")


def load(path):
    img = Image.open(path)
    img = ImageOps.exif_transpose(img)          # honour camera rotation
    if img.mode in ("RGBA", "P", "LA"):
        img = img.convert("RGB")
    return img


def save_resized(img, dest, max_edge, quality):
    im = img.copy()
    im.thumbnail((max_edge, max_edge), Image.LANCZOS)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    im.save(dest, "JPEG", quality=quality, optimize=True, progressive=True)
    return os.path.getsize(dest)


def list_sources(folder):
    if not os.path.isdir(folder):
        return []
    files = [f for f in os.listdir(folder) if f.endswith(IMG_EXT)]
    files.sort(key=lambda s: s.lower())
    return [os.path.join(folder, f) for f in files]


def process_categories():
    manifest = {}
    for cat, subfolders in CATEGORIES.items():
        sources = []
        for sub in subfolders:
            sources += list_sources(os.path.join(SOURCE_ROOT, sub))
        count = 0
        for src in sources:
            count += 1
            name = f"{cat}-{count:02d}.jpg"
            full = os.path.join(IMAGES, "portfolio", cat, "full", name)
            thumb = os.path.join(IMAGES, "portfolio", cat, "thumb", name)
            try:
                img = load(src)
            except Exception as e:                       # noqa: BLE001
                print(f"  ! skipped {src}: {e}")
                count -= 1
                continue
            fs = save_resized(img, full, FULL_MAX, FULL_Q)
            save_resized(img, thumb, THUMB_MAX, THUMB_Q)
            print(f"  {name:<24} {fs//1024:>4} KB")
        manifest[cat] = count
        print(f"== {cat}: {count} photos\n")
    return manifest


def process_hero():
    names = []
    for i, (fname, root) in enumerate(HERO_SOURCES, start=1):
        src = os.path.join(root, fname)
        if not os.path.exists(src):
            print(f"  ! hero missing: {src}")
            continue
        out = f"hero-{i:02d}.jpg"
        save_resized(load(src), os.path.join(IMAGES, "hero", out), HERO_MAX, FULL_Q)
        names.append(out)
        print(f"  hero {out}")
    return names


def process_about():
    fname, root = ABOUT_SOURCE
    src = os.path.join(root, fname)
    if os.path.exists(src):
        save_resized(load(src), os.path.join(IMAGES, "about", "studio.jpg"),
                     FULL_MAX, FULL_Q)
        print("  about/studio.jpg")


def write_gallery_data(manifest, hero_names):
    """Emit js/gallery-data.js consumed by the gallery pages + hero."""
    labels = {
        "weddings": "Weddings",
        "pre-wedding": "Pre-Wedding",
        "bridal": "Bridal Portraits",
        "couple-portraits": "Couple Portraits",
        "haldi": "Haldi & Ceremonies",
        "baby-shoots": "Baby Shoots",
    }
    lines = [
        "/* AUTO-GENERATED by tools/optimize_images.py - safe to edit by hand.",
        "   Each category lists its photo file names (found in",
        "   images/portfolio/<category>/full and /thumb). Add a name here after",
        "   dropping a new optimised photo into those folders. */",
        "window.GALLERY = {",
    ]
    for cat, n in manifest.items():
        files = ", ".join(f'"{cat}-{i:02d}.jpg"' for i in range(1, n + 1))
        lines.append(f'  "{cat}": {{ label: "{labels.get(cat, cat)}", '
                     f'images: [{files}] }},')
    lines.append("};")
    hero = ", ".join(f'"images/hero/{h}"' for h in hero_names)
    lines.append(f"window.HERO_IMAGES = [{hero}];")
    lines.append("")
    out = os.path.join(SITE, "js", "gallery-data.js")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, "w", encoding="utf-8") as fh:
        fh.write("\n".join(lines))
    print(f"\nWrote {out}")


def main():
    print("Optimising photographs ...\n")
    manifest = process_categories()
    print("Hero images ...")
    hero_names = process_hero()
    print("About image ...")
    process_about()
    write_gallery_data(manifest, hero_names)
    total = sum(manifest.values())
    print(f"\nDone. {total} portfolio photos across {len(manifest)} categories.")


if __name__ == "__main__":
    sys.exit(main())
