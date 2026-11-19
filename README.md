# Bikini Bottoms Up — storefront (client preview)

A mobile-friendly boutique storefront for Bikini Bottoms Up. The owner prefers to stay anonymous, so the site talks about the brand rather than the person — please keep her name and photos off the site. Plain HTML, CSS and JavaScript — no build step, framework, API keys or paid services. Hosted on GitHub Pages at `/bikini-bottoms-up/`.

## Pages

| Page | What it shows |
| --- | --- |
| `index.html` | **Swimwear** — bikinis, one-pieces, swim tops, tankini sets. Also has the "Beyond the Beach" promo, About the brand and How to order. |
| `shop.html` | **Clothing & Accessories** ("Beyond the Beach"): 287 pieces, shopped by department (**Women 193 · Men 86 · Kids 8**) and category (Tops, Bottoms, Dresses & Sets, Sleepwear & Underwear, Shoes & Footwear, Bags; Accessories appears when stocked). `shop.html#men` and `shop.html#kids` open those departments directly. Items with no department set count as Women's. |

Both pages share the header, footer, product gallery and **one shopping bag** (saved in the browser, so it follows customers between pages and tabs).

## Owner inventory sheet (Google Sheets)

The owner edits products in a Google Sheet, **Bikini Bottoms Up — Website Inventory**, and the site reads it as she makes changes.

- **What the sheet controls:** name, price, sizes, sold-out sizes, sold out, show on site (hide or unhide), stock, category (which also moves an item between the Swimwear and Clothing pages), department, brand, photo label, note and description. Rows are matched to products by **ID**.
- **What it doesn't control:** photos. Those stay in `catalog.js` and `assets/`. A new product needs its photos added to the repo first. Then add a row to the sheet with the same ID.
- **How it loads:** `config.js` → `inventoryCsvUrl` holds the sheet's *Publish to web* CSV link for the **Products** tab only. Each visitor sees the last version of the sheet their browser saved straight away, then the site fetches the latest copy in the background and updates the page if anything changed. Google refreshes the published copy about every 5 minutes.
- **Safety:** if the link is empty, the sheet can't be reached, or the CSV doesn't look like the Products tab (no `ID` header, or fewer than half the IDs match), the site uses `catalog.js` as it is. A bad price (e.g. text) keeps the built-in price. Items hidden or sold out in the sheet are removed from any visitor's bag.
- **Keep headers as they are.** The site reads columns by their row-1 names: `ID, Name, Price (GYD), Sizes, Sold-out sizes, Sold out, Show on site, Stock, Category, Department, Brand, Label, Note, Description`. `Photo` and `Page` are for the owner's reference only.
- **Rebuilding the sheet** from `catalog.js`: see `tools/build_inventory_sheet.py`. `catalog.js` is the built-in fallback. Once the sheet is live, the sheet is the source of truth, so sync any sheet edits back into `catalog.js` when new products are imported.

### Setup (one time)
1. Open the sheet in Google Sheets → **File → Share → Publish to web**.
2. Under *Link*, choose the **Products** tab (not "Entire document") and **Comma-separated values (.csv)**, then click **Publish**.
3. Put the link in `config.js` as `inventoryCsvUrl`.
4. Share the sheet with the owner as **Editor** (Share button → her email).

## Browsing tools

Both product grids have a search box and a filter bar: **Availability** (Available / Sold out, with counts), **Size** (pick several; spellings are grouped, so "Small" = "S" and "XXL" = "2XL"), **Sort** (Featured, Newest, Price low/high, A–Z, Z–A) and **Show 25 / 50 / 100** with **Load more**. Active filters appear as removable chips with **Clear all**. Items that can't be ordered yet (no price, no size or sold out) sort last, except in A–Z / Z–A. "Newest" follows the order products were added to `catalog.js`, so add new products at the end. Each visitor's Show amount is remembered (`bbu-page-size`).

**Cards.** With a mouse, hovering a card swaps to a model-worn photo (a real photo first; a mannequin or studio view only when there is no real one) and shows **Quick add** size buttons; sold-out sizes are crossed out. Phones keep the normal size picker and Add to bag. Cards whose first photo is AI-generated carry an "AI view" tag.

**Wishlist and Notify me.** The heart on each card (and in the photo viewer) saves the piece to a wishlist kept on the visitor's device (`bbu-wishlist-v1`), opened from the heart in the header. Sold-out pieces and sold-out sizes offer **Notify me**, which opens WhatsApp with a ready-made message naming the item and its ID. There is no automatic alert system: the owner replies by hand.

**Category links.** `index.html#cat-bikini`, `shop.html#cat-shoes` etc. open a page with that category selected; the phone menu uses them.

## Light and dark mode

Both pages have a moon/sun toggle (in the menu on phones). The dark theme is a deep ocean teal (`#0f2e33`), not black. It follows the device's dark-mode setting until the visitor chooses, then remembers their choice (`bbu-theme` in the browser). Colours are CSS variables at the top of `style.css`, and the dark values live in the `html[data-theme="dark"]` block.

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

Men's and kids' basics (batches 13 and 17–22, IDs like `20261110-WA0077`) are AI illustrations too. Kids' items use `department: "Youth"` and show "Youth size". Sold-out items use `stock: 0`, and `soldSizes` lists sizes already sold. Batch 21 arrived twice as identical files and was imported once.

Swimwear galleries (`index.html`) lead with the product on its own (a flat lay); hovering a card on a computer shows the outfit being worn. The 14 listings with studio images lead with the studio flat lay, then the studio model view, then the real photos. 24 of the 41 styles also end with one **AI-generated front view** (`*-render.webp`, marked `ai: true` in `catalog.js`), shown with an "AI visualization" badge. The renders for olive-cross, lemon and polka were left out because they drop real details (front criss-cross straps, front tie bow, crossed straps over the cutout). No back views were generated; none should be invented.

- **WA0091** — price set to 5,000 as written on the listing photo (the import file said 4,500).
- **WA0097**: the flat-lay is a **back** view (open back, black panel, bow) and is labelled that way, shown before the model view.
- **WA0035** — mannequin view shown first, per the import notes (the flat-lay hem doesn't match).
- **WA0102 and WA0146** — flagged for a closer look (finish / length).

Material claims from listings (for example "silk", "100% cotton") are not shown until confirmed. To replace an illustration with a real photo, overwrite the WebP file with the same name.

## Checkout and payments

**Current setup:** WhatsApp ordering is live (`whatsappNumber` in `config.js`). Checkout builds an order request that the customer sends to the shop on WhatsApp; nothing is charged online. If the number is cleared, checkout goes back to a labelled demo. Business hours (Monday to Saturday, 9 AM to 5 PM Guyana time, closed Sunday) and the Instagram link are in the footer of both pages.

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
- Clothing & Accessories: go through `CLOTHING_REVIEW.csv` — currency (none of the listings state it), stock and condition, the 20 womenswear/clothing pieces added Nov 19 (AI illustrations from listing photos; the Hot Pink Wrap Dress uses only its on-model image because the product illustration showed the wrong length), the 6 clothing items with no price and 8 with no size, all 10 footwear items (real photos; no price, size or brand supplied yet — the size numbers printed inside some slides are not treated as the available sizes), the 9 bags (currency, stock, condition, dimensions and material; BAG-29701 merges two listing photos of what looks like the same black four-piece set), unusual sizes kept exactly as written (0XL, LX), brand spellings, and whether each AI illustration matches the real item.

## Notes

- Removed the owner's portrait at her request. It still exists in this repository's git history; ask if it needs to be purged.
- Removed `polka-5.webp`, an exact duplicate of `polka-2.webp`.
- The swimwear collection has 41 styles: Bikinis 18, One-pieces 13, Tankini sets 3, Swim tops 4, Swim bottoms 2, Swim dresses 1 (counts as of Nov 18).
- Fonts load from Google Fonts. If they can't load, the site falls back to system fonts.
- Tested in headless Chrome at 360, 390, 768, 1024 and 1440 px wide. Not yet tested on physical phones or in Safari.
