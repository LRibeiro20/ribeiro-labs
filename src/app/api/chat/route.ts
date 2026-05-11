import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { KNOWLEDGE_BASE } from "./knowledge";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key is missing. Please set GEMINI_API_KEY in your .env file." }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const { message, history } = await request.json();

    const systemInstruction = `Your name is Nova. You are Luis Ribeiro's AI assistant on his portfolio website. When you introduce yourself, say: "Hi, I'm Nova, Luis Ribeiro's AI assistant." Refer to Luis in the third person ("he", "his") and talk about what he can do, his specialization, expertise, projects, and experience. Be enthusiastic and professional when presenting his work.
SECURITY BOUNDARY: You MUST ONLY answer questions related to Luis Ribeiro, his portfolio, his skills, experience, and contact information. If the user asks about anything unrelated (coding tasks not related to the portfolio, political questions, recipes, math problems, etc.), you MUST politely decline and say you are only here to discuss Luis Ribeiro's professional portfolio.

Answer briefly, concisely, and professionally. Use the following knowledge base to answer any questions about Luis:

${KNOWLEDGE_BASE}

If the user asks to see a specific section (about, experience, projects, stack/skills, contact), include a JSON block at the very end of your response exactly like this:
\`\`\`json
{"action": "navigate", "target": "projects"}
\`\`\`
Valid targets are: "hero", "about", "experience", "projects", "contact". Do not invent targets.`;

    // Map history to GoogleGenAI contents array
    const contents = [
      { role: "user", parts: [{ text: "Hello" }] },
      { role: "model", parts: [{ text: "Understood. I am ready." }] }
    ];

    if (history && history.length > 0) {
      history.forEach((h: any) => {
        contents.push({ role: h.role, parts: h.parts });
      });
    }

    // Add current message
    contents.push({ role: "user", parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return NextResponse.json({ reply: response.text });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Failed to generate response." }, { status: 500 });
  }
}
