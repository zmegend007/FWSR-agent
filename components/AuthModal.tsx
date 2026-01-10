
import React, { useState } from 'react';
import { useAuth } from './AuthContext';

interface Props {
    onClose: () => void;
    onSuccess: () => void;
    defaultMode?: 'login' | 'register';
}

const AuthModal: React.FC<Props> = ({ onClose, onSuccess, defaultMode = 'login' }) => {
    const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { signIn, signUp } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = mode === 'login'
            ? await signIn(email, password)
            : await signUp(email, password);

        setLoading(false);

        if (error) {
            setError(error.message);
        } else {
            if (mode === 'register') {
                setError('Check your email to confirm your account.');
            } else {
                onSuccess();
            }
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-6">
            <div className="bg-white max-w-md w-full shadow-[0_80px_160px_-40px_rgba(0,0,0,0.6)] overflow-hidden animate-fade-in-up">
                <div className="p-12">
                    <div className="flex justify-between items-start mb-12">
                        <div>
                            <div className="inline-block px-4 py-1.5 bg-red text-white text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                                {mode === 'login' ? 'Brand Access' : 'New Brand'}
                            </div>
                            <h2 className="text-3xl font-heading font-extrabold uppercase tracking-tighter leading-none">
                                {mode === 'login' ? 'Sign In' : 'Create Account'}
                            </h2>
                        </div>
                        <button onClick={onClose} className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-black transition-all hover:rotate-90">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-4 bg-slate-50 border border-black/10 focus:outline-none focus:border-black text-sm"
                                placeholder="brand@company.com"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full px-4 py-4 bg-slate-50 border border-black/10 focus:outline-none focus:border-black text-sm"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className={`p-4 text-sm ${error.includes('Check your email') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white font-black py-5 hover:bg-red transition-all flex items-center justify-center gap-4 text-sm uppercase tracking-[0.2em]"
                        >
                            {loading ? (
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            ) : (
                                mode === 'login' ? 'Sign In' : 'Create Account'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                            className="text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-black transition-colors"
                        >
                            {mode === 'login' ? "Don't have an account? Register" : 'Already have an account? Sign In'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
