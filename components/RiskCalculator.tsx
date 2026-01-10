
import React, { useState } from 'react';
import { QuizResults } from '../types';
import { MINIMUM_STANDARDS } from '../data/standards';
import { supabase } from '../services/supabaseClient';
import { useAuth } from './AuthContext';

interface Props {
  onComplete: (results: QuizResults) => void;
}

const RiskCalculator: React.FC<Props> = ({ onComplete }) => {
  const { user } = useAuth();

  // State for navigation
  const [currentStandardIndex, setCurrentStandardIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // State for data
  const [answers, setAnswers] = useState<QuizResults>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStandard = MINIMUM_STANDARDS[currentStandardIndex];
  const currentQuestion = currentStandard.questions[currentQuestionIndex];

  // Calculate Progress: (Completed Pillars / 19)
  // Or more granular: Total Questions Answered / Total Questions. 
  // Let's stick to Pillar progress for high-level UI.
  const progressPercentage = Math.round(((currentStandardIndex) / 19) * 100);

  const saveResultsToDatabase = async (finalAnswers: QuizResults) => {
    if (!user) return;

    // Simple Scoring: Yes = 1, Partial = 0.5, No = 0
    const values = Object.values(finalAnswers);
    let totalScore = 0;
    values.forEach(v => {
      if (v === 'yes') totalScore += 1;
      if (v === 'partial') totalScore += 0.5;
    });

    const maxScore = values.length;
    const finalScore = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

    try {
      await supabase.from('quiz_results').insert({
        user_id: user.id,
        results: finalAnswers,
        score: finalScore
      });
    } catch (error) {
      console.error('Failed to save quiz results:', error);
    }
  };

  const handleAnswer = async (value: string) => {
    // Record answer
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    // Navigation Logic
    if (currentQuestionIndex < currentStandard.questions.length - 1) {
      // Next Question in same Pillar
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // End of Pillar
      if (currentStandardIndex < MINIMUM_STANDARDS.length - 1) {
        // Next Pillar
        setCurrentStandardIndex(prev => prev + 1);
        setCurrentQuestionIndex(0);
      } else {
        // End of Assessment
        setIsSubmitting(true);
        await saveResultsToDatabase(newAnswers);
        onComplete(newAnswers);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-24">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="flex justify-between items-end border-b border-black pb-8 mb-12">
          <div>
            <p className="text-technical text-red mb-2">
              Pillar {currentStandardIndex + 1} / 19: {currentStandard.title}
            </p>
            <h2 className="text-2xl font-heading font-black uppercase">Technical Audit</h2>
          </div>
          <div className="text-right">
            <p className="text-technical text-slate-300">Overall Progress</p>
            <p className="text-xl font-black">{progressPercentage}%</p>
          </div>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-16">

          {/* Left: Context */}
          <div>
            <div className="bg-slate-50 p-8 border border-black/5 mb-8">
              <p className="text-sm font-bold uppercase tracking-widest mb-4 text-slate-400">Pillar Requirements</p>
              <p className="text-lg font-light leading-relaxed mb-6">{currentStandard.summary}</p>
              <ul className="space-y-2">
                {currentStandard.details.slice(0, 3).map((detail, idx) => (
                  <li key={idx} className="text-xs text-slate-500 italic">• {detail}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-[10px] uppercase tracking-widest">Question {currentQuestionIndex + 1} of {currentStandard.questions.length}</span>
              <div className="flex-1 h-px bg-slate-100"></div>
            </div>
          </div>

          {/* Right: Question */}
          <div className="space-y-8">
            <h3 className="text-2xl font-heading font-bold leading-tight">
              {currentQuestion.text}
            </h3>

            <div className="space-y-4">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  disabled={isSubmitting}
                  className="w-full p-6 border border-black/10 hover:border-black hover:bg-black hover:text-white transition-all text-left group flex items-start justify-between"
                >
                  <div className="flex flex-col">
                    <span className="text-lg font-bold">{option.label}</span>
                    {option.risk === 'high' && <span className="text-[10px] uppercase text-red-500 mt-1 font-black group-hover:text-red-300">High Risk</span>}
                  </div>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="text-[10px] text-slate-300 uppercase tracking-widest">
            Disclaimer: This assessment is a preliminary check based on 2026 guidelines.
            It does not guarantee official BFW acceptance. Consult a legal expert for binding advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiskCalculator;
