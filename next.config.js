/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        turbo: true,
    },
    images: {
        domains: [
            'lh3.googleusercontent.com',
            'res.cloudinary.com',
        ],
    },
};

module.exports = nextConfig;