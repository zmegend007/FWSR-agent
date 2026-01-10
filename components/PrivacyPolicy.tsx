import React from 'react';

export const PrivacyPolicy: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-24">
            <button
                onClick={onBack}
                className="text-sm font-bold uppercase tracking-widest mb-8 hover:text-red transition-colors"
            >
                ← Back to App
            </button>

            <h1 className="font-heading font-black text-4xl mb-4 uppercase">Privacy Policy</h1>
            <p className="text-slate-500 mb-12">Last Updated: January 11, 2026</p>

            <div className="prose prose-slate max-w-none">
                <h3>1. Introduction</h3>
                <p>
                    FWSR Consultancy respects your privacy and is committed to protecting your personal data.
                    This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you (GDPR).
                </p>

                <h3>2. Data We Collect</h3>
                <ul className="list-disc pl-5 mb-4">
                    <li><strong>Identity Data:</strong> Email address, User ID (via Supabase).</li>
                    <li><strong>Payment Data:</strong> Payment confirmation details (processed via Stripe). We do not store full credit card numbers.</li>
                    <li><strong>Usage Data:</strong> Assessment responses, chat history, and document uploads necessary for providing our service.</li>
                </ul>

                <h3>3. How We Use Your Data</h3>
                <p>
                    We use your data strictly to:
                </p>
                <ul className="list-disc pl-5 mb-4">
                    <li>Provide and manage your access to the Service.</li>
                    <li>Process your payments and orders.</li>
                    <li>Provide customer support.</li>
                    <li>Improve our AI models (anonymized only).</li>
                </ul>

                <h3>4. Data Storage & Security</h3>
                <p>
                    Your data is stored securely using Supabase (hosted in the EU/US) and we implement appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way.
                </p>

                <h3>5. Third-Party Services</h3>
                <p>We use the following trusted third-party services:</p>
                <ul className="list-disc pl-5 mb-4">
                    <li><strong>Supabase:</strong> Authentication and Database.</li>
                    <li><strong>Stripe:</strong> Payment Processing.</li>
                    <li><strong>Google Gemini:</strong> AI Processing (Data sent to AI is minimized).</li>
                </ul>

                <h3>6. Your Legal Rights (GDPR)</h3>
                <p>
                    Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, or to object to processing.
                </p>

                <div className="mt-12 p-6 bg-slate-50 border border-black/5">
                    <p className="text-sm text-slate-500">
                        <strong>Contact Us:</strong> To exercise your rights, please contact us at privacy@fashionweeksustainabilityrequirements.com
                    </p>
                </div>
            </div>
        </div>
    );
};
