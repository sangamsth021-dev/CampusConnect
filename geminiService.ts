
import { GoogleGenAI } from "@google/genai";

const getApiKey = (): string | undefined => {
    try {
        return process.env.API_KEY;
    } catch (e) {
        console.warn("API_KEY not found in process.env. This is expected in a browser-only environment.");
        return undefined;
    }
};

const API_KEY = getApiKey();

const systemInstruction = `You are CampusConnect's Smart Assistant, an expert AI designed to help college students. 
Your tone should be friendly, helpful, and encouraging. 
Provide concise and accurate answers related to academics, campus life, and general knowledge. 
If a question is outside your scope, politely state that you can only assist with college-related queries.
Example topics: Explaining academic concepts, providing study tips, summarizing texts, helping with assignment ideas, and answering questions about campus services.
Do not answer questions that are personal or unrelated to education and campus life.`;

export async function getSmartAssistantResponse(prompt: string): Promise<string> {
    if (!API_KEY) {
        console.log("Gemini API key not found. Returning a mock response.");
        return new Promise(resolve => setTimeout(() => resolve(`This is a mock response because the Gemini API key is not configured. To enable this feature, you would need to set up the API key. \n\nYou asked: "${prompt}"`), 1000));
    }

    try {
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Sorry, I encountered an error while processing your request. Please try again later.";
    }
}
