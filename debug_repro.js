
import 'dotenv/config';
import { analyzeWithGemini } from './gemini.js';
import { computeFinalResult } from './scoreEngine.js';

// Mock data
const mockQuizAnswers = {
    q1: "A", q2: "A", q3: "A", q4: "a", q5: "A",
    q6: "B", q7: "A", q8: "C", q9: "A", q10: "A", q11: "A",
    frame: "A"
};

const mockImageBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

async function runTest() {
    console.log("--- Starting Debug Test ---");

    try {
        console.log("1. Testing analyzeWithGemini...");
        const vision = await analyzeWithGemini({
            imageBase64: mockImageBase64,
            quizAnswers: mockQuizAnswers
        });
        console.log("Vision result:", vision);

        console.log("2. Testing computeFinalResult...");
        const finalResult = computeFinalResult({
            quizAnswers: mockQuizAnswers,
            vision
        });
        console.log("Final result:", JSON.stringify(finalResult, null, 2));

    } catch (err) {
        console.error("CAUGHT ERROR:");
        console.error(err.message);
        console.error(err.stack);
    }
}

runTest();
