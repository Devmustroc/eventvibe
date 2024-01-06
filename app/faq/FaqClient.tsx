import React from 'react';
import { Container } from '@/app/components/Container';

const FaqClient = () => {
    const faqs = [
        {
            question: 'What is EventVibe?',
            answer: 'EventVibe is a platform that allows users to discover and participate in various events happening around them.',
        },
        {
            question: 'How do I create an account?',
            answer: 'To create an account, click on the "Sign Up" button on the homepage and follow the registration process.',
        },
        {
            question: 'Can I submit my own events?',
            answer: 'Yes, registered users can submit their events through the "Submit Event" feature in their account dashboard.',
        },
        {
            question: 'Is EventVibe free to use?',
            answer: 'Yes, EventVibe is free to use for basic features. Some premium features may require a subscription.',
        },
        {
            question: 'How can I reset my password?',
            answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page and following the instructions.',
        },
        {
            question: 'Are my personal details safe?',
            answer: 'Yes, we take the security of your personal information seriously. We implement measures to protect your data.',
        },
        {
            question: 'How can I contact customer support?',
            answer: 'You can contact our customer support team by emailing support@eventvibe.com or using the "Contact Us" page.',
        },
    ];

    return (
        <Container>
            <div className="max-w-2xl mx-auto p-8 bg-brand_secondary/40 shadow-[3px_3px_9px_#bdcbc4]
            rounded-lg">
                <h1 className="text-4xl font-bold mb-6 text-gray-800">Frequently Asked Questions</h1>

                {faqs.map((faq, index) => (
                    <div key={index} className="mb-6">
                        <div className="flex justify-between items-center cursor-pointer mb-2 bg-brand_primary p-4 rounded-md">
                            <span className="text-lg font-semibold">{faq.question}</span>
                            <span>▼</span>
                        </div>
                        <div className="ml-8 text-gray-700">{faq.answer}</div>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default FaqClient
