import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: req.body.message
    });

    return res.status(200).json({
      reply: response.text
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "AI जवाब नहीं दे पाया।"
    });
  }
}
