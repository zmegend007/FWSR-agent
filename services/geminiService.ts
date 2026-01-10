
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  // Complex task: Drafting and deep consultation
  async generateAuditorResponse(messages: { role: 'user' | 'model'; content: string }[]) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      })),
      config: {
        systemInstruction: SYSTEM_PROMPT,
        thinkingConfig: { thinkingBudget: 32768 },
        tools: [{ googleSearch: {} }],
      },
    });

    return {
      text: response.text,
      grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  }

  // Fast task: Explain a pillar on the landing page
  async explainPillar(pillarId: string, pillarTitle: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Briefly explain the technical importance of Pillar ${pillarId}: ${pillarTitle} for a fashion brand applying to a major fashion week. Keep it under 60 words, focus on regulatory risk.`,
    });
    return response.text;
  }

  // Fast task: Real-time feedback during the 19-pillar audit
  async generateAuditFeedback(standardTitle: string, answer: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const prompt = answer === 'yes' 
      ? `A brand claims they satisfy "${standardTitle}". Briefly state one technical document they MUST have ready to prove this.`
      : `A brand admits they FAIL "${standardTitle}". Briefly state the primary regulatory risk this creates for their Fashion Week application.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  }

  // Complex task: Executive summary for results page
  async generateExecutiveSummary(results: Record<string, string>, brandName: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const prompt = `Based on these 19-pillar audit results for brand "${brandName}": ${JSON.stringify(results)}. 
    Write a 3-paragraph executive summary. 
    Para 1: Overall eligibility verdict. 
    Para 2: Most critical technical gaps identified. 
    Para 3: Mandatory next steps. 
    Tone: Senior Auditor. Professional and firm.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: { thinkingConfig: { thinkingBudget: 15000 } }
    });
    return response.text;
  }

  async generateHeroBanner(prompt: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    return null;
  }
}

export const gemini = new GeminiService();
