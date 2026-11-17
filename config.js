/*
  Bikini Bottoms Up — store settings. Safe to publish: never put passwords,
  API keys, or MMG merchant secrets in this file (it is visible to everyone).

  whatsappNumber  The verified business WhatsApp number, digits only,
                  with country code and no "+", spaces or dashes.
                  Guyana example format: "592XXXXXXX". Leave "" until confirmed —
                  the "Message on WhatsApp" buttons stay hidden while it is empty.

  inventoryCsvUrl The owner's Google Sheet, published to the web as CSV
                  (File > Share > Publish to web > Products tab > CSV). Leave ""
                  to use only the product list built into catalog.js.

  checkoutMode    "demo"  → checkout only previews an order. Nothing is sent or charged.
                  Real MMG payments need a merchant account, a secure server to hold
                  the MMG credentials, and server-side payment confirmation from MMG.
                  See README → "Connecting real MMG payments". Do not change this
                  value until that server exists.
*/
window.BBU_CONFIG = {
  businessName: "Bikini Bottoms Up",
  currency: "GYD",
  whatsappNumber: "5926797322",
  inventoryCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRQcU3PvCXEUbv-Yi4khkzj5_GMXjIpwuk9dE8zGh9kmTDtgNV2Ks4_ZOIZ_tpHPqYx8508OeI42rI5/pub?gid=765979781&single=true&output=csv",
  checkoutMode: "demo"
};
