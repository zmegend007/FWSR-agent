
import React from 'react';

interface Props {
  onStart: () => void;
  onSelectPlan: (planId: 'survey' | 'chat' | 'auditor') => void;
}

const HowItWorksPage: React.FC<Props> = ({ onStart, onSelectPlan }) => {
  return (
    <div className="bg-white min-h-screen">
      <section className="py-16 md:py-32 px-6 md:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <p className="text-technical text-red mb-6">Service Overview</p>
          <h1 className="text-4xl md:text-8xl font-heading font-black uppercase tracking-tighter leading-tight mb-8 md:mb-12">
            The Roadmap to <br /> <span className="text-slate-300 italic">2026.</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-500 font-light leading-relaxed max-w-3xl">
            Compliance with Berlin Fashion Week's 19 pillars is mandatory. We provide three levels of support depending on your internal resources.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-32 px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center md:text-left">

          <div className="border-t-4 border-black pt-12">
            <div className="text-6xl font-heading font-black text-slate-100 mb-4">01</div>
            <h3 className="text-xl font-heading font-bold uppercase mb-6">Identify Gaps</h3>
            <p className="text-slate-500 leading-relaxed mb-8">
              Our €19 assessment helps you determine exactly which standards you are failing. You receive a technical gap analysis that you can use as a roadmap for your internal team.
            </p>
            <button
              onClick={() => onSelectPlan('survey')}
              className="w-full py-5 bg-black text-white text-technical hover:bg-red transition-all"
            >
              Start Assessment — €19
            </button>
          </div>

          <div className="border-t-4 border-red pt-12">
            <div className="text-6xl font-heading font-black text-slate-100 mb-4">02</div>
            <h3 className="text-xl font-heading font-bold uppercase mb-6">Fix Documents</h3>
            <p className="text-slate-500 leading-relaxed mb-8">
              The €89 Workshop gives you access to our AI auditor. Upload your current drafts and receive specific technical instructions on how to amend them to meet the BFW requirements.
            </p>
            <button
              onClick={() => onSelectPlan('chat')}
              className="w-full py-5 border-2 border-black text-technical hover:bg-black hover:text-white transition-all"
            >
              Access Workspace — €89
            </button>
          </div>

          <div className="border-t-4 border-black pt-12 bg-black -m-4 p-8 md:p-12 text-white">
            <div className="text-6xl font-heading font-black text-white/10 mb-4">03</div>
            <h3 className="text-xl font-heading font-bold uppercase mb-6 italic">Full Management</h3>
            <p className="text-slate-400 leading-relaxed mb-8">
              For brands without a dedicated sustainability manager. Our €595 Auditor service handles the entire drafting and verification process, preparing your final BFW submission dossier.
            </p>
            <button
              onClick={() => onSelectPlan('auditor')}
              className="w-full py-5 bg-red text-white text-technical hover:bg-white hover:text-black transition-all"
            >
              Hire Auditor — €595
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
