
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-24 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 border-b border-black/5 pb-16 mb-20">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1 border border-red text-red text-[10px] font-black uppercase tracking-widest mb-6">Organization Profile</div>
            <h1 className="text-7xl md:text-9xl font-heading font-black uppercase tracking-tighter leading-none mb-8 italic text-red">The Hub.</h1>
            <p className="text-xl text-slate-500 font-light leading-relaxed">
              Fashion Week Sustainability Requirements (FWSR) is the independent governing body responsible for verifying showcase compliance for the 2026 cycle.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-24 items-start">
          <div className="space-y-12">
            <div>
              <h3 className="text-technical text-black mb-6">Our Mission</h3>
              <p className="text-lg text-slate-600 font-light leading-relaxed">
                We bridge the gap between creative excellence and regulatory necessity. The FWSR Hub was established following the success of the 2024 Copenhagen pilot to harmonize sustainability standards across major European fashion capitals, starting with Berlin.
              </p>
            </div>
            <div>
              <h3 className="text-technical text-black mb-6">The 2026 Mandate</h3>
              <p className="text-lg text-slate-600 font-light leading-relaxed">
                Beginning July 2026, the 19 Pillars are no longer optional "best practices." They are a fundamental prerequisite for participation in any official Fashion Week showcase. Our role is to provide brands with the technical roadmap and verification services needed to secure their place on the schedule.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-12 border border-black/5">
            <h3 className="text-technical text-red mb-10">Board Composition</h3>
            <div className="space-y-8">
              <div className="flex justify-between items-end border-b border-black/10 pb-4">
                <span className="text-xs font-black uppercase tracking-widest">Regulatory Affairs</span>
                <span className="text-sm italic font-light">Compliance Lead</span>
              </div>
              <div className="flex justify-between items-end border-b border-black/10 pb-4">
                <span className="text-xs font-black uppercase tracking-widest">Textile Science</span>
                <span className="text-sm italic font-light">Technical Committee</span>
              </div>
              <div className="flex justify-between items-end border-b border-black/10 pb-4">
                <span className="text-xs font-black uppercase tracking-widest">Human Rights Policy</span>
                <span className="text-sm italic font-light">Social Auditor</span>
              </div>
              <div className="flex justify-between items-end border-b border-black/10 pb-4">
                <span className="text-xs font-black uppercase tracking-widest">Industry Relations</span>
                <span className="text-sm italic font-light">Liaison Officer</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-12 leading-relaxed">
              The FWSR Hub operates independently of show organizers and commercial sponsors to ensure unbiased technical verification.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
