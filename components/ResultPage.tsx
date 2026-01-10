
import React, { useState, useEffect } from 'react';
import { QuizResults } from '../types';
import { gemini } from '../services/geminiService';

interface Props {
  results: QuizResults;
  onFix: () => void;
}

const ResultPage: React.FC<Props> = ({ results, onFix }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(true);

  const total = Object.keys(results).length;
  const compliant = Object.values(results).filter(v => v === 'yes').length;
  const unsure = Object.values(results).filter(v => v === 'unsure').length;
  const score = Math.round((compliant / total) * 100);

  const isHighRisk = score < 70;

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const text = await gemini.generateExecutiveSummary(results, "CLIENT_BRAND");
        setSummary(text || "Audit summary generation failed.");
      } catch (e) {
        setSummary("A technical error occurred while synthesizing the audit verdict. Please consult a manual auditor.");
      } finally {
        setLoadingSummary(false);
      }
    };
    fetchSummary();
  }, [results]);

  return (
    <div className="bg-white py-24 px-6 min-h-[80vh]">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-20 mb-32 items-end">
          <div className="lg:col-span-8">
            <div className="inline-block px-4 py-2 bg-red text-white text-technical mb-10">
              {isHighRisk ? 'Eligibility At Risk' : 'Partial Compliance Identified'}
            </div>
            <h1 className="text-7xl md:text-8xl font-heading font-black uppercase tracking-tighter leading-[0.85]">
              Audit <br/> <span className="text-red italic">{isHighRisk ? 'Deficit.' : 'Pending.'}</span>
            </h1>
          </div>
          <div className="lg:col-span-4 bg-black text-white p-10 shadow-2xl">
             <div className="flex justify-between items-baseline mb-6">
                <span className="text-technical text-slate-500">Compliance score</span>
                <span className="text-5xl font-heading font-black">{score}%</span>
             </div>
             <div className="w-full h-1 bg-white/10 mb-8">
                <div className="h-full bg-red transition-all duration-1000" style={{ width: `${score}%` }} />
             </div>
             <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
               {compliant} of 19 standards satisfied. {unsure} statuses unconfirmed. Strategic remediation is <span className="text-red uppercase underline">Recommended</span>.
             </p>
          </div>
        </div>

        {/* AI Strategic Summary */}
        <div className="mb-32">
          <p className="text-technical text-red mb-6 tracking-[0.4em]">Executive Strategic Summary</p>
          <div className="p-12 bg-slate-50 border border-black/5 min-h-[300px]">
            {loadingSummary ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-slate-200 w-3/4"></div>
                <div className="h-4 bg-slate-200 w-full"></div>
                <div className="h-4 bg-slate-200 w-5/6"></div>
              </div>
            ) : (
              <div className="prose prose-lg max-w-none text-slate-600 font-light whitespace-pre-wrap">
                {summary}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-px bg-black/10 border border-black/10 mb-32">
           {Object.entries(results).map(([id, val]) => (
             <div key={id} className={`p-6 flex flex-col items-center justify-center aspect-square ${val === 'yes' ? 'bg-slate-50' : val === 'unsure' ? 'bg-slate-200' : 'bg-black text-white'}`}>
                <span className="text-[10px] font-black mb-2">STD {id}</span>
                <span className={`text-xl font-heading font-black ${val === 'yes' ? 'text-black' : val === 'unsure' ? 'text-slate-500' : 'text-red'}`}>
                  {val === 'yes' ? '✓' : val === 'unsure' ? '?' : 'X'}
                </span>
             </div>
           ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-32">
          <div className="p-12 border border-black/5 bg-slate-50">
            <p className="text-technical text-red mb-4">Advisory Recommendation</p>
            <h3 className="text-3xl font-heading font-bold uppercase mb-8 leading-tight">Interactive <br/> Knowledge Hub</h3>
            <p className="text-sm text-slate-500 font-light mb-12">
              For brands that recognize their document gaps but require live technical feedback to resolve them. Upload your current brief for a Pillar-by-Pillar review.
            </p>
            <div className="text-4xl font-heading font-black mb-12">€89</div>
            <button onClick={() => onFix()} className="w-full py-6 border border-black text-technical hover:bg-black hover:text-white transition-all">Initialize Hub</button>
          </div>

          <div className="p-12 bg-black text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-6xl font-heading font-black text-white/5 pointer-events-none uppercase">Full</div>
            <p className="text-technical text-red mb-4">Premium Resolution</p>
            <h3 className="text-3xl font-heading font-bold uppercase mb-8 leading-tight italic">The Auditor <br/> Concierge</h3>
            <p className="text-sm text-slate-400 font-light mb-12">
              The definitive solution for brands lacking in-house capacity. We manage the entire dossier preparation to ensure 100% acceptance by the 2026 jury.
            </p>
            <div className="text-4xl font-heading font-black mb-12">€595</div>
            <button onClick={() => onFix()} className="w-full py-6 bg-red text-white text-technical hover:bg-white hover:text-black transition-all">Initialize Auditor</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
