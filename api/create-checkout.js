import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { session_id } = req.body;

    if (!session_id) {
        return res.status(400).json({ error: "Missing session_id" });
    }

    // (opcional) validar se a sessão existe no Supabase
    const { data } = await supabase
        .from("results")
        .select("id")
        .eq("session_id", session_id)
        .single();

    if (!data) {
        return res.status(404).json({ error: "Session not found" });
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
                    unit_amount: 4900 // R$49,00 (ajuste se quiser)
                },
                quantity: 1
            }
        ],
        success_url: `${process.env.SITE_URL}/?session_id=${session_id}`,
        cancel_url: `${process.env.SITE_URL}/Checkout.html?session_id=${session_id}`,
        metadata: {
            internal_session_id: session_id
        }
    });

    res.json({ url: checkoutSession.url });
}
