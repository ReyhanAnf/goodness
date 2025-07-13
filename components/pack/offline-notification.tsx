"use client"

import { useEffect, useState } from 'react';
import { Wifi, WifiOff, Download, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function OfflineNotification() {
  const [isOnline, setIsOnline] = useState(true);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    // Set initial online status
    setIsOnline(navigator.onLine);

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
      toast.success('Koneksi internet telah pulih', {
        description: 'Aplikasi kembali online',
        duration: 3000,
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
      toast.error('Tidak ada koneksi internet', {
        description: 'Anda dalam mode offline',
        duration: 5000,
      });
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

  if (!showOfflineMessage && isOnline) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
    </div>
  );
} 