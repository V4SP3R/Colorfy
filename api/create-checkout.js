import { supabase } from "../lib/supabase.js";

const PAYMENT_LINK = "https://buy.stripe.com/8x26oH8Hd0IZbOj6crgfu00";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { session_id } = req.body;

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

    // Redirect to Payment Link with client_reference_id to link payment to result
    const url = `${PAYMENT_LINK}?client_reference_id=${encodeURIComponent(session_id)}`;

    return res.status(200).json({ url });
  } catch (err) {
    console.error("Create checkout error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
