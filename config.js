/*
  Bikini Bottoms Up — store settings. Safe to publish: never put passwords,
  API keys, or MMG merchant secrets in this file (it is visible to everyone).

  whatsappNumber  The verified business WhatsApp number, digits only,
                  with country code and no "+", spaces or dashes.
                  Guyana example format: "592XXXXXXX". Leave "" until confirmed —
                  the "Message on WhatsApp" buttons stay hidden while it is empty.

  checkoutMode    "demo"  → checkout only previews an order. Nothing is sent or charged.
                  Real MMG payments need a merchant account, a secure server to hold
                  the MMG credentials, and server-side payment confirmation from MMG.
                  See README → "Connecting real MMG payments". Do not change this
                  value until that server exists.
*/
window.BBU_CONFIG = {
  businessName: "Bikini Bottoms Up",
  currency: "GYD",
  whatsappNumber: "",
  checkoutMode: "demo"
};
