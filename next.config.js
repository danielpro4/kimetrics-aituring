module.exports = {
    reactStrictMode: false,
    images: {
        domains: ['storage.googleapis.com'],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        return config
    },
}
