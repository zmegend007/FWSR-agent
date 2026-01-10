import { supabase } from "./supabaseClient";

export class GeminiService {

  // Complex task: Drafting and deep consultation
  async generateAuditorResponse(messages: { role: 'user' | 'model'; content: string }[]) {
    const lastMessage = messages[messages.length - 1].content;
    const { data, error } = await supabase.functions.invoke('generate-audit', {
      body: { task: 'chat', payload: { lastMessage } }
    });

    if (error) {
      console.error('Supabase Function Error:', error);
      return { text: "Auditor system is currently offline due to high traffic. Please try again later.", grounding: [] };
    }
    return { text: data.text, grounding: [] };
  }

  // Fast task: Explain a pillar on the landing page
  async explainPillar(pillarId: string, pillarTitle: string) {
    const { data, error } = await supabase.functions.invoke('generate-audit', {
      body: { task: 'explain_pillar', payload: { pillarId, pillarTitle } }
    });
    if (error) return "Sustainability Requirement explanation unavailable.";
    return data.text;
  }

  // Fast task: Real-time feedback during the 19-pillar audit
  async generateAuditFeedback(standardTitle: string, answer: string) {
    const { data, error } = await supabase.functions.invoke('generate-audit', {
      body: { task: 'audit_feedback', payload: { standardTitle, answer } }
    });
    if (error) return null;
    return data.text;
  }

  // Complex task: Executive summary for results page
  async generateExecutiveSummary(results: Record<string, string>, brandName: string) {
    const { data, error } = await supabase.functions.invoke('generate-audit', {
      body: { task: 'executive_summary', payload: { results, brandName } }
    });
    if (error) return "Executive Summary requires manual review. Please contact support.";
    return data.text;
  }

  async generateHeroBanner(prompt: string) {
    // Image generation is heavy/expensive. For now, we return null to fall back to static image.
    // To secure this, we'd need a separate function handling binary data or base64.
    return null;
  }
}

export const gemini = new GeminiService();
