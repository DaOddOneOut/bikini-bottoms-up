/*
  Bikini Bottoms Up — product catalog (the ONLY place product data lives).

  Both index.html (Swimwear) and shop.html (Clothing & Accessories) read this file.
  It is plain JavaScript rather than JSON so the site also opens straight from disk.

  Each product:
    id          unique, lowercase, no spaces (used to save the bag — don't rename once live)
    collection  "swim"  → shows on index.html
                "shop"  → shows on shop.html
    category    swim:  bikini | one | top | set
                shop:  tops | bottoms | dresses-sets | sleepwear | shoes | bags | accessories
    name        customer-facing product name
    tag         short label on the photo (e.g. "Top only")
    price       number in GYD, or null  → shows "Price to be confirmed" and can't be added to the bag
    sizes       e.g. ["S","M"] or ["One size"]; [] → "Size to be confirmed" and can't be added
    stock       null (not supplied), or a number of pieces in stock as supplied by the owner
    description optional short text; null if none supplied
    brand       optional brand as shown on the listing; null if unknown
    department  optional "Women" / "Men"; null if not stated
    includes    optional list of pieces included (for sets)
    illustrated true when photos are AI-generated illustrations of the real item
    note        optional important note shown with the product (e.g. what is NOT included)
    images      first image is the main card photo. Each: { src, alt }
                Clothing: product-only shot first, then model views.
                Footwear: clear pair photo first, then on-foot / detail views.
                Bags & accessories: clear product photo first, then details.

  Only add information the owner has supplied. Leave unknown values as null / [].
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
      { id: "sleepwear", label: "Sleepwear & Underwear" },
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

    ,
    /* ---------- Clothing & Accessories (shop.html) ----------
       Imported from catalog batches 01–10 (WhatsApp listing photos, Nov 2026). IDs match the original
       photo numbers (WA####). Images are AI-generated illustrations based on those photos.
       Open items to confirm are listed in CLOTHING_REVIEW.csv. */
    { id: "WA0012", collection: "shop", category: "dresses-sets", name: "Royal blue off-shoulder wide-leg jumpsuit", tag: "Jumpsuit", price: null, sizes: [], stock: null, brand: null, department: null,
      description: "Thin shoulder straps, broad off-shoulder flounce, fitted waist, full length wide legs", illustrated: true,
      images: [
        { src: "assets/shop/wa0012-flatlay.webp", alt: "Flat-lay illustration of the royal blue off-shoulder wide-leg jumpsuit" },
        { src: "assets/shop/wa0012-mannequin.webp", alt: "Illustration of the royal blue off-shoulder wide-leg jumpsuit on a display mannequin" }] },
    { id: "WA0020", collection: "shop", category: "dresses-sets", name: "Blue floral sleeveless sheath dress", tag: "Dress", price: 6000, sizes: ["4"], stock: null, brand: "Karl Lagerfeld", department: null,
      description: "Sleeveless fitted knee-length sheath, bright pink yellow green floral pattern over blue with fine vertical light lines", illustrated: true,
      images: [
        { src: "assets/shop/wa0020-flatlay.webp", alt: "Flat-lay illustration of the blue floral sleeveless sheath dress" },
        { src: "assets/shop/wa0020-mannequin.webp", alt: "Illustration of the blue floral sleeveless sheath dress on a display mannequin" }] },
    { id: "WA0021", collection: "shop", category: "dresses-sets", name: "Red sleeveless midi dress", tag: "Dress", price: 6000, sizes: ["Small"], stock: null, brand: null, department: null,
      description: "Round neck sleeveless fitted midi sheath, gathered/twisted waist and asymmetric overlapping front hem", illustrated: true,
      images: [
        { src: "assets/shop/wa0021-flatlay.webp", alt: "Flat-lay illustration of the red sleeveless midi dress" },
        { src: "assets/shop/wa0021-mannequin.webp", alt: "Illustration of the red sleeveless midi dress on a display mannequin" }] },
    { id: "WA0023", collection: "shop", category: "dresses-sets", name: "Red bow-back mini dress", tag: "Dress", price: 5000, sizes: ["0XL"], stock: null, brand: null, department: null,
      description: "Sleeveless round front neckline red fitted short A-line dress, deep V back and large matching bow at back waist", illustrated: true,
      images: [
        { src: "assets/shop/wa0023-flatlay.webp", alt: "Flat-lay illustration of the red bow-back mini dress" },
        { src: "assets/shop/wa0023-mannequin.webp", alt: "Illustration of the red bow-back mini dress on a display mannequin" }] },
    { id: "WA0024", collection: "shop", category: "dresses-sets", name: "Slate blue tiered chiffon dress", tag: "Dress", price: 5000, sizes: ["8"], stock: null, brand: "SLNY", department: null,
      description: "Sleeveless round neck, short layered diagonal cascading chiffon ruffles, airy slightly sheer hem, knee length", illustrated: true,
      images: [
        { src: "assets/shop/wa0024-flatlay.webp", alt: "Flat-lay illustration of the slate blue tiered chiffon dress" },
        { src: "assets/shop/wa0024-mannequin.webp", alt: "Illustration of the slate blue tiered chiffon dress on a display mannequin" }] },
    { id: "WA0027", collection: "shop", category: "dresses-sets", name: "Light denim strapless wrap-front romper", tag: "Romper", price: 6000, sizes: ["0XL"], stock: null, brand: null, department: null,
      description: "Strapless straight/slight sweetheart bodice with vertical seams, fitted waist, matching belt rectangular buckle, asymmetric wrap skort front over built-in shorts", illustrated: true,
      images: [
        { src: "assets/shop/wa0027-flatlay.webp", alt: "Flat-lay illustration of the light denim strapless wrap-front romper" },
        { src: "assets/shop/wa0027-mannequin.webp", alt: "Illustration of the light denim strapless wrap-front romper on a display mannequin" }] },
    { id: "WA0029", collection: "shop", category: "dresses-sets", name: "Mint short-sleeve midi dress", tag: "Dress", price: 5000, sizes: ["Small"], stock: null, brand: "Donna Morgan", department: null,
      description: "Round neck short sleeves fitted long midi dress, gathered twist on one waist side, front slit", illustrated: true,
      images: [
        { src: "assets/shop/wa0029-flatlay.webp", alt: "Flat-lay illustration of the mint short-sleeve midi dress" },
        { src: "assets/shop/wa0029-mannequin.webp", alt: "Illustration of the mint short-sleeve midi dress on a display mannequin" }] },
    { id: "WA0031", collection: "shop", category: "bottoms", name: "Camel studded fringe mini skirt", tag: "Skirt", price: 3000, sizes: ["Large"], stock: null, brand: null, department: null,
      description: "Suede-like camel mini skirt, broad waistband, pointed curved front overlay with small gold-tone studs in V rows, long hanging fringe at hem", illustrated: true,
      images: [
        { src: "assets/shop/wa0031-flatlay.webp", alt: "Flat-lay illustration of the camel studded fringe mini skirt" },
        { src: "assets/shop/wa0031-mannequin.webp", alt: "Illustration of the camel studded fringe mini skirt on a display mannequin" }] },
    { id: "WA0034", collection: "shop", category: "dresses-sets", name: "Dark denim tie-waist romper", tag: "Romper", price: 6000, sizes: ["0XL"], stock: null, brand: null, department: null,
      description: "Sleeveless round neck tailored denim romper, fitted waist with side tie and wrap front over shorts, contrast seam stitching", illustrated: true,
      images: [
        { src: "assets/shop/wa0034-flatlay.webp", alt: "Flat-lay illustration of the dark denim tie-waist romper" },
        { src: "assets/shop/wa0034-mannequin.webp", alt: "Illustration of the dark denim tie-waist romper on a display mannequin" }] },
    { id: "WA0035", collection: "shop", category: "dresses-sets", name: "Brown polka-dot V-neck dress", tag: "Dress", price: 5000, sizes: ["Large"], stock: null, brand: null, department: null,
      description: "White small polka dots on brown, V-neck button-front mini dress, short puff sleeves, gathered waist and flared skirt", illustrated: true,
      images: [
        { src: "assets/shop/wa0035-mannequin.webp", alt: "Illustration of the brown polka-dot V-neck dress on a display mannequin" },
        { src: "assets/shop/wa0035-flatlay.webp", alt: "Flat-lay illustration of the brown polka-dot V-neck dress" }] },
    { id: "WA0033", collection: "shop", category: "dresses-sets", name: "Rust botanical flutter-sleeve dress", tag: "Dress", price: 2500, sizes: ["XL"], stock: null, brand: null, department: null,
      description: "Short fit-and-flare dress, cream botanical leaf print on rust orange, high round neckline, flutter cap sleeves, defined waist and flared above-knee skirt", illustrated: true,
      images: [
        { src: "assets/shop/wa0033-flatlay.webp", alt: "Flat-lay illustration of the rust botanical flutter-sleeve dress" },
        { src: "assets/shop/wa0033-mannequin.webp", alt: "Illustration of the rust botanical flutter-sleeve dress on a display mannequin" }] },
    { id: "WA0038", collection: "shop", category: "dresses-sets", name: "Blue floral long-sleeve wrap dress", tag: "Dress", price: 3000, sizes: ["Large"], stock: null, brand: "Old Navy", department: null,
      description: "Short wrap-style V neckline dress, blue white navy large floral print, long softly gathered sleeves with elastic cuffs, gathered waist, flared above-knee hem", illustrated: true,
      images: [
        { src: "assets/shop/wa0038-flatlay.webp", alt: "Flat-lay illustration of the blue floral long-sleeve wrap dress" },
        { src: "assets/shop/wa0038-mannequin.webp", alt: "Illustration of the blue floral long-sleeve wrap dress on a display mannequin" }] },
    { id: "WA0039", collection: "shop", category: "dresses-sets", name: "Royal blue gathered-waist sheath dress", tag: "Dress", price: 6000, sizes: ["Small"], stock: null, brand: "Connected Apparel", department: null,
      description: "Cap sleeves, round neckline with small central triangular keyhole and horizontal gold-tone bar, fitted knee-length silhouette, diagonal gathered twist at side waist and draped front panel", illustrated: true,
      images: [
        { src: "assets/shop/wa0039-flatlay.webp", alt: "Flat-lay illustration of the royal blue gathered-waist sheath dress" },
        { src: "assets/shop/wa0039-mannequin.webp", alt: "Illustration of the royal blue gathered-waist sheath dress on a display mannequin" }] },
    { id: "WA0040", collection: "shop", category: "dresses-sets", name: "Burgundy sunset ombre halter maxi dress", tag: "Dress", price: 6000, sizes: ["Large"], stock: null, brand: null, department: null,
      description: "Halter deep V front, wide fitted waistband, gathered full floor-length skirt, smooth gradient dark burgundy bodice through red to bright orange hem, long matching halter tie tails at open back", illustrated: true,
      images: [
        { src: "assets/shop/wa0040-flatlay.webp", alt: "Flat-lay illustration of the burgundy sunset ombre halter maxi dress" },
        { src: "assets/shop/wa0040-mannequin.webp", alt: "Illustration of the burgundy sunset ombre halter maxi dress on a display mannequin" }] },
    { id: "WA0043", collection: "shop", category: "dresses-sets", name: "Ivory floral sleeveless shift dress", tag: "Dress", price: 5000, sizes: ["Medium"], stock: null, brand: "Old Navy", department: null,
      description: "Sleeveless scoop/square rounded neckline, wide straps, loose above-knee shift, ivory ground scattered small earthy brown yellow lavender floral motifs, gathered top edge", illustrated: true,
      images: [
        { src: "assets/shop/wa0043-flatlay.webp", alt: "Flat-lay illustration of the ivory floral sleeveless shift dress" },
        { src: "assets/shop/wa0043-mannequin.webp", alt: "Illustration of the ivory floral sleeveless shift dress on a display mannequin" }] },
    { id: "WA0046", collection: "shop", category: "dresses-sets", name: "Pink floral puff-sleeve mini dress", tag: "Dress", price: 5000, sizes: ["Medium"], stock: null, brand: "BCBGeneration", department: null,
      description: "Square front neckline and deep square back, pink orange yellow floral print, empire/gathered waist, voluminous long puff sleeves with fitted buttoned cuffs, flared short skirt", illustrated: true,
      images: [
        { src: "assets/shop/wa0046-flatlay.webp", alt: "Flat-lay illustration of the pink floral puff-sleeve mini dress" },
        { src: "assets/shop/wa0046-mannequin.webp", alt: "Illustration of the pink floral puff-sleeve mini dress on a display mannequin" }] },
    { id: "WA0047", collection: "shop", category: "dresses-sets", name: "Navy floral three-quarter-sleeve dress", tag: "Dress", price: 4000, sizes: ["Small"], stock: null, brand: "CeCe", department: null,
      description: "Round neckline, fine scattered multicolor floral on navy, three-quarter gathered cuff sleeves, defined elastic waist, short flared skirt with single ruffle hem, back neckline keyhole", illustrated: true,
      images: [
        { src: "assets/shop/wa0047-flatlay.webp", alt: "Flat-lay illustration of the navy floral three-quarter-sleeve dress" },
        { src: "assets/shop/wa0047-mannequin.webp", alt: "Illustration of the navy floral three-quarter-sleeve dress on a display mannequin" }] },
    { id: "WA0048", collection: "shop", category: "dresses-sets", name: "Black off-shoulder button-front mini dress", tag: "Dress", price: 3000, sizes: ["XL"], stock: null, brand: "Wild Fable", department: null,
      description: "Fitted short black dress, broad folded off-shoulder neckline, long fitted sleeves, small black center-front buttons running from bodice down skirt, short straight hem", illustrated: true,
      images: [
        { src: "assets/shop/wa0048-flatlay.webp", alt: "Flat-lay illustration of the black off-shoulder button-front mini dress" },
        { src: "assets/shop/wa0048-mannequin.webp", alt: "Illustration of the black off-shoulder button-front mini dress on a display mannequin" }] },
    { id: "WA0050", collection: "shop", category: "dresses-sets", name: "Pink floral one-shoulder midi dress", tag: "Dress", price: 6000, sizes: ["Small"], stock: null, brand: "Mango", department: null,
      description: "One shoulder asymmetric neckline, fitted body and ruched side, pink red floral print, flared sheer lightweight midi hem", illustrated: true,
      images: [
        { src: "assets/shop/wa0050-flatlay.webp", alt: "Flat-lay illustration of the pink floral one-shoulder midi dress" },
        { src: "assets/shop/wa0050-mannequin.webp", alt: "Illustration of the pink floral one-shoulder midi dress on a display mannequin" }] },
    { id: "WA0053", collection: "shop", category: "dresses-sets", name: "Chocolate brown ring-halter midi dress", tag: "Dress", price: 7000, sizes: ["Small"], stock: null, brand: "Mango", department: null,
      description: "Chocolate brown sleeveless long midi dress, draped gathered front attached to rigid smooth silver-tone circular collar neckline (part of garment), side cutaways, open upper back, straight softly draped silhouette, lower-calf length", illustrated: true,
      images: [
        { src: "assets/shop/wa0053-flatlay.webp", alt: "Flat-lay illustration of the chocolate brown ring-halter midi dress" },
        { src: "assets/shop/wa0053-mannequin.webp", alt: "Illustration of the chocolate brown ring-halter midi dress on a display mannequin" }] },
    { id: "WA0022", collection: "shop", category: "dresses-sets", name: "Royal blue cutout wrap mini dress", tag: "Dress", price: 5000, sizes: ["XS"], stock: null, brand: "Morgan & Co", department: null,
      description: "Wide straps, sweetheart neckline, small oval horizontal waist cutout, fitted bodice, wrap tulip mini hem", illustrated: true,
      images: [
        { src: "assets/shop/wa0022-flatlay.webp", alt: "Flat-lay illustration of the royal blue cutout wrap mini dress" },
        { src: "assets/shop/wa0022-model.webp", alt: "Illustration of the royal blue cutout wrap mini dress on a model" }] },
    { id: "WA0028", collection: "shop", category: "dresses-sets", name: "Copper satin long-sleeve mini dress", tag: "Dress", price: 6000, sizes: ["Small"], stock: null, brand: "bebe", department: null,
      description: "Deep V neckline, long balloon sleeves with fitted cuffs, fitted short silhouette, subtle jacquard satin sheen, center front button detail", illustrated: true,
      images: [
        { src: "assets/shop/wa0028-flatlay.webp", alt: "Flat-lay illustration of the copper satin long-sleeve mini dress" },
        { src: "assets/shop/wa0028-mannequin.webp", alt: "Illustration of the copper satin long-sleeve mini dress on a display mannequin" }] },
    { id: "WA0036", collection: "shop", category: "dresses-sets", name: "Ivory wildflower flutter-sleeve dress", tag: "Dress", price: 3000, sizes: ["XL"], stock: null, brand: null, department: null,
      description: "Deep V surplice bodice, short flutter sleeves, fitted ruched waist, flared above-knee skirt, delicate vertical wildflower stems in blue red yellow green on ivory", illustrated: true,
      images: [
        { src: "assets/shop/wa0036-flatlay.webp", alt: "Flat-lay illustration of the ivory wildflower flutter-sleeve dress" },
        { src: "assets/shop/wa0036-model.webp", alt: "Illustration of the ivory wildflower flutter-sleeve dress on a model" }] },
    { id: "WA0037", collection: "shop", category: "dresses-sets", name: "Gray striped one-shoulder ruffle dress", tag: "Dress", price: 5000, sizes: ["Small"], stock: null, brand: "Halston Heritage", department: null,
      description: "One-shoulder fitted dress, diagonal broad shoulder ruffle, gray white narrow stripes horizontal across torso and changing direction on asymmetric layered flared ruffle hem ending around knee", illustrated: true,
      images: [
        { src: "assets/shop/wa0037-flatlay.webp", alt: "Flat-lay illustration of the gray striped one-shoulder ruffle dress" },
        { src: "assets/shop/wa0037-model.webp", alt: "Illustration of the gray striped one-shoulder ruffle dress on a model" }] },
    { id: "WA0054", collection: "shop", category: "dresses-sets", name: "Black floral long-sleeve mini dress", tag: "Dress", price: 4000, sizes: ["XS"], stock: null, brand: "CeCe", department: null,
      description: "V neckline, long sheer balloon sleeves with gathered cuffs, small scattered pink red white flowers on black, defined gathered waist, short flared skirt", illustrated: true,
      images: [
        { src: "assets/shop/wa0054-flatlay.webp", alt: "Flat-lay illustration of the black floral long-sleeve mini dress" },
        { src: "assets/shop/wa0054-model.webp", alt: "Illustration of the black floral long-sleeve mini dress on a model" }] },
    { id: "WA0055", collection: "shop", category: "dresses-sets", name: "Light denim button-front maxi dress", tag: "Dress", price: 6000, sizes: ["XL"], stock: null, brand: null, department: null,
      description: "Short sleeves, pointed shirt collar and V front, fitted waist with shaping seams, button front down long straight skirt, front slit from above knee to hem, ankle length", illustrated: true,
      images: [
        { src: "assets/shop/wa0055-flatlay.webp", alt: "Flat-lay illustration of the light denim button-front maxi dress" },
        { src: "assets/shop/wa0055-model.webp", alt: "Illustration of the light denim button-front maxi dress on a model" }] },
    { id: "WA0059", collection: "shop", category: "dresses-sets", name: "Blue paisley V-neck mini dress", tag: "Dress", price: 4000, sizes: ["Medium"], stock: null, brand: "H&M", department: null,
      description: "Loose V-neck short dress, three-quarter flared sleeves, blue white intricate paisley print with decorative border at hem, relaxed flared above-knee skirt", illustrated: true,
      images: [
        { src: "assets/shop/wa0059-flatlay.webp", alt: "Flat-lay illustration of the blue paisley V-neck mini dress" },
        { src: "assets/shop/wa0059-model.webp", alt: "Illustration of the blue paisley V-neck mini dress on a model" }] },
    { id: "WA0062", collection: "shop", category: "dresses-sets", name: "Red cold-shoulder embellished maxi dress", tag: "Dress", price: null, sizes: [], stock: null, brand: null, department: null,
      description: "V neckline, wide shoulder straps connected across cold shoulder cutouts with small silver jeweled hardware, three-quarter sleeves, gathered side waist, floor length straight draped skirt with side slit", illustrated: true,
      images: [
        { src: "assets/shop/wa0062-flatlay.webp", alt: "Flat-lay illustration of the red cold-shoulder embellished maxi dress" },
        { src: "assets/shop/wa0062-model.webp", alt: "Illustration of the red cold-shoulder embellished maxi dress on a model" }] },
    { id: "WA0063", collection: "shop", category: "dresses-sets", name: "Royal blue lace-overlay jumpsuit", tag: "Jumpsuit", price: null, sizes: [], stock: null, brand: null, department: null,
      description: "Full-length wide-leg jumpsuit with asymmetric floral lace overlay draping diagonally from shoulder across torso into long lace panel on one side, one elbow-length lace sleeve and opposite sleeveless shoulder, blue opaque lining, subtle sequins", illustrated: true,
      images: [
        { src: "assets/shop/wa0063-flatlay.webp", alt: "Flat-lay illustration of the royal blue lace-overlay jumpsuit" },
        { src: "assets/shop/wa0063-model.webp", alt: "Illustration of the royal blue lace-overlay jumpsuit on a model" }] },
    { id: "WA0066", collection: "shop", category: "tops", name: "Dark denim strapless corset top", tag: "Top", price: 5500, sizes: ["Medium"], stock: null, brand: null, department: null,
      description: "Strapless dark denim structured corset top, curved slightly pointed upper edge, vertical boning seams with contrast stitching, fitted waist and curved pointed lower hem. Product is TOP ONLY; jeans excluded", note: "Corset top only — jeans shown in photos are not included.", illustrated: true,
      images: [
        { src: "assets/shop/wa0066-flatlay.webp", alt: "Flat-lay illustration of the dark denim strapless corset top" },
        { src: "assets/shop/wa0066-mannequin.webp", alt: "Illustration of the dark denim strapless corset top on a display mannequin" }] },
    { id: "WA0064", collection: "shop", category: "dresses-sets", name: "Black contrast-scarf halter mini dress", tag: "Dress", price: 8000, sizes: ["Small", "XS"], stock: null, brand: null, department: null,
      description: "Black sleeveless short straight shift dress, high halter neckline with broad ivory scarf collar and long ivory fabric tails falling down open back to floor, preserve attached scarf", illustrated: true,
      images: [
        { src: "assets/shop/wa0064-flatlay.webp", alt: "Flat-lay illustration of the black contrast-scarf halter mini dress" },
        { src: "assets/shop/wa0064-model.webp", alt: "Illustration of the black contrast-scarf halter mini dress on a model" }] },
    { id: "WA0077", collection: "shop", category: "dresses-sets", name: "Ivory tiered open-back maxi dress", tag: "Dress", price: 7000, sizes: ["Small"], stock: null, brand: null, department: null,
      description: "Thin spaghetti straps, V neckline, gathered loose flowing floor-length tiered skirt, deeply scooped open back with central decorative gold chain strap, ivory textured lightweight fabric", illustrated: true,
      images: [
        { src: "assets/shop/wa0077-flatlay.webp", alt: "Flat-lay illustration of the ivory tiered open-back maxi dress" },
        { src: "assets/shop/wa0077-model.webp", alt: "Illustration of the ivory tiered open-back maxi dress on a model" }] },
    { id: "WA0078-green", collection: "shop", category: "dresses-sets", name: "Green side-cutout maxi dress", tag: "Dress", price: 8000, sizes: ["12"], stock: null, brand: null, department: null,
      description: "Sleeveless asymmetrical high neckline with narrow strap on one shoulder, fitted gathered stretch maxi dress with large round cutout on one waist side, straight ankle-length hem, exact lime green version at left", illustrated: true,
      images: [
        { src: "assets/shop/wa0078-green-flatlay.webp", alt: "Flat-lay illustration of the green side-cutout maxi dress" },
        { src: "assets/shop/wa0078-green-model.webp", alt: "Illustration of the green side-cutout maxi dress on a model" }] },
    { id: "WA0078-beige", collection: "shop", category: "dresses-sets", name: "Beige side-cutout maxi dress", tag: "Dress", price: 8000, sizes: ["Medium"], stock: null, brand: "PrettyLittleThing", department: null,
      description: "Sleeveless asymmetrical high neckline with narrow strap on one shoulder, fitted gathered stretch maxi dress with large round cutout on one waist side, straight ankle-length hem, exact beige version at right", illustrated: true,
      images: [
        { src: "assets/shop/wa0078-beige-flatlay.webp", alt: "Flat-lay illustration of the beige side-cutout maxi dress" },
        { src: "assets/shop/wa0078-beige-mannequin.webp", alt: "Illustration of the beige side-cutout maxi dress on a display mannequin" }] },
    { id: "WA0080", collection: "shop", category: "dresses-sets", name: "Black sculpted cutout ruched midi dress", tag: "Dress", price: 8000, sizes: ["Medium"], stock: null, brand: "Fashion Nova", department: null,
      description: "Strapless structured sculpted neckline with deep central open plunge to horizontal underbust band, tall curved bodice side panels, fully ruched fitted black midi skirt below knees, preserve construction and coverage", illustrated: true,
      images: [
        { src: "assets/shop/wa0080-flatlay.webp", alt: "Flat-lay illustration of the black sculpted cutout ruched midi dress" },
        { src: "assets/shop/wa0080-mannequin.webp", alt: "Illustration of the black sculpted cutout ruched midi dress on a display mannequin" }] },
    { id: "WA0081", collection: "shop", category: "dresses-sets", name: "Black lace corset midi dress", tag: "Dress", price: 8000, sizes: ["XL"], stock: null, brand: "Fashion Nova", department: null,
      description: "Thin spaghetti straps, scalloped sweetheart corset bodice, black floral lace over nude lining, fitted knee-length pencil skirt with scalloped lace hem, defined waist and vertical corset seams", illustrated: true,
      images: [
        { src: "assets/shop/wa0081-flatlay.webp", alt: "Flat-lay illustration of the black lace corset midi dress" },
        { src: "assets/shop/wa0081-mannequin.webp", alt: "Illustration of the black lace corset midi dress on a display mannequin" }] },
    { id: "WA0083", collection: "shop", category: "dresses-sets", name: "Sage gathered-neck maxi dress", tag: "Dress", price: 6000, sizes: ["14"], stock: null, brand: "Anne Klein", department: null,
      description: "High gathered halter neckline with narrow shoulder ties, sleeveless flowing column maxi silhouette, side slit near lower leg, soft sage green fabric", illustrated: true,
      images: [
        { src: "assets/shop/wa0083-flatlay.webp", alt: "Flat-lay illustration of the sage gathered-neck maxi dress" },
        { src: "assets/shop/wa0083-model.webp", alt: "Illustration of the sage gathered-neck maxi dress on a model" }] },
    { id: "WA0084", collection: "shop", category: "dresses-sets", name: "Ivory pearl-trim long-sleeve dress", tag: "Dress", price: 8000, sizes: ["Medium"], stock: null, brand: null, department: null,
      description: "Round neckline outlined with small pearl beads, teardrop center keyhole with pearl button, long slightly flared bell sleeves with pearl trimmed cuffs, fitted above-knee straight skirt pearl trimmed hem", illustrated: true,
      images: [
        { src: "assets/shop/wa0084-flatlay.webp", alt: "Flat-lay illustration of the ivory pearl-trim long-sleeve dress" },
        { src: "assets/shop/wa0084-model.webp", alt: "Illustration of the ivory pearl-trim long-sleeve dress on a model" }] },
    { id: "WA0086", collection: "shop", category: "dresses-sets", name: "Pink floral applique mini dress", tag: "Dress", price: 6000, sizes: ["Small"], stock: null, brand: null, department: null,
      description: "Thin pale pink spaghetti straps, straight neckline, fitted short dress with small horizontal waist cutout, colorful floral embroidery/appliques over pale pink base, flowers purple orange burgundy cream yellow with green stems, preserve texture", illustrated: true,
      images: [
        { src: "assets/shop/wa0086-flatlay.webp", alt: "Flat-lay illustration of the pink floral applique mini dress" },
        { src: "assets/shop/wa0086-model.webp", alt: "Illustration of the pink floral applique mini dress on a model" }] },
    { id: "WA0087", collection: "shop", category: "dresses-sets", name: "White strapless wide-leg jumpsuit", tag: "Jumpsuit", price: 8000, sizes: ["Medium"], stock: null, brand: null, department: null,
      description: "Strapless structured bodice with central deep notched V and gold-tone edge hardware, fitted waist, long wide straight trouser legs, white opaque fabric, no jewelry", illustrated: true,
      images: [
        { src: "assets/shop/wa0087-flatlay.webp", alt: "Flat-lay illustration of the white strapless wide-leg jumpsuit" },
        { src: "assets/shop/wa0087-model.webp", alt: "Illustration of the white strapless wide-leg jumpsuit on a model" }] },
    { id: "WA0088", collection: "shop", category: "dresses-sets", name: "Gray plaid buckle-pocket shirt dress", tag: "Dress", price: 5000, sizes: ["XL"], stock: null, brand: "MSK", department: null,
      description: "Pointed shirt collar, front buttons, three-quarter sleeves, fitted short straight skirt, gray black fine glen plaid, two large front patch pockets with broad flap tabs and circular silver-tone buckles", illustrated: true,
      images: [
        { src: "assets/shop/wa0088-flatlay.webp", alt: "Flat-lay illustration of the gray plaid buckle-pocket shirt dress" },
        { src: "assets/shop/wa0088-model.webp", alt: "Illustration of the gray plaid buckle-pocket shirt dress on a model" }] },
    { id: "WA0092", collection: "shop", category: "dresses-sets", name: "White crochet-trim lace mini dress", tag: "Dress", price: 7500, sizes: ["Medium"], stock: null, brand: null, department: null,
      description: "High round crochet neckline, sleeveless with crochet ruffled armhole trim, fitted lace bodice and skirt with narrow openwork waist band, scalloped crochet hem above knee", illustrated: true,
      images: [
        { src: "assets/shop/wa0092-flatlay.webp", alt: "Flat-lay illustration of the white crochet-trim lace mini dress" },
        { src: "assets/shop/wa0092-model.webp", alt: "Illustration of the white crochet-trim lace mini dress on a model" }] },
    { id: "WA0098", collection: "shop", category: "tops", name: "Black floral corset top", tag: "Top", price: 5500, sizes: ["Small"], stock: null, brand: null, department: null,
      description: "Strapless black corset top ONLY, scalloped floral lace upper edge, semi-sheer floral lace panels and structured vertical boning, fitted waist and pointed curved lower hem. Black skirt is excluded", note: "Corset top only — trousers shown on the model are not included.", illustrated: true,
      images: [
        { src: "assets/shop/wa0098-flatlay.webp", alt: "Flat-lay illustration of the black floral corset top" },
        { src: "assets/shop/wa0098-model.webp", alt: "Illustration of the black floral corset top on a model" }] },
    { id: "WA0103", collection: "shop", category: "dresses-sets", name: "White halter lace fit-and-flare dress", tag: "Dress", price: 8000, sizes: ["XS"], stock: null, brand: null, department: null,
      description: "White textured floral lace halter dress with deep V neckline, fitted waist, flared tea-length midi skirt, lace-up corset back with white ribbon and broad white bow at nape", illustrated: true,
      images: [
        { src: "assets/shop/wa0103-flatlay.webp", alt: "Flat-lay illustration of the white halter lace fit-and-flare dress" },
        { src: "assets/shop/wa0103-mannequin.webp", alt: "Illustration of the white halter lace fit-and-flare dress on a display mannequin" }] },
    { id: "WA0104", collection: "shop", category: "dresses-sets", name: "White puff-sleeve jacquard ruffle dress", tag: "Dress", price: 7500, sizes: ["Small", "Large"], stock: null, brand: null, department: null,
      description: "Round neckline, short puff sleeves, fitted white floral textured jacquard dress, shaped waist, short flared ruffle hem below knee", illustrated: true,
      images: [
        { src: "assets/shop/wa0104-flatlay.webp", alt: "Flat-lay illustration of the white puff-sleeve jacquard ruffle dress" },
        { src: "assets/shop/wa0104-model.webp", alt: "Illustration of the white puff-sleeve jacquard ruffle dress on a model" }] },
    { id: "WA0105", collection: "shop", category: "dresses-sets", name: "Ivory one-shoulder open-back gown", tag: "Dress", price: 8000, sizes: ["Small", "Medium"], stock: null, brand: null, department: null,
      description: "One-shoulder ivory floor-length fitted mermaid gown, diagonal asymmetric neckline, thin additional back strap, low open cowl back, smooth satin-like fabric and softly flared long hem", illustrated: true,
      images: [
        { src: "assets/shop/wa0105-flatlay.webp", alt: "Flat-lay illustration of the ivory one-shoulder open-back gown" },
        { src: "assets/shop/wa0105-model.webp", alt: "Illustration of the ivory one-shoulder open-back gown on a model" }] },
    { id: "WA0109", collection: "shop", category: "dresses-sets", name: "White pleated halter maxi dress", tag: "Dress", price: 7500, sizes: ["Small"], stock: null, brand: null, department: null,
      description: "White loose flowing pleated full-length maxi dress, gathered high halter neckline tied behind neck, thin string down open back, low gathered back waist and voluminous pleated skirt", illustrated: true,
      images: [
        { src: "assets/shop/wa0109-flatlay.webp", alt: "Flat-lay illustration of the white pleated halter maxi dress" },
        { src: "assets/shop/wa0109-model.webp", alt: "Illustration of the white pleated halter maxi dress on a model" }] },
    { id: "WA0110", collection: "shop", category: "dresses-sets", name: "Taupe cowl-neck open-back jumpsuit", tag: "Jumpsuit", price: 7500, sizes: ["XS"], stock: null, brand: null, department: null,
      description: "Taupe sleeveless full-length wide-leg jumpsuit, deeply draped cowl front neckline, halter neck strap, open back to waist, fitted waist and loose wide trouser legs", illustrated: true,
      images: [
        { src: "assets/shop/wa0110-flatlay.webp", alt: "Flat-lay illustration of the taupe cowl-neck open-back jumpsuit" },
        { src: "assets/shop/wa0110-mannequin.webp", alt: "Illustration of the taupe cowl-neck open-back jumpsuit on a display mannequin" }] },
    { id: "WA0128", collection: "shop", category: "dresses-sets", name: "Dark blue floral wide-leg jumpsuit", tag: "Jumpsuit", price: 5000, sizes: ["0XL"], stock: null, brand: null, department: null,
      description: "Dark blue denim-look fabric (not denim), one-shoulder asymmetric neckline, colorful floral and butterfly motifs concentrated at bodice and wide-leg hems, fitted waist full length", illustrated: true,
      images: [
        { src: "assets/shop/wa0128-flatlay.webp", alt: "Flat-lay illustration of the dark blue floral wide-leg jumpsuit" },
        { src: "assets/shop/wa0128-model.webp", alt: "Illustration of the dark blue floral wide-leg jumpsuit on a model" }] },
    { id: "WA0211", collection: "shop", category: "dresses-sets", name: "Pink diagonal-striped belted midi dress", tag: "Dress", price: 4000, sizes: ["XL"], stock: null, brand: null, department: null,
      description: "Sleeveless round neckline relaxed midi dress, bold diagonal stripes pink magenta white and olive, thin matching fabric waist tie, flared calf-length skirt", illustrated: true,
      images: [
        { src: "assets/shop/wa0211-flatlay.webp", alt: "Flat-lay illustration of the pink diagonal-striped belted midi dress" },
        { src: "assets/shop/wa0211-model.webp", alt: "Illustration of the pink diagonal-striped belted midi dress on a model" }] },
    { id: "WA0213", collection: "shop", category: "dresses-sets", name: "Beige dotted long-sleeve midi dress", tag: "Dress", price: 6500, sizes: ["Medium"], stock: null, brand: "Fashion Nova", department: null,
      description: "Beige fitted long-sleeve midi dress with regular small white dotted grid pattern, round neckline, broad V open back, fitted waist and skirt, small back hem slit, opaque beige lining beneath sheer-effect patterned outer fabric", illustrated: true,
      images: [
        { src: "assets/shop/wa0213-flatlay.webp", alt: "Flat-lay illustration of the beige dotted long-sleeve midi dress" },
        { src: "assets/shop/wa0213-model.webp", alt: "Illustration of the beige dotted long-sleeve midi dress on a model" }] },
    { id: "WA0067", collection: "shop", category: "sleepwear", name: "White red-heart short pajama set", tag: "Pajama set", price: 6000, sizes: ["XS"], stock: null, brand: null, department: "Women",
      description: "Short sleeve notched collar button shirt and matching elastic-waist shorts. Red small hearts on white subtly textured dotted fabric, red piping on collar placket chest pocket cuffs shorts hems.", includes: ["Pajama shirt", "Matching shorts"], illustrated: true,
      images: [
        { src: "assets/shop/wa0067-flatlay.webp", alt: "Flat-lay illustration of the white red-heart short pajama set" },
        { src: "assets/shop/wa0067-model.webp", alt: "Illustration of the white red-heart short pajama set on a model" }] },
    { id: "WA0068", collection: "shop", category: "sleepwear", name: "Burgundy short-sleeve long pajama set", tag: "Men's · Pajama set", price: 6000, sizes: ["Medium"], stock: null, brand: null, department: "Men",
      description: "Burgundy satin-like short sleeve notched collar button shirt with chest pocket, white fine piping, matching relaxed full-length straight trousers.", includes: ["Pajama shirt", "Matching trousers"], illustrated: true,
      images: [
        { src: "assets/shop/wa0068-flatlay.webp", alt: "Flat-lay illustration of the burgundy short-sleeve long pajama set" },
        { src: "assets/shop/wa0068-model.webp", alt: "Illustration of the burgundy short-sleeve long pajama set on a model" }] },
    { id: "WA0069", collection: "shop", category: "sleepwear", name: "Red heart-pocket long pajama set", tag: "Pajama set", price: 5500, sizes: ["Small", "Medium"], stock: null, brand: null, department: "Women",
      description: "Matte red short sleeve button shirt notched collar white piping, white outlined heart beneath chest pocket, matching relaxed full-length trousers with white piping at hems.", includes: ["Pajama shirt", "Matching trousers"], illustrated: true,
      images: [
        { src: "assets/shop/wa0069-flatlay.webp", alt: "Flat-lay illustration of the red heart-pocket long pajama set" },
        { src: "assets/shop/wa0069-model.webp", alt: "Illustration of the red heart-pocket long pajama set on a model" }] },
    { id: "WA0071-women", collection: "shop", category: "sleepwear", name: "Women's Christmas print pajama set", tag: "Pajama set", price: 5500, sizes: ["Small", "Medium"], stock: null, brand: null, department: "Women",
      description: "Women's ivory long-sleeve notched collar button pajama shirt and matching full-length relaxed trousers, red piping at collar placket pocket cuffs and hems, scattered Santa Claus reindeer sleigh Christmas tree snowflake motifs. Only women's set, no socks or headband.", includes: ["Pajama shirt", "Matching trousers"], illustrated: true,
      images: [
        { src: "assets/shop/wa0071-women-flatlay.webp", alt: "Flat-lay illustration of the women's Christmas print pajama set" },
        { src: "assets/shop/wa0071-women-model.webp", alt: "Illustration of the women's Christmas print pajama set on a model" }] },
    { id: "WA0071-men", collection: "shop", category: "sleepwear", name: "Men's Christmas print pajama set", tag: "Men's · Pajama set", price: 6000, sizes: ["Medium", "Large"], stock: null, brand: null, department: "Men",
      description: "Men's ivory long-sleeve notched collar button pajama shirt and matching full-length relaxed trousers, red piping at collar placket pocket cuffs and hems, scattered Santa Claus reindeer sleigh Christmas tree snowflake motifs. Only men's set, no socks.", includes: ["Pajama shirt", "Matching trousers"], illustrated: true,
      images: [
        { src: "assets/shop/wa0071-men-flatlay.webp", alt: "Flat-lay illustration of the men's Christmas print pajama set" },
        { src: "assets/shop/wa0071-men-model.webp", alt: "Illustration of the men's Christmas print pajama set on a model" }] },
    { id: "WA0072", collection: "shop", category: "sleepwear", name: "White bow-print long pajama set", tag: "Pajama set", price: 5500, sizes: ["Small"], stock: null, brand: null, department: "Women",
      description: "White subtle crinkle texture long-sleeve button pajama shirt and relaxed long trousers. Small burgundy bows and tiny dark green holiday botanical motifs, wide burgundy piping at notched collar placket pocket cuffs and hems.", includes: ["Pajama shirt", "Matching trousers"], illustrated: true,
      images: [
        { src: "assets/shop/wa0072-flatlay.webp", alt: "Flat-lay illustration of the white bow-print long pajama set" },
        { src: "assets/shop/wa0072-model.webp", alt: "Illustration of the white bow-print long pajama set on a model" }] },
    { id: "WA0073", collection: "shop", category: "sleepwear", name: "Pale blue gingerbread short pajama set", tag: "Pajama set", price: 5000, sizes: ["Small"], stock: null, brand: null, department: "Women",
      description: "Pale blue gingham short sleeve button notched collar shirt and matching shorts, gingerbread people green Christmas trees red candy canes pink bows, white piping at collar pocket placket sleeve and shorts cuffs.", includes: ["Pajama shirt", "Matching shorts"], illustrated: true,
      images: [
        { src: "assets/shop/wa0073-flatlay.webp", alt: "Flat-lay illustration of the pale blue gingerbread short pajama set" },
        { src: "assets/shop/wa0073-model.webp", alt: "Illustration of the pale blue gingerbread short pajama set on a model" }] },
    { id: "WA0074", collection: "shop", category: "sleepwear", name: "Red bow-print ruffle pajama set", tag: "Pajama set", price: 5500, sizes: ["XS"], stock: null, brand: null, department: "Women",
      description: "Red ribbed textured pajama shirt short sleeves with ruffled sleeve edges and ruffled notched collar, button front and chest pocket, scattered tiny pale pink bows, matching relaxed full-length red bow-print trousers.", includes: ["Pajama shirt", "Matching trousers"], illustrated: true,
      images: [
        { src: "assets/shop/wa0074-flatlay.webp", alt: "Flat-lay illustration of the red bow-print ruffle pajama set" },
        { src: "assets/shop/wa0074-model.webp", alt: "Illustration of the red bow-print ruffle pajama set on a model" }] },
    { id: "WA0075", collection: "shop", category: "sleepwear", name: "Dark brown festive-print long pajama set", tag: "Pajama set", price: 5500, sizes: ["Medium"], stock: null, brand: null, department: "Women",
      description: "Dark chocolate brown long-sleeve notched collar button shirt and relaxed full-length trousers, cream piping at collar placket pocket cuffs and hems, scattered small festive teddy bear or Santa motifs.", includes: ["Pajama shirt", "Matching trousers"], illustrated: true,
      images: [
        { src: "assets/shop/wa0075-flatlay.webp", alt: "Flat-lay illustration of the dark brown festive-print long pajama set" },
        { src: "assets/shop/wa0075-model.webp", alt: "Illustration of the dark brown festive-print long pajama set on a model" }] },
    { id: "WA0076", collection: "shop", category: "sleepwear", name: "Red teddy-pocket long pajama set", tag: "Pajama set", price: 5500, sizes: ["Small"], stock: null, brand: null, department: "Women",
      description: "Solid deep red satin-like long-sleeve notched collar button pajama shirt with fine gold piping and teddy bear motif on chest pocket, matching relaxed full-length red trousers gold piped cuffs.", includes: ["Pajama shirt", "Matching trousers"], illustrated: true,
      images: [
        { src: "assets/shop/wa0076-flatlay.webp", alt: "Flat-lay illustration of the red teddy-pocket long pajama set" },
        { src: "assets/shop/wa0076-model.webp", alt: "Illustration of the red teddy-pocket long pajama set on a model" }] },
    { id: "WA0091", collection: "shop", category: "sleepwear", name: "Burgundy piped short pajama set", tag: "Pajama set", price: 5000, sizes: ["Medium"], stock: null, brand: null, department: "Women",
      description: "Glossy burgundy satin-like short sleeve notched collar button shirt chest pocket with white piping, matching elastic-waist shorts with white piping at hems.", includes: ["Pajama shirt", "Matching shorts"], illustrated: true,
      images: [
        { src: "assets/shop/wa0091-flatlay.webp", alt: "Flat-lay illustration of the burgundy piped short pajama set" },
        { src: "assets/shop/wa0091-model.webp", alt: "Illustration of the burgundy piped short pajama set on a model" }] },
    { id: "WA0120", collection: "shop", category: "bottoms", name: "Deep teal straight-leg trousers", tag: "Trousers", price: 3500, sizes: ["14"], stock: null, brand: null, department: "Women",
      description: "High waist deep teal tailored full-length straight-leg trousers, belt loops flat waistband concealed fly slanted front pockets clean narrow straight hems.", illustrated: true,
      images: [
        { src: "assets/shop/wa0120-flatlay.webp", alt: "Flat-lay illustration of the deep teal straight-leg trousers" },
        { src: "assets/shop/wa0120-model.webp", alt: "Illustration of the deep teal straight-leg trousers on a model" }] },
    { id: "WA0133", collection: "shop", category: "bottoms", name: "Powder blue pleated wide-leg trousers", tag: "Trousers", price: 3000, sizes: ["XL"], stock: null, brand: null, department: "Women",
      description: "High waist powder blue tailored trousers, belt loops flat waistband front pleats slanted pockets, very wide full-length legs.", illustrated: true,
      images: [
        { src: "assets/shop/wa0133-flatlay.webp", alt: "Flat-lay illustration of the powder blue pleated wide-leg trousers" },
        { src: "assets/shop/wa0133-model.webp", alt: "Illustration of the powder blue pleated wide-leg trousers on a model" }] },
    { id: "WA0152", collection: "shop", category: "bottoms", name: "Mauve striped wide-leg trousers", tag: "Trousers", price: 4000, sizes: ["XL"], stock: null, brand: null, department: "Women",
      description: "Elastic waist loose full-length wide-leg pants, horizontal dusty pink mauve lavender cream and dark brown stripes. Pants ONLY, exclude matching cropped top.", illustrated: true,
      images: [
        { src: "assets/shop/wa0152-flatlay.webp", alt: "Flat-lay illustration of the mauve striped wide-leg trousers" },
        { src: "assets/shop/wa0152-model.webp", alt: "Illustration of the mauve striped wide-leg trousers on a model" }] },
    { id: "WA0154", collection: "shop", category: "bottoms", name: "Light blue elastic-waist wide-leg jeans", tag: "Jeans", price: null, sizes: [], stock: null, brand: null, department: "Women",
      description: "Light wash blue full-length very wide-leg jeans, gathered elastic waistband, center back yoke, two large rectangular back patch pockets, contrasting stitching. Back view is supplied: use back view for modeled photo to show known design; do not invent front closure.", illustrated: true,
      images: [
        { src: "assets/shop/wa0154-flatlay.webp", alt: "Flat-lay illustration of the light blue elastic-waist wide-leg jeans" },
        { src: "assets/shop/wa0154-model.webp", alt: "Illustration of the light blue elastic-waist wide-leg jeans on a model" }] },
    { id: "WA0155", collection: "shop", category: "bottoms", name: "Green gingham wide-leg trousers", tag: "Trousers", price: 2500, sizes: ["4XL"], stock: null, brand: null, department: "Women",
      description: "Green white small gingham check elastic waist trousers with center matching drawstring, loose full-length wide legs, casual relaxed fit.", illustrated: true,
      images: [
        { src: "assets/shop/wa0155-flatlay.webp", alt: "Flat-lay illustration of the green gingham wide-leg trousers" },
        { src: "assets/shop/wa0155-model.webp", alt: "Illustration of the green gingham wide-leg trousers on a model" }] },
    { id: "WA0158", collection: "shop", category: "bottoms", name: "Dark blue elastic-waist wide-leg jeans", tag: "Jeans", price: null, sizes: [], stock: null, brand: null, department: "Women",
      description: "Dark medium wash blue full-length wide-leg jeans, gathered elastic waistband, back yoke, two back patch pockets, contrasting golden stitching. Photos show the back view.", illustrated: true,
      images: [
        { src: "assets/shop/wa0158-flatlay.webp", alt: "Flat-lay illustration of the dark blue elastic-waist wide-leg jeans" },
        { src: "assets/shop/wa0158-model.webp", alt: "Illustration of the dark blue elastic-waist wide-leg jeans on a model" }] },
    { id: "WA0159", collection: "shop", category: "bottoms", name: "Light blue distressed wide-leg jeans", tag: "Jeans", price: 6000, sizes: ["1XL"], stock: null, brand: null, department: "Women",
      description: "High-waist light blue wide-leg full-length jeans, belt loops button fly curved front pockets, one horizontal ripped frayed opening at each knee, broad hems.", illustrated: true,
      images: [
        { src: "assets/shop/wa0159-flatlay.webp", alt: "Flat-lay illustration of the light blue distressed wide-leg jeans" },
        { src: "assets/shop/wa0159-model.webp", alt: "Illustration of the light blue distressed wide-leg jeans on a model" }] },
    { id: "WA0161", collection: "shop", category: "bottoms", name: "Blue drawstring quilted-pocket jeans", tag: "Jeans", price: 5500, sizes: ["XL"], stock: null, brand: null, department: "Women",
      description: "Dark medium blue full-length wide-leg jeans gathered elastic high waist with long matching drawstring, large front patch pockets with multiple horizontal stitched padded-looking rows and vertical seams, golden contrast stitching.", illustrated: true,
      images: [
        { src: "assets/shop/wa0161-flatlay.webp", alt: "Flat-lay illustration of the blue drawstring quilted-pocket jeans" },
        { src: "assets/shop/wa0161-model.webp", alt: "Illustration of the blue drawstring quilted-pocket jeans on a model" }] },
    { id: "WA0178", collection: "shop", category: "bottoms", name: "Olive relaxed wide-leg trousers", tag: "Trousers", price: 2500, sizes: ["XL"], stock: null, brand: null, department: "Women",
      description: "Olive green relaxed full-length very wide-leg trousers, gathered elastic waistband, soft matte woven texture. Pants only, exclude matching long sleeve top.", note: "Trousers only — the top shown is for styling.", illustrated: true,
      images: [
        { src: "assets/shop/wa0178-flatlay.webp", alt: "Flat-lay illustration of the olive relaxed wide-leg trousers" },
        { src: "assets/shop/wa0178-model.webp", alt: "Illustration of the olive relaxed wide-leg trousers on a model" }] },
    { id: "WA0209", collection: "shop", category: "bottoms", name: "Fashion Nova light-wash straight-leg jeans", tag: "Jeans", price: 7000, sizes: ["16"], stock: null, brand: "Fashion Nova", department: "Women",
      description: "Light acid-wash high-waist blue jeans, button zip fly belt loops classic five-pocket design, slim relaxed straight full-length legs hemmed at ankle. Jeans only exclude crochet top.", illustrated: true,
      images: [
        { src: "assets/shop/wa0209-flatlay.webp", alt: "Flat-lay illustration of the fashion Nova light-wash straight-leg jeans" },
        { src: "assets/shop/wa0209-model.webp", alt: "Illustration of the fashion Nova light-wash straight-leg jeans on a model" }] },
    { id: "WA0025", collection: "shop", category: "tops", name: "Old Navy navy floral tie-front peplum top", tag: "Top", price: 4000, sizes: ["Large"], stock: null, brand: "Old Navy", department: "Women",
      description: "Navy camisole with small colorful flowers and berries, thin adjustable straps sweetheart neckline gathered front bust center tie and small keyhole, empire waist peplum flared hem, smocked back.", illustrated: true,
      images: [
        { src: "assets/shop/wa0025-flatlay.webp", alt: "Flat-lay illustration of the old Navy navy floral tie-front peplum top" },
        { src: "assets/shop/wa0025-model.webp", alt: "Illustration of the old Navy navy floral tie-front peplum top on a model" }] },
    { id: "WA0085", collection: "shop", category: "tops", name: "No Boundaries ivory tie-front camisole", tag: "Top", price: 3000, sizes: ["XXL"], stock: null, brand: "No Boundaries", department: "Women",
      description: "Ivory sheer crinkled textured camisole thin spaghetti straps, ruched bust with center drawstring bow small keyhole, empire waist loose flared peplum hem translucent lower panel.", illustrated: true,
      images: [
        { src: "assets/shop/wa0085-flatlay.webp", alt: "Flat-lay illustration of the no Boundaries ivory tie-front camisole" },
        { src: "assets/shop/wa0085-model.webp", alt: "Illustration of the no Boundaries ivory tie-front camisole on a model" }] },
    { id: "WA0094", collection: "shop", category: "tops", name: "Black lace beaded-strap corset top", tag: "Top", price: 5500, sizes: ["XS"], stock: null, brand: null, department: "Women",
      description: "Black sheer embroidered oval floral geometric lace structured corset, sweetheart scalloped neckline, vertical boning shaped waist scalloped lower hem, thin black spaghetti straps with amber brown beads near front attachments. Back laces with black ribbon through metal eyelets, long ribbon ends tied near bottom.", illustrated: true,
      images: [
        { src: "assets/shop/wa0094-flatlay.webp", alt: "Flat-lay illustration of the black lace beaded-strap corset top" },
        { src: "assets/shop/wa0094-mannequin.webp", alt: "Illustration of the black lace beaded-strap corset top on a display mannequin" }] },
    { id: "WA0096", collection: "shop", category: "tops", name: "Blue lace sweetheart corset top", tag: "Top", price: 5500, sizes: ["Medium"], stock: null, brand: null, department: "Women",
      description: "Blue embroidered oval floral geometric lace corset, strapless sweetheart scalloped top edge, structured vertical boning fitted waist and scalloped lower hem, sheer lace panels.", illustrated: true,
      images: [
        { src: "assets/shop/wa0096-flatlay.webp", alt: "Flat-lay illustration of the blue lace sweetheart corset top" },
        { src: "assets/shop/wa0096-mannequin.webp", alt: "Illustration of the blue lace sweetheart corset top on a display mannequin" }] },
    { id: "WA0125", collection: "shop", category: "tops", name: "Cream pink-floral ruffle-cuff blouse", tag: "Top", price: 2500, sizes: ["XL"], stock: null, brand: null, department: "Women",
      description: "Cream blouse with scattered delicate pink floral sprigs, round neckline relaxed fit, long loose sleeves gathered at wrists and flared small ruffle cuffs, gently curved hip-length hem.", illustrated: true,
      images: [
        { src: "assets/shop/wa0125-flatlay.webp", alt: "Flat-lay illustration of the cream pink-floral ruffle-cuff blouse" },
        { src: "assets/shop/wa0125-model.webp", alt: "Illustration of the cream pink-floral ruffle-cuff blouse on a model" }] },
    { id: "WA0136", collection: "shop", category: "tops", name: "Black white-polka-dot notch-neck blouse", tag: "Top", price: 2500, sizes: ["LX"], stock: null, brand: null, department: "Women",
      description: "Black loose blouse regular small white polka dots, split V notch neckline with short stand collar, three-quarter sleeves and curved hip-length hem.", illustrated: true,
      images: [
        { src: "assets/shop/wa0136-flatlay.webp", alt: "Flat-lay illustration of the black white-polka-dot notch-neck blouse" },
        { src: "assets/shop/wa0136-model.webp", alt: "Illustration of the black white-polka-dot notch-neck blouse on a model" }] },
    { id: "WA0149", collection: "shop", category: "tops", name: "Royal blue ruffle-front blouse", tag: "Top", price: 2500, sizes: ["1XL"], stock: null, brand: null, department: "Women",
      description: "Royal blue blouse relaxed fit, ruffled V neckline with ruffle extending down center front, long loose balloon sleeves gathered elastic cuffs, hip-length hem.", illustrated: true,
      images: [
        { src: "assets/shop/wa0149-flatlay.webp", alt: "Flat-lay illustration of the royal blue ruffle-front blouse" },
        { src: "assets/shop/wa0149-model.webp", alt: "Illustration of the royal blue ruffle-front blouse on a model" }] },
    { id: "WA0156", collection: "shop", category: "tops", name: "Red ruffle-front blouse", tag: "Top", price: 2500, sizes: ["1XL"], stock: null, brand: null, department: "Women",
      description: "Red blouse relaxed fit, ruffled V neckline with ruffle extending down center front, long loose balloon sleeves gathered cuffs, hip-length hem.", illustrated: true,
      images: [
        { src: "assets/shop/wa0156-flatlay.webp", alt: "Flat-lay illustration of the red ruffle-front blouse" },
        { src: "assets/shop/wa0156-model.webp", alt: "Illustration of the red ruffle-front blouse on a model" }] },
    { id: "WA0163", collection: "shop", category: "tops", name: "Rust tie-neck balloon-sleeve blouse", tag: "Top", price: 3000, sizes: ["0XL"], stock: null, brand: null, department: "Women",
      description: "Rust orange subtly crinkled woven blouse loose fit, gathered round split neckline with long matching ties tied loose bow, long balloon sleeves gathered elastic cuffs, hip-length hem.", illustrated: true,
      images: [
        { src: "assets/shop/wa0163-flatlay.webp", alt: "Flat-lay illustration of the rust tie-neck balloon-sleeve blouse" },
        { src: "assets/shop/wa0163-model.webp", alt: "Illustration of the rust tie-neck balloon-sleeve blouse on a model" }] },
    { id: "WA0019", collection: "shop", category: "bottoms", name: "Navy tie-waist Bermuda shorts", tag: "Shorts", price: 2500, sizes: ["Small"], stock: null, brand: "Karen Scott", department: "Women",
      description: "Navy knee-length Bermuda shorts, matching fabric tie at front waist, side pockets relaxed straight leg hem. Shorts only.", illustrated: true,
      images: [
        { src: "assets/shop/wa0019-flatlay.webp", alt: "Flat-lay illustration of the navy tie-waist Bermuda shorts" },
        { src: "assets/shop/wa0019-model.webp", alt: "Illustration of the navy tie-waist Bermuda shorts on a model" }] },
    { id: "WA0045", collection: "shop", category: "bottoms", name: "H&M black gold-button mini skirt", tag: "Skirt", price: 6000, sizes: ["18"], stock: null, brand: "H&M", department: "Women",
      description: "Black textured woven mini skirt, straight fitted cut, four embossed gold buttons in two vertical rows on overlapping front panel, belt loops, two short horizontal welt details near hips.", illustrated: true,
      images: [
        { src: "assets/shop/wa0045-flatlay.webp", alt: "Flat-lay illustration of the h&M black gold-button mini skirt" },
        { src: "assets/shop/wa0045-model.webp", alt: "Illustration of the h&M black gold-button mini skirt on a model" }] },
    { id: "WA0057", collection: "shop", category: "bottoms", name: "A New Day navy seashell-print skort", tag: "Skort", price: 4000, sizes: ["12"], stock: null, brand: "A New Day", department: "Women",
      description: "Navy short A-line wrap-front skort, white scattered seashell starfish coral and jellyfish print, asymmetric overlapping front panels, integrated shorts beneath. Keep connected, one item.", illustrated: true,
      images: [
        { src: "assets/shop/wa0057-flatlay.webp", alt: "Flat-lay illustration of the a New Day navy seashell-print skort" },
        { src: "assets/shop/wa0057-model.webp", alt: "Illustration of the a New Day navy seashell-print skort on a model" }] },
    { id: "WA0058", collection: "shop", category: "bottoms", name: "H&M navy plaid pleated mini skirt", tag: "Skirt", price: 4000, sizes: ["18"], stock: null, brand: "H&M", department: "Women",
      description: "Navy tartan plaid mini skirt broad cream gray checks fine red lines, flat waistband, crisp wide pleats around skirt, above-knee hem.", illustrated: true,
      images: [
        { src: "assets/shop/wa0058-flatlay.webp", alt: "Flat-lay illustration of the h&M navy plaid pleated mini skirt" },
        { src: "assets/shop/wa0058-model.webp", alt: "Illustration of the h&M navy plaid pleated mini skirt on a model" }] },
    { id: "WA0112", collection: "shop", category: "bottoms", name: "Blue cargo swim shorts", tag: "Men's · Shorts", price: 2800, sizes: [], stock: null, brand: "Champion", department: "Men",
      description: "Bright blue mid-thigh swim shorts, elastic waistband straight hem side pockets and cargo flap pocket on left outer thigh, small Champion logo near lower leg as shown.", illustrated: true,
      images: [
        { src: "assets/shop/wa0112-flatlay.webp", alt: "Flat-lay illustration of the blue cargo swim shorts" },
        { src: "assets/shop/wa0112-model.webp", alt: "Illustration of the blue cargo swim shorts on a model" }] },
    { id: "WA0113", collection: "shop", category: "bottoms", name: "Beige cargo shorts", tag: "Men's · Shorts", price: 2800, sizes: [], stock: null, brand: "Champion", department: "Men",
      description: "Beige mid-thigh shorts elastic waist side pockets and rectangular cargo flap pocket on outer left thigh, small Champion logo near lower leg as shown.", illustrated: true,
      images: [
        { src: "assets/shop/wa0113-flatlay.webp", alt: "Flat-lay illustration of the beige cargo shorts" },
        { src: "assets/shop/wa0113-model.webp", alt: "Illustration of the beige cargo shorts on a model" }] },
    { id: "WA0116", collection: "shop", category: "bottoms", name: "Khaki pleated wide-leg trousers", tag: "Trousers", price: 3000, sizes: ["XL"], stock: null, brand: null, department: "Women",
      description: "Khaki high-waist tailored trousers, belt loops flat waistband front pleats concealed fly slanted side pockets, very wide long legs ankle-length hem.", illustrated: true,
      images: [
        { src: "assets/shop/wa0116-flatlay.webp", alt: "Flat-lay illustration of the khaki pleated wide-leg trousers" },
        { src: "assets/shop/wa0116-model.webp", alt: "Illustration of the khaki pleated wide-leg trousers on a model" }] },
    { id: "WA0117", collection: "shop", category: "bottoms", name: "Dusty pink pleated wide-leg trousers", tag: "Trousers", price: 3000, sizes: ["XL"], stock: null, brand: null, department: "Women",
      description: "Dusty pink high-waist tailored trousers, flat waistband belt loops front pleats concealed fly slanted pockets, very wide ankle-length legs.", illustrated: true,
      images: [
        { src: "assets/shop/wa0117-flatlay.webp", alt: "Flat-lay illustration of the dusty pink pleated wide-leg trousers" },
        { src: "assets/shop/wa0117-model.webp", alt: "Illustration of the dusty pink pleated wide-leg trousers on a model" }] },
    { id: "WA0137", collection: "shop", category: "sleepwear", name: "Hanes black boxer briefs", tag: "Men's · Underwear", price: 1000, sizes: ["XL"], stock: null, brand: "Hanes", department: "Men",
      description: "Single pair black mid-thigh fitted boxer briefs, gray elastic waistband with original white HANES repeated branding, plain black body center front pouch seams.", note: "Price is per pair.", illustrated: true,
      images: [
        { src: "assets/shop/wa0137-flatlay.webp", alt: "Flat-lay illustration of the hanes black boxer briefs" },
        { src: "assets/shop/wa0137-mannequin.webp", alt: "Illustration of the hanes black boxer briefs on a display mannequin" }] },
    { id: "WA0210", collection: "shop", category: "bottoms", name: "Blue contrast-trim running shorts", tag: "Shorts", price: 1500, sizes: [], stock: null, brand: null, department: "Women",
      description: "One pair royal blue athletic running shorts, elastic waistband with blue drawstring, black side inserts, white contrast piping tracing curved side and dolphin hem.", illustrated: true,
      images: [
        { src: "assets/shop/wa0210-flatlay.webp", alt: "Flat-lay illustration of the blue contrast-trim running shorts" },
        { src: "assets/shop/wa0210-model.webp", alt: "Illustration of the blue contrast-trim running shorts on a model" }] },
    { id: "WA0082", collection: "shop", category: "dresses-sets", name: "White sleeveless tailored mini dress", tag: "Dress", price: 8000, sizes: ["Small", "Medium"], stock: null, brand: null, department: "Women",
      description: "White fitted sleeveless mini dress, high round boat-like neckline, wide shoulder coverage, princess shaping seams, clean above-knee straight hem.", illustrated: true,
      images: [
        { src: "assets/shop/wa0082-flatlay.webp", alt: "Flat-lay illustration of the white sleeveless tailored mini dress" },
        { src: "assets/shop/wa0082-model.webp", alt: "Illustration of the white sleeveless tailored mini dress on a model" }] },
    { id: "WA0097", collection: "shop", category: "dresses-sets", name: "White and black bow-back halter mini dress", tag: "Dress", price: 8000, sizes: ["Small"], stock: null, brand: null, department: "Women",
      description: "White fitted mini shift dress with contrasting broad black halter neck framing front, deep open back framed black panels and oversized black bow tied at back waist, straight above-knee hem. Preserve bow attached to dress.", illustrated: true,
      images: [
        { src: "assets/shop/wa0097-model.webp", alt: "Illustration of the white and black bow-back halter mini dress on a model" }] },
    { id: "WA0099", collection: "shop", category: "dresses-sets", name: "White gold-button vest and trouser set", tag: "Matching set", price: 9500, sizes: ["Medium"], stock: null, brand: null, department: "Women",
      description: "Two-piece white strapless tailored vest and long wide-leg trousers. Vest asymmetric pointed top and pointed split front hem, four gold curved teardrop buttons down front, fitted waist. Matching white high-waist wide-leg full-length trousers.", includes: ["Matching top", "Matching trousers"], illustrated: true,
      images: [
        { src: "assets/shop/wa0099-flatlay.webp", alt: "Flat-lay illustration of the white gold-button vest and trouser set" },
        { src: "assets/shop/wa0099-model.webp", alt: "Illustration of the white gold-button vest and trouser set on a model" }] },
    { id: "WA0102", collection: "shop", category: "dresses-sets", name: "Black lace-up open-back jumpsuit", tag: "Jumpsuit", price: 6000, sizes: ["Medium"], stock: null, brand: null, department: "Women",
      description: "Glossy black fitted sleeveless jumpsuit, thin halter straps plunging shaped sweetheart neckline center lace-up front with black ties, fitted waist narrow full-length legs, very open back and crossing thin back straps.", illustrated: true,
      images: [
        { src: "assets/shop/wa0102-flatlay.webp", alt: "Flat-lay illustration of the black lace-up open-back jumpsuit" },
        { src: "assets/shop/wa0102-mannequin.webp", alt: "Illustration of the black lace-up open-back jumpsuit on a display mannequin" }] },
    { id: "WA0121", collection: "shop", category: "dresses-sets", name: "Camouflage halter wide-leg jumpsuit", tag: "Jumpsuit", price: 5000, sizes: ["XL"], stock: null, brand: null, department: "Women",
      description: "Olive green dark brown black cream large camouflage pattern, gathered high halter neck sleeveless full-length very wide-leg jumpsuit fitted natural waist.", illustrated: true,
      images: [
        { src: "assets/shop/wa0121-flatlay.webp", alt: "Flat-lay illustration of the camouflage halter wide-leg jumpsuit" },
        { src: "assets/shop/wa0121-model.webp", alt: "Illustration of the camouflage halter wide-leg jumpsuit on a model" }] },
    { id: "WA0124", collection: "shop", category: "dresses-sets", name: "Pink ornamental-print blouse and trouser set", tag: "Matching set", price: null, sizes: ["L"], stock: null, brand: null, department: "Women",
      description: "Two-piece dusty pink long sleeve relaxed tunic blouse and wide-leg full-length pants. Intricate burgundy cream ornamental ethnic-style geometric paisley borders, vertical chest stripe panel, wide hem bands and cuff bands, scattered small medallions.", includes: ["Matching top", "Matching trousers"], illustrated: true,
      images: [
        { src: "assets/shop/wa0124-flatlay.webp", alt: "Flat-lay illustration of the pink ornamental-print blouse and trouser set" },
        { src: "assets/shop/wa0124-model.webp", alt: "Illustration of the pink ornamental-print blouse and trouser set on a model" }] },
    { id: "WA0129", collection: "shop", category: "dresses-sets", name: "Cream floral blouse and red trouser set", tag: "Matching set", price: 5500, sizes: ["Large"], stock: null, brand: null, department: "Women",
      description: "Cream long sleeve loose blouse round split notch neck, symmetrical muted pink roses and sage leaves along front opening and cuffs, ornate border curved hem. Matching deep red full-length wide-leg pants, large pink rose sprays above ornate cream floral hem bands.", includes: ["Matching top", "Matching trousers"], illustrated: true,
      images: [
        { src: "assets/shop/wa0129-flatlay.webp", alt: "Flat-lay illustration of the cream floral blouse and red trouser set" },
        { src: "assets/shop/wa0129-model.webp", alt: "Illustration of the cream floral blouse and red trouser set on a model" }] },
    { id: "WA0130", collection: "shop", category: "dresses-sets", name: "Orange floral blouse and trouser set", tag: "Matching set", price: 5500, sizes: ["Large"], stock: null, brand: null, department: "Women",
      description: "Two-piece orange long sleeve loose blouse round split notch neckline with elaborate symmetrical cream floral bib embroidery-print and narrow dark border; matching wide-leg full-length orange trousers with allover cream flowers and elaborate ornate border hems.", includes: ["Matching top", "Matching trousers"], illustrated: true,
      images: [
        { src: "assets/shop/wa0130-flatlay.webp", alt: "Flat-lay illustration of the orange floral blouse and trouser set" },
        { src: "assets/shop/wa0130-model.webp", alt: "Illustration of the orange floral blouse and trouser set on a model" }] },
    { id: "WA0135", collection: "shop", category: "dresses-sets", name: "Purple oversized-flower shift dress", tag: "Dress", price: 2500, sizes: ["0XL"], stock: null, brand: null, department: "Women",
      description: "Purple loose above-knee shift dress round neckline flutter ruffle cap sleeves. Large flat graphic five-petal flowers in pink red yellow green lavender teal sweeping diagonally across lower skirt, plain upper bodice.", illustrated: true,
      images: [
        { src: "assets/shop/wa0135-flatlay.webp", alt: "Flat-lay illustration of the purple oversized-flower shift dress" },
        { src: "assets/shop/wa0135-model.webp", alt: "Illustration of the purple oversized-flower shift dress on a model" }] },
    { id: "WA0146", collection: "shop", category: "dresses-sets", name: "Multicolor floral halter mini dress", tag: "Dress", price: 5000, sizes: ["2"], stock: null, brand: null, department: "Women",
      description: "Sleeveless loose A-line above-knee mini dress, gathered high halter-style stand neckline, dense small colorful blue orange yellow green floral botanical print on dark background, subtle semi-sheer outer overlay with lining.", illustrated: true,
      images: [
        { src: "assets/shop/wa0146-flatlay.webp", alt: "Flat-lay illustration of the multicolor floral halter mini dress" },
        { src: "assets/shop/wa0146-model.webp", alt: "Illustration of the multicolor floral halter mini dress on a model" }] },

    /* ---------- Shoes & Footwear (added Nov 2026; no prices or sizes supplied yet) ---------- */
    { id: "fw-heart-flip-flops", collection: "shop", category: "shoes", name: "Black heart-print flip-flops", tag: "Flip-flops", price: null, sizes: [], stock: null, brand: null, department: null,
      description: "Black flip-flops with glossy black thong straps and a footbed printed with coral, teal and mustard hearts.", illustrated: true,
      images: [
        { src: "assets/shop/fw-heart-flip-flops-pair.webp", alt: "Pair of black heart-print flip-flops" },
        { src: "assets/shop/fw-heart-flip-flops-on-foot.webp", alt: "Black heart-print flip-flops shown on feet" }] },
    { id: "fw-tan-cross-strap-sandals", collection: "shop", category: "shoes", name: "Tan cross-strap sandals", tag: "Sandals", price: null, sizes: [], stock: null, brand: null, department: null,
      description: "Tan open-toe sandals with a wide front band, crossed elastic straps, slingback heel strap, cork-look midsole and white ridged outsole.", illustrated: true,
      images: [
        { src: "assets/shop/fw-tan-cross-strap-sandals-pair.webp", alt: "Pair of tan cross-strap sandals" },
        { src: "assets/shop/fw-tan-cross-strap-sandals-on-foot.webp", alt: "Tan cross-strap sandals shown on feet" }] },
    { id: "fw-black-platform-slides", collection: "shop", category: "shoes", name: "Black platform slides", tag: "Slides", price: null, sizes: [], stock: null, brand: null, department: null,
      description: "Black slides with one wide matte upper band and a chunky curved platform sole.", illustrated: true,
      images: [
        { src: "assets/shop/fw-black-platform-slides-pair.webp", alt: "Pair of black platform slides" },
        { src: "assets/shop/fw-black-platform-slides-on-foot.webp", alt: "Black platform slides shown on feet" }] },
    { id: "fw-pink-stripe-paisley-flip-flops", collection: "shop", category: "shoes", name: "Pink stripe & paisley flip-flops", tag: "Flip-flops", price: null, sizes: [], stock: null, brand: null, department: null,
      description: "Black flip-flops with glossy black thong straps; footbed printed with hot-pink stripes and yellow, orange and green paisley florals.", illustrated: true,
      images: [
        { src: "assets/shop/fw-pink-stripe-paisley-flip-flops-pair.webp", alt: "Pair of pink stripe and paisley flip-flops" },
        { src: "assets/shop/fw-pink-stripe-paisley-flip-flops-on-foot.webp", alt: "Pink stripe and paisley flip-flops shown on feet" }] },
    { id: "fw-rhinestone-slingback-sandals", collection: "shop", category: "shoes", name: "Black rhinestone slingback sandals", tag: "Sandals", price: null, sizes: [], stock: null, brand: null, department: null,
      description: "Flat black sandals with a wide rhinestone-studded front band, rhinestone-trimmed footbed edge and slim glossy black slingback strap.", illustrated: true,
      images: [
        { src: "assets/shop/fw-rhinestone-slingback-sandals-pair.webp", alt: "Pair of black rhinestone slingback sandals" },
        { src: "assets/shop/fw-rhinestone-slingback-sandals-on-foot.webp", alt: "Black rhinestone slingback sandals shown on feet" }] },
    { id: "fw-blue-speckle-flip-flops", collection: "shop", category: "shoes", name: "Blue speckle fade flip-flops", tag: "Flip-flops", price: null, sizes: [], stock: null, brand: null, department: null,
      description: "Flip-flops with black thong straps; footbed fades from blue and white speckles at the heel to solid black at the toe.", illustrated: true,
      images: [
        { src: "assets/shop/fw-blue-speckle-flip-flops-pair.webp", alt: "Pair of blue speckle fade flip-flops" },
        { src: "assets/shop/fw-blue-speckle-flip-flops-on-foot.webp", alt: "Blue speckle fade flip-flops shown on feet" }] },
    { id: "fw-light-blue-platform-slides", collection: "shop", category: "shoes", name: "Light blue platform slides", tag: "Slides", price: null, sizes: [], stock: null, brand: null, department: null,
      description: "Light blue one-piece slides with a wide rounded upper and a thick cushioned platform sole.", illustrated: true,
      images: [
        { src: "assets/shop/fw-light-blue-platform-slides-pair.webp", alt: "Pair of light blue platform slides" },
        { src: "assets/shop/fw-light-blue-platform-slides-on-foot.webp", alt: "Light blue platform slides shown on feet" }] },
    { id: "fw-pink-platform-slides", collection: "shop", category: "shoes", name: "Pink platform slides", tag: "Slides", price: null, sizes: [], stock: null, brand: null, department: null,
      description: "Bubblegum pink one-piece slides with a wide upper, contoured footbed and chunky curved platform sole.", illustrated: true,
      images: [
        { src: "assets/shop/fw-pink-platform-slides-pair.webp", alt: "Pair of pink platform slides" },
        { src: "assets/shop/fw-pink-platform-slides-on-foot.webp", alt: "Pink platform slides shown on feet" }] },
    { id: "fw-retro-print-flip-flops", collection: "shop", category: "shoes", name: "Retro print flip-flops", tag: "Flip-flops", price: null, sizes: [], stock: null, brand: null, department: null,
      description: "Black flip-flops with glossy black thong straps; footbed printed with a retro pink, lime and butter-yellow pattern of stripes, waves and teardrops.", illustrated: true,
      images: [
        { src: "assets/shop/fw-retro-print-flip-flops-pair.webp", alt: "Pair of retro print flip-flops" },
        { src: "assets/shop/fw-retro-print-flip-flops-on-foot.webp", alt: "Retro print flip-flops shown on feet" }] },
    { id: "fw-denim-cut-out-slides", collection: "shop", category: "shoes", name: "Denim cut-out slides", tag: "Slides", price: null, sizes: [], stock: null, brand: null, department: null,
      description: "Flat slides with a dark denim cut-out upper band with frayed edges, on a tan footbed with white contrast stitching.", illustrated: true,
      images: [
        { src: "assets/shop/fw-denim-cut-out-slides-pair.webp", alt: "Pair of denim cut-out slides" },
        { src: "assets/shop/fw-denim-cut-out-slides-on-foot.webp", alt: "Denim cut-out slides shown on feet" }] }
  ]
};
