
import React, { useState, useEffect } from 'react';
import { AppState } from '../types';
import { gemini } from '../services/geminiService';

interface Props {
  onStart: () => void;
  onNavigate: (state: AppState) => void;
  onSelectPlan: (planId: 'survey' | 'chat' | 'auditor') => void;
}

const LandingPage: React.FC<Props> = ({ onStart, onNavigate, onSelectPlan }) => {
  const [heroImage, setHeroImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const prompt = "Brutalist architecture, high fashion texture, deep shadows, monochromatic with red accents. Clean professional look. 4k.";
        const img = await gemini.generateHeroBanner(prompt);
        if (img) setHeroImage(img);
      } catch (e) {}
    };
    fetchHero();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center px-6 bg-black overflow-hidden">
        <div className="absolute inset-0">
          {heroImage && <img src={heroImage} alt="" className="w-full h-full object-cover opacity-40 grayscale" />}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="max-w-3xl animate-reveal">
            <div className="inline-block px-3 py-1 border border-red text-red text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              BFW 2026 Mandate
            </div>
            <h1 className="text-6xl md:text-8xl font-heading font-black leading-[0.9] tracking-tighter uppercase mb-10 text-white">
              Compliance <br/> <span className="italic text-red">Support.</span>
            </h1>
            <p className="text-xl text-slate-300 font-light leading-relaxed mb-12 max-w-xl">
              Berlin Fashion Week 2026 requires every brand to meet the 19 Sustainability Pillars. Failure to comply results in exclusion from the official schedule. 
              <br/><br/>
              Choose your compliance support level below.
            </p>
          </div>
        </div>
      </section>

      {/* Direct Offers Section */}
      <section className="py-24 px-6 -mt-20 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Plan 1 */}
            <div className="bg-white border border-black/5 p-12 shadow-2xl flex flex-col justify-between">
              <div>
                <p className="text-technical text-slate-400 mb-2">Tier 1 / €19</p>
                <h3 className="text-3xl font-heading font-black uppercase mb-8">Self-Assessment</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed mb-10">
                  A technical check to identify which of the 19 standards you currently meet and where your documentation gaps are. 
                  Best for brands that just need a starting point.
                </p>
                <ul className="space-y-4 mb-12">
                  <li className="text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                    <span className="w-4 h-[1px] bg-red"></span> Gap Analysis
                  </li>
                  <li className="text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                    <span className="w-4 h-[1px] bg-red"></span> Eligibility Report
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => onSelectPlan('survey')}
                className="w-full py-6 bg-black text-white text-technical hover:bg-red transition-all"
              >
                Start Assessment
              </button>
            </div>

            {/* Plan 2 */}
            <div className="bg-slate-50 border border-black/5 p-12 shadow-2xl flex flex-col justify-between">
              <div>
                <p className="text-technical text-red mb-2">Tier 2 / €89</p>
                <h3 className="text-3xl font-heading font-black uppercase mb-8">Compliance Workshop</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed mb-10">
                  Interactive workspace with our Auditor. Upload your current documents and receive real-time technical feedback on how to fix them for the 2026 cycle.
                </p>
                <ul className="space-y-4 mb-12">
                  <li className="text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                    <span className="w-4 h-[1px] bg-red"></span> AI Auditor Access
                  </li>
                  <li className="text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                    <span className="w-4 h-[1px] bg-red"></span> Document Reviews
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => onSelectPlan('chat')}
                className="w-full py-6 border border-black text-technical hover:bg-black hover:text-white transition-all"
              >
                Access Workspace
              </button>
            </div>

            {/* Plan 3 */}
            <div className="bg-black text-white p-12 shadow-2xl flex flex-col justify-between border-t-4 border-red">
              <div>
                <p className="text-technical text-red mb-2">Tier 3 / €595</p>
                <h3 className="text-3xl font-heading font-black uppercase mb-8 italic">Full Managed Audit</h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed mb-10">
                  We handle the entire dossier preparation. Our system drafts your Social CoCs, Material Lists, and RSLs to ensure 100% acceptance.
                </p>
                <ul className="space-y-4 mb-12">
                  <li className="text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                    <span className="w-4 h-[1px] bg-red"></span> Full Policy Drafting
                  </li>
                  <li className="text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                    <span className="w-4 h-[1px] bg-red"></span> Guaranteed Compliance
                  </li>
                </ul>
              </div>
              <button 
                onClick={() => onSelectPlan('auditor')}
                className="w-full py-6 bg-red text-white text-technical hover:bg-white hover:text-black transition-all"
              >
                Hire Auditor
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Simple Problem Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-heading font-black uppercase mb-8">No Documentation, No Show.</h2>
          <p className="text-xl text-slate-500 font-light leading-relaxed">
            Since the 2024 pilot, compliance is now verified by the FWSR Board. Brands that cannot prove Tier 4 transparency and 60% certified material volume will not be considered for the official schedule.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
