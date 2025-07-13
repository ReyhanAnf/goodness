import withPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,      // Enable React strict mode for improved error handling
    swcMinify: true,            // Enable SWC minification for improved performance
    compiler: {
        removeConsole: process.env.NODE_ENV !== "development"     // Remove console.log in production
    }
};

export default withPWA({
    dest: "public",         // destination directory for the PWA files
    disable: process.env.NODE_ENV === "development",        // disable PWA in the development environment
    register: true,         // register the PWA service worker
    skipWaiting: true,      // skip waiting for service worker activation
    runtimeCaching: [
        {
          urlPattern: ({ request }) => request.mode === 'navigate',
          handler: 'NetworkFirst', // Coba jaringan dulu, jika offline baru ambil dari cache.
          options: {
            cacheName: 'pages',
            expiration: {
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60, // Cache selama 30 hari
            },
          },
        },
        {
          // Ini aturan untuk caching file statis seperti CSS, JS, font, gambar.
          urlPattern: /\.(?:css|js|woff2|png|jpg|jpeg|svg)$/,
          handler: 'CacheFirst', // Ambil dari cache dulu agar loading cepat.
          options: {
            cacheName: 'static-assets',
          },
        },
      ],
})(nextConfig);
