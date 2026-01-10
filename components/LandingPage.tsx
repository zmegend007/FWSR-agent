
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
  const [showReportPreview, setShowReportPreview] = useState(false);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const prompt = "Brutalist architecture, high fashion texture, deep shadows, monochromatic with red accents. Clean professional look. 4k.";
        const img = await gemini.generateHeroBanner(prompt);
        if (img) setHeroImage(img);
      } catch (e) { }
    };
    fetchHero();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
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
            <h1 className="text-4xl md:text-8xl font-heading font-black leading-tight md:leading-[0.9] tracking-tighter uppercase mb-6 md:mb-10 text-white">
              Compliance <br /> <span className="italic text-red">Support.</span>
            </h1>
            <p className="text-base md:text-xl text-slate-300 font-light leading-relaxed mb-8 md:mb-12 max-w-xl">
              Berlin Fashion Week 2026 requires every brand to meet the 19 Sustainability Pillars. Failure to comply results in exclusion from the official schedule.
              <br /><br />
              Choose your compliance support level below.
            </p>
          </div>
        </div>
      </section>

      {/* Direct Offers Section */}
      <section className="py-12 md:py-24 px-4 md:px-6 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 -mt-20 md:-mt-32">

            {/* Plan 1 */}
            <div className="bg-white border border-black/5 p-6 md:p-12 shadow-2xl flex flex-col justify-between">
              <div>
                <p className="text-technical text-slate-400 mb-2">Tier 1 / €19</p>
                <h3 className="text-2xl md:text-3xl font-heading font-black uppercase mb-6 md:mb-8">Self-Assessment</h3>
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
              <div className="space-y-3">
                <button
                  onClick={() => onSelectPlan('survey')}
                  className="w-full py-6 bg-black text-white text-technical hover:bg-red transition-all"
                >
                  Start Assessment
                </button>
                <button
                  onClick={() => setShowReportPreview(true)}
                  className="w-full py-3 border border-black/10 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black hover:border-black transition-all"
                >
                  Preview Sample Report
                </button>
              </div>
            </div>

            {/* Plan 2 */}
            <div className="bg-slate-50 border border-black/5 p-6 md:p-12 shadow-2xl flex flex-col justify-between">
              <div>
                <p className="text-technical text-red mb-2">Tier 2 / €89</p>
                <h3 className="text-2xl md:text-3xl font-heading font-black uppercase mb-6 md:mb-8">Compliance Workshop</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed mb-8 md:mb-10">
                  Interactive workspace with our Auditor. Upload your current documents and receive real-time technical feedback on how to fix them for the 2026 cycle.
                </p>
                <ul className="space-y-4 mb-8 md:mb-12">
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
            <div className="bg-black text-white p-6 md:p-12 shadow-2xl flex flex-col justify-between border-t-4 border-red">
              <div>
                <p className="text-technical text-red mb-2">Tier 3 / €595</p>
                <h3 className="text-2xl md:text-3xl font-heading font-black uppercase mb-6 md:mb-8 italic">Full Managed Audit</h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed mb-8 md:mb-10">
                  We handle the entire dossier preparation. Our system drafts your Social CoCs, Material Lists, and RSLs to ensure 100% acceptance.
                </p>
                <ul className="space-y-4 mb-8 md:mb-12">
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

      {/* Sample Report Preview Modal */}
      {showReportPreview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-6 overflow-y-auto">
          <div className="bg-white max-w-4xl w-full shadow-[0_80px_160px_-40px_rgba(0,0,0,0.6)] my-4 md:my-8 overflow-hidden rounded-sm">
            <div className="p-6 md:p-12 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="inline-block px-4 py-1.5 bg-red text-white text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                    Sample Output
                  </div>
                  <h2 className="text-3xl font-heading font-extrabold uppercase tracking-tighter">
                    Eligibility Report Preview
                  </h2>
                </div>
                <button onClick={() => setShowReportPreview(false)} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-black transition-all hover:rotate-90">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Sample Report Content */}
              <div className="border border-black/10 p-8 mb-8 bg-slate-50">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Brand Assessment</p>
                    <p className="text-xl font-heading font-bold uppercase">Sample Fashion Co.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Score</p>
                    <p className="text-3xl font-heading font-black text-red">47%</p>
                  </div>
                </div>
                <div className="w-full h-2 bg-slate-200 mb-6">
                  <div className="h-full bg-red" style={{ width: '47%' }}></div>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-red mb-2">Eligibility Status: AT RISK</p>
                <p className="text-sm text-slate-500">9 of 19 pillars satisfied. Critical gaps identified in materials, supply chain, and documentation.</p>
              </div>

              {/* Sample Breakdown */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-black text-white p-6 text-center">
                  <p className="text-3xl font-heading font-black mb-1">9</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Compliant</p>
                </div>
                <div className="bg-red text-white p-6 text-center">
                  <p className="text-3xl font-heading font-black mb-1">7</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/70">Missing</p>
                </div>
                <div className="bg-slate-200 p-6 text-center">
                  <p className="text-3xl font-heading font-black mb-1">3</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Unclear</p>
                </div>
              </div>

              {/* Sample Critical Gaps */}
              <div className="mb-8">
                <p className="text-[10px] font-black uppercase tracking-widest text-red mb-4">Critical Gaps Identified</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 p-4 bg-red/5 border-l-4 border-red">
                    <span className="text-red font-black">07</span>
                    <span className="text-sm">60% Certified Fiber Threshold — Missing material certificates</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-red/5 border-l-4 border-red">
                    <span className="text-red font-black">08</span>
                    <span className="text-sm">REACH-Compliant RSL — No restricted substances list provided</span>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-red/5 border-l-4 border-red">
                    <span className="text-red font-black">10</span>
                    <span className="text-sm">Supplier Code of Conduct — Not shared with supply chain</span>
                  </div>
                </div>
              </div>

              {/* AI Summary Preview */}
              <div className="bg-black text-white p-8 mb-8">
                <p className="text-[10px] font-black uppercase tracking-widest text-red mb-4">AI Auditor Summary</p>
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "Based on your assessment, Sample Fashion Co. is currently ineligible for the 2026 Berlin Fashion Week schedule. The primary concerns are material certification gaps and missing supply chain documentation. Immediate action is required on Pillars 07, 08, and 10 to achieve minimum compliance..."
                </p>
              </div>

              <button
                onClick={() => { setShowReportPreview(false); onSelectPlan('survey'); }}
                className="w-full py-6 bg-black text-white text-technical hover:bg-red transition-all"
              >
                Get Your Report — €19
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Simple Problem Section */}
      <section className="py-16 md:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-black uppercase mb-4 md:mb-8">No Documentation, No Show.</h2>
          <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed">
            Since the 2024 pilot, compliance is now verified by the FWSR Board. Brands that cannot prove Tier 4 transparency and 60% certified material volume will not be considered for the official schedule.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
