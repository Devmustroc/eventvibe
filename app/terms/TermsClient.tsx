"use client";
import React from 'react';
import { Container } from '@/app/components/Container';

const TermsOfUse = () => {
    return (
        <Container>
            <div className="max-w-2xl mx-auto p-8 bg-brand_secondary/40 shadow-[3px_3px_9px_#bdcbc4]
            rounded-lg">
                <h1 className="text-4xl font-bold mb-6 text-gray-800">Terms of Use</h1>

                <p className="text-gray-700 mb-4">
                    By using EventVibe, you agree to be bound by the following terms. If you do not agree to these terms, please do not use the app.
                </p>

                <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
                <p className="text-gray-700 mb-6">
                    You agree to be bound by these Terms of Use when using EventVibe. If you disagree, please refrain from using the app.
                </p>

                <h2 className="text-2xl font-semibold mb-2">2. User Registration</h2>
                <p className="text-gray-700 mb-6">
                    To access certain features, user registration may be required. Maintain the confidentiality of your account information.
                </p>

                <h2 className="text-2xl font-semibold mb-2">3. User Content</h2>
                <p className="text-gray-700 mb-6">
                    You are solely responsible for the content you submit. By doing so, you grant EventVibe the right to use and distribute the content.
                </p>

                <h2 className="text-2xl font-semibold mb-2">4. Prohibited Conduct</h2>
                <p className="text-gray-700 mb-6">
                    {`Prohibited conduct includes violating laws, uploading malicious code, and interfering with the app's proper functioning.`}
                </p>

                <h2 className="text-2xl font-semibold mb-2">5. Intellectual Property</h2>
                <p className="text-gray-700 mb-6">
                    EventVibe and its content are protected by intellectual property laws. Use, reproduction, or distribution without permission is prohibited.
                </p>

                <h2 className="text-2xl font-semibold mb-2">6. Privacy</h2>
                <p className="text-gray-700 mb-6">
                    Our Privacy Policy governs the collection and use of your personal information. By using EventVibe, you consent to our Privacy Policy.
                </p>

                <h2 className="text-2xl font-semibold mb-2">7. Disclaimer of Warranty</h2>
                <p className="text-gray-700 mb-6">
                    {`EventVibe is provided "as is" without any warranty. We do not guarantee the accuracy, completeness, or reliability of content on the app.`}
                </p>

                <h2 className="text-2xl font-semibold mb-2">8. Limitation of Liability</h2>
                <p className="text-gray-700 mb-6">
                    To the fullest extent permitted by law, EventVibe shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
                </p>

                <h2 className="text-2xl font-semibold mb-2">9. Governing Law</h2>
                <p className="text-gray-700 mb-6">
                    These Terms of Use are governed by and construed in accordance with the laws of [Your Jurisdiction].
                </p>

                <h2 className="text-2xl font-semibold mb-2">10. Changes to Terms</h2>
                <p className="text-gray-700">
                    EventVibe reserves the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting.
                </p>
            </div>
        </Container>
    );
};

export default TermsOfUse;

