"use client";

import React, { useState } from 'react';
import { Container } from '@/app/components/Container';

const ContactClient = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        setFormData({
            name: '',
            email: '',
            message: '',
        });
    };

    return (
        <Container>
            <div className="max-w-2xl mx-auto p-8 bg-brand_secondary/40 shadow-[3px_3px_9px_#bdcbc4]
            rounded-lg">
                <h1 className="text-4xl font-bold mb-6 text-gray-800">Contact Us</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                            Message
                        </label>

                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            rows={18}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </Container>
    );
};

export default ContactClient;
