
import React, { useState } from 'react';
import { AppState } from '../types';
import { GlowingEffect } from './ui/glowing-effect';

interface Props {
  onStart: () => void;
  onNavigate: (state: AppState) => void;
  onSelectPlan: (planId: 'survey' | 'chat' | 'auditor') => void;
}

const LandingPage: React.FC<Props> = ({ onStart, onNavigate, onSelectPlan }) => {
  const [showReportPreview, setShowReportPreview] = useState(false);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 bg-black overflow-hidden py-24">
        {/* Abstract Background - Premium Noise & Gradients */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-neutral-950"></div>
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
          {/* Gradient Mesh fallback/simple version */}
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-red/10 blur-[120px] rounded-full mix-blend-screen animate-pulse duration-1000"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-900/10 blur-[120px] rounded-full mix-blend-screen"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 text-center flex flex-col items-center">
          <div className="animate-reveal">
            <h1 className="font-heading font-black leading-[0.9] tracking-tighter uppercase mb-8 text-white text-center mix-blend-difference" style={{ fontSize: 'clamp(3rem, 12vw, 9rem)' }}>
              GET READY <br /> OR GET <span className="text-red">REJECTED</span>
            </h1>
            <p className="text-base md:text-xl text-slate-400 font-sans font-light leading-relaxed mb-12 max-w-2xl mx-auto tracking-wide">
              Berlin Fashion Week 2026 mandates compliance with 19 Sustainability Pillars. <br className="hidden md:block" />
              Brands without verified data will be excluded from the schedule.
            </p>

            <button
              onClick={() => {
                const element = document.getElementById('offers');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/20 text-white font-heading font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300"
            >
              Start Compliance Check
            </button>
          </div>
        </div>
      </section>

      {/* Direct Offers Section */}
      <section id="offers" className="py-24 px-4 md:px-6 relative z-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter mb-4">Choose Your Level</h2>
            <div className="w-24 h-1 bg-red mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

            {/* Plan 1: Self-Assessment */}
            <div className="relative group bg-white border border-neutral-200 p-8 flex flex-col h-full hover:border-black transition-colors duration-300">
              <div className="absolute inset-0 bg-neutral-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-8">
                  <h3 className="font-heading font-black text-2xl uppercase mb-2">Self-Assessment</h3>
                  <p className="text-sm font-sans text-neutral-500 leading-relaxed min-h-[3rem]">
                    For brands that need a starting point. Verify which pillars you meet instantly.
                  </p>
                </div>

                <div className="mb-8 p-6 bg-neutral-50 border border-neutral-100 text-center group-hover:bg-white transition-colors">
                  <span className="block text-xs font-heading uppercase tracking-widest text-neutral-400 mb-1">One-Time Fee</span>
                  <span className="block text-5xl font-heading font-black tracking-tight">€19</span>
                </div>

                <ul className="space-y-4 mb-auto">
                  {['Gap Analysis Report', 'Eligibility Score', 'PDF Verification'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-xs font-heading uppercase tracking-wider text-black">
                      <span className="w-1.5 h-1.5 bg-red rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 space-y-3">
                  <button
                    onClick={() => onSelectPlan('survey')}
                    className="w-full py-4 bg-black text-white font-heading font-bold uppercase tracking-widest hover:bg-red transition-all duration-300 text-xs md:text-sm"
                  >
                    Get Report
                  </button>
                  <button
                    onClick={() => setShowReportPreview(true)}
                    className="w-full py-3 text-xs font-heading font-bold uppercase tracking-widest text-neutral-400 hover:text-black underline decoration-1 underline-offset-4 decoration-transparent hover:decoration-black transition-all"
                  >
                    Preview Sample
                  </button>
                </div>
              </div>
            </div>

            {/* Plan 2: Workshop */}
            <div className="relative group bg-neutral-50 border border-neutral-200 p-8 flex flex-col h-full hover:border-black transition-colors duration-300">
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-8">
                  <h3 className="font-heading font-black text-2xl uppercase mb-2">Workspace</h3>
                  <p className="text-sm font-sans text-neutral-500 leading-relaxed min-h-[3rem]">
                    Interactive tools to fix documentation gaps with real-time feedback.
                  </p>
                </div>

                <div className="mb-8 p-6 bg-white border border-neutral-100 text-center">
                  <span className="block text-xs font-heading uppercase tracking-widest text-red mb-1">Best Value</span>
                  <span className="block text-5xl font-heading font-black tracking-tight text-neutral-900">€89</span>
                </div>

                <ul className="space-y-4 mb-auto">
                  {['AI Auditor Analysis', 'Document Reviews', 'Fix-It Guides'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-xs font-heading uppercase tracking-wider text-black">
                      <span className="w-1.5 h-1.5 bg-red rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <button
                    onClick={() => onSelectPlan('chat')}
                    className="w-full py-4 border-2 border-black text-black font-heading font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 text-xs md:text-sm"
                  >
                    Enter Workspace
                  </button>
                </div>
              </div>
            </div>

            {/* Plan 3: Auditor */}
            <div className="relative group bg-black text-white p-8 flex flex-col h-full overflow-hidden">
              <div className="absolute inset-0 bg-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              {/* Custom white glow for black card */}
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} variant="default" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-8">
                  <h3 className="font-heading font-black text-2xl uppercase mb-2 text-white italic">Full Audit</h3>
                  <p className="text-sm font-sans text-neutral-400 leading-relaxed min-h-[3rem]">
                    We draft every policy and document for you. 100% Guaranteed Acceptance.
                  </p>
                </div>

                <div className="mb-8 p-6 bg-neutral-900 border border-neutral-800 text-center group-hover:border-red/30 transition-colors">
                  <span className="block text-xs font-heading uppercase tracking-widest text-white/50 mb-1">Full Service</span>
                  <span className="block text-5xl font-heading font-black tracking-tight">€595</span>
                </div>

                <ul className="space-y-4 mb-auto">
                  {['Policy Drafting (All 19 Pillars)', 'Supply Chain Verification', 'Guaranteed Pass'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-xs font-heading uppercase tracking-wider text-white">
                      <span className="w-1.5 h-1.5 bg-red rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <button
                    onClick={() => onSelectPlan('auditor')}
                    className="w-full py-4 bg-red text-white font-heading font-bold uppercase tracking-widest hover:bg-white hover:text-red transition-all duration-300 text-xs md:text-sm"
                  >
                    Hire Auditor
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Sample Report Preview Modal */}
      {showReportPreview && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-6 overflow-y-auto">
          <div className="bg-white max-w-4xl w-full shadow-2xl my-4 md:my-8 overflow-hidden rounded-sm animate-reveal">
            <div className="p-6 md:p-12 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="inline-block px-3 py-1 bg-red text-white text-[10px] font-heading uppercase tracking-[0.2em] mb-2">
                    Sample Output
                  </div>
                  <h2 className="text-2xl md:text-3xl font-heading font-black uppercase tracking-tight">
                    Eligibility Report
                  </h2>
                </div>
                <button onClick={() => setShowReportPreview(false)} className="group p-2">
                  <svg className="w-6 h-6 text-neutral-400 group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Sample Report Content */}
              <div className="border border-neutral-200 p-8 mb-8 bg-neutral-50">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h4 className="font-heading font-bold uppercase text-lg">Sample Brand Ltd.</h4>
                    <p className="text-xs font-heading uppercase text-neutral-400 tracking-wider">Audit Date: 12.01.2026</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-heading font-black text-red">47%</div>
                    <p className="text-[10px] font-heading uppercase text-neutral-400 tracking-widest">Compliance Score</p>
                  </div>
                </div>
                <div className="w-full h-1 bg-neutral-200 mb-6">
                  <div className="h-full bg-red" style={{ width: '47%' }}></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h5 className="font-heading font-bold uppercase text-xs tracking-widest mb-4 border-b border-neutral-200 pb-2">Critical Gaps</h5>
                    <ul className="space-y-2">
                      <li className="text-sm font-sans flex items-start gap-2">
                        <span className="text-red font-bold">×</span>
                        <span className="text-neutral-600">Missing RSL (Restricted Substances List)</span>
                      </li>
                      <li className="text-sm font-sans flex items-start gap-2">
                        <span className="text-red font-bold">×</span>
                        <span className="text-neutral-600">Tier 2 Supplier Map Incomplete</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-heading font-bold uppercase text-xs tracking-widest mb-4 border-b border-neutral-200 pb-2">Auditor Notes</h5>
                    <p className="text-sm font-sans text-neutral-600 italic leading-relaxed">
                      "The brand fails to meet the 60% certified materials threshold required for Pillar 4. Immediate collection of GOTS/GRS certificates is needed."
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-black text-white p-8 text-center">
                <h3 className="font-heading font-bold uppercase text-xl mb-2">Ready to check your brand?</h3>
                <p className="text-neutral-400 text-sm mb-6">Get your personalized gap analysis in 3 minutes.</p>
                <button
                  onClick={() => { setShowReportPreview(false); onSelectPlan('survey'); }}
                  className="inline-block bg-red text-white px-8 py-3 font-heading font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                >
                  Start Assessment — €19
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
