'use client';

import { useState, useEffect } from 'react';

export function useOffline() {
  const [isOffline, setIsOffline] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check initial online status
    const checkOnlineStatus = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      setIsOffline(!online);
      setIsInitialized(true);
      console.log(`🌐 Network status: ${online ? 'ONLINE' : 'OFFLINE'}`);
    };

    // Check immediately
    checkOnlineStatus();

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      setIsOffline(false);
      console.log('🌐 Connection restored');
    };

    const handleOffline = () => {
      setIsOnline(false);
      setIsOffline(true);
      console.log('📴 Connection lost');
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Also check periodically in case events don't fire
    const interval = setInterval(checkOnlineStatus, 10000); // Check every 10 seconds

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  // Test network connectivity
  const testConnection = async (): Promise<boolean> => {
    try {
      const response = await fetch('/api/prayer-times', { 
        method: 'HEAD',
        cache: 'no-cache',
        signal: AbortSignal.timeout(3000) // 3 second timeout
      });
      return response.ok;
    } catch (error) {
      console.log('📴 Network test failed:', error);
      return false;
    }
  };

  return { 
    isOffline, 
    isOnline, 
    isInitialized,
    testConnection 
  };
} 