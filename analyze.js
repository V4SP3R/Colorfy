import { analyzeWithGemini } from "../gemini.js";
import { computeFinalResult } from "../scoreEngine.js";
import { validatePayload } from "../validators.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body;

    validatePayload(body);

    const { user, quizAnswers, image } = body;

    const vision = await analyzeWithGemini({
      imageBase64: image.base64,
      quizAnswers
    });

    const finalResult = computeFinalResult({
      quizAnswers,
      vision
    });

    return res.status(200).json({
      ok: true,
      final: finalResult
    });

  } catch (err) {
    console.error("Analyze error:", err);
    console.error(err.stack);
    return res.status(500).json({
      error: (err.message || "Erro ao processar análise") + " STACK: " + err.stack
    });
  }
}
