import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NODE_ENV !== "development"
    }
};

export default withPWA({
    dest: "public",
    disable: false, // Enable PWA in all environments
    register: true,
    skipWaiting: true,
    clientsClaim: true,
    // Use custom service worker
    sw: '/sw-custom.js',
    // Disable workbox service worker
    disable: process.env.NODE_ENV === "development",
    // Exclude problematic files from precaching
    buildExcludes: [
        /middleware-manifest\.json$/,
        /_next\/app-build-manifest\.json$/,
        /_next\/static\/.*\/_buildManifest\.js$/,
        /_next\/static\/.*\/_ssgManifest\.js$/
    ],
    runtimeCaching: [
        {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
                cacheName: 'pages',
                expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 24 * 60 * 60,
                },
                cacheableResponse: {
                    statuses: [0, 200]
                },
                networkTimeoutSeconds: 5,
            },
        },
        {
            urlPattern: /^https?.*\/api\/.*$/i,
            handler: 'NetworkFirst',
            options: {
                cacheName: 'api-cache',
                expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 24 * 60 * 60,
                },
                cacheableResponse: {
                    statuses: [0, 200]
                },
                networkTimeoutSeconds: 3,
            },
        },
        {
            urlPattern: /\.(?:css|js|woff2|woff|ttf|otf|png|jpg|jpeg|svg|gif|ico|webp|mp3|wav|ogg|m4a|json)$/,
            handler: 'CacheFirst',
            options: {
                cacheName: 'static-assets',
                expiration: {
                    maxEntries: 100,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                },
                cacheableResponse: {
                    statuses: [0, 200]
                }
            },
        },
        {
            urlPattern: /.*/,
            handler: 'NetworkFirst',
            options: {
                cacheName: 'fallback-cache',
                expiration: {
                    maxEntries: 30,
                    maxAgeSeconds: 24 * 60 * 60,
                },
                cacheableResponse: {
                    statuses: [0, 200]
                },
                networkTimeoutSeconds: 5,
            },
        },
    ],
    fallbacks: {
        document: '/offline.html'
    },
    // Ensure offline.html is precached
    additionalManifestEntries: [
        { url: '/offline.html', revision: '1' }
    ]
})(nextConfig);
