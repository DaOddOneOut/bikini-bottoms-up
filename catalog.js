/*
  Bikini Bottoms Up — product catalog (the ONLY place product data lives).

  Both index.html (Swimwear) and shop.html (Clothing & Accessories) read this file.
  It is plain JavaScript rather than JSON so the site also opens straight from disk.

  Each product:
    id          unique, lowercase, no spaces (used to save the bag — don't rename once live)
    collection  "swim"  → shows on index.html
                "shop"  → shows on shop.html
    category    swim:  bikini | one | top | set
                shop:  tops | bottoms | dresses-sets | shoes | bags | accessories
    name        customer-facing product name
    tag         short label on the photo (e.g. "Top only")
    price       number in GYD, or null  → shows "Price to be confirmed" and can't be added to the bag
    sizes       e.g. ["S","M"] or ["One size"]; [] → "Size to be confirmed" and can't be added
    stock       null (not supplied), or a number of pieces in stock as supplied by the owner
    description optional short text; null if none supplied
    note        optional important note shown with the product (e.g. what is NOT included)
    images      first image is the main card photo. Each: { src, alt }
                Clothing: product-only shot first, then model views.
                Footwear: clear pair photo first, then on-foot / detail views.
                Bags & accessories: clear product photo first, then details.

  Only add information Sharayah has supplied. Leave unknown values as null / [].
*/
window.BBU_CATALOG = {
  categories: {
    swim: [
      { id: "bikini", label: "Bikinis" },
      { id: "one", label: "One-pieces" },
      { id: "top", label: "Swim tops" },
      { id: "set", label: "Tankini sets" }
    ],
    shop: [
      { id: "tops", label: "Tops" },
      { id: "bottoms", label: "Bottoms" },
      { id: "dresses-sets", label: "Dresses & Sets" },
      { id: "shoes", label: "Shoes & Footwear" },
      { id: "bags", label: "Bags" },
      { id: "accessories", label: "Accessories" }
    ]
  },

  products: [
    /* ---------- Swimwear · Bikinis ---------- */
    { id: "floral", collection: "swim", category: "bikini", name: "Red Floral Tie-Side Bikini", tag: "Two-piece", price: 5000, sizes: ["L"], stock: null, description: null,
      images: [{ src: "assets/bikinis/floral-1.webp", alt: "Flat lay of a red floral triangle bikini with red and white striped tie straps" }] },
    { id: "hibiscus", collection: "swim", category: "bikini", name: "Blush Hibiscus Bikini", tag: "Two-piece", price: 5000, sizes: ["L"], stock: null, description: null,
      images: [{ src: "assets/bikinis/hibiscus-1.webp", alt: "Flat lay of a blush triangle bikini with an orange hibiscus print and tie strings" }] },
    { id: "royal-ring", collection: "swim", category: "bikini", name: "Royal Blue Ring Bikini", tag: "Two-piece", price: null, sizes: [], stock: null, description: null,
      images: [
        { src: "assets/bikinis/royal-ring-1.webp", alt: "Flat lay of a royal blue bikini with gold ring details" },
        { src: "assets/bikinis/royal-ring-2.webp", alt: "Model wearing the royal blue ring bikini with a printed sarong" }] },
    { id: "black-rib", collection: "swim", category: "bikini", name: "Black Underwire Bikini", tag: "Two-piece", price: null, sizes: [], stock: null, description: null,
      images: [{ src: "assets/bikinis/black-rib-1.webp", alt: "Black one-shoulder underwire bikini on a white background" }] },
    { id: "wine", collection: "swim", category: "bikini", name: "Burgundy Underwire Bikini", tag: "Two-piece", price: null, sizes: [], stock: null, description: null,
      images: [{ src: "assets/bikinis/wine-1.webp", alt: "Flat lay of a burgundy one-shoulder underwire bikini" }] },
    { id: "monochrome", collection: "swim", category: "bikini", name: "Black & White Ring Bikini", tag: "Two-piece", price: null, sizes: [], stock: null, description: null,
      images: [
        { src: "assets/bikinis/monochrome-1.webp", alt: "Flat lay of a black bikini with white trim and a gold centre ring" },
        { src: "assets/bikinis/monochrome-2.webp", alt: "Model wearing the black and white bikini on a beach at sunset" }] },
    { id: "olive-cross", collection: "swim", category: "bikini", name: "Olive Cross-Strap Bikini", tag: "Two-piece", price: 5500, sizes: ["XS"], stock: null, description: null,
      images: [{ src: "assets/bikinis/olive-cross-1.webp", alt: "Flat lay of an olive green bikini with criss-cross straps on the top and bottoms" }] },
    { id: "pink-ring", collection: "swim", category: "bikini", name: "Blush Pink Ring Bikini", tag: "Two-piece", price: null, sizes: [], stock: null, description: null,
      images: [{ src: "assets/bikinis/pink-ring-1.webp", alt: "Flat lay of a blush pink bikini with gold ring details" }] },
    { id: "red-bikini", collection: "swim", category: "bikini", name: "Classic Red Bikini", tag: "Two-piece", price: null, sizes: [], stock: null, description: null,
      images: [{ src: "assets/bikinis/red-bikini-1.webp", alt: "Flat lay of a bright red underwire bikini" }] },
    { id: "lemon", collection: "swim", category: "bikini", name: "Lemon Underwire Bikini", tag: "Two-piece", price: null, sizes: [], stock: null, description: null,
      images: [{ src: "assets/bikinis/lemon-1.webp", alt: "Flat lay of a lemon yellow underwire bikini" }] },
    { id: "sunshine", collection: "swim", category: "bikini", name: "Sunshine Ring Bikini", tag: "Two-piece", price: null, sizes: [], stock: null, description: null,
      images: [
        { src: "assets/bikinis/sunshine-1.webp", alt: "Flat lay of a sunshine yellow bikini with gold ring details" },
        { src: "assets/bikinis/sunshine-2.webp", alt: "Model wearing the sunshine yellow bikini with a printed sarong" }] },

    /* ---------- Swimwear · One-pieces ---------- */
    { id: "blue-ruffle", collection: "swim", category: "one", name: "Royal Blue Ruffle One-Piece", tag: "One-piece", price: 5000, sizes: ["L"], stock: null, description: null,
      images: [
        { src: "assets/one-pieces/blue-ruffle-1.webp", alt: "Flat lay of a royal blue one-piece with ruffled straps and a V-neck" },
        { src: "assets/one-pieces/blue-ruffle-2.webp", alt: "Model wearing the royal blue ruffle one-piece" }] },
    { id: "navy-ruffle", collection: "swim", category: "one", name: "Navy Ruffle One-Piece", tag: "One-piece", price: 5000, sizes: ["XL"], stock: null, description: null,
      images: [
        { src: "assets/one-pieces/navy-ruffle-1.webp", alt: "Flat lay of a navy ruched one-piece with ruffled straps" },
        { src: "assets/one-pieces/navy-ruffle-2.webp", alt: "Model wearing the navy ruffle one-piece" }] },
    { id: "blue-wrap", collection: "swim", category: "one", name: "Royal Blue Crossover One-Piece", tag: "One-piece", price: 5000, sizes: ["M"], stock: null, description: null,
      images: [
        { src: "assets/one-pieces/blue-wrap-1.webp", alt: "Flat lay of a royal blue ruched one-piece with a crossover neckline" },
        { src: "assets/one-pieces/blue-wrap-2.webp", alt: "Model wearing the royal blue crossover one-piece" }] },
    { id: "red-halter", collection: "swim", category: "one", name: "Red Crossover Halter One-Piece", tag: "One-piece", price: 5500, sizes: ["4XL"], stock: null, description: null,
      images: [
        { src: "assets/one-pieces/red-halter-1.webp", alt: "Flat lay of a red one-piece with a crossover halter neckline" },
        { src: "assets/one-pieces/red-halter-2.webp", alt: "Model wearing the red crossover halter one-piece" }] },
    { id: "heart", collection: "swim", category: "one", name: "Red Heart Side-Tie One-Piece", tag: "One-piece", price: 5000, sizes: ["M"], stock: null, description: null,
      images: [
        { src: "assets/one-pieces/heart-1.webp", alt: "Flat lay of a red one-piece with a stars-and-stripes heart print and lace-up sides" },
        { src: "assets/one-pieces/heart-2.webp", alt: "Model wearing the red heart side-tie one-piece" }] },
    { id: "aqua", collection: "swim", category: "one", name: "Aqua & Black Ruffle One-Piece", tag: "One-piece", price: 5500, sizes: ["2XL"], stock: null, description: null,
      images: [{ src: "assets/one-pieces/aqua-1.webp", alt: "Flat lay of a black one-piece with an aqua ruffled top and front cutout" }] },
    { id: "polka", collection: "swim", category: "one", name: "Polka-Dot Cutout One-Piece", tag: "One-piece", price: 5500, sizes: [], stock: null, description: null,
      images: [
        { src: "assets/one-pieces/polka-1.webp", alt: "Flat lay of a black and white polka-dot one-piece with a front cutout and criss-cross straps" },
        { src: "assets/one-pieces/polka-2.webp", alt: "Model wearing the polka-dot cutout one-piece" },
        { src: "assets/one-pieces/polka-3.webp", alt: "Back view of the polka-dot one-piece showing crossed straps" },
        { src: "assets/one-pieces/polka-4.webp", alt: "Second flat lay of the polka-dot cutout one-piece" }] },
    { id: "brasil", collection: "swim", category: "one", name: "Brasil Cutout One-Piece", tag: "One-piece", price: null, sizes: [], stock: null, description: null,
      images: [
        { src: "assets/one-pieces/brasil-1.webp", alt: "Flat lay of a green one-piece with yellow BRASIL lettering and a centre cutout" },
        { src: "assets/one-pieces/brasil-2.webp", alt: "Model wearing the green Brasil cutout one-piece" }] },
    { id: "leopard", collection: "swim", category: "one", name: "Floral Leopard Cutout One-Piece", tag: "One-piece", price: null, sizes: [], stock: null, description: null,
      images: [
        { src: "assets/one-pieces/leopard-1.webp", alt: "Flat lay of a leopard and blue floral print one-piece with a centre cutout" },
        { src: "assets/one-pieces/leopard-2.webp", alt: "Model wearing the floral leopard cutout one-piece" }] },
    { id: "yellow-floral", collection: "swim", category: "one", name: "Yellow Floral Ring One-Piece", tag: "One-piece", price: 5000, sizes: ["XS"], stock: null, description: null,
      images: [{ src: "assets/one-pieces/yellow-floral-1.webp", alt: "Flat lay of a yellow floral one-piece with a ring cutout at the waist" }] },
    { id: "orange-halter", collection: "swim", category: "one", name: "Orange Halter One-Piece", tag: "One-piece", price: 5000, sizes: ["L"], stock: null, description: null,
      images: [{ src: "assets/one-pieces/orange-halter-1.webp", alt: "Flat lay of an orange ruched halter one-piece with a keyhole neckline" }] },

    /* ---------- Swimwear · Swim tops (bottoms NOT included) ---------- */
    { id: "tropical-top", collection: "swim", category: "top", name: "Tropical Leaf Swim Top", tag: "Top only", price: 2000, sizes: ["2XL"], stock: null, description: null,
      note: "Top only — bottoms shown for styling are not included.",
      images: [
        { src: "assets/swim-tops/tropical-top-1.webp", alt: "Flat lay of a navy swim top with a green tropical leaf print" },
        { src: "assets/swim-tops/tropical-top-2.webp", alt: "Model wearing the tropical leaf swim top with navy shorts, which are not included" }] },
    { id: "lime-top", collection: "swim", category: "top", name: "Lime Chevron Swim Top", tag: "Top only", price: 2000, sizes: ["2XL"], stock: null, description: null,
      note: "Top only — bottoms shown for styling are not included.",
      images: [
        { src: "assets/swim-tops/lime-top-1.webp", alt: "Flat lay of a black swim top with lime and blue chevron straps" },
        { src: "assets/swim-tops/lime-top-2.webp", alt: "Model wearing the lime chevron swim top with black shorts, which are not included" }] },
    { id: "pink-top", collection: "swim", category: "top", name: "Pink Geometric Swim Top", tag: "Top only", price: 2000, sizes: ["3XL"], stock: null, description: null,
      note: "Top only — bottoms shown for styling are not included.",
      images: [
        { src: "assets/swim-tops/pink-top-1.webp", alt: "Flat lay of a black swim top with pink geometric print straps" },
        { src: "assets/swim-tops/pink-top-2.webp", alt: "Model wearing the pink geometric swim top with black shorts, which are not included" }] },
    { id: "olive-top", collection: "swim", category: "top", name: "Olive Stripe Swim Top", tag: "Top only", price: 2000, sizes: ["2XL"], stock: null, description: null,
      note: "Top only — bottoms shown for styling are not included.",
      images: [
        { src: "assets/swim-tops/olive-top-1.webp", alt: "Flat lay of an olive swim top with a striped lining and side drawstring" },
        { src: "assets/swim-tops/olive-top-2.webp", alt: "Model wearing the olive stripe swim top with black shorts, which are not included" }] },

    /* ---------- Swimwear · Tankini sets ---------- */
    { id: "black-halter", collection: "swim", category: "set", name: "Black Halter Tankini Set", tag: "Tankini set", price: 5500, sizes: ["S"], stock: null, description: null,
      images: [{ src: "assets/tankini-sets/black-halter-1.webp", alt: "Flat lay of a black high-neck halter tankini top with matching ruched bottoms" }] }

    /* ---------- Clothing & Accessories (shop.html) ----------
       None supplied yet. Example of the format (copy, fill in, and remove the slashes):

    ,{ id: "linen-shirt-white", collection: "shop", category: "tops", name: "White Linen Shirt", tag: "Top", price: null, sizes: [], stock: null, description: null,
      images: [
        { src: "assets/shop/tops/linen-shirt-white-1.webp", alt: "White linen shirt laid flat" },
        { src: "assets/shop/tops/linen-shirt-white-2.webp", alt: "Model wearing the white linen shirt" }] }
    */
  ]
};
