'use client';

import { useState, useEffect, useCallback } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, dbHelpers } from '@/lib/db';
import { offlineService, DownloadProgress } from '@/lib/offline-service';

export interface OfflineState {
  isAvailable: boolean;
  isDownloading: boolean;
  progress: DownloadProgress;
  databaseInfo: {
    surahs: number;
    verses: number;
    lastDownload: string | null;
  } | null;
  error: string | null;
}

export function useOffline() {
  const [state, setState] = useState<OfflineState>({
    isAvailable: false,
    isDownloading: false,
    progress: {
      current: 0,
      total: 114,
      percentage: 0,
      status: 'downloading',
      message: ''
    },
    databaseInfo: null,
    error: null
  });

  // Live query untuk cek ketersediaan data
  const isDataAvailable = useLiveQuery(
    () => dbHelpers.isDataDownloaded(),
    []
  );

  // Live query untuk info database
  const databaseInfo = useLiveQuery(
    async () => {
      try {
        const size = await dbHelpers.getDatabaseSize();
        const lastDownload = await dbHelpers.getMetadata('lastDownload');
        return { ...size, lastDownload };
      } catch (error) {
        console.warn('Error getting database info:', error);
        return { surahs: 0, verses: 0, lastDownload: null };
      }
    },
    []
  );

  // Update state ketika data berubah
  useEffect(() => {
    setState(prev => ({
      ...prev,
      isAvailable: isDataAvailable || false,
      databaseInfo: databaseInfo || null
    }));
  }, [isDataAvailable, databaseInfo]);

  // Subscribe ke progress updates
  useEffect(() => {
    const unsubscribe = offlineService.onProgress((progress) => {
      setState(prev => ({
        ...prev,
        progress,
        isDownloading: progress.status === 'downloading' || progress.status === 'processing',
        error: progress.status === 'error' ? progress.message : null
      }));
    });

    return unsubscribe;
  }, []);

  // Download data
  const downloadData = useCallback(async () => {
    try {
      setState(prev => ({
        ...prev,
        isDownloading: true,
        error: null
      }));

      await offlineService.downloadQuranData();
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: (error as Error).message,
        isDownloading: false
      }));
    }
  }, []);

  // Clear data
  const clearData = useCallback(async () => {
    try {
      setState(prev => ({
        ...prev,
        error: null
      }));

      await offlineService.clearOfflineData();
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: (error as Error).message
      }));
    }
  }, []);

  // Refresh database info
  const refreshInfo = useCallback(async () => {
    try {
      const info = await offlineService.getDatabaseInfo();
      setState(prev => ({
        ...prev,
        databaseInfo: info
      }));
    } catch (error) {
      console.error('Error refreshing database info:', error);
    }
  }, []);

  return {
    ...state,
    downloadData,
    clearData,
    refreshInfo
  };
} 