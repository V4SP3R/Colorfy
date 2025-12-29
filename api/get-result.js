import { supabase } from "../lib/supabase.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: "Missing session_id" });
  }

  try {
    if (!supabase) {
      // Demo mode fallback
      if (session_id === "demo-session-no-db") {
        return res.status(200).json({
          ok: true,
          paid: true,
          result: {
            user: "Demo User",
            final_palette: { name: "Demo Palette" },
            report: {
              sections: {
                technical_note: "Demo mode - DB not configured",
                feature_inventory: {},
                main_palette: [],
                best_combinations: [],
                use_with_moderation: [],
                next_steps: [],
                quick_summary: "Demo Summary"
              }
            }
          }
        });
      }
      return res.status(503).json({ error: "Database not configured" });
    }

    // ✅ CORREÇÃO: buscar pelo campo session_id
    const { data, error } = await supabase
      .from("results")
      .select("*")
      .eq("session_id", session_id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: "Result not found" });
    }

    // ✅ Bloqueio de pagamento
    if (!data.paid) {
      return res.status(402).json({ error: "Payment required", paid: false });
    }

    return res.status(200).json({
      ok: true,
      paid: true,
      result: data.data // JSON blob com análise
    });
  } catch (err) {
    console.error("Get result error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
