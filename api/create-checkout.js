import Stripe from "stripe";
import { supabase } from "../lib/supabase.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { session_id } = req.body; // this is your result_token

  if (!session_id) {
    return res.status(400).json({ error: "Missing session_id" });
  }

  try {
    if (!supabase) {
      return res.status(503).json({ error: "Database not configured" });
    }

    // Ensure the result exists
    const { data, error } = await supabase
      .from("results")
      .select("id, payment_status")
      .eq("result_token", session_id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: "Result not found" });
    }

    // If already paid, send user directly back to result page
    if (data.payment_status === "paid") {
      return res.status(200).json({ url: `${process.env.SITE_URL}/?session_id=${encodeURIComponent(session_id)}` });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: "Análise de Coloração Pessoal",
              description: "Relatório completo com paleta personalizada"
            },
            unit_amount: 6700 // R$67,00 — adjust if needed
          },
          quantity: 1
        }
      ],
      // ... dentro de stripe.checkout.sessions.create({ ...
      success_url: `${process.env.SITE_URL}/?session_id=${encodeURIComponent(session_id)}`,
      cancel_url: `${process.env.SITE_URL}/Checkout.html?session_id=${encodeURIComponent(session_id)}`,
      
      // AQUI ESTÁ A CORREÇÃO:
      metadata: {
        internal_session_id: session_id  // O nome deve ser EXATAMENTE este
      }
    });

    return res.status(200).json({ url: checkoutSession.url });
  } catch (err) {
    console.error("Create checkout error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

