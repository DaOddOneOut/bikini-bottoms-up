/* Bikini Bottoms Up — shared storefront script for index.html and shop.html.
   Product data: catalog.js · Store settings: config.js */
(function () {
  "use strict";

  var CATALOG = window.BBU_CATALOG || { categories: {}, products: [] };
  var CONFIG = window.BBU_CONFIG || {};
  var PRODUCTS = CATALOG.products || [];
  var PAGE = document.body.getAttribute("data-collection") || "swim";
  var BAG_KEY = "bbu-bag-v3";
  var OLD_BAG_KEYS = ["bbu-catalog-bag-v2"];
  var MAX_QTY = 99;

  /* ---------- helpers ---------- */
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function money(n) { return "GYD " + Number(n).toLocaleString("en-US"); }
  function byId(id) { for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i]; return null; }
  function hasPrice(p) { return typeof p.price === "number" && isFinite(p.price) && p.price >= 0; }
  // sizeless: true marks items that need no size choice (bags, wallets). Their bag entries use size "".
  function needsSize(p) { return !p.sizeless; }
  function sizeOk(p, s) { return needsSize(p) ? !!p.sizes && p.sizes.indexOf(s) !== -1 : s === ""; }
  function canBuy(p) { return hasPrice(p) && (!needsSize(p) || (p.sizes && p.sizes.length > 0)) && p.stock !== 0; }
  function maxQty(p) { return typeof p.stock === "number" && p.stock > 0 ? Math.min(MAX_QTY, p.stock) : MAX_QTY; }
  function priceText(p) { return hasPrice(p) ? money(p.price) : "Price to be confirmed"; }
  function sizeText(p) {
    if (!needsSize(p)) return p.pieces > 1 ? "Set of " + p.pieces + " pieces" : "One piece";
    var sold = p.soldSizes && p.soldSizes.length ? p.soldSizes.join(", ") + " sold out" : "";
    var word = p.department === "Youth" ? "Youth size" : "Size";
    if (!p.sizes || !p.sizes.length) return sold ? word + " " + sold : "Size to be confirmed";
    return word + (p.sizes.length > 1 ? "s: " : ": ") + p.sizes.join(", ") + (sold ? " · " + sold : "");
  }
  function stockText(p) {
    if (p.stock === 0) return "Sold out";
    if (typeof p.stock === "number") return p.stock + " in stock";
    return "";
  }
  function showBrand(p) { return p.brand && p.name.toLowerCase().indexOf(p.brand.toLowerCase()) !== 0; }
  function deptText(p) { return p.department === "Men" ? "Men’s" : p.department === "Women" ? "Women’s" : p.department === "Youth" ? "Kids’" : ""; }
  // Shop departments. Items without a department count as Women's (the store is mainly women's).
  var DEPTS = [{ id: "women", label: "Women" }, { id: "men", label: "Men" }, { id: "kids", label: "Kids" }];
  function deptKey(p) { return p.department === "Men" ? "men" : p.department === "Youth" ? "kids" : "women"; }
  function plural(n, word) { return n + " " + word + (n === 1 ? "" : "s"); }
  function categoriesFor(collection) { return (CATALOG.categories && CATALOG.categories[collection]) || []; }
  function productsFor(collection) { return PRODUCTS.filter(function (p) { return p.collection === collection; }); }
  function whatsappNumber() {
    var n = String(CONFIG.whatsappNumber || "").replace(/\D/g, "");
    return /^\d{7,15}$/.test(n) ? n : "";
  }
  function whatsappLink(text) {
    var n = whatsappNumber();
    return n ? "https://wa.me/" + n + (text ? "?text=" + encodeURIComponent(text) : "") : "";
  }
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- live announcements for screen readers ---------- */
  var live = document.createElement("div");
  live.className = "visually-hidden";
  live.setAttribute("role", "status");
  live.setAttribute("aria-live", "polite");
  document.body.appendChild(live);
  function announce(msg) { live.textContent = ""; setTimeout(function () { live.textContent = msg; }, 30); }

  /* ---------- shared bag (localStorage, works across both pages and tabs) ---------- */
  var bag = [];
  function cleanBag(items) {
    if (!Array.isArray(items)) return [];
    var out = [];
    items.forEach(function (i) {
      if (!i || typeof i.id !== "string" || typeof i.size !== "string") return;
      var p = byId(i.id);
      if (!p || !canBuy(p) || !sizeOk(p, i.size)) return;
      var qty = Math.floor(Number(i.qty));
      if (!(qty > 0)) return;
      var existing = out.filter(function (o) { return o.id === i.id && o.size === i.size; })[0];
      if (existing) existing.qty = Math.min(maxQty(p), existing.qty + qty);
      else out.push({ id: i.id, size: i.size, qty: Math.min(maxQty(p), qty) });
    });
    return out;
  }
  function loadBag() {
    var raw = null;
    try {
      raw = localStorage.getItem(BAG_KEY);
      if (raw === null) {
        for (var k = 0; k < OLD_BAG_KEYS.length && raw === null; k++) raw = localStorage.getItem(OLD_BAG_KEYS[k]);
      }
    } catch (e) { /* storage unavailable (private mode etc.) — bag lives for this page only */ }
    try { bag = cleanBag(JSON.parse(raw || "[]")); } catch (e) { bag = []; }
  }
  function bagCount() { return bag.reduce(function (s, i) { return s + i.qty; }, 0); }
  function bagSubtotal() { return bag.reduce(function (s, i) { return s + byId(i.id).price * i.qty; }, 0); }
  function updateBagCount() {
    var n = bagCount();
    $$("[data-bag-count]").forEach(function (el) { el.textContent = n; });
    $$("[data-bag-count-text]").forEach(function (el) { el.textContent = ", " + plural(n, "item"); });
  }
  function saveBag() {
    try { localStorage.setItem(BAG_KEY, JSON.stringify(bag)); } catch (e) { /* ignore */ }
    updateBagCount();
  }
  function addToBag(id, size) {
    var p = byId(id);
    if (!p || !canBuy(p) || !sizeOk(p, size)) return false;
    var item = bag.filter(function (i) { return i.id === id && i.size === size; })[0];
    if (item) {
      if (item.qty >= maxQty(p)) { announce("You already have the maximum available of " + p.name + " in your bag."); return false; }
      item.qty += 1;
    } else bag.push({ id: id, size: size, qty: 1 });
    saveBag();
    announce("Added " + p.name + (size ? ", size " + size : "") + ", to your bag. " + plural(bagCount(), "item") + " in bag.");
    return true;
  }

  /* ---------- product grid + category filters ---------- */
  var grid = $("[data-products]");
  var filtersEl = $("[data-filters]");
  var countEl = $("[data-result-count]");
  var emptyEl = $("[data-empty]");
  var currentFilter = "all";
  var deptsEl = $("[data-depts]");
  function deptFromHash() {
    var h = (location.hash || "").replace("#", "").toLowerCase();
    return DEPTS.some(function (d) { return d.id === h; }) ? h : "all";
  }
  var currentDept = PAGE === "shop" ? deptFromHash() : "all";

  function controlsHtml(p, context) {
    if (!canBuy(p)) {
      var reason = p.stock === 0 ? "Sold out" : "Details to be confirmed";
      return context === "card"
        ? '<button type="button" class="btn-secondary" data-gallery="' + esc(p.id) + '">View photos</button><span class="unavailable">' + reason + "</span>"
        : '<p class="unavailable">' + reason + " — can’t be added to the bag yet.</p>";
    }
    var sid = "size-" + context + "-" + p.id;
    if (!needsSize(p)) return '<input type="hidden" data-size-for="' + esc(p.id) + '" value=""><button type="button" class="btn-add" data-add="' + esc(p.id) + '">Add to bag<span class="visually-hidden">: ' + esc(p.name) + "</span></button>";
    var sizeField = p.sizes.length > 1
      ? '<label class="size-field"><span class="visually-hidden">Size for ' + esc(p.name) + '</span><select id="' + esc(sid) + '" data-size-for="' + esc(p.id) + '"><option value="">Size</option>' +
        p.sizes.map(function (s) { return '<option value="' + esc(s) + '">' + esc(s) + "</option>"; }).join("") + "</select></label>"
      : '<input type="hidden" data-size-for="' + esc(p.id) + '" value="' + esc(p.sizes[0]) + '">';
    return sizeField + '<button type="button" class="btn-add" data-add="' + esc(p.id) + '">Add to bag<span class="visually-hidden">: ' + esc(p.name) + (p.sizes.length === 1 ? ", size " + esc(p.sizes[0]) : "") + "</span></button>";
  }

  function cardHtml(p) {
    var img = p.images[0];
    var n = p.images.length;
    var stock = stockText(p);
    return '<article class="card" data-id="' + esc(p.id) + '">' +
      '<button type="button" class="card-media" data-gallery="' + esc(p.id) + '" aria-label="View ' + esc(plural(n, "photo")) + " of " + esc(p.name) + '">' +
        '<img src="' + esc(img.src) + '" alt="' + esc(img.alt) + '" loading="lazy" decoding="async" width="600" height="800">' +
        '<span class="card-tag' + (p.category === "top" || p.tag === "Top only" ? " card-tag-alert" : "") + '">' + esc(p.tag) + "</span>" +
        (n > 1 ? '<span class="card-count" aria-hidden="true">' + n + " photos</span>" : "") +
      "</button>" +
      '<div class="card-body">' +
        (showBrand(p) ? '<p class="card-brand">' + esc(p.brand) + "</p>" : "") +
        "<h3>" + esc(p.name) + "</h3>" +
        '<p class="card-price' + (hasPrice(p) ? "" : " tbc") + '">' + esc(priceText(p)) + "</p>" +
        '<p class="card-meta' + (!needsSize(p) || (p.sizes && p.sizes.length) ? "" : " tbc") + '">' + esc(sizeText(p)) + (stock ? " · " + esc(stock) : "") + "</p>" +
        (p.note ? '<p class="card-note">' + esc(p.note) + "</p>" : "") +
        '<div class="card-controls">' + controlsHtml(p, "card") + "</div>" +
      "</div></article>";
  }

  function renderFilters(items) {
    if (!filtersEl) return;
    var cats = categoriesFor(PAGE).filter(function (c) {
      return items.some(function (p) { return p.category === c.id; });
    });
    if (!items.length) { filtersEl.hidden = true; filtersEl.innerHTML = ""; return; }
    filtersEl.hidden = false;
    var allLabel = PAGE === "shop" ? "All items" : "All swimwear";
    var buttons = [{ id: "all", label: allLabel, n: items.length }].concat(cats.map(function (c) {
      return { id: c.id, label: c.label, n: items.filter(function (p) { return p.category === c.id; }).length };
    }));
    if (!buttons.some(function (b) { return b.id === currentFilter; })) currentFilter = "all";
    filtersEl.innerHTML = buttons.map(function (b) {
      return '<button type="button" class="chip" data-filter="' + esc(b.id) + '" aria-pressed="' + (b.id === currentFilter) + '">' +
        esc(b.label) + ' <span class="chip-count" aria-hidden="true">' + b.n + '</span><span class="visually-hidden"> (' + b.n + ")</span></button>";
    }).join("");
  }

  function renderEmpty() {
    if (!emptyEl) return;
    var other = PAGE === "shop"
      ? '<a class="button" href="index.html#shop">Shop Swimwear <span aria-hidden="true">→</span></a>'
      : '<a class="button" href="shop.html">Clothing &amp; Accessories <span aria-hidden="true">→</span></a>';
    var wa = whatsappLink("Hi Bikini Bottoms Up! I'd like to ask about your Clothing & Accessories collection.");
    emptyEl.innerHTML =
      '<p class="eyebrow">' + (PAGE === "shop" ? "Arriving soon" : "Nothing here yet") + "</p>" +
      "<h3>" + (PAGE === "shop" ? "The Clothing &amp; Accessories collection is on its way." : "New swimwear is on its way.") + "</h3>" +
      "<p>" + (PAGE === "shop"
        ? "Tops, bottoms, dresses, footwear, bags and accessories will appear here as soon as they’re photographed and priced. In the meantime, the swimwear collection is ready to browse."
        : "Check back soon.") + "</p>" +
      '<div class="empty-actions">' + other + (wa ? '<a class="button button-ghost" href="' + esc(wa) + '" target="_blank" rel="noopener">Ask us on WhatsApp</a>' : "") + "</div>";
  }

  function renderDepts(items) {
    if (!deptsEl) return;
    var present = DEPTS.filter(function (d) { return items.some(function (p) { return deptKey(p) === d.id; }); });
    deptsEl.hidden = present.length < 2;
    if (deptsEl.hidden) { currentDept = "all"; return; }
    if (currentDept !== "all" && !present.some(function (d) { return d.id === currentDept; })) currentDept = "all";
    var tabs = [{ id: "all", label: "All", n: items.length }].concat(present.map(function (d) {
      return { id: d.id, label: d.label, n: items.filter(function (p) { return deptKey(p) === d.id; }).length };
    }));
    deptsEl.innerHTML = tabs.map(function (t) {
      return '<button type="button" class="dept-tab" data-dept="' + t.id + '" aria-pressed="' + (t.id === currentDept) + '">' + esc(t.label) +
        '<span class="chip-count" aria-hidden="true">' + t.n + '</span><span class="visually-hidden"> (' + t.n + ")</span></button>";
    }).join("");
  }
  function updateNavCurrent() {
    if (PAGE !== "shop") return;
    $$("[data-dept-link]").forEach(function (a) {
      var on = currentDept === "all" ? a.getAttribute("data-dept-link") === "women" : a.getAttribute("data-dept-link") === currentDept;
      if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
  }

  function renderProducts() {
    if (!grid) return;
    var all = productsFor(PAGE);
    renderDepts(all);
    updateNavCurrent();
    var items = currentDept === "all" ? all : all.filter(function (p) { return deptKey(p) === currentDept; });
    renderFilters(items);
    if (!items.length) {
      grid.innerHTML = "";
      grid.hidden = true;
      if (countEl) countEl.textContent = "";
      renderEmpty();
      emptyEl.hidden = false;
      return;
    }
    grid.hidden = false;
    if (emptyEl) emptyEl.hidden = true;
    var shown = items.filter(function (p) { return currentFilter === "all" || p.category === currentFilter; });
    grid.innerHTML = shown.map(cardHtml).join("");
    var deptLabel = currentDept === "all" ? "" : " · " + DEPTS.filter(function (d) { return d.id === currentDept; })[0].label;
    if (countEl) countEl.textContent = "Showing " + plural(shown.length, PAGE === "shop" ? "item" : "style") + deptLabel;
  }

  if (filtersEl) filtersEl.addEventListener("click", function (e) {
    var b = e.target.closest("[data-filter]");
    if (!b) return;
    currentFilter = b.getAttribute("data-filter");
    renderProducts();
    var again = $('[data-filter="' + currentFilter + '"]', filtersEl);
    if (again) again.focus();
  });

  if (deptsEl) deptsEl.addEventListener("click", function (e) {
    var b = e.target.closest("[data-dept]");
    if (!b) return;
    currentDept = b.getAttribute("data-dept");
    currentFilter = "all";
    try { history.replaceState(null, "", currentDept === "all" ? location.pathname + location.search : "#" + currentDept); } catch (err) { /* ignore */ }
    renderProducts();
    var again = $('[data-dept="' + currentDept + '"]', deptsEl);
    if (again) again.focus();
  });
  if (PAGE === "shop") window.addEventListener("hashchange", function () {
    currentDept = deptFromHash();
    currentFilter = "all";
    renderProducts();
    var sec = $("#shop");
    if (sec && currentDept !== "all") sec.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  });

  function handleAdd(button, root) {
    var id = button.getAttribute("data-add");
    var field = $('[data-size-for="' + id + '"]', root);
    var size = field ? field.value : "";
    var prod = byId(id);
    if (!size && prod && needsSize(prod)) {
      if (field && field.tagName === "SELECT") {
        field.setCustomValidity("Please choose a size.");
        field.reportValidity();
        field.addEventListener("change", function clear() { field.setCustomValidity(""); field.removeEventListener("change", clear); });
      }
      return;
    }
    if (addToBag(id, size)) {
      var label = button.firstChild;
      button.classList.add("added");
      label.nodeValue = "Added ✓";
      setTimeout(function () { button.classList.remove("added"); label.nodeValue = "Add to bag"; }, 1400);
    }
  }

  if (grid) grid.addEventListener("click", function (e) {
    var g = e.target.closest("[data-gallery]");
    if (g) { openGallery(g.getAttribute("data-gallery"), g); return; }
    var a = e.target.closest("[data-add]");
    if (a) handleAdd(a, a.closest(".card"));
  });

  /* ---------- dialogs ---------- */
  function makeDialog(id, labelId, inner) {
    var d = document.createElement("dialog");
    d.id = id;
    d.className = "sheet " + id;
    d.setAttribute("aria-labelledby", labelId);
    d.innerHTML = inner;
    document.body.appendChild(d);
    // close when the backdrop (outside the panel) is clicked
    d.addEventListener("click", function (e) {
      if (e.target !== d) return;
      var r = d.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close();
    });
    return d;
  }
  function openDialog(d) {
    if (typeof d.showModal === "function") { if (!d.open) d.showModal(); }
    else d.setAttribute("open", "");
    document.documentElement.classList.add("dialog-open");
  }
  function onDialogClose() { if (!$("dialog[open]")) document.documentElement.classList.remove("dialog-open"); }

  /* ---------- gallery (touch swipe, arrow keys, thumbnails) ---------- */
  var gallery = makeDialog("gallery", "galleryTitle",
    '<div class="sheet-head"><div><p class="eyebrow" id="galleryTag"></p><h2 id="galleryTitle"></h2></div>' +
    '<button type="button" class="close" data-close aria-label="Close photos">×</button></div>' +
    '<div class="sheet-body">' +
      '<div class="gallery-stage" id="galleryStage">' +
        '<img id="galleryImage" alt="">' +
        '<span class="gallery-badge" id="galleryBadge" hidden>AI visualization</span>' +
        '<button type="button" class="gallery-arrow prev" id="galleryPrev" aria-label="Previous photo">‹</button>' +
        '<button type="button" class="gallery-arrow next" id="galleryNext" aria-label="Next photo">›</button>' +
      "</div>" +
      '<p class="gallery-position" id="galleryPosition" aria-live="polite"></p>' +
      '<div class="gallery-thumbs" id="galleryThumbs" role="group" aria-label="Choose a photo"></div>' +
      '<div class="gallery-details" id="galleryDetails"></div>' +
    "</div>");
  var gProduct = null, gIndex = 0;

  function renderGallery(focusThumb) {
    var p = gProduct, n = p.images.length, img = p.images[gIndex];
    $("#galleryTitle").textContent = p.name;
    $("#galleryTag").textContent = p.tag || "";
    var el = $("#galleryImage");
    el.src = img.src;
    el.alt = img.alt;
    $("#galleryBadge").hidden = !img.ai;
    $("#galleryPosition").textContent = (n > 1 ? "Photo " + (gIndex + 1) + " of " + n : "1 photo") + (img.ai ? " · AI visualization" : "");
    $("#galleryPrev").hidden = $("#galleryNext").hidden = n < 2;
    var thumbs = $("#galleryThumbs");
    thumbs.hidden = n < 2;
    thumbs.innerHTML = p.images.map(function (im, i) {
      return '<button type="button" data-photo="' + i + '"' + (i === gIndex ? ' aria-current="true"' : "") + ' aria-label="Photo ' + (i + 1) + " of " + n + ": " + esc(im.alt) + (im.ai ? " (AI visualization)" : "") + '"><img src="' + esc(im.src) + '" alt="" loading="lazy"></button>';
    }).join("");
    if (focusThumb) { var t = $('[data-photo="' + gIndex + '"]', thumbs); if (t) t.focus(); }
    var stock = stockText(p);
    $("#galleryDetails").innerHTML =
      '<p class="gallery-price' + (hasPrice(p) ? "" : " tbc") + '">' + esc(priceText(p)) + "</p>" +
      '<p class="card-meta' + (!needsSize(p) || (p.sizes && p.sizes.length) ? "" : " tbc") + '">' + esc(sizeText(p)) + (stock ? " · " + esc(stock) : "") + "</p>" +
      ((p.brand || deptText(p)) ? '<p class="card-meta">' + [p.brand ? "Brand: " + esc(p.brand) : "", deptText(p)].filter(Boolean).join(" · ") + "</p>" : "") +
      (p.description ? '<p class="gallery-desc">' + esc(p.description) + "</p>" : "") +
      (p.includes && p.includes.length ? '<p class="card-meta"><strong>Includes:</strong> ' + esc(p.includes.join(", ")) + "</p>" : "") +
      (p.note ? '<p class="card-note">' + esc(p.note) + "</p>" : "") +
      '<div class="card-controls">' + controlsHtml(p, "gallery") + "</div>" +
      (p.illustrated
        ? '<p class="small illus-note">These images are styled illustrations made from the original photo of this item. Small details may differ from the real piece. Props and styling pieces are not included. Current stock to be confirmed.</p>'
        : p.images.some(function (im) { return im.ai; })
          ? '<p class="small illus-note">Views marked “AI visualization” are computer-generated to show how the piece sits on the body. The real product photos show the exact details. Props and styling pieces are not included. Current stock to be confirmed.</p>'
          : '<p class="small">Product reference photos. Props shown for styling are not included. Current stock to be confirmed.</p>');
    // preload neighbours for smooth swiping
    [gIndex + 1, gIndex - 1].forEach(function (i) { var x = p.images[(i + n) % n]; if (x) (new Image()).src = x.src; });
  }
  function openGallery(id) {
    gProduct = byId(id);
    if (!gProduct) return;
    gIndex = 0;
    renderGallery(false);
    openDialog(gallery);
    $("[data-close]", gallery).focus();
  }
  function stepGallery(delta) {
    if (!gProduct || gProduct.images.length < 2) return;
    gIndex = (gIndex + delta + gProduct.images.length) % gProduct.images.length;
    renderGallery(false);
  }
  $("#galleryPrev").addEventListener("click", function () { stepGallery(-1); });
  $("#galleryNext").addEventListener("click", function () { stepGallery(1); });
  $("#galleryThumbs").addEventListener("click", function (e) {
    var b = e.target.closest("[data-photo]");
    if (b) { gIndex = Number(b.getAttribute("data-photo")); renderGallery(true); }
  });
  gallery.addEventListener("keydown", function (e) {
    if (e.target.tagName === "SELECT") return;
    if (e.key === "ArrowLeft") { e.preventDefault(); stepGallery(-1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); stepGallery(1); }
    else if (e.key === "Home" && gProduct) { e.preventDefault(); gIndex = 0; renderGallery(false); }
    else if (e.key === "End" && gProduct) { e.preventDefault(); gIndex = gProduct.images.length - 1; renderGallery(false); }
  });
  (function swipe() {
    var stage = $("#galleryStage"), startX = null, startY = 0;
    stage.addEventListener("pointerdown", function (e) { if (e.pointerType !== "mouse") { startX = e.clientX; startY = e.clientY; } });
    stage.addEventListener("pointerup", function (e) {
      if (startX === null) return;
      var dx = e.clientX - startX, dy = e.clientY - startY;
      startX = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) stepGallery(dx < 0 ? 1 : -1);
    });
    stage.addEventListener("pointercancel", function () { startX = null; });
  })();
  gallery.addEventListener("click", function (e) {
    if (e.target.closest("[data-close]")) { gallery.close(); return; }
    var a = e.target.closest("[data-add]");
    if (a) handleAdd(a, $("#galleryDetails"));
  });
  gallery.addEventListener("close", onDialogClose);

  /* ---------- bag + demo checkout ---------- */
  var cart = makeDialog("cart", "cartTitle",
    '<div class="sheet-head"><div><p class="eyebrow">Good choices, great vibes</p><h2 id="cartTitle">Your beach bag</h2></div>' +
    '<button type="button" class="close" data-close aria-label="Close bag">×</button></div>' +
    '<div class="sheet-body"><div id="cartItems"></div><div id="cartBottom"></div></div>');

  function orderLines() {
    return bag.map(function (i) {
      var p = byId(i.id);
      return p.name + (i.size ? " / Size " + i.size : "") + " × " + i.qty + " — " + money(p.price * i.qty);
    });
  }

  function renderCart() {
    var items = $("#cartItems"), bottom = $("#cartBottom");
    if (!bag.length) {
      items.innerHTML = '<div class="cart-empty"><p>Your bag is ready for a little sunshine.</p><p class="small">Choose your favourites to get started.</p>' +
        '<div class="empty-actions"><a class="button" href="index.html#shop">Shop Swimwear</a><a class="button button-ghost" href="shop.html">Clothing &amp; Accessories</a></div></div>';
      bottom.innerHTML = "";
      return;
    }
    items.innerHTML = '<ul class="cart-list">' + bag.map(function (i, n) {
      var p = byId(i.id);
      return '<li class="cart-row">' +
        '<img src="' + esc(p.images[0].src) + '" alt="" width="72" height="96">' +
        '<div class="cart-info"><h3>' + esc(p.name) + "</h3>" +
          '<p class="small">' + (i.size ? "Size " + esc(i.size) + " · " : "") + esc(money(p.price)) + " each" + (p.note ? "<br>" + esc(p.note) : "") + "</p>" +
          '<div class="quantity" role="group" aria-label="Quantity for ' + esc(p.name) + '">' +
            '<button type="button" data-qty="' + n + '" data-delta="-1" aria-label="Decrease quantity of ' + esc(p.name) + '">−</button>' +
            '<span aria-live="polite">' + i.qty + "</span>" +
            '<button type="button" data-qty="' + n + '" data-delta="1" aria-label="Increase quantity of ' + esc(p.name) + '"' + (i.qty >= maxQty(p) ? " disabled" : "") + ">+</button>" +
          "</div>" +
          '<button type="button" class="link-button" data-remove="' + n + '">Remove<span class="visually-hidden"> ' + esc(p.name) + "</span></button>" +
        "</div>" +
        '<p class="cart-line">' + esc(money(p.price * i.qty)) + "</p></li>";
    }).join("") + "</ul>";

    bottom.innerHTML =
      '<div class="total"><span>Subtotal <span class="small">(' + plural(bagCount(), "item") + ")</span></span><strong>" + esc(money(bagSubtotal())) + "</strong></div>" +
      '<p class="small">Delivery or pickup fees not included — to be confirmed.</p>' +
      '<div class="demo-banner" role="note"><strong>Demo checkout.</strong> Online payment with MMG isn’t connected yet. Nothing is sent and no payment is taken.</div>' +
      '<form class="checkout-form" id="checkout" novalidate>' +
        '<label for="co-name">Your name</label><input id="co-name" name="customer" required maxlength="80" autocomplete="name">' +
        '<label for="co-phone">Phone number</label><input id="co-phone" name="phone" type="tel" required maxlength="30" autocomplete="tel" inputmode="tel">' +
        '<p class="form-error" id="co-error" role="alert" hidden></p>' +
        '<button class="button" type="submit">Preview my order <span aria-hidden="true">→</span></button>' +
      "</form>";

    $("#checkout").addEventListener("submit", function (e) {
      e.preventDefault();
      var f = e.target, name = f.customer.value.trim(), phone = f.phone.value.trim(), err = $("#co-error");
      if (!name || !phone) {
        err.hidden = false;
        err.textContent = "Please add your name and phone number.";
        (name ? f.phone : f.customer).focus();
        return;
      }
      showSummary(name, phone);
    });
  }

  function showSummary(name, phone) {
    var lines = ["BIKINI BOTTOMS UP — ORDER PREVIEW"].concat(orderLines(), [
      "Subtotal: " + money(bagSubtotal()),
      "Name: " + name,
      "Phone: " + phone,
      "Delivery / pickup: to be confirmed",
      "PREVIEW ONLY — not paid."
    ]);
    var text = lines.join("\n");
    var wa = whatsappLink(text);
    $("#cartBottom").innerHTML =
      '<div class="summary"><h3 tabindex="-1" id="summaryTitle">Your order preview</h3>' +
      '<p class="small">This is a preview only. MMG online payment will be added once the store’s merchant account and a secure payment confirmation are set up. Your order has <strong>not</strong> been sent or paid.</p>' +
      '<label for="summaryText" class="visually-hidden">Order summary</label><textarea id="summaryText" readonly rows="8"></textarea>' +
      '<div class="summary-actions"><button type="button" class="button" id="copySummary">Copy summary</button>' +
      (wa ? '<a class="button button-ghost" href="' + esc(wa) + '" target="_blank" rel="noopener">Send this order on WhatsApp</a>' : "") +
      '<button type="button" class="btn-secondary" id="backToBag">Back to bag</button></div>' +
      '<p class="small" id="copyStatus" role="status"></p></div>';
    $("#summaryText").value = text;
    $("#summaryTitle").focus();
    $("#backToBag").addEventListener("click", renderCart);
    $("#copySummary").addEventListener("click", function () {
      var done = function () { $("#copyStatus").textContent = "Copied. Remember, this order has not been sent or paid."; };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback);
      else fallback();
      function fallback() { var t = $("#summaryText"); t.focus(); t.select(); $("#copyStatus").textContent = "Select the text above and copy it."; }
    });
  }

  $("#cartItems").addEventListener("click", function (e) {
    var q = e.target.closest("[data-qty]"), r = e.target.closest("[data-remove]");
    if (!q && !r) return;
    var n = Number((q || r).getAttribute(q ? "data-qty" : "data-remove"));
    var item = bag[n];
    if (!item) return;
    var p = byId(item.id);
    if (r) { bag.splice(n, 1); announce(p.name + " removed from your bag."); }
    else {
      item.qty = Math.min(maxQty(p), item.qty + Number(q.getAttribute("data-delta")));
      if (item.qty <= 0) { bag.splice(n, 1); announce(p.name + " removed from your bag."); }
    }
    saveBag();
    renderCart();
    // keep keyboard focus in a sensible place after re-render
    var same = q && $('[data-qty="' + n + '"][data-delta="' + q.getAttribute("data-delta") + '"]', cart);
    (same && !same.disabled ? same : $("[data-close]", cart)).focus();
  });
  cart.addEventListener("click", function (e) { if (e.target.closest("[data-close]")) cart.close(); });
  cart.addEventListener("close", onDialogClose);
  $$("[data-open-bag]").forEach(function (b) {
    b.addEventListener("click", function () { renderCart(); openDialog(cart); $("[data-close]", cart).focus(); });
  });

  // another tab or page changed the bag
  window.addEventListener("storage", function (e) {
    if (e.key !== BAG_KEY) return;
    loadBag();
    updateBagCount();
    if (cart.open && !$("#summaryText")) renderCart();
  });

  /* ---------- mobile menu ---------- */
  var toggle = $(".menu-toggle"), nav = $("#site-nav");
  if (toggle && nav) {
    var setMenu = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("menu-open", open);
    };
    toggle.addEventListener("click", function () { setMenu(toggle.getAttribute("aria-expanded") !== "true"); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") { setMenu(false); toggle.focus(); }
    });
  }

  /* ---------- WhatsApp links (only when a verified number is set in config.js) ---------- */
  var waGeneral = whatsappLink("Hi Bikini Bottoms Up! I have a question.");
  $$("[data-whatsapp]").forEach(function (a) {
    if (!waGeneral) return;
    a.href = waGeneral; a.target = "_blank"; a.rel = "noopener"; a.hidden = false;
  });
  $$("[data-whatsapp-wrap]").forEach(function (el) { el.hidden = !waGeneral; });

  /* ---------- "Beyond the Beach" promo status on the swimwear page ---------- */
  var status = $("[data-shop-status]");
  if (status) {
    var shopCount = productsFor("shop").length;
    status.textContent = shopCount ? plural(shopCount, "piece") + " in store" : "Arriving soon";
    status.hidden = false;
  }

  if (reduceMotion) document.documentElement.classList.add("reduce-motion");

  loadBag();
  saveBag(); // migrates any older bag to the shared key
  renderProducts();
  if (PAGE === "shop" && currentDept !== "all") {
    var sec0 = $("#shop");
    if (sec0) setTimeout(function () { sec0.scrollIntoView({ block: "start" }); }, 0);
  }
})();
