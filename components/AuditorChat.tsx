
import React, { useState, useRef, useEffect } from 'react';
import { gemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AuditorChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Compliance Workroom Initialized.\n\nI am here to help you satisfy the 19 Minimum Standards for your 2026 application. My analysis of your audit suggests gaps in several critical standards.\n\nShall we start by drafting your Social Code of Conduct, or would you like to verify your material certifications first?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const chatHistory = messages
        .filter(m => m.role !== 'thinking')
        .map(m => ({ role: m.role as 'user' | 'model', content: m.content }));
      
      chatHistory.push({ role: 'user', content: userMsg });
      const response = await gemini.generateAuditorResponse(chatHistory);
      
      setMessages(prev => [...prev, { role: 'model', content: response.text || "Connection lost. Please refresh." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', content: "The audit session has encountered an error. Please check your connection." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col h-[75vh]">
        
        {/* Workspace Header */}
        <div className="bg-black text-white p-10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-heading font-black uppercase tracking-tight">Compliance Workroom</h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-2">Active AI Session — Verified Auditor Module</p>
          </div>
          <div className="hidden sm:flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <div>
              <p>Cycle</p>
              <p className="text-white mt-1">July 2026</p>
            </div>
            <div>
              <p>Intelligence</p>
              <p className="text-red-600 mt-1">High-Fidelity</p>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 bg-white border border-black/5 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8 space-y-10">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-6 ${
                  m.role === 'user' 
                    ? 'bg-black text-white' 
                    : 'bg-slate-100 text-black border border-black/5'
                }`}>
                  <p className="text-base leading-relaxed whitespace-pre-wrap">{m.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-300">
                <span className="w-12 h-0.5 bg-red animate-pulse"></span>
                Auditor is synthesizing requirements...
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-8 border-t border-black/5 flex gap-4 bg-white">
            <label className="cursor-pointer bg-slate-100 p-4 hover:bg-slate-200 transition-colors flex items-center justify-center">
              <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
              <input type="file" className="hidden" />
            </label>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Query technical requirement..."
              className="flex-1 px-6 py-4 bg-slate-50 border border-black/10 focus:outline-none focus:border-black text-sm"
            />
            <button 
              type="submit"
              disabled={loading}
              className="bg-black text-white px-10 py-4 text-technical hover:bg-red transition-all"
            >
              Consult
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuditorChat;
