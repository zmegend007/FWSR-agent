
import React from 'react';

interface Props {
  onStart: () => void;
  onSelectPlan: (planId: 'survey' | 'chat' | 'auditor') => void;
}

const HowItWorksPage: React.FC<Props> = ({ onStart, onSelectPlan }) => {
  return (
    <div className="bg-white min-h-screen">
      <section className="py-32 px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <p className="text-technical text-red mb-6">Service Overview</p>
          <h1 className="text-6xl md:text-8xl font-heading font-black uppercase tracking-tighter leading-tight mb-12">
            The Roadmap to <br/> <span className="text-slate-300 italic">2026.</span>
          </h1>
          <p className="text-2xl text-slate-500 font-light leading-relaxed max-w-3xl">
            Compliance with Berlin Fashion Week's 19 pillars is mandatory. We provide three levels of support depending on your internal resources.
          </p>
        </div>
      </section>

      <section className="py-32 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          
          <div className="border-t border-black pt-12">
            <h3 className="text-2xl font-heading font-bold uppercase mb-6">1. Identify Gaps</h3>
            <p className="text-slate-500 leading-relaxed mb-8">
              Our €19 assessment helps you determine exactly which standards you are failing. You receive a technical gap analysis that you can use as a roadmap for your internal team.
            </p>
            <button onClick={() => onSelectPlan('survey')} className="text-technical text-red hover:underline">Start Assessment →</button>
          </div>

          <div className="border-t border-black pt-12">
            <h3 className="text-2xl font-heading font-bold uppercase mb-6">2. Fix Documents</h3>
            <p className="text-slate-500 leading-relaxed mb-8">
              The €89 Workshop gives you access to our AI auditor. Upload your current drafts and receive specific technical instructions on how to amend them to meet the BFW requirements.
            </p>
            <button onClick={() => onSelectPlan('chat')} className="text-technical text-red hover:underline">Access Workspace →</button>
          </div>

          <div className="border-t border-black pt-12">
            <h3 className="text-2xl font-heading font-bold uppercase mb-6">3. Full Management</h3>
            <p className="text-slate-500 leading-relaxed mb-8">
              For brands without a dedicated sustainability manager. Our €595 Auditor service handles the entire drafting and verification process, preparing your final BFW submission dossier.
            </p>
            <button onClick={() => onSelectPlan('auditor')} className="text-technical text-red hover:underline">Hire Auditor →</button>
          </div>

        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
