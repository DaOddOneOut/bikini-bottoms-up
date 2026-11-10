# Bikini Bottoms Up — storefront (client preview)

A mobile-friendly boutique storefront for Bikini Bottoms Up. The owner prefers to stay anonymous, so the site talks about the brand rather than the person — please keep her name and photos off the site. Plain HTML, CSS and JavaScript — no build step, framework, API keys or paid services. Hosted on GitHub Pages at `/bikini-bottoms-up/`.

## Pages

| Page | What it shows |
| --- | --- |
| `index.html` | **Swimwear** — bikinis, one-pieces, swim tops, tankini sets. Also has the "Beyond the Beach" promo, About the brand and How to order. |
| `shop.html` | **Clothing & Accessories** ("Beyond the Beach") — 120 pieces: Tops (11), Bottoms (20), Dresses & Sets (58), Sleepwear & Underwear (12), Shoes & Footwear (10), Bags (9). Accessories appears automatically once products are added; an empty shop shows a labelled "arriving soon" message. |

Both pages share the header, footer, product gallery and **one shopping bag** (saved in the browser, so it follows customers between pages and tabs).

## Files

| File | Purpose |
| --- | --- |
| `catalog.js` | **The only product list.** Edit products here. Instructions are at the top of the file. |
| `config.js` | Store settings: WhatsApp number (empty until verified) and checkout mode (`demo`). Public — never put secrets here. |
| `app.js` | Shared logic: product grid, filters, gallery, bag, demo checkout, mobile menu. |
| `style.css` | Shared styles. |
| `assets/` | Swimwear photos, clothing illustrations (`assets/shop/`), banner and favicon. |

`catalog.json` and the copy of the products embedded in `app.js` have been replaced by `catalog.js`, so there is nothing to keep in sync.

## Adding a product

1. Upload photos (WebP or JPG, about 1000 × 1333 px, portrait 3:4) to `assets/…`. Use lowercase filenames with dashes, and match the case exactly in `catalog.js`.
2. Copy an existing product in `catalog.js` and fill in `id`, `collection` (`swim` or `shop`), `category`, `name`, `tag`, `price`, `sizes` and `images` (each image needs a short `alt` description).
3. Leave any unknown value as `null` (or `[]` for sizes). The site shows "to be confirmed" and blocks that item from the bag.
4. Photo order: clothing — product-only shot first, then model views. Footwear — the pair first, then on-foot and detail views. Bags and accessories — a clear product photo first, then details. Props in a photo are not products unless they are listed separately.
5. For tops sold without bottoms, add `note: "Top only — bottoms shown for styling are not included."`
6. `stock` is optional: a number limits how many can be added to the bag, and `0` shows "Sold out".

## Run locally

Open `index.html` directly, or run `python3 -m http.server 8000` in this folder and visit http://localhost:8000.

## Clothing & Accessories photos

The clothing and bag images in `assets/shop/` are **AI-generated illustrations**; the footwear photos (`fw-*`) are real photos (a flat-lay plus a model or mannequin view) made from each item's original WhatsApp listing photo. The site says so in the product details and the page note. They were spot-checked against the originals; fixes are listed in `CLOTHING_REVIEW.csv`:

Swimwear galleries (`index.html`) show the real product photos first. 24 of the 27 styles also end with one **AI-generated front view** (`*-render.webp`, marked `ai: true` in `catalog.js`), shown with an "AI visualization" badge. The renders for olive-cross, lemon and polka were left out because they drop real details (front criss-cross straps, front tie bow, crossed straps over the cutout). No back views were generated; none should be invented.

- **WA0091** — price set to 5,000 as written on the listing photo (the import file said 4,500).
- **WA0097** — flat-lay removed because it put the black back panel and bow on the front; the model view is used instead.
- **WA0035** — mannequin view shown first, per the import notes (the flat-lay hem doesn't match).
- **WA0102 and WA0146** — flagged for a closer look (finish / length).

Material claims from listings (for example "silk", "100% cotton") are not shown until confirmed. To replace an illustration with a real photo, overwrite the WebP file with the same name.

## Checkout and payments

The checkout is a **demo**. It previews an order summary the customer can copy, and no order or payment is sent. If a WhatsApp number is set in `config.js`, the summary can also be sent to the business as a WhatsApp message (still not a payment).

### Connecting real MMG payments (not done yet)

MMG offers an e-commerce Checkout API for registered merchants. The customer is redirected to MMG's hosted payment page, and MMG then sends a payment notification (callback) to the store. Before building this:

- **Merchant account and API credentials** from MMG Merchant Services. Request MMG's official developer documentation and a test (sandbox) environment.
- **A small secure backend** (for example a serverless function) that keeps the MMG credentials secret, creates the checkout request with the correct server-side prices, and receives MMG's callback. GitHub Pages can't do this on its own.
- **Order storage** (for example a sheet, database or email to the owner) recording each order and its payment status.
- **Paid only on MMG's confirmation.** An order counts as paid only when MMG's verified callback or status check confirms it — never because a customer clicked a button or sent a screenshot.

Then set `checkoutMode` and wire the checkout button to the backend.

## Before launch — information needed from the owner

- Prices and sizes marked "to be confirmed" (10 swim styles have no price and 11 have no size; 16 of 27 can be added to the bag today).
- Current stock for each item.
- Verified business WhatsApp number.
- Delivery and pickup areas and fees, plus return/exchange terms.
- MMG merchant account details (see above).
- Clothing & Accessories: go through `CLOTHING_REVIEW.csv` — currency (none of the listings state it), stock and condition, the 6 clothing items with no price and 8 with no size, all 10 footwear items (real photos; no price, size or brand supplied yet — the size numbers printed inside some slides are not treated as the available sizes), the 9 bags (currency, stock, condition, dimensions and material; BAG-29701 merges two listing photos of what looks like the same black four-piece set), unusual sizes kept exactly as written (0XL, LX), brand spellings, and whether each AI illustration matches the real item.

## Notes

- Removed the owner's portrait at her request. It still exists in this repository's git history; ask if it needs to be purged.
- Removed `polka-5.webp`, an exact duplicate of `polka-2.webp`.
- The swimwear collection has 27 styles: Bikinis 11, One-pieces 11, Swim tops 4, Tankini sets 1.
- Fonts load from Google Fonts. If they can't load, the site falls back to system fonts.
- Tested in headless Chrome at 360, 390, 768, 1024 and 1440 px wide. Not yet tested on physical phones or in Safari.
