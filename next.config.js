module.exports = {
    async headers() {
        return [
            {
                source: '/(.*)?', // Matches all pages
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                ],
            },
        ]
    },
    reactStrictMode: false,
    images: {
        domains: ['storage.googleapis.com'],
    },
}
