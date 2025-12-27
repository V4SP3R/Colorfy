// import { analyzeWithGemini } from "../gemini.js";
import { computeFinalResult } from "../scoreEngine.js";
import { validatePayload } from "../validators.js";
import { supabase } from "../lib/supabase.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body;

    validatePayload(body);

    const { user, quizAnswers, image } = body;

    // const vision = await analyzeWithGemini({
    //   imageBase64: image.base64,
    //   quizAnswers
    // });
    const vision = { raw: "" }; // Dummy vision data

    const finalResult = computeFinalResult({
      quizAnswers,
      vision
    });

    // Save to Supabase
    // Using user-provided table name 'results'

    if (!supabase) {
      console.warn("Supabase not configured. Skipping save.");
      return res.status(200).json({
        ok: true,
        session_id: "demo-session-no-db"
      });
    }

    const { data, error } = await supabase
      .from('results')
      .insert([
        {
          data: finalResult,
          paid: false // default, waiting for payment
        }
      ])
      .select('id')
      .single();

    if (error) {
      throw new Error("Database error: " + error.message);
    }

    // Return only the session ID (row ID)
    return res.status(200).json({
      ok: true,
      session_id: data.id
    });

  } catch (err) {
    console.error("Analyze error:", err);
    console.error(err.stack);
    return res.status(500).json({
      error: (err.message || "Erro ao processar análise") + " STACK: " + err.stack
    });
  }
}
