import Stripe from "stripe";

// Cache: evita chamar a Stripe a cada pageview
let cached = { price: null, original: null, ts: 0 };
const TTL = 5 * 60 * 1000; // 5 minutos

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "public, max-age=300"); // browser cache 5min

  const now = Date.now();

  // Retorna cache se ainda válido
  if (cached.price && now - cached.ts < TTL) {
    return res.status(200).json({
      price: cached.price,
      original: cached.original,
      currency: cached.currency
    });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Busca o preço ativo do produto pelo Product ID
    const productId = process.env.STRIPE_PRODUCT_ID || "prod_TjOB5ZxNvXnBx4";

    const prices = await stripe.prices.list({
      product: productId,
      active: true,
      limit: 1
    });

    if (!prices.data.length) {
      return res.status(500).json({ error: "No active price found for product" });
    }

    const priceObj = prices.data[0];

    // Preço atual (em centavos → reais)
    const priceValue = priceObj.unit_amount / 100;

    // Preço original "de" (configurável via env, padrão R$ 197,00)
    const originalValue = parseFloat(process.env.PRICE_ORIGINAL || "197.00");

    cached = {
      price: priceValue,
      original: originalValue,
      currency: priceObj.currency,
      ts: now
    };

    return res.status(200).json({
      price: priceValue,
      original: originalValue,
      currency: priceObj.currency
    });
  } catch (err) {
    console.error("get-price error:", err.message);

    // Se deu erro mas tem cache antigo, retorna ele
    if (cached.price) {
      return res.status(200).json({
        price: cached.price,
        original: cached.original,
        currency: cached.currency
      });
    }

    return res.status(500).json({ error: "Failed to fetch price" });
  }
}
