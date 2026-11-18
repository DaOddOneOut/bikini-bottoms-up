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
        (img.ai ? '<span class="card-ai">AI view</span>' : "") +
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

  /* ---------- browse tools: search, size, sort, paging ---------- */
  var searchEl = $("[data-search]"), sizeSel = $("[data-size-filter]"), sortSel = $("[data-sort]"), pageSel = $("[data-page-size]");
  var moreBox = $("[data-more]"), moreBtn = $("[data-load-more]"), moreCount = $("[data-more-count]");
  var PAGE_KEY = "bbu-page-size", PAGE_SIZES = [25, 50, 100];
  var pageSize = (function () { try { var v = Number(localStorage.getItem(PAGE_KEY)); return PAGE_SIZES.indexOf(v) !== -1 ? v : 25; } catch (e) { return 25; } })();
  var visibleCount = pageSize, searchText = "", sizeFilter = "", sortMode = "featured";
  if (pageSel) pageSel.value = String(pageSize);
  var ORDER = {};
  PRODUCTS.forEach(function (p, i) { ORDER[p.id] = i; });

  // Size filter: the same size written different ways is one choice ("Small" = "S", "XXL" = "2XL").
  var SIZE_WORDS = { small: "S", medium: "M", large: "L", "x-small": "XS", "extra small": "XS", "x-large": "XL", "extra large": "XL", xxl: "2XL", xxxl: "3XL" };
  function sizeKey(s) { var t = String(s).trim(); return SIZE_WORDS[t.toLowerCase()] || t.toUpperCase(); }
  var LETTER_ORDER = ["XS", "S", "M", "L", "LX", "XL", "0XL", "1XL", "2XL", "2XB", "3XL", "4XL", "5XL"];
  function sizeRank(k) {
    var i = LETTER_ORDER.indexOf(k);
    if (i !== -1) return [0, i, 0];
    var m = k.match(/^(\d+)X(\d+)$/);
    if (m) return [2, Number(m[1]), Number(m[2])];
    m = k.match(/^(\d+)([A-Z]*)$/);
    if (m) return [1, Number(m[1]), m[2] ? m[2].charCodeAt(0) : 0];
    return [3, 0, 0];
  }
  function bySize(a, b) {
    var x = sizeRank(a), y = sizeRank(b);
    return x[0] - y[0] || x[1] - y[1] || x[2] - y[2] || (a < b ? -1 : a > b ? 1 : 0);
  }
  function searchBlob(p) {
    var cat = categoriesFor(p.collection).filter(function (c) { return c.id === p.category; })[0];
    return [p.name, p.brand, p.tag, cat && cat.label, p.description, deptText(p)].filter(Boolean).join(" ").toLowerCase();
  }
  function matchesSearch(p) {
    if (!searchText) return true;
    var blob = searchBlob(p);
    return searchText.split(/\s+/).every(function (w) { return blob.indexOf(w) !== -1; });
  }
  function renderSizeOptions(items) {
    if (!sizeSel) return;
    var keys = {};
    items.forEach(function (p) { (p.sizes || []).forEach(function (s) { keys[sizeKey(s)] = (keys[sizeKey(s)] || 0) + 1; }); });
    var list = Object.keys(keys).sort(bySize);
    if (sizeFilter && !keys[sizeFilter]) sizeFilter = "";
    sizeSel.innerHTML = '<option value="">All sizes</option>' + list.map(function (k) {
      return '<option value="' + esc(k) + '"' + (k === sizeFilter ? " selected" : "") + ">" + esc(k) + " (" + keys[k] + ")</option>";
    }).join("");
  }
  function sortItems(list) {
    var buyable = function (p) { return canBuy(p) ? 0 : 1; };   // anything not orderable yet goes last
    return list.slice().sort(function (a, b) {
      var d = buyable(a) - buyable(b);
      if (d) return d;
      if (sortMode === "newest") return ORDER[b.id] - ORDER[a.id];
      if (sortMode === "price-asc" || sortMode === "price-desc") {
        var pa = hasPrice(a) ? a.price : Infinity, pb = hasPrice(b) ? b.price : Infinity;
        if (pa !== pb) return sortMode === "price-asc" ? pa - pb : (pb === Infinity ? -1 : pa === Infinity ? 1 : pb - pa);
      }
      return ORDER[a.id] - ORDER[b.id];
    });
  }
  function resetPaging() { visibleCount = pageSize; }
  function clearBrowse() {
    searchText = ""; sizeFilter = ""; currentFilter = "all";
    if (searchEl) searchEl.value = "";
    resetPaging();
    renderProducts();
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
    var inCat = items.filter(function (p) { return currentFilter === "all" || p.category === currentFilter; });
    renderSizeOptions(inCat);
    var matched = sortItems(inCat.filter(function (p) {
      return matchesSearch(p) && (!sizeFilter || (p.sizes || []).some(function (s) { return sizeKey(s) === sizeFilter; }));
    }));
    var shown = matched.slice(0, visibleCount);
    var word = PAGE === "shop" ? "item" : "style";
    var deptLabel = currentDept === "all" ? "" : " · " + DEPTS.filter(function (d) { return d.id === currentDept; })[0].label;
    if (!matched.length) {
      grid.innerHTML = '<div class="no-results"><p>No ' + word + 's match' + (searchText ? ' “' + esc(searchText) + '”' : "") + (sizeFilter ? " in size " + esc(sizeFilter) : "") + '.</p><button type="button" class="button" data-clear-browse>Clear search and filters</button></div>';
      if (countEl) countEl.textContent = "No matches" + deptLabel;
      if (moreBox) moreBox.hidden = true;
      return;
    }
    grid.innerHTML = shown.map(cardHtml).join("");
    var of = shown.length < matched.length ? shown.length + " of " + matched.length + " " + word + "s" : plural(matched.length, word);
    if (countEl) countEl.textContent = "Showing " + of + deptLabel;
    if (moreBox) {
      var left = matched.length - shown.length;
      moreBox.hidden = left <= 0;
      if (left > 0) {
        moreCount.textContent = "Showing " + shown.length + " of " + matched.length;
        moreBtn.textContent = "Load " + Math.min(pageSize, left) + " more";
      }
    }
  }

  if (filtersEl) filtersEl.addEventListener("click", function (e) {
    var b = e.target.closest("[data-filter]");
    if (!b) return;
    currentFilter = b.getAttribute("data-filter");
    resetPaging();
    renderProducts();
    var again = $('[data-filter="' + currentFilter + '"]', filtersEl);
    if (again) again.focus();
  });

  if (deptsEl) deptsEl.addEventListener("click", function (e) {
    var b = e.target.closest("[data-dept]");
    if (!b) return;
    currentDept = b.getAttribute("data-dept");
    currentFilter = "all";
    resetPaging();
    try { history.replaceState(null, "", currentDept === "all" ? location.pathname + location.search : "#" + currentDept); } catch (err) { /* ignore */ }
    renderProducts();
    var again = $('[data-dept="' + currentDept + '"]', deptsEl);
    if (again) again.focus();
  });
  if (PAGE === "shop") window.addEventListener("hashchange", function () {
    currentDept = deptFromHash();
    currentFilter = "all";
    resetPaging();
    renderProducts();
    var sec = $("#shop");
    if (sec && currentDept !== "all") sec.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  });

  var searchTimer = null;
  if (searchEl) searchEl.addEventListener("input", function () {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function () {
      searchText = searchEl.value.trim().toLowerCase().replace(/\s+/g, " ");
      resetPaging();
      renderProducts();
    }, 200);
  });
  if (searchEl) searchEl.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); searchEl.blur(); } });
  if (sizeSel) sizeSel.addEventListener("change", function () { sizeFilter = sizeSel.value; resetPaging(); renderProducts(); });
  if (sortSel) sortSel.addEventListener("change", function () { sortMode = sortSel.value; resetPaging(); renderProducts(); });
  if (pageSel) pageSel.addEventListener("change", function () {
    pageSize = Number(pageSel.value) || 25;
    try { localStorage.setItem(PAGE_KEY, String(pageSize)); } catch (e) { /* ignore */ }
    if (visibleCount < pageSize) visibleCount = pageSize;   // keep what is already loaded
    renderProducts();
  });
  if (moreBtn) moreBtn.addEventListener("click", function () {
    var before = visibleCount;
    visibleCount += pageSize;
    renderProducts();
    var cards = $$(".card", grid);
    var first = cards[before] && $(".card-media", cards[before]);
    if (first) first.focus({ preventScroll: true });
    announce("Loaded " + (Math.min(visibleCount, cards.length) - before) + " more.");
  });
  if (grid) grid.addEventListener("click", function (e) { if (e.target.closest("[data-clear-browse]")) clearBrowse(); });

  /* ---------- retry a product photo once if it fails to load (e.g. caught mid-publish) ---------- */
  document.addEventListener("error", function (e) {
    var img = e.target;
    if (!img || img.tagName !== "IMG" || img.getAttribute("data-retried") || !img.getAttribute("src")) return;
    img.setAttribute("data-retried", "1");
    var src = img.getAttribute("src");
    setTimeout(function () { img.src = src + (src.indexOf("?") === -1 ? "?" : "&") + "retry=" + Date.now(); }, 800);
  }, true);

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
      (whatsappNumber()
        ? '<div class="demo-banner" role="note"><strong>Orders are confirmed on WhatsApp.</strong> Send us your order and we’ll confirm stock, delivery and payment with you. Nothing is charged online. We reply Monday to Saturday, 9 AM to 5 PM.</div>'
        : '<div class="demo-banner" role="note"><strong>Demo checkout.</strong> Online payment with MMG isn’t connected yet. Nothing is sent and no payment is taken.</div>') +
      '<form class="checkout-form" id="checkout" novalidate>' +
        '<label for="co-name">Your name</label><input id="co-name" name="customer" required maxlength="80" autocomplete="name">' +
        '<label for="co-phone">Phone number</label><input id="co-phone" name="phone" type="tel" required maxlength="30" autocomplete="tel" inputmode="tel">' +
        '<p class="form-error" id="co-error" role="alert" hidden></p>' +
        '<button class="button" type="submit">' + (whatsappNumber() ? "Continue" : "Preview my order") + ' <span aria-hidden="true">→</span></button>' +
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
    var live = !!whatsappNumber();
    var lines = [live ? "BIKINI BOTTOMS UP — ORDER REQUEST" : "BIKINI BOTTOMS UP — ORDER PREVIEW"].concat(orderLines(), [
      "Subtotal: " + money(bagSubtotal()),
      "Name: " + name,
      "Phone: " + phone,
      "Delivery / pickup: to be confirmed",
      live ? "Not paid yet. Please confirm stock, delivery and payment." : "PREVIEW ONLY — not paid."
    ]);
    var text = lines.join("\n");
    var wa = whatsappLink(text);
    $("#cartBottom").innerHTML =
      '<div class="summary"><h3 tabindex="-1" id="summaryTitle">' + (live ? "Your order" : "Your order preview") + '</h3>' +
      (live
        ? '<p class="small">Tap <strong>Send this order on WhatsApp</strong> to send it to us. Your order isn’t placed until you send it, and nothing is charged online. We’ll reply to confirm stock, delivery and payment (Monday to Saturday, 9 AM to 5 PM).</p>'
        : '<p class="small">This is a preview only. MMG online payment will be added once the store’s merchant account and a secure payment confirmation are set up. Your order has <strong>not</strong> been sent or paid.</p>') +
      '<label for="summaryText" class="visually-hidden">Order summary</label><textarea id="summaryText" readonly rows="8"></textarea>' +
      '<div class="summary-actions">' +
      (wa ? '<a class="button" href="' + esc(wa) + '" target="_blank" rel="noopener">Send this order on WhatsApp</a>' : "") +
      '<button type="button" class="' + (wa ? "button button-ghost" : "button") + '" id="copySummary">Copy summary</button>' +
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

  /* ---------- light / dark theme (saved per visitor; follows the device until they choose) ---------- */
  var THEME_KEY = "bbu-theme";
  var themeMeta = $('meta[name="theme-color"]');
  function savedTheme() { try { var t = localStorage.getItem(THEME_KEY); return t === "light" || t === "dark" ? t : null; } catch (e) { return null; } }
  function systemTheme() { return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"; }
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    if (themeMeta) themeMeta.setAttribute("content", t === "dark" ? "#0f2e33" : "#087e84");
    $$("[data-theme-toggle]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(t === "dark"));
      var icon = $(".theme-icon", b);
      if (icon) icon.textContent = t === "dark" ? "☀" : "☾";
      b.title = t === "dark" ? "Switch to light mode" : "Switch to dark mode";
    });
  }
  applyTheme(savedTheme() || systemTheme());
  $$("[data-theme-toggle]").forEach(function (b) {
    b.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
      applyTheme(next);
    });
  });
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var onSys = function () { if (!savedTheme()) applyTheme(systemTheme()); };
    if (mq.addEventListener) mq.addEventListener("change", onSys); else if (mq.addListener) mq.addListener(onSys);
  }
  window.addEventListener("storage", function (e) { if (e.key === THEME_KEY) applyTheme(savedTheme() || systemTheme()); });

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

  /* ---------- live inventory from the owner's Google Sheet ----------
     config.js → inventoryCsvUrl is the sheet's "Publish to web" CSV link (Products tab).
     The sheet overrides prices, sizes, stock, names etc. by product ID. Photos stay in catalog.js.
     If the sheet is missing, slow or malformed, the site keeps using catalog.js. */
  var SHEET_URL = String(CONFIG.inventoryCsvUrl || "").trim();
  var SHEET_CACHE = "bbu-sheet-cache-v1";
  var BASE = PRODUCTS.map(function (p) { var c = {}; for (var k in p) c[k] = p[k]; return c; });
  var CAT_BY_LABEL = {};
  ["swim", "shop"].forEach(function (coll) {
    categoriesFor(coll).forEach(function (c) { CAT_BY_LABEL[c.label.toLowerCase()] = { collection: coll, id: c.id }; });
  });

  function parseCsv(text) {
    var rows = [], row = [], cell = "", q = false;
    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      if (q) {
        if (ch === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; }
        else cell += ch;
      } else if (ch === '"') q = true;
      else if (ch === ",") { row.push(cell); cell = ""; }
      else if (ch === "\n" || ch === "\r") {
        if (ch === "\r" && text[i + 1] === "\n") i++;
        row.push(cell); rows.push(row); row = []; cell = "";
      } else cell += ch;
    }
    if (cell !== "" || row.length) { row.push(cell); rows.push(row); }
    return rows;
  }
  function yes(v) { return /^(yes|y|true|1)$/i.test(String(v).trim()); }
  function no(v) { return /^(no|n|false|0|hide|hidden)$/i.test(String(v).trim()); }
  function list(v) { return String(v).split(/[,;\n]+/).map(function (x) { return x.trim(); }).filter(Boolean); }

  // Returns the merged product list, or null if the sheet doesn't look right.
  function mergeSheet(text) {
    var rows = parseCsv(String(text || "").replace(/^﻿/, ""));
    if (rows.length < 2) return null;
    var head = rows[0].map(function (h) { return h.trim().toLowerCase(); });
    var col = function (name) { return head.indexOf(name); };
    if (col("id") === -1) return null;
    var byRow = {};
    rows.slice(1).forEach(function (r) { var id = (r[col("id")] || "").trim(); if (id) byRow[id] = r; });
    var matched = BASE.filter(function (p) { return byRow[p.id]; }).length;
    if (matched < Math.max(1, Math.floor(BASE.length * 0.5))) return null;   // wrong tab or broken export
    var get = function (r, name) { var i = col(name); return i === -1 ? undefined : (r[i] === undefined ? "" : String(r[i]).trim()); };
    var out = [];
    BASE.forEach(function (base) {
      var p = {}; for (var k in base) p[k] = base[k];
      var r = byRow[base.id];
      if (!r) { out.push(p); return; }                     // row missing: keep the built-in listing
      var v;
      if ((v = get(r, "show on site")) !== undefined && no(v)) return;   // hidden by the owner
      if ((v = get(r, "name"))) p.name = v;
      if ((v = get(r, "price (gyd)")) !== undefined) {
        if (v === "") p.price = null;
        else { var num = Number(v.replace(/[^0-9.]/g, "")); if (v.replace(/[^0-9]/g, "") !== "" && isFinite(num)) p.price = Math.round(num); }
      }
      if ((v = get(r, "sizes")) !== undefined) p.sizes = list(v);
      if ((v = get(r, "sold-out sizes")) !== undefined) { var ss = list(v); if (ss.length) p.soldSizes = ss; else delete p.soldSizes; }
      var st = get(r, "stock"), so = get(r, "sold out");
      if (st !== undefined || so !== undefined) {          // only when the sheet has these columns
        p.stock = st !== undefined && /^\d+$/.test(st) ? Number(st) : null;
        if (so !== undefined && yes(so)) p.stock = 0;
      }
      if ((v = get(r, "category")) && CAT_BY_LABEL[v.toLowerCase()]) {
        var c = CAT_BY_LABEL[v.toLowerCase()]; p.collection = c.collection; p.category = c.id;
      }
      if ((v = get(r, "department")) !== undefined) {
        var d = v.toLowerCase();
        p.department = d === "women" ? "Women" : d === "men" ? "Men" : (d === "kids" || d === "youth") ? "Youth" : null;
      }
      if ((v = get(r, "brand")) !== undefined) p.brand = v || null;
      if ((v = get(r, "label"))) p.tag = v;
      if ((v = get(r, "note")) !== undefined) { if (v) p.note = v; else delete p.note; }
      if ((v = get(r, "description")) !== undefined) p.description = v || null;
      out.push(p);
    });
    return out;
  }
  function useProducts(list) {
    PRODUCTS.length = 0;
    Array.prototype.push.apply(PRODUCTS, list);
  }
  function refreshAfterSheet() {
    var before = JSON.stringify(bag);
    bag = cleanBag(bag);                                   // drops items now hidden or sold out
    if (JSON.stringify(bag) !== before) saveBag(); else updateBagCount();
    if (status) {
      var n = productsFor("shop").length;
      status.textContent = n ? plural(n, "piece") + " in store" : "Arriving soon";
    }
    renderProducts();
    if (cart.open && !$("#summaryText")) renderCart();
  }
  var sheetText = null;
  if (SHEET_URL) {
    try {
      var cached = JSON.parse(localStorage.getItem(SHEET_CACHE) || "null");
      if (cached && cached.url === SHEET_URL && Date.now() - cached.t < 7 * 864e5) {
        var m0 = mergeSheet(cached.csv);
        if (m0) { useProducts(m0); sheetText = cached.csv; }
      }
    } catch (e) { /* ignore a bad cache */ }
  }
  function fetchSheet() {
    if (!SHEET_URL || !window.fetch) return;
    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 10000) : null;
    fetch(SHEET_URL, { cache: "no-store", signal: ctrl ? ctrl.signal : undefined })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.text(); })
      .then(function (text) {
        if (timer) clearTimeout(timer);
        if (text === sheetText) return;
        var merged = mergeSheet(text);
        if (!merged) { if (window.console) console.warn("Inventory sheet ignored: it doesn't look like the Products tab."); return; }
        sheetText = text;
        try { localStorage.setItem(SHEET_CACHE, JSON.stringify({ url: SHEET_URL, t: Date.now(), csv: text })); } catch (e) { /* ignore */ }
        useProducts(merged);
        refreshAfterSheet();
      })
      .catch(function (err) { if (timer) clearTimeout(timer); if (window.console) console.warn("Inventory sheet not loaded; using built-in catalog.", err && err.message); });
  }

  loadBag();
  saveBag(); // migrates any older bag to the shared key
  renderProducts();
  if (status) { var n0 = productsFor("shop").length; status.textContent = n0 ? plural(n0, "piece") + " in store" : "Arriving soon"; }
  fetchSheet();
  if (PAGE === "shop" && currentDept !== "all") {
    var sec0 = $("#shop");
    if (sec0) setTimeout(function () { sec0.scrollIntoView({ block: "start" }); }, 0);
  }
})();
