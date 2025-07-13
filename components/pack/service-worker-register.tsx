'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Register custom service worker
      navigator.serviceWorker
        .register('/sw-custom.js')
        .then((registration) => {
          console.log('✅ Custom SW registered: ', registration);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content is available, show update prompt
                  console.log('🔄 New content is available; please refresh.');
                }
              });
            }
          });
        })
        .catch((registrationError) => {
          console.log('❌ Custom SW registration failed: ', registrationError);
          
          // Fallback to default service worker if custom one fails
          navigator.serviceWorker
            .register('/sw.js')
            .then((registration) => {
              console.log('✅ Fallback SW registered: ', registration);
            })
            .catch((error) => {
              console.log('❌ Fallback SW registration failed: ', error);
            });
        });

      // Handle service worker updates
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('🔄 Service worker updated, reloading page...');
        window.location.reload();
      });
    }
  }, []);

  return null;
} 