import Stripe from "stripe";
import { buffer } from "micro";
import { createClient } from "@supabase/supabase-js";

export const config = {
    api: {
        bodyParser: false
    }
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
    const sig = req.headers["stripe-signature"];
    const buf = await buffer(req);

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            buf,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error("Webhook error:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const internalId = session.metadata.internal_session_id;

        if (internalId) {
            await supabase
  .from("results")
  .update({
    payment_status: "paid",
    paid_at: new Date().toISOString()
  })
  .eq("result_token", internalId);
        }
    }

    res.json({ received: true });
}

