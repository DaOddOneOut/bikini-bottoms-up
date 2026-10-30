# Bikini Bottoms Up — client first draft

A simple, mobile-friendly beachwear storefront. Plain HTML, CSS, and JavaScript. No install, build, API keys, or paid services required.

## Show it on GitHub Pages

1. Create a GitHub repository, such as `bikini-bottoms-up`.
2. Upload the contents of this folder (index.html, style.css, app.js, assets, and .nojekyll) to the repository root. Upload the assets folder too.
3. In the repository, open Settings → Pages.
4. Under Build and deployment, choose Deploy from a branch.
5. Select `main`, folder `/ (root)`, and Save.
6. When GitHub finishes publishing, use the URL shown in Pages to share the draft with the client.

The site uses relative asset paths, so it works on a GitHub Pages project URL. Public GitHub Pages sites are visible to anyone with the link.

## Open locally

Open index.html in a browser. For a local web server, run `python3 -m http.server 8000` in this folder, then visit http://localhost:8000.

## Updated collection

26 styles, organized into Bikinis (11), One-pieces (10), Swim tops (4), and Tankini sets (1). Includes 43 new photos, with matching flat lays and model views grouped in galleries. The duplicate polka-dot photos are grouped into one product listing.

Old screenshot product crops have been removed. The original brand banner and owner portrait remain.

Sizes and prices are taken only from the supplied references when a match is clear. Missing details show “to be confirmed,” and those products cannot be added to the sample checkout. 2XL and XXL are treated as the same size. Swim tops explicitly exclude bottoms. Accessories are photo props.

PRODUCT_CATALOG.csv provides an editable overview. catalog.json provides a structured copy of the product data; the storefront reads the matching embedded array at the top of app.js, so it also opens locally without a server. Update both when changing products.

## Before launch

Confirm stock, missing sizes and prices, business WhatsApp number, delivery/pickup fees and areas, return/exchange terms, and MMG merchant details. Product names are descriptive draft names for review. Review supplied catalog imagery against actual stock before selling.

The MMG step and message summary are demos. No payments, orders, or messages are sent. Real automated payment confirmation requires a supported payment service and secure backend; this static draft does not provide one.

All product photos are in assets, grouped by category. Upload that entire folder alongside index.html, style.css, app.js, and .nojekyll to the GitHub repository root.

## Device support
Responsive phone, tablet, and desktop layouts. Use current Chrome, Edge, Firefox, or Safari on desktop. Recommended: Chrome on Android phones/tablets; Safari on iPhone/iPad. Open the published GitHub Pages link in the browser app, not a file preview inside a messaging app. This is a website, not a native mobile app. Physical-device and all-browser testing has not been performed.
