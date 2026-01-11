
import React, { useState, Suspense } from 'react';
import { AuthProvider, useAuth } from './components/AuthContext';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';
import { CookieConsent } from './components/CookieConsent';
import { AppState, QuizResults } from './types';

// Lazy Load heavy components
const HowItWorksPage = React.lazy(() => import('./components/HowItWorksPage'));
const NewsPage = React.lazy(() => import('./components/NewsPage'));
const StandardsPage = React.lazy(() => import('./components/StandardsPage'));
const AboutPage = React.lazy(() => import('./components/AboutPage'));
const RiskCalculator = React.lazy(() => import('./components/RiskCalculator'));
const ResultPage = React.lazy(() => import('./components/ResultPage'));
const PaymentModal = React.lazy(() => import('./components/PaymentModal'));
const AuditorChat = React.lazy(() => import('./components/AuditorChat'));

// Lazy Load Legal Docs (named exports need special handling or default re-export, 
// simplest here is to wrap them in a helper if they were default, 
// but since they are named, we can use this pattern or change them to default.
// For safety, let's stick to standard imports for small text components to avoid named-export friction 
// unless we change their files. Actually, let's keep legal docs eager for now as they are small text.)
import { TermsOfService } from './components/TermsOfService';
import { PrivacyPolicy } from './components/PrivacyPolicy';

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

const LoadingSpinner = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <span className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></span>
  </div>
);

const AppContent: React.FC = () => {
  const { user, loading, signOut } = useAuth();
  const [state, setState] = useState<AppState>('landing');
  const [results, setResults] = useState<QuizResults | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingPlanId, setPendingPlanId] = useState<'survey' | 'chat' | 'auditor' | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = (newState: AppState) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setState(newState);
    setMobileMenuOpen(false);
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
    setMobileMenuOpen(false);
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

  const NavLinks = ({ mobile }: { mobile?: boolean }) => (
    <>
      <button onClick={() => navigate('how-it-works')} className={`${state === 'how-it-works' ? 'text-red underline underline-offset-4' : 'text-slate-400 hover:text-black transition-colors'} ${mobile ? 'text-2xl font-bold' : ''}`}>How it Works</button>
      <button onClick={() => navigate('standards')} className={`${state === 'standards' ? 'text-red underline underline-offset-4' : 'text-slate-400 hover:text-black transition-colors'} ${mobile ? 'text-2xl font-bold' : ''}`}>19 Pillars</button>
      <button onClick={() => navigate('about')} className={`${state === 'about' ? 'text-red underline underline-offset-4' : 'text-slate-400 hover:text-black transition-colors'} ${mobile ? 'text-2xl font-bold' : ''}`}>About</button>
      <button onClick={() => navigate('news')} className={`${state === 'news' ? 'text-red underline underline-offset-4' : 'text-slate-400 hover:text-black transition-colors'} ${mobile ? 'text-2xl font-bold' : ''}`}>News</button>
    </>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] bg-white/95 backdrop-blur-md border-b border-black/5 h-16 md:h-20">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="cursor-pointer flex items-center gap-4" onClick={() => navigate('landing')}>
            <span className="font-heading font-black text-2xl tracking-tighter uppercase">FWSR</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-widest">
            <NavLinks />

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

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[110]"
          >
            <span className={`w-6 h-0.5 bg-black transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-black transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-black transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu Backdrop */}
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] transition-opacity duration-300 md:hidden ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Mobile Menu Drawer */}
        <div
          className={`fixed top-16 right-0 bottom-0 w-[85%] max-w-[300px] bg-[#ffffff] z-[100] border-l border-black/10 shadow-3xl transition-transform duration-300 ease-out transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col`}
          style={{ backgroundColor: '#ffffff' }}
        >
          <div className="flex-1 flex flex-col p-8 overflow-y-auto">
            <div className="flex flex-col gap-6 text-technical mb-12">
              <NavLinks mobile />
            </div>

            <div className="mt-auto border-t border-black/10 pt-8">
              {user ? (
                <div className="flex flex-col gap-4">
                  <span className="text-xs text-slate-400 font-mono text-center mb-2">{user.email}</span>
                  <button
                    onClick={() => signOut()}
                    className="w-full py-4 border border-black/10 text-technical text-red hover:bg-red/5 active:scale-95 transition-all"
                  >
                    Sign Out
                  </button>
                  <button
                    onClick={() => selectPlanAndPay('survey')}
                    className="w-full bg-black text-white py-4 text-technical hover:bg-red active:scale-95 transition-all"
                  >
                    Verify Status
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="w-full py-4 border border-black/10 text-technical hover:bg-black/5 active:scale-95 transition-all"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => selectPlanAndPay('survey')}
                    className="w-full bg-black text-white py-4 text-technical hover:bg-red active:scale-95 transition-all"
                  >
                    Verify Status
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16 md:pt-20 min-h-screen">
        <div key={state} className="fade-enter">
          <Suspense fallback={<LoadingSpinner />}>
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
          </Suspense>

          {/* Legal pages are lightweight, kept eager for now to avoid named-export complexity in lazy load unless refactored */}
          {state === 'terms' && <TermsOfService onBack={() => navigate('landing')} />}
          {state === 'privacy' && <PrivacyPolicy onBack={() => navigate('landing')} />}
        </div>
      </main>

      {showAuthModal && (
        <AuthModal
          onClose={() => { setShowAuthModal(false); setPendingPlanId(null); }}
          onSuccess={handleAuthSuccess}
          defaultMode={pendingPlanId ? 'register' : 'login'}
        />
      )}

      {showFooter && (
        <footer className="bg-white py-12 px-6 mt-auto border-t border-black/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">

              {/* Brand & Disclaimer */}
              <div className="max-w-md">
                <h2 className="font-heading font-black text-xl uppercase mb-4 tracking-tighter">FWSR Consultancy</h2>
                <div className="space-y-4">
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    Specialized compliance support for Berlin Fashion Week applicants.
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed border-l-2 border-red pl-3">
                    DISCLAIMER: We are an independent consultancy and <span className="text-black font-bold">not affiliated</span> with Berlin Fashion Week.
                  </p>
                </div>
              </div>

              {/* Compact Links */}
              <div className="flex flex-wrap gap-8 md:gap-16">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest mb-4">Explore</h3>
                  <ul className="space-y-2 text-xs text-slate-500">
                    <li><button onClick={() => navigate('how-it-works')} className="hover:text-black transition-colors">How it Works</button></li>
                    <li><button onClick={() => navigate('standards')} className="hover:text-black transition-colors">19 Pillars</button></li>
                    <li><button onClick={() => navigate('news')} className="hover:text-black transition-colors">News</button></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-widest mb-4">Legal</h3>
                  <ul className="space-y-2 text-xs text-slate-500">
                    <li><button onClick={() => navigate('privacy')} className="hover:text-black transition-colors">Privacy</button></li>
                    <li><button onClick={() => navigate('terms')} className="hover:text-black transition-colors">Terms</button></li>
                    <li><a href="mailto:legal@fashionweeksustainabilityrequirements.com" className="hover:text-black transition-colors">Contact</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-12 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-slate-300 font-bold">
              <p>© 2026 FWSR Consultancy</p>
              <p>Berlin, Germany</p>
            </div>
          </div>
        </footer>
      )}
      <CookieConsent />
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
