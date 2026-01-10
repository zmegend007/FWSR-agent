
import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { useAuth } from './AuthContext';

interface Plan {
  id: string;
  name: string;
  price: number;
}

interface Props {
  plan: Plan;
  onSuccess: () => void;
  onCancel: () => void;
}

const PaymentModal: React.FC<Props> = ({ plan, onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const handlePay = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      // Call Supabase Edge Function to create checkout session
      const { data, error: functionError } = await supabase.functions.invoke('create-checkout', {
        body: {
          planId: plan.id,
          planName: plan.name,
          planPrice: plan.price,
          userId: user.id,
          userEmail: user.email,
        }
      });

      if (functionError) throw functionError;
      if (data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment failed to initialize. Please try again.');
      setLoading(false);
    }
  };

  const getFeatures = () => {
    switch (plan.id) {
      case 'survey':
        return ["Personalized Eligibility Report", "Size-specific Requirement Mapping", "Technical Roadmap PDF"];
      case 'chat':
        return ["AI Compliance Chatbot Access", "Brand Brief Technical Review", "Standard-Specific Advice"];
      case 'auditor':
        return ["End-to-end Compliance Guidance", "Drafting Social CoC & RSL", "Validated BFW Dossier Export"];
      default:
        return [];
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-6">
      <div className="bg-white max-w-2xl w-full shadow-[0_80px_160px_-40px_rgba(0,0,0,0.6)] overflow-hidden animate-fade-in-up">
        <div className="p-12 md:p-20">
          <div className="flex justify-between items-start mb-16">
            <div>
              <div className="inline-block px-4 py-1.5 bg-red text-white text-[10px] font-black uppercase tracking-[0.3em] mb-4">Secured Access</div>
              <h2 className="text-4xl font-heading font-extrabold uppercase tracking-tighter leading-none">Access <br /> Resolution.</h2>
            </div>
            <button onClick={onCancel} className="w-12 h-12 flex items-center justify-center text-slate-400 hover:text-black transition-all hover:rotate-90">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="bg-slate-50 p-10 mb-16 border border-slate-100">
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Selected Package</p>
                <h4 className="font-extrabold text-2xl uppercase tracking-tight">{plan.name}</h4>
              </div>
              <span className="text-3xl font-black tracking-tighter">€{plan.price}.00</span>
            </div>
            <ul className="space-y-4 mt-10 pt-10 border-t border-slate-200">
              {getFeatures().map((feature, i) => (
                <li key={i} className="flex items-center gap-4 text-sm text-slate-500 font-bold uppercase tracking-wider">
                  <span className="text-red font-black">✓</span> {feature}
                </li>
              ))}
            </ul>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 text-red-600 text-sm font-bold border-l-4 border-red">
              {error}
            </div>
          )}

          <div className="space-y-8">
            <div className="bg-white border border-black p-8 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-6">
                <span className="text-lg font-black uppercase tracking-widest italic text-red">Stripe Secure Checkout</span>
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-red flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-red rounded-full"></div>
              </div>
            </div>

            <button
              onClick={handlePay}
              disabled={loading}
              className="w-full bg-black text-white font-black py-8 hover:bg-red transition-all flex items-center justify-center gap-6 shadow-2xl text-sm uppercase tracking-[0.3em]"
            >
              {loading ? (
                <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                `Pay €${plan.price} via Stripe`
              )}
            </button>

            <div className="flex flex-col items-center gap-6 pt-6">
              <p className="text-[10px] text-center text-slate-300 font-black uppercase tracking-[0.4em]">
                Secured by Stripe — Brands <span className="text-red">MUST</span> provide valid corporate details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;