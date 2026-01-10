import React, { useState, useEffect } from 'react';

export const CookieConsent: React.FC = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('fwsr-cookie-consent');
        if (!consent) {
            setShow(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('fwsr-cookie-consent', 'true');
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-black text-white p-6 z-[200] border-t border-white/10 animate-reveal">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-sm font-light text-slate-300 max-w-2xl">
                    <p>
                        We use cookies to ensure you get the best experience on our website.
                        By continuing to use this site, you agree to our use of cookies for essential functionality and fraud prevention.
                    </p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleAccept}
                        className="px-6 py-2 bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-red hover:text-white transition-colors"
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
};
