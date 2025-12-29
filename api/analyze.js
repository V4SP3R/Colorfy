import crypto from "crypto";
import { computeFinalResult } from "../scoreEngine.js";
import { validatePayload } from "../validators.js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function makeToken() {
  return crypto.randomBytes(16).toString("hex");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body;
    validatePayload(body);

    const { quizAnswers } = body;

    const vision = { raw: "" };

    const finalResult = computeFinalResult({
      quizAnswers,
      vision
    });

    const resultToken = makeToken();

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
      console.error("Supabase insert error:", error);
      throw new Error("Database error: " + error.message);
    }

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
