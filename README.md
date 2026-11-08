# Bikini Bottoms Up — storefront (client preview)

A mobile-friendly boutique storefront for Bikini Bottoms Up, owned by Sharayah. Plain HTML, CSS and JavaScript — no build step, framework, API keys or paid services. Hosted on GitHub Pages at `/bikini-bottoms-up/`.

## Pages

| Page | What it shows |
| --- | --- |
| `index.html` | **Swimwear** — bikinis, one-pieces, swim tops, tankini sets. Also has the "Beyond the Beach" promo, Meet Sharayah and How to order. |
| `shop.html` | **Clothing & Accessories** ("Beyond the Beach") — Tops, Bottoms, Dresses & Sets, Shoes & Footwear, Bags, Accessories. Only categories with products are shown; until products are added it shows a clearly labelled "arriving soon" message. |

Both pages share the header, footer, product gallery and **one shopping bag** (saved in the browser, so it follows customers between pages and tabs).

## Files

| File | Purpose |
| --- | --- |
| `catalog.js` | **The only product list.** Edit products here. Instructions are at the top of the file. |
| `config.js` | Store settings: WhatsApp number (empty until verified) and checkout mode (`demo`). Public — never put secrets here. |
| `app.js` | Shared logic: product grid, filters, gallery, bag, demo checkout, mobile menu. |
| `style.css` | Shared styles. |
| `assets/` | Photos, banner, portrait and favicon. Put clothing photos in `assets/shop/<category>/`. |

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

## Checkout and payments

The checkout is a **demo**. It previews an order summary the customer can copy, and no order or payment is sent. If a WhatsApp number is set in `config.js`, the summary can also be sent to Sharayah as a WhatsApp message (still not a payment).

### Connecting real MMG payments (not done yet)

MMG offers an e-commerce Checkout API for registered merchants. The customer is redirected to MMG's hosted payment page, and MMG then sends a payment notification (callback) to the store. Before building this:

- **Merchant account and API credentials** from MMG Merchant Services. Request MMG's official developer documentation and a test (sandbox) environment.
- **A small secure backend** (for example a serverless function) that keeps the MMG credentials secret, creates the checkout request with the correct server-side prices, and receives MMG's callback. GitHub Pages can't do this on its own.
- **Order storage** (for example a sheet, database or email to Sharayah) recording each order and its payment status.
- **Paid only on MMG's confirmation.** An order counts as paid only when MMG's verified callback or status check confirms it — never because a customer clicked a button or sent a screenshot.

Then set `checkoutMode` and wire the checkout button to the backend.

## Before launch — information needed from Sharayah

- Prices and sizes marked "to be confirmed" (10 swim styles have no price and 11 have no size; 16 of 27 can be added to the bag today).
- Current stock for each item.
- Verified business WhatsApp number.
- Delivery and pickup areas and fees, plus return/exchange terms.
- MMG merchant account details (see above).
- Clothing & Accessories products: photos, names, prices, sizes and stock.

## Notes

- Removed `polka-5.webp`, an exact duplicate of `polka-2.webp`.
- The swimwear collection has 27 styles: Bikinis 11, One-pieces 11, Swim tops 4, Tankini sets 1.
- Fonts load from Google Fonts. If they can't load, the site falls back to system fonts.
- Tested in headless Chrome at 360, 390, 768, 1024 and 1440 px wide. Not yet tested on physical phones or in Safari.
