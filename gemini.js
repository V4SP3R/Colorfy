import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildVisionPrompt } from "./prompt.js";

// Lazy init to prevent top-level crash on Vercel if env is missing
let genAI = null;

export async function analyzeWithGemini({ imageBase64, quizAnswers }) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("SERVER ERROR: GEMINI_API_KEY is missing in environment variables.");
  }

  if (!genAI) {
    genAI = new GoogleGenerativeAI(apiKey);
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview"
  });

  if (typeof imageBase64 !== 'string') {
    throw new Error(`imageBase64 must be a string, got ${typeof imageBase64} (${imageBase64})`);
  }

  const prompt = buildVisionPrompt(quizAnswers);

  const result = await model.generateContent([
    {
      inlineData: {
        data: imageBase64,
        mimeType: "image/jpeg"
      }
    },
    { text: prompt }
  ]);

  const text = result.response.text();

  return {
    raw: text
  };
}
