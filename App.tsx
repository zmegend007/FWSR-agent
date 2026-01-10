
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './components/AuthContext';
import LandingPage from './components/LandingPage';
import HowItWorksPage from './components/HowItWorksPage';
import NewsPage from './components/NewsPage';
import StandardsPage from './components/StandardsPage';
import AboutPage from './components/AboutPage';
import RiskCalculator from './components/RiskCalculator';
import ResultPage from './components/ResultPage';
import PaymentModal from './components/PaymentModal';
import AuditorChat from './components/AuditorChat';
import AuthModal from './components/AuthModal';
import { AppState, QuizResults } from './types';

export type Plan = {
  id: 'survey' | 'chat' | 'auditor';
  name: string;
  price: number;
};

const PLANS: Record<string, Plan> = {
  survey: { id: 'survey', name: 'Eligibility Roadmap', price: 19 },
  chat: { id: 'chat', name: 'Knowledge Hub', price: 89 },
  auditor: { id: 'auditor', name: 'The Auditor', price: 595 },
};

const AppContent: React.FC = () => {
  const { user, loading, signOut } = useAuth();
  const [state, setState] = useState<AppState>('landing');
  const [results, setResults] = useState<QuizResults | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingPlanId, setPendingPlanId] = useState<'survey' | 'chat' | 'auditor' | null>(null);

  const navigate = (newState: AppState) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setState(newState);
  };

  const handleQuizComplete = (data: QuizResults) => {
    setResults(data);
    setState('result');
  };

  const selectPlanAndPay = (planId: 'survey' | 'chat' | 'auditor') => {
    if (!user) {
      // Require login before purchasing
      setPendingPlanId(planId);
      setShowAuthModal(true);
      return;
    }
    setSelectedPlan(PLANS[planId]);
    setState('payment');
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    if (pendingPlanId) {
      setSelectedPlan(PLANS[pendingPlanId]);
      setState('payment');
      setPendingPlanId(null);
    }
  };

  const handlePaymentSuccess = () => {
    if (selectedPlan?.id === 'survey') {
      navigate('calculating');
    } else {
      navigate('chat');
    }
  };

  const showFooter = !['calculating', 'chat', 'payment'].includes(state);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] bg-white/90 backdrop-blur-md border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="cursor-pointer flex items-center gap-4" onClick={() => navigate('landing')}>
            <span className="font-heading font-black text-xl tracking-tighter uppercase">FWSR</span>
          </div>

          <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-widest">
            <button onClick={() => navigate('how-it-works')} className={state === 'how-it-works' ? 'text-red underline underline-offset-4' : 'text-slate-400 hover:text-black transition-colors'}>How it Works</button>
            <button onClick={() => navigate('standards')} className={state === 'standards' ? 'text-red underline underline-offset-4' : 'text-slate-400 hover:text-black transition-colors'}>19 Pillars</button>
            <button onClick={() => navigate('about')} className={state === 'about' ? 'text-red underline underline-offset-4' : 'text-slate-400 hover:text-black transition-colors'}>About</button>
            <button onClick={() => navigate('news')} className={state === 'news' ? 'text-red underline underline-offset-4' : 'text-slate-400 hover:text-black transition-colors'}>News</button>

            {user ? (
              <div className="flex items-center gap-4 ml-4">
                <span className="text-slate-400 normal-case">{user.email}</span>
                <button
                  onClick={() => signOut()}
                  className="text-slate-400 hover:text-red transition-colors"
                >
                  Sign Out
                </button>
                <button
                  onClick={() => selectPlanAndPay('survey')}
                  className="bg-black text-white px-5 py-2 hover:bg-red transition-all"
                >
                  Verify Status
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4 ml-4">
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="text-slate-400 hover:text-black transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => selectPlanAndPay('survey')}
                  className="bg-black text-white px-5 py-2 hover:bg-red transition-all"
                >
                  Verify Status
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="pt-16 min-h-screen">
        {state === 'landing' && <LandingPage onStart={() => selectPlanAndPay('survey')} onNavigate={navigate} onSelectPlan={selectPlanAndPay} />}
        {state === 'how-it-works' && <HowItWorksPage onStart={() => selectPlanAndPay('survey')} onSelectPlan={selectPlanAndPay} />}
        {state === 'standards' && <StandardsPage onStart={() => selectPlanAndPay('survey')} />}
        {state === 'about' && <AboutPage />}
        {state === 'news' && <NewsPage />}
        {state === 'calculating' && <RiskCalculator onComplete={handleQuizComplete} />}
        {state === 'result' && results && (
          <ResultPage results={results} onFix={() => selectPlanAndPay('auditor')} />
        )}
        {state === 'payment' && selectedPlan && (
          <PaymentModal
            plan={selectedPlan}
            onSuccess={handlePaymentSuccess}
            onCancel={() => navigate('landing')}
          />
        )}
        {state === 'chat' && <AuditorChat />}
      </main>

      {showAuthModal && (
        <AuthModal
          onClose={() => { setShowAuthModal(false); setPendingPlanId(null); }}
          onSuccess={handleAuthSuccess}
          defaultMode={pendingPlanId ? 'register' : 'login'}
        />
      )}

      {showFooter && (
        <footer className="bg-white py-20 px-6 mt-auto">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-black/10 pb-12 mb-12">
              <div className="md:col-span-2">
                <h2 className="font-heading font-bold text-2xl uppercase mb-4">Sustainability Requirements</h2>
                <p className="text-sm text-slate-500 max-w-sm">The global compliance hub for Fashion Week. Independently operated by the FWSR Board.</p>
              </div>
              <div>
                <h3 className="text-technical mb-6">Explore</h3>
                <ul className="text-[10px] font-black uppercase tracking-widest space-y-3">
                  <li><button onClick={() => navigate('landing')} className="hover:text-red">Home</button></li>
                  <li><button onClick={() => navigate('how-it-works')} className="hover:text-red">How it Works</button></li>
                  <li><button onClick={() => navigate('standards')} className="hover:text-red">19 Pillars</button></li>
                  <li><button onClick={() => navigate('about')} className="hover:text-red">About</button></li>
                  <li><button onClick={() => navigate('news')} className="hover:text-red">News</button></li>
                </ul>
              </div>
              <div>
                <h3 className="text-technical mb-6">Legal</h3>
                <ul className="text-[10px] font-black uppercase tracking-widest space-y-3">
                  <li className="text-slate-400">Terms of Use</li>
                  <li className="text-slate-400">Privacy Policy</li>
                </ul>
              </div>
            </div>
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-300">
              <p>© 2026 FWSR HUB</p>
              <p>Official Compliance Resource</p>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
