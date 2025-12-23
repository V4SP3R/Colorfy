import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildVisionPrompt } from "./prompt.js";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("ERROR: GEMINI_API_KEY is missing or undefined in process.env");
}
const genAI = new GoogleGenerativeAI(apiKey);

export async function analyzeWithGemini({ imageBase64, quizAnswers }) {
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
