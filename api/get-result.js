import { supabase } from "../lib/supabase.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { session_id } = req.query; // no front você chama de session_id

  if (!session_id) {
    return res.status(400).json({ error: "Missing session_id" });
  }

  try {
    if (!supabase) {
      return res.status(503).json({ error: "Database not configured" });
    }

    // ✅ session_id DO FRONT = result_token NO BANCO
    const { data, error } = await supabase
      .from("results")
      .select("*")
      .eq("result_token", session_id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: "Result not found" });
    }

    // ✅ verifica pagamento pelo payment_status
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
      result: data.result // ✅ seu JSONB certo
    });
  } catch (err) {
    console.error("Get result error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
