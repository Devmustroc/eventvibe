import React from 'react';
import { Container } from '@/app/components/Container';

const PrivacyClient = () => {
    return (
        <Container>
                <div className="max-w-2xl mx-auto p-8 bg-brand_secondary/40 shadow-[3px_3px_9px_#bdcbc4]
                            rounded-lg">
                    <h1 className="text-4xl font-bold mb-6 text-gray-800">Privacy Policy</h1>

                    <p className="text-gray-700 mb-4">
                        This Privacy Policy outlines how EventVibe collects, uses, and protects your personal information.
                    </p>

                    <h2 className="text-2xl font-semibold mb-2">1. Information Collection</h2>
                    <p className="text-gray-700 mb-6">
                        We may collect personal information, such as your name and email address, when you register or use our services.
                    </p>

                    <h2 className="text-2xl font-semibold mb-2">2. Use of Information</h2>
                    <p className="text-gray-700 mb-6">
                        Your information may be used to personalize your experience, improve our services, and communicate with you.
                    </p>

                    <h2 className="text-2xl font-semibold mb-2">3. Data Security</h2>
                    <p className="text-gray-700 mb-6">
                        We implement security measures to protect your personal information, but no method is foolproof. Please use the app responsibly.
                    </p>

                    <h2 className="text-2xl font-semibold mb-2">4. Cookies</h2>
                    <p className="text-gray-700 mb-6">
                        We use cookies to enhance your experience. You can choose to disable cookies through your browser settings.
                    </p>

                    <h2 className="text-2xl font-semibold mb-2">5. Third-Party Links</h2>
                    <p className="text-gray-700 mb-6">
                        Our app may contain links to third-party websites. We are not responsible for their privacy practices, so please review their policies.
                    </p>

                    <h2 className="text-2xl font-semibold mb-2">6. Changes to Policy</h2>
                    <p className="text-gray-700 mb-6">
                        We reserve the right to update this Privacy Policy. Check this page periodically for changes.
                    </p>

                    <h2 className="text-2xl font-semibold mb-2">7. Contact Us</h2>
                    <p className="text-gray-700">
                        If you have any questions or concerns about this Privacy Policy, please contact us at <span
                        className="text-brand_primary
                                      hover:text-brand_primary
                                      transition
                                      text-xl
                        "
                    >EventVibe@eventvibe.events</span>.
                    </p>
                </div>
        </Container>
    );
};

export default PrivacyClient;
