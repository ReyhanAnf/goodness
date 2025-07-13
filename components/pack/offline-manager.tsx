'use client';

import { useState } from 'react';
import { useOffline } from '@/hooks/use-offline';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, Wifi, WifiOff, Trash2, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

export default function OfflineManager() {
  const { 
    isAvailable, 
    isDownloading, 
    progress, 
    databaseInfo, 
    error, 
    downloadData, 
    clearData, 
    refreshInfo 
  } = useOffline();

  const [showDialog, setShowDialog] = useState(false);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Tidak ada';
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <>
      {/* Trigger Button */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>
          <div className="cursor-pointer">
            {isAvailable ? (
              <WifiOff size={20} className="text-green-600 dark:text-green-400" />
            ) : (
              <Wifi size={20} className="text-orange-600 dark:text-orange-400" />
            )}
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 border border-white/30 dark:border-gray-600/30">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {isAvailable ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Mode Offline Aktif
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  Mode Online
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              Kelola data Al-Qur'an untuk penggunaan offline
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Status Card */}
            <Card className="backdrop-blur-sm bg-white/50 dark:bg-black/50 border border-white/30 dark:border-gray-600/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Status Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Ketersediaan:</span>
                  <span className={`text-sm font-medium ${isAvailable ? 'text-green-600' : 'text-orange-600'}`}>
                    {isAvailable ? 'Tersedia Offline' : 'Hanya Online'}
                  </span>
                </div>
                
                {databaseInfo && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Surah:</span>
                      <span className="text-sm font-medium">{databaseInfo.surahs}/114</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Ayat:</span>
                      <span className="text-sm font-medium">{databaseInfo.verses.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Terakhir Update:</span>
                      <span className="text-sm font-medium">{formatDate(databaseInfo.lastDownload)}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Download Progress */}
            {isDownloading && (
              <Card className="backdrop-blur-sm bg-white/50 dark:bg-black/50 border border-white/30 dark:border-gray-600/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Progress Download</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Progress value={progress.percentage} className="w-full" />
                  <div className="text-sm text-muted-foreground">
                    {progress.message}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {progress.current} dari {progress.total} surah ({progress.percentage}%)
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="backdrop-blur-sm">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              {!isAvailable && !isDownloading && (
                <Button 
                  onClick={downloadData}
                  disabled={isDownloading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download untuk Offline
                </Button>
              )}

              {isAvailable && (
                <Button 
                  onClick={clearData}
                  variant="outline"
                  disabled={isDownloading}
                  className="w-full border-red-300 text-red-600 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Hapus Data Offline
                </Button>
              )}

              <Button 
                onClick={refreshInfo}
                variant="ghost"
                size="sm"
                disabled={isDownloading}
                className="w-full"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Info
              </Button>
            </div>

            {/* Info */}
            <div className="text-xs text-muted-foreground space-y-1 p-3 bg-white/30 dark:bg-black/30 rounded-lg">
              <p>• Data offline memungkinkan Anda membaca Al-Qur'an tanpa internet</p>
              <p>• Download pertama kali membutuhkan waktu beberapa menit</p>
              <p>• Data disimpan secara lokal di perangkat Anda</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 