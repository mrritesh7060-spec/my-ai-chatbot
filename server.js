
import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.post("/api/chat", async (req, res) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: req.body.message
    });

    res.json({ reply: response.text });
  } catch (error) {
    res.status(500).json({ error: "AI जवाब नहीं दे पाया।" });
  }
});

app.listen(process.env.PORT || 3000);
