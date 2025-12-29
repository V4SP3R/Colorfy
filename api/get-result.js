import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: "Missing session_id" });
  }

  try {
    const { data, error } = await supabase
      .from("results")
      .select("*")
      .eq("result_token", session_id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: "Result not found" });
    }

    if (data.payment_status !== "paid") {
      return res.status(402).json({
        error: "Payment required",
        paid: false,
        payment_status: data.payment_status
      });
    }

    return res.status(200).json({
      ok: true,
      paid: true,
      result: data.result
    });

  } catch (err) {
    console.error("Get result error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
