
import React, { useState } from 'react';
import { QuizResults, ComplianceValue } from '../types';
import { MINIMUM_STANDARDS } from '../data/standards';
import { gemini } from '../services/geminiService';
import { supabase } from '../services/supabaseClient';
import { useAuth } from './AuthContext';

interface Props {
  onComplete: (results: QuizResults) => void;
}

const RiskCalculator: React.FC<Props> = ({ onComplete }) => {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizResults>({});
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const saveResultsToDatabase = async (finalAnswers: QuizResults) => {
    if (!user) return;

    const compliant = Object.values(finalAnswers).filter(v => v === 'yes').length;
    const score = Math.round((compliant / Object.keys(finalAnswers).length) * 100);

    try {
      await supabase.from('quiz_results').insert({
        user_id: user.id,
        results: finalAnswers,
        score: score
      });
    } catch (error) {
      console.error('Failed to save quiz results:', error);
    }
  };

  const handleAnswer = async (val: ComplianceValue) => {
    const currentStandard = MINIMUM_STANDARDS[step];
    const newAnswers = { ...answers, [currentStandard.id]: val };
    setAnswers(newAnswers);

    if (val !== 'unsure') {
      setIsAnalyzing(true);
      try {
        const feedback = await gemini.generateAuditFeedback(currentStandard.title, val);
        setAiFeedback(feedback || null);
      } catch (e) {
        console.error("Feedback error", e);
      } finally {
        setIsAnalyzing(false);
      }
    } else {
      setAiFeedback("This gap will be flagged as a critical risk in your final report.");
    }

    setTimeout(async () => {
      setAiFeedback(null);
      if (step < MINIMUM_STANDARDS.length - 1) {
        setStep(step + 1);
      } else {
        // Save to database before completing
        await saveResultsToDatabase(newAnswers);
        onComplete(newAnswers);
      }
    }, 2500);
  };

  const currentStandard = MINIMUM_STANDARDS[step];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-24">
      <div className="max-w-4xl w-full">
        <div className="flex justify-between items-end border-b border-black pb-8 mb-16">
          <div>
            <p className="text-technical text-red mb-2">Standard {currentStandard.id} / 19</p>
            <h2 className="text-3xl font-heading font-black uppercase">{currentStandard.title}</h2>
          </div>
          <div className="text-right">
            <p className="text-technical text-slate-300">Progress</p>
            <p className="text-xl font-black">{Math.round(((step + 1) / 19) * 100)}%</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-lg text-slate-500 font-light leading-relaxed mb-8">
              {currentStandard.summary}
            </p>
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Required Proof:</p>
              {currentStandard.details.slice(0, 3).map((d, i) => (
                <p key={i} className="text-xs text-slate-400 italic leading-relaxed">• {d}</p>
              ))}
            </div>
          </div>

          <div className="relative">
            {aiFeedback ? (
              <div className="bg-black text-white p-8 animate-reveal h-full flex flex-col justify-center">
                <p className="text-technical text-red mb-4">Auditor Note</p>
                <p className="text-lg italic font-light">"{aiFeedback}"</p>
              </div>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={() => handleAnswer('yes')}
                  className="w-full p-8 bg-slate-50 border border-black/5 hover:bg-black hover:text-white transition-all text-left group"
                >
                  <span className="text-xl font-heading font-bold uppercase">Requirement Met</span>
                  <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest">Documents are ready</p>
                </button>
                <button
                  onClick={() => handleAnswer('no')}
                  className="w-full p-8 border border-black/5 hover:border-red hover:text-red transition-all text-left"
                >
                  <span className="text-xl font-heading font-bold uppercase">Missing Documentation</span>
                  <p className="text-[10px] text-red-400 mt-2 uppercase tracking-widest">Action needed</p>
                </button>
                <button
                  onClick={() => handleAnswer('unsure')}
                  className="w-full p-8 bg-slate-100/50 border border-dashed border-black/10 hover:border-black transition-all text-left"
                >
                  <span className="text-xl font-heading font-bold uppercase text-slate-400">Unsure / Unconfirmed</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-12 text-center max-w-2xl mx-auto">
        <p className="text-[10px] text-slate-300 uppercase tracking-widest">
          Disclaimer: This assessment is a preliminary check based on 2026 guidelines.
          It does not guarantee official BFW acceptance. Consult a legal expert for binding advice.
        </p>
      </div>
    </div>
  );
};

export default RiskCalculator;
