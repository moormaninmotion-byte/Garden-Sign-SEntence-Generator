
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const model = 'gemini-2.5-flash';

export const generateSentenceAndExplanation = async (): Promise<{ sentence: string; explanation: string; }> => {
    try {
        const prompt = `
Generate a single, grammatically correct English sentence that is semantically ambiguous, meaning it can be interpreted in at least two different ways. The sentence should be clever and subtle in its ambiguity.
Also provide an explanation of the two main interpretations.

The explanation should:
- Start the first interpretation on a new line with "Interpretation 1:".
- Start the second interpretation on a new line with "Interpretation 2:".
- Not include any introductory or concluding phrases.

Return ONLY a JSON object with two keys: "sentence" and "explanation".
`;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        sentence: {
                            type: Type.STRING,
                            description: "The grammatically correct, semantically ambiguous sentence."
                        },
                        explanation: {
                            type: Type.STRING,
                            description: "An explanation of the two interpretations, each on a new line starting with 'Interpretation 1:' and 'Interpretation 2:'."
                        },
                    },
                    required: ["sentence", "explanation"],
                }
            }
        });
        
        const responseText = response.text.trim();
        const jsonResponse = JSON.parse(responseText);
        return jsonResponse;

    } catch (error) {
        console.error("Error generating content with Gemini API:", error);
        throw new Error("Failed to communicate with the Gemini API.");
    }
};
