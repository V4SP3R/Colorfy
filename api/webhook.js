import Stripe from "stripe";
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

/* Read raw body directly from the request stream (no micro dependency) */
function getRawBody(req) {
    return new Promise((resolve, reject) => {
        // If Vercel already provides the raw body as a Buffer
        if (Buffer.isBuffer(req.body)) {
            return resolve(req.body);
        }
        // If body is a string, convert to Buffer
        if (typeof req.body === "string") {
            return resolve(Buffer.from(req.body, "utf-8"));
        }
        // Otherwise read from the stream
        const chunks = [];
        req.on("data", (chunk) => chunks.push(chunk));
        req.on("end", () => resolve(Buffer.concat(chunks)));
        req.on("error", reject);
    });
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const sig = req.headers["stripe-signature"];
    if (!sig) {
        return res.status(400).json({ error: "Missing stripe-signature header" });
    }

    let buf;
    try {
        buf = await getRawBody(req);
    } catch (err) {
        console.error("Failed to read body:", err.message);
        return res.status(400).json({ error: "Failed to read request body" });
    }

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            buf,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error("Webhook signature error:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const internalId = session.metadata?.internal_session_id;

        if (internalId) {
            const { error } = await supabase
                .from("results")
                .update({
                    payment_status: "paid",
                    paid_at: new Date().toISOString()
                })
                .eq("result_token", internalId);

            if (error) {
                console.error("Supabase update error:", error);
            }
        }
    }

    res.json({ received: true });
}
