import React from 'react';

export const TermsOfService: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <div className="max-w-4xl mx-auto px-6 py-24">
            <button
                onClick={onBack}
                className="text-sm font-bold uppercase tracking-widest mb-8 hover:text-red transition-colors"
            >
                ← Back to App
            </button>

            <h1 className="font-heading font-black text-4xl mb-4 uppercase">Terms of Service</h1>
            <p className="text-slate-500 mb-12">Last Updated: January 11, 2026</p>

            <div className="prose prose-slate max-w-none">
                <h3>1. Independent Service</h3>
                <p>
                    FWSR Consultancy ("we", "us") is an <strong>independent expert consultancy</strong>.
                    We are <strong>NOT affiliated, associated, authorized, endorsed by, or in any way officially connected with Berlin Fashion Week</strong> (BFW) or any of its subsidiaries or its affiliates.
                </p>

                <h3>2. No Guarantee of Compliance</h3>
                <p>
                    Our services, including the Risk Calculator and Auditor Chat, are provided for educational and guidance purposes only.
                    While we strive for accuracy based on public BFW guidelines, <strong>we do not guarantee</strong> that our advice will result in your application being accepted by Berlin Fashion Week.
                    The final decision rests solely with the BFW Board.
                </p>

                <h3>3. Professional Liability Limitation</h3>
                <p>
                    To the maximum extent permitted by applicable law (Germany), FWSR Consultancy shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our service.
                    Our total liability for any claim arising out of these terms shall not exceed the amount you paid us for the service in the past 12 months.
                </p>

                <h3>4. User Responsibilities</h3>
                <p>
                    You are responsible for the accuracy of the data you provide. You agree not to misuse the platform or attempt to access restricted features without payment.
                </p>

                <h3>5. Governing Law</h3>
                <p>
                    These Terms shall be governed and construed in accordance with the laws of Germany (`Bundesrepublik Deutschland`), without regard to its conflict of law provisions.
                </p>

                <h3>6. Changes to Terms</h3>
                <p>
                    We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new Terms of Service on this page.
                </p>

                <div className="mt-12 p-6 bg-slate-50 border border-black/5">
                    <p className="text-sm text-slate-500">
                        <strong>Contact Us:</strong> If you have any questions about these Terms, please contact us at legal@fashionweeksustainabilityrequirements.com
                    </p>
                </div>
            </div>
        </div>
    );
};
