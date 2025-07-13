'use client';

import { useState, useEffect } from 'react';
import { useOffline } from '@/hooks/use-offline';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Download, X, WifiOff } from 'lucide-react';

export default function OfflineNotification() {
  const { isAvailable, isDownloading, downloadData } = useOffline();
  const [showNotification, setShowNotification] = useState(false);
  const [hasShownBefore, setHasShownBefore] = useState(false);

  useEffect(() => {
    // Cek apakah sudah pernah ditampilkan sebelumnya
    const shown = localStorage.getItem('offline-notification-shown');
    if (shown) {
      setHasShownBefore(true);
      return;
    }

    // Tampilkan notifikasi jika data belum tersedia offline
    if (!isAvailable && !isDownloading) {
      // Delay sedikit untuk memastikan komponen sudah ter-render
      const timer = setTimeout(() => {
        setShowNotification(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isAvailable, isDownloading]);

  const handleDownload = async () => {
    setShowNotification(false);
    localStorage.setItem('offline-notification-shown', 'true');
    await downloadData();
  };

  const handleDismiss = () => {
    setShowNotification(false);
    localStorage.setItem('offline-notification-shown', 'true');
  };

  if (!showNotification || hasShownBefore || isAvailable || isDownloading) {
    return null;
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm mx-4">
      <Alert className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
        <div className="flex items-start gap-3">
          <WifiOff className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5" />
          <div className="flex-1">
            <AlertDescription className="text-sm text-green-800 dark:text-green-200">
              Aktifkan mode offline untuk membaca Al-Qur'an tanpa internet
            </AlertDescription>
            <div className="flex gap-2 mt-3">
              <Button 
                size="sm" 
                onClick={handleDownload}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={handleDismiss}
                className="text-green-600 hover:text-green-700"
              >
                Nanti
              </Button>
            </div>
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={handleDismiss}
            className="text-green-600 hover:text-green-700 p-1 h-auto"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </Alert>
    </div>
  );
} 