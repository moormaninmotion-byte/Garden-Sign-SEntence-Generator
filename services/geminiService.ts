
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = 'gemini-2.5-flash';

export const generateAmbiguousSentence = async (): Promise<string> => {
    try {
        const prompt = `Generate a single, grammatically correct English sentence that is semantically ambiguous, meaning it can be interpreted in at least two different ways. The sentence should be clever and subtle in its ambiguity. Do not provide any explanation or context. Just return the sentence itself.`;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        
        return response.text;
    } catch (error) {
        console.error("Error generating sentence with Gemini API:", error);
        throw new Error("Failed to communicate with the Gemini API.");
    }
};

export const generateExplanation = async (sentence: string): Promise<string> => {
    try {
        const prompt = `Explain the semantic ambiguity in the following sentence: "${sentence}"

Provide a brief explanation outlining the two main interpretations.
- Start with "Interpretation 1:".
- Then, start a new line for "Interpretation 2:".
- Do not repeat the original sentence in your explanation.
- Do not include any introductory or concluding phrases. Just the explanations.`;
        
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error generating explanation with Gemini API:", error);
        throw new Error("Failed to communicate with the Gemini API for explanation.");
    }
};
