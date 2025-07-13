'use client';

import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

export default function OfflineNotification() {
  const [isOffline, setIsOffline] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Check initial online status
    setIsOnline(navigator.onLine);
    setIsOffline(!navigator.onLine);

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      setIsOffline(false);
      setShowNotification(true);
      console.log('🌐 Connection restored');
      
      // Hide notification after 3 seconds
      setTimeout(() => setShowNotification(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setIsOffline(true);
      setShowNotification(true);
      console.log('📴 Connection lost');
    };

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  // Only show notification when there's a state change
  if (!showNotification) {
    return null;
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm px-4">
      <Alert className={`border-2 ${isOffline ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/20' : 'border-green-500 bg-green-50 dark:bg-green-950/20'}`}>
        <div className="flex items-center gap-2">
          {isOffline ? (
            <WifiOff className="h-4 w-4 text-orange-600" />
          ) : (
            <Wifi className="h-4 w-4 text-green-600" />
          )}
          <AlertDescription className={`font-medium ${isOffline ? 'text-orange-800 dark:text-orange-200' : 'text-green-800 dark:text-green-200'}`}>
            {isOffline ? (
              <span>Mode offline aktif. Beberapa fitur mungkin terbatas.</span>
            ) : (
              <span>Koneksi internet telah pulih!</span>
            )}
          </AlertDescription>
        </div>
        
        {isOffline && (
          <div className="mt-2 flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleRefresh}
              className="text-xs"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Coba Lagi
            </Button>
          </div>
        )}
      </Alert>
    </div>
  );
} 