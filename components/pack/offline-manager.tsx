'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Download, CheckCircle, Database, Wifi, WifiOff } from 'lucide-react';
import { useOffline } from '@/hooks/use-offline';
import { db, dbHelpers } from '@/lib/db';

export default function OfflineManager() {
  const { 
    isOffline,
    isOnline
  } = useOffline();
  
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [databaseInfo, setDatabaseInfo] = useState<{
    surahs: number;
    verses: number;
    isDownloaded: boolean;
  }>({
    surahs: 0,
    verses: 0,
    isDownloaded: false
  });

  useEffect(() => {
    checkDatabaseStatus();
  }, []);

  const checkDatabaseStatus = async () => {
    try {
      if (db) {
        const surahsCount = await db.surahs.count();
        const versesCount = await db.verses.count();
        const isDownloaded = await dbHelpers.isDataDownloaded();
        
        setDatabaseInfo({
          surahs: surahsCount,
          verses: versesCount,
          isDownloaded
        });
      }
    } catch (error) {
      console.error('Error checking database status:', error);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    setProgress(0);
    try {
      const { offlineService } = await import('@/lib/offline-service');
      // Subscribe to progress updates
      const unsubscribe = offlineService.onProgress((progressObj) => {
        setProgress(progressObj.percentage);
      });
      await offlineService.downloadQuranData();
      unsubscribe();
      await checkDatabaseStatus();
    } catch (error) {
      console.error('Error downloading data:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleClearData = async () => {
    try {
      if (db) {
        await db.surahs.clear();
        await db.verses.clear();
        await checkDatabaseStatus();
      }
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Status */}
      <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
        <div className="flex items-center gap-2">
          {isOnline ? (
            <Wifi className="h-4 w-4 text-green-600" />
          ) : (
            <WifiOff className="h-4 w-4 text-red-600" />
          )}
          <span className="text-sm font-medium">
            {isOnline ? 'Terhubung ke Internet' : 'Mode Offline'}
          </span>
        </div>
        <span className={`text-sm font-medium ${databaseInfo.isDownloaded ? 'text-green-600' : 'text-orange-600'}`}>
          {databaseInfo.isDownloaded ? 'Tersedia Offline' : 'Hanya Online'}
        </span>
      </div>

      {/* Database Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{databaseInfo.surahs}</div>
          <div className="text-xs text-blue-600">Surah</div>
        </div>
        <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{databaseInfo.verses.toLocaleString()}</div>
          <div className="text-xs text-green-600">Ayat</div>
        </div>
      </div>

      {/* Download Progress */}
      {isDownloading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Mengunduh data...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        {!databaseInfo.isDownloaded && !isDownloading && (
          <Button 
            onClick={handleDownload} 
            disabled={!isOnline}
            className="flex-1"
          >
            <Download className="h-4 w-4 mr-2" />
            Unduh Data
          </Button>
        )}
        
        {databaseInfo.isDownloaded && (
          <Button 
            onClick={handleClearData} 
            variant="outline"
            className="flex-1"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Hapus Data
          </Button>
        )}
      </div>

      {/* Info */}
      <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
        <p>• Data offline memungkinkan Anda membaca Al-Qur'an tanpa internet</p>
        <p>• Ukuran data sekitar 15-20 MB</p>
        <p>• Data akan disimpan di perangkat Anda</p>
      </div>
    </div>
  );
} 