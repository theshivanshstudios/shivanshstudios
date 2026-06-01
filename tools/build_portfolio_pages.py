#!/usr/bin/env python3
"""Generate the 6 portfolio category pages from one shared template.

Run:  python tools/build_portfolio_pages.py
The galleries themselves are data-driven (js/gallery-data.js) so you rarely
need to touch these files — re-run this only if you change the template,
the category list, or the intro copy below.
"""
import os

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)
OUT = os.path.join(SITE, "portfolio")

# category slug -> (page title, hero subtitle, intro paragraph)
PAGES = {
    "weddings": ("Weddings", "Signature Wedding Stories",
        "Full-day wedding coverage that captures every ritual, every emotion and every celebration — honestly and beautifully."),
    "pre-wedding": ("Pre-Wedding", "Cinematic Pre-Wedding Shoots",
        "Bollywood-style pre-wedding films and portraits, shot in stunning locations and crafted into timeless love stories."),
    "bridal": ("Bridal Portraits", "Elegant Bridal Portraits",
        "Refined, editorial bridal portraits that celebrate every detail — the jewellery, the colours and the quiet moments."),
    "couple-portraits": ("Couple Portraits", "Intimate Couple Portraits",
        "Natural, emotive portraits of the two of you — relaxed, timeless and unmistakably yours."),
    "haldi": ("Haldi & Ceremonies", "Joyful Haldi & Ceremonies",
        "The colour, laughter and warmth of haldi and the pre-wedding rituals, captured as they truly unfold."),
    "baby-shoots": ("Baby Shoots", "Tender Baby Shoots",
        "Soft, gentle and full of wonder — precious early memories preserved with the same care we bring to every story."),
}

ORDER = list(PAGES.keys())

NAV = """  <header class="nav scrolled">
    <a href="../index.html" class="brand" aria-label="Shivansh Studios home">
      <span class="mark">Shivansh Studios</span>
      <span class="sub">Jaipur · Wedding Stories</span>
    </a>
    <nav class="nav-links" aria-label="Primary">
      <a href="../index.html#home">Home</a>
      <a href="../index.html#about">About</a>
      <a href="../index.html#portfolio">Portfolio</a>
      <a href="../index.html#services">Services</a>
      <a href="../index.html#reviews">Reviews</a>
      <a href="../index.html#contact">Contact</a>
      <a href="../index.html#contact" class="nav-cta">Book a Consultation</a>
    </nav>
    <button class="burger" aria-label="Toggle menu"><span></span><span></span><span></span></button>
  </header>"""

FOOTER = """  <footer class="footer">
    <div class="container">
      <div class="footer-bottom" style="border:none;justify-content:center;padding-top:0">
        <span>© <span id="year">2026</span> Shivansh Studios. All Rights Reserved. · Jaipur, Rajasthan</span>
      </div>
    </div>
  </footer>

  <a class="wa-float" href="https://wa.me/917015154812?text=Hi%20Shivansh%20Studios%2C%20I%27d%20like%20to%20enquire%20about%20a%20shoot." target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
    <svg viewBox="0 0 16 16" fill="currentColor"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592"/></svg>
  </a>

  <div class="lightbox" id="lightbox" aria-hidden="true">
    <button class="lb-close" aria-label="Close">&times;</button>
    <button class="lb-btn lb-prev" aria-label="Previous">&#8249;</button>
    <img src="" alt="Shivansh Studios photograph, full size" />
    <button class="lb-btn lb-next" aria-label="Next">&#8250;</button>
    <div class="lb-count"></div>
  </div>

  <script src="../js/gallery-data.js"></script>
  <script src="../js/main.js"></script>"""

TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{title} Photography in Jaipur — Shivansh Studios</title>
  <meta name="description" content="{intro}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://shivanshstudios.com/portfolio/{slug}.html" />
  <link rel="icon" type="image/svg+xml" href="../images/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../css/style.css" />
</head>
<body>
{nav}

  <section class="page-hero">
    <div class="bg" style="background-image:url('../images/portfolio/{slug}/full/{slug}-01.jpg')"></div>
    <div class="inner">
      <span class="eyebrow">{subtitle}</span>
      <h1>{title}</h1>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="breadcrumb"><a href="../index.html">Home</a> / <a href="../index.html#portfolio">Portfolio</a> / {title}</div>
      <p style="max-width:640px;color:var(--taupe);font-size:1.06rem;margin-bottom:48px">{intro}</p>
      <div class="masonry" id="gallery-grid" data-category="{slug}"></div>
      <div class="gallery-nav">
{nav_links}
      </div>
    </div>
  </section>

{footer}
</body>
</html>
"""


def nav_links(current):
    out = []
    for slug in ORDER:
        if slug == current:
            continue
        out.append('        <a class="btn" href="{0}.html">{1}</a>'.format(slug, PAGES[slug][0]))
    # keep it to 3 sibling links + a back-home
    out = out[:3]
    out.append('        <a class="btn btn--solid" href="../index.html#contact">Book a Consultation</a>')
    return "\n".join(out)


def main():
    os.makedirs(OUT, exist_ok=True)
    for slug, (title, subtitle, intro) in PAGES.items():
        html = TEMPLATE.format(
            title=title, subtitle=subtitle, intro=intro, slug=slug,
            nav=NAV, footer=FOOTER, nav_links=nav_links(slug),
        )
        path = os.path.join(OUT, slug + ".html")
        with open(path, "w", encoding="utf-8") as fh:
            fh.write(html)
        print("wrote", path)


if __name__ == "__main__":
    main()
