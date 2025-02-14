module.exports = {
    webpack: (config) => {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            path: false, // Disable path module in the browser
        };
        return config;
    },
};
