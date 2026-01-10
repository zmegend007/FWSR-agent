import React, { useState, useEffect } from 'react';
import { MINIMUM_STANDARDS } from '../data/standards';

interface Props {
  onStart: () => void;
}

const StandardsPage: React.FC<Props> = ({ onStart }) => {
  const [showFloatingCta, setShowFloatingCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingCta(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white min-h-screen pt-16 md:pt-24 pb-12 md:pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-24 border-b border-black/5 pb-8 md:pb-16">
          <p className="text-technical text-red mb-6">Technical Scope</p>
          <h1 className="font-heading font-black uppercase tracking-tighter leading-tight md:leading-[0.85] mb-6 md:mb-12" style={{ fontSize: 'clamp(1.5rem, 8vw, 7rem)' }}>
            The 19 Pillars of <br /> <span className="text-slate-300 italic">Compliance.</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-500 font-light leading-relaxed max-w-3xl">
            These mandatory requirements form the basis of the 2026 Fashion Week sustainability mandate. Every brand <span className="text-black font-bold uppercase italic">MUST</span> demonstrate absolute adherence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
          {MINIMUM_STANDARDS.map(s => (
            <div key={s.id} className="p-6 md:p-10 border border-black/5 hover:border-black transition-all group relative overflow-hidden">
              <div className="text-[10px] font-black text-red-600 mb-6 uppercase tracking-[0.3em]">Requirement {s.id}</div>
              <h3 className="text-2xl font-heading font-bold uppercase tracking-tighter mb-6 group-hover:italic transition-all">{s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-light mb-8">{s.summary}</p>
              <ul className="space-y-3">
                {s.details.slice(0, 3).map((detail, i) => (
                  <li key={i} className="text-[10px] font-black uppercase tracking-widest text-slate-300">/ {detail.slice(0, 45)}...</li>
                ))}
              </ul>
              <div className="absolute top-0 right-0 p-8 text-4xl font-heading font-black text-slate-50 group-hover:text-red/5 transition-colors select-none">
                {s.id}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-32 p-8 md:p-16 bg-black text-white text-center">
          <h2 className="text-2xl md:text-4xl font-heading font-bold uppercase mb-6 md:mb-8">Begin Technical Verification</h2>
          <button
            onClick={onStart}
            className="bg-red text-white w-full md:w-auto px-12 py-6 text-technical hover:bg-white hover:text-black transition-all"
          >
            Start Eligibility Survey
          </button>
        </div>
      </div>

      {/* Floating CTA */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${showFloatingCta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        <button
          onClick={onStart}
          className="bg-black text-white px-8 py-4 text-technical hover:bg-red transition-all shadow-2xl flex items-center gap-4"
        >
          <span>Check My Eligibility</span>
          <span className="text-red">→</span>
        </button>
      </div>
    </div>
  );
};

export default StandardsPage;