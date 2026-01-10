import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenAI } from "npm:@google/genai"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { task, payload } = await req.json()
        const apiKey = Deno.env.get('GEMINI_API_KEY')
        if (!apiKey) throw new Error('GEMINI_API_KEY is not set')
        const ai = new GoogleGenAI({ apiKey })

        let prompt = ''
        let model = 'gemini-2.0-flash-exp'
        let systemInstruction = undefined

        switch (task) {
            case 'audit_feedback':
                prompt = payload.answer === 'yes'
                    ? `A brand claims they satisfy "${payload.standardTitle}". Briefly state one technical document they MUST have ready to prove this. Keep it under 20 words.`
                    : `A brand admits they FAIL "${payload.standardTitle}". Briefly state the primary regulatory risk this creates for their Fashion Week application. Keep it under 20 words.`
                break;

            case 'chat':
                // Payload is history: { role: string, content: string }[]
                // We'll just take the last message or construct a chat
                model = 'gemini-2.0-flash-exp' // Use flash for chat speed
                // Simply pass the last user message with context. 
                // For a full chat, we'd need to pass history to the model, but for this proxy let's keep it simple.
                prompt = `You are a Berlin Fashion Week Sustainability Auditor. Answer this user question: ${payload.lastMessage}`
                break;

            case 'explain_pillar':
                prompt = `Briefly explain the technical importance of Pillar ${payload.pillarId}: ${payload.pillarTitle} for a fashion brand applying to a major fashion week. Keep it under 60 words, focus on regulatory risk.`
                break;

            case 'executive_summary':
                model = 'gemini-2.0-flash-exp'
                prompt = `Based on these 19-pillar audit results: ${JSON.stringify(payload.results)}. Write a 3-paragraph executive summary. 1: Verdict. 2: Gaps. 3: Next Steps. Tone: Senior Auditor.`
                break;

            default:
                throw new Error('Invalid task')
        }

        const response = await ai.models.generateContent({
            model,
            contents: {
                role: 'user',
                parts: [{ text: prompt }]
            },
            config: systemInstruction ? { systemInstruction } : undefined
        })

        const text = response.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated."

        return new Response(
            JSON.stringify({ text }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
})
