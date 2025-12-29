import crypto from "crypto";
import { computeFinalResult } from "../scoreEngine.js";
import { validatePayload } from "../validators.js";
import { supabase } from "../lib/supabase.js";

function makeToken() {
  return crypto.randomBytes(16).toString("hex"); // 32 chars
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body;
    validatePayload(body);

    const { user, quizAnswers, image } = body;

    // Dummy vision (se você não usa gemini agora)
    const vision = { raw: "" };

    const finalResult = computeFinalResult({
      quizAnswers,
      vision
    });

    if (!supabase) {
      console.warn("Supabase not configured. Skipping save.");
      return res.status(200).json({
        ok: true,
        session_id: "demo-session-no-db"
      });
    }

    // ✅ Gera token único
    const resultToken = makeToken();

    // ✅ Salva no schema real da sua tabela
    const { data, error } = await supabase
      .from("results")
      .insert([
        {
          result_token: resultToken,
          answers_json: quizAnswers,
          result: finalResult,
          payment_status: "pending"
        }
      ])
      .select("result_token")
      .single();

    if (error) {
      throw new Error("Database error: " + error.message);
    }

    // ✅ Retorna o token (não o UUID)
    return res.status(200).json({
      ok: true,
      session_id: data.result_token
    });
  } catch (err) {
    console.error("Analyze error:", err);
    return res.status(500).json({
      error: err.message || "Erro ao processar análise"
    });
  }
}
