# Shivansh Studios — Website Editing Guide

A plain-English guide to updating your website. **You do not need to be a developer.**
Everything lives in simple text files and image folders.

There are two ways to make changes:

- **Easiest (in your browser):** edit files directly on GitHub.com — see *"How to publish a
  change"* at the bottom. Good for changing text, phone numbers, or reviews.
- **On your computer:** edit the files in this `site` folder, then upload (push) them.

---

## 1. The most common things you'll want to change

### a) Phone number, WhatsApp number, or email
These appear in a few places. Open the file and use *Find & Replace*:

| What | Where to change it |
|------|--------------------|
| WhatsApp / phone number | `js/main.js` (top: `WHATSAPP` and search the site for `917015154812`) |
| Email address | `js/main.js` (top: `EMAIL`) and `index.html` |
| Studio address & hours | `index.html` (search for "Vardhman Nagar") |

Tip: the number `917015154812` = country code 91 + the 10-digit number, no spaces.

### b) Headlines and wording on the home page
Open **`index.html`**. All the text you see on the site is in here, in plain English.
Find the sentence you want to change and type over it. Don't touch the `<` `>` tags around it.

### c) Reviews / testimonials
Open **`js/reviews.js`**. Each review looks like this:

```js
{ name: "Priya & Aakash", meta: "Wedding · Jaipur", stars: 5,
  text: "Their work is amazing..." },
```

Copy one block, paste it, and change the words. Keep the commas and quotes. Done.

---

## 2. Adding or changing photos

Your photos live in **`images/portfolio/<category>/`**. Each category has two folders:

- `full/`  → the big version shown when a visitor clicks a photo
- `thumb/` → the small version shown in the grid

The categories are: `weddings`, `pre-wedding`, `bridal`, `couple-portraits`, `haldi`,
`baby-shoots`.

### The easy, automatic way (recommended)
1. Put your **original full-size photos** into the matching source folder, e.g.
   `OldData/new_Anurag/Anurag/uploads/services/wedding/`.
2. Open a terminal in the `site` folder and run:
   ```
   python tools/optimize_images.py
   ```
   This automatically resizes them, makes the thumbnails, and updates the photo list
   (`js/gallery-data.js`). Then publish (section below).

### The manual way (one or two photos)
1. Resize your photo to about 1600px on its longest side and save as `.jpg`.
2. Put it in both `full/` and `thumb/` for that category, using the next number,
   e.g. `weddings-09.jpg`.
3. Open **`js/gallery-data.js`** and add the filename to that category's list:
   ```js
   "weddings": { label: "Weddings", images: [ ... , "weddings-09.jpg" ] },
   ```

### Changing the photos on the home-page tiles or hero slideshow
- **Hero slideshow** images are listed at the bottom of `js/gallery-data.js`
  (`window.HERO_IMAGES`). The files are in `images/hero/`.
- **Portfolio tiles** on the home page use the first photo of each category, set in
  `index.html` (search for `tile`). Change the `src="..."` to any photo you like.

---

## 3. Adding a brand-new portfolio category (e.g. "Maternity")

1. Create folders `images/portfolio/maternity/full` and `.../thumb` and add photos.
2. In `tools/optimize_images.py` add `"maternity": ["maternity"],` to the `CATEGORIES` list
   and a label in `tools/build_portfolio_pages.py` (the `PAGES` list), then run both scripts:
   ```
   python tools/optimize_images.py
   python tools/build_portfolio_pages.py
   ```
3. Add a tile for it in `index.html` (copy an existing `<a class="tile ...">` block).

---

## 4. (Optional) Make the contact form email you automatically

Right now the form opens WhatsApp or the visitor's email app with the details filled in —
this works with no setup. If you'd like submissions to arrive in your inbox automatically:

1. Sign up free at **https://formspree.io** with `shivanshstudios2021@gmail.com`.
2. Create a form — you'll get a URL like `https://formspree.io/f/abcdwxyz`.
3. In `index.html`, find `<form ... id="inquiry-form" novalidate>` and change it to:
   ```html
   <form id="inquiry-form" action="https://formspree.io/f/abcdwxyz" method="POST">
   ```
4. (Optional) remove the two WhatsApp/email buttons if you only want email.

---

## 5. How to publish a change

### Option A — edit on GitHub.com (no software needed)
1. Go to your repository on GitHub and open the file you want to change.
2. Click the ✏️ **pencil icon** (top right of the file).
3. Make your edit, scroll down, and click **Commit changes**.
4. Wait 1–2 minutes — the live site at **shivanshstudios.com** updates automatically.

### Option B — from your computer
After editing files in the `site` folder, open a terminal here and run:
```
git add -A
git commit -m "Update website"
git push
```
The live site updates within a couple of minutes.

---

## 6. Where everything is

```
index.html              The whole home page (all text & sections)
portfolio/*.html        The gallery pages (auto-generated — usually leave alone)
css/style.css           Colours, fonts, spacing (the "look")
js/main.js              Behaviour + your phone/email settings (top of the file)
js/reviews.js           Your testimonials
js/gallery-data.js      The list of photos in each gallery
images/                 All photos (hero, about, portfolio)
tools/                  Helper scripts for resizing photos & building gallery pages
CNAME                   Your domain name (do not delete)
```

Questions about anything here? Keep this file — it's your reference.
