import { db, dbHelpers, Surah, Verse } from './db';

export interface DownloadProgress {
  current: number;
  total: number;
  percentage: number;
  status: 'downloading' | 'processing' | 'completed' | 'error';
  message: string;
}

export class OfflineService {
  private static instance: OfflineService;
  private downloadProgress: DownloadProgress = {
    current: 0,
    total: 114, // Total surah
    percentage: 0,
    status: 'downloading',
    message: 'Memulai download...'
  };

  private progressCallbacks: ((progress: DownloadProgress) => void)[] = [];

  private constructor() {}

  static getInstance(): OfflineService {
    if (!OfflineService.instance) {
      OfflineService.instance = new OfflineService();
    }
    return OfflineService.instance;
  }

  // Subscribe untuk progress updates
  onProgress(callback: (progress: DownloadProgress) => void): () => void {
    this.progressCallbacks.push(callback);
    return () => {
      const index = this.progressCallbacks.indexOf(callback);
      if (index > -1) {
        this.progressCallbacks.splice(index, 1);
      }
    };
  }

  private updateProgress(progress: Partial<DownloadProgress>): void {
    this.downloadProgress = { ...this.downloadProgress, ...progress };
    this.progressCallbacks.forEach(callback => callback(this.downloadProgress));
  }

  // Cek apakah data sudah tersedia offline
  async isOfflineAvailable(): Promise<boolean> {
    try {
      return await dbHelpers.isDataDownloaded();
    } catch (error) {
      console.error('Error checking offline availability:', error);
      return false;
    }
  }

  // Download semua data Al-Qur'an
  async downloadQuranData(): Promise<void> {
    try {
      this.updateProgress({
        status: 'downloading',
        current: 0,
        percentage: 0,
        message: 'Memulai download data Al-Qur\'an...'
      });

      // Cek apakah sudah ada data
      if (await this.isOfflineAvailable()) {
        this.updateProgress({
          status: 'completed',
          current: 114,
          percentage: 100,
          message: 'Data sudah tersedia offline'
        });
        return;
      }

      // Download metadata surah
      this.updateProgress({ message: 'Mengunduh metadata surah...' });
      const surahMetadata = await this.fetchSurahMetadata();
      
      // Simpan metadata surah
      this.updateProgress({ message: 'Menyimpan metadata surah...' });
      await this.saveSurahMetadata(surahMetadata);

      // Download dan simpan setiap surah
      for (let i = 0; i < surahMetadata.length; i++) {
        const surah = surahMetadata[i];
        const surahNumber = surah.number;
        
        // Skip jika nomor surah tidak valid
        if (!surahNumber || isNaN(surahNumber)) {
          console.warn(`Skipping surah with invalid number:`, surah);
          continue;
        }
        
        this.updateProgress({
          current: i + 1,
          percentage: Math.round(((i + 1) / surahMetadata.length) * 100),
          message: `Mengunduh Surah ${surahNumber}: ${surah.name_latin}...`
        });

        try {
          // Download data surah
          const surahData = await this.fetchSurahData(surahNumber);
          
                // Log struktur data untuk debug
      // if (surahNumber <= 10) {
      //   console.log(`Surah ${surahNumber} data structure:`, surahData);
      //   console.log(`Surah ${surahNumber} editions:`, surahData.data);
      //   if (surahData.data && Array.isArray(surahData.data)) {
      //     console.log(`Surah ${surahNumber} uthmani:`, surahData.data.find((e: any) => e.identifier === 'quran-uthmani'));
      //   }
      // }
          
          // Simpan data surah
          await this.saveSurahData(surahData);
          
          // Simpan ayat-ayat
          await this.saveVersesData(surahData);
          
        } catch (error) {
          console.error(`Error downloading surah ${surahNumber}:`, error);
          // Continue dengan surah berikutnya
        }
      }

      // Simpan metadata download
      try {
        await dbHelpers.setMetadata('lastDownload', new Date().toISOString());
        await dbHelpers.setMetadata('version', '1.0.0');
      } catch (error) {
        console.warn('Failed to save download metadata:', error);
        // Continue anyway, this is not critical
      }

      this.updateProgress({
        status: 'completed',
        current: 114,
        percentage: 100,
        message: 'Download selesai! Data tersedia offline'
      });

    } catch (error) {
      console.error('Error downloading Quran data:', error);
      this.updateProgress({
        status: 'error',
        message: 'Gagal mengunduh data: ' + (error as Error).message
      });
      throw error;
    }
  }

  // Fetch metadata surah dari API
  private async fetchSurahMetadata(): Promise<any[]> {
    try {
      // Gunakan API yang sama dengan yang sudah ada di aplikasi
      const response = await fetch('https://quran-api.santrikoding.com/api/surah');
      if (!response.ok) {
        throw new Error('Failed to fetch surah metadata');
      }
      const data = await response.json();
      
      // Log untuk debug
      // console.log('Surah metadata sample:', data[0]);
      
      // Pastikan data memiliki nomor surah yang valid dan normalize
      const validSurahs = data.filter((surah: any) => {
        const hasNumber = surah.number || surah.nomor || surah.id;
        if (!hasNumber) {
          console.warn('Surah without number:', surah);
        }
        return hasNumber;
      });
      
      // Normalize data structure berdasarkan struktur yang sebenarnya
      return validSurahs.map((surah: any) => ({
        number: parseInt(surah.number || surah.nomor || surah.id),
        name: surah.name || surah.nama || '',
        name_latin: surah.name_latin || surah.nama_latin || surah.englishName || '',
        name_translation: surah.name_translation || surah.nama_translation || surah.englishNameTranslation || '',
        number_of_ayah: surah.number_of_ayah || surah.jumlah_ayat || surah.numberOfAyahs || '0',
        translations: surah.translations || { id: '', en: '' },
        revelation: surah.revelation || { arab: 'Meccan', en: 'Meccan' },
        tafsir: surah.tafsir || { id: '' }
      }));
    } catch (error) {
      console.error('Error fetching surah metadata:', error);
      throw error;
    }
  }

  // Fetch data surah dari API (fetch per edition, merge manual)
  private async fetchSurahData(surahNumber: number): Promise<any> {
    const editionIds = [
      'quran-uthmani',
      'quran-tajweed', 
      'en.transliteration',
      'id.indonesian',
      'id.jalalayn'
    ];
    
    const results = [];
    for (const id of editionIds) {
      try {
        // Add delay between requests to avoid rate limiting
        if (results.length > 0) {
          await new Promise(resolve => setTimeout(resolve, 200)); // 200ms delay
        }
        
        // Use the correct endpoint for edition data with ayahs
        // Try different endpoint format that returns surah with ayahs
        const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/${id}`);
        if (!res.ok) {
          console.warn(`Failed to fetch edition ${id} for surah ${surahNumber}: ${res.status} ${res.statusText}`);
          continue;
        }
        const data = await res.json();
        // API returns {code, status, data} where data contains surah with ayahs
        if (data && data.data) {
          // Log structure for debugging
          // if (surahNumber <= 5) {
          //   console.log(`Surah ${surahNumber} edition ${id} data:`, {
          //     hasAyahs: !!data.data.ayahs,
          //     ayahsCount: data.data.ayahs?.length,
          //     identifier: data.data.edition?.identifier,
          //     structure: Object.keys(data.data)
          //   });
          // }
          results.push({ ...data.data, identifier: id });
        }
      } catch (e) {
        console.warn('Failed to fetch edition', id, 'for surah', surahNumber, e);
        continue;
      }
    }
    
    // If no editions found, try to get at least uthmani
    if (results.length === 0) {
      console.warn(`No editions found for surah ${surahNumber}, trying uthmani only...`);
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Longer delay
        const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/quran-uthmani`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.data) {
            results.push({ ...data.data, identifier: 'quran-uthmani' });
          }
        }
      } catch (e) {
        console.error('Failed to fetch uthmani for surah', surahNumber, e);
      }
    }
    
    return { data: results };
  }

  // Simpan metadata surah ke database
  private async saveSurahMetadata(surahMetadata: any[]): Promise<void> {
    if (!db) {
      console.warn('Database not available');
      return;
    }
    
    await db!.transaction('rw', db!.surahs, async () => {
      // Clear existing data first
      await db!.surahs.clear();
      
              for (const surah of surahMetadata) {
          await db!.surahs.add({
            number: surah.number,
            name: surah.name,
            name_latin: surah.name_latin,
            name_translation: surah.name_translation,
            number_of_ayah: surah.number_of_ayah,
            translations: surah.translations,
            revelation: surah.revelation,
            tafsir: surah.tafsir
          });
        }
    });
  }

  // Simpan data surah ke database
  private async saveSurahData(surahData: any): Promise<void> {
    if (!db) {
      console.warn('Database not available');
      return;
    }
    
    try {
      // Data dari API alquran.cloud memiliki struktur yang berbeda
      // surahData.data adalah array dari editions
      const editions = surahData.data;
      
      // Validasi data
      if (!editions || !Array.isArray(editions)) {
        console.warn('Invalid surah data structure:', surahData);
        return;
      }
      
      // Ambil data dari berbagai edition
      const uthmani = editions.find((e: any) => 
        e.identifier === 'quran-uthmani' || 
        e.identifier?.includes('uthmani')
      );
      const tajweed = editions.find((e: any) => 
        e.identifier === 'quran-tajweed' || 
        e.identifier?.includes('tajweed')
      );
      const transliteration = editions.find((e: any) => 
        e.identifier === 'en.transliteration' || 
        e.identifier?.includes('transliteration')
      );
      const indonesian = editions.find((e: any) => 
        e.identifier === 'id.indonesian' || 
        e.identifier?.includes('indonesian')
      );
      const jalalayn = editions.find((e: any) => 
        e.identifier === 'id.jalalayn' || 
        e.identifier?.includes('jalalayn')
      );

      // Update surah dengan data lengkap jika ada uthmani
      if (uthmani && uthmani.surah) {
        await db.surahs.where('number').equals(uthmani.surah.number).modify({
          // Tambahkan data lain jika diperlukan
        });
      }
    } catch (error) {
      console.error('Error in saveSurahData:', error);
      throw error;
    }
  }

  // Simpan data ayat ke database
  private async saveVersesData(surahData: any): Promise<void> {
    if (!db) {
      console.warn('Database not available');
      return;
    }
    
    try {
      // Data dari API alquran.cloud memiliki struktur yang berbeda
      // surahData.data adalah array dari editions
      const editions = surahData.data;
      
      // Validasi data
      if (!editions || !Array.isArray(editions)) {
        console.warn('Invalid surah data structure for verses:', surahData);
        return;
      }
      
      // Filter editions yang valid (tidak undefined)
      const validEditions = editions.filter((e: any) => e && e.identifier);
      
      if (validEditions.length === 0) {
        console.warn('No valid editions found for surah:', surahData);
        return;
      }
      
      // Log editions for debugging
      // console.log(`Processing surah with ${validEditions.length} editions:`, 
      //   validEditions.map((e: any) => ({
      //     identifier: e.identifier,
      //     hasAyahs: !!e.ayahs,
      //     ayahsCount: e.ayahs?.length,
      //     editionIdentifier: e.edition?.identifier
      //   }))
      // );
      
      const uthmani = validEditions.find((e: any) => 
        e.identifier === 'quran-uthmani' || 
        e.identifier?.includes('uthmani') ||
        e.edition?.identifier?.includes('uthmani')
      );
      const tajweed = validEditions.find((e: any) => 
        e.identifier === 'quran-tajweed' || 
        e.identifier?.includes('tajweed') ||
        e.edition?.identifier?.includes('tajweed')
      );
      const transliteration = validEditions.find((e: any) => 
        e.identifier === 'en.transliteration' || 
        e.identifier?.includes('transliteration') ||
        e.edition?.identifier?.includes('transliteration')
      );
      const indonesian = validEditions.find((e: any) => 
        e.identifier === 'id.indonesian' || 
        e.identifier?.includes('indonesian') ||
        e.edition?.identifier?.includes('indonesian')
      );
      const jalalayn = validEditions.find((e: any) => 
        e.identifier === 'id.jalalayn' || 
        e.identifier?.includes('jalalayn') ||
        e.edition?.identifier?.includes('jalalayn')
      );

      // Validasi uthmani edition - handle different data structures
      const uthmaniAyahs = uthmani?.ayahs || uthmani?.surah?.ayahs;
      const surahNumber = uthmani?.number || uthmani?.surah?.number;
      
      if (!uthmani || !uthmaniAyahs) {
        console.warn('Missing uthmani edition for surah:', surahNumber);
        console.warn('Uthmani data:', uthmani);
        console.warn('Available editions:', validEditions.map((e: any) => e.identifier));
        
        // Log detailed structure for debugging
        // if (uthmani) {
        //   console.log('Uthmani structure:', {
        //     hasSurah: !!uthmani.surah,
        //     hasAyahs: !!uthmani.ayahs,
        //     number: uthmani.number,
        //     surahNumber: uthmani.surah?.number,
        //     ayahsCount: uthmani.ayahs?.length || uthmani.surah?.ayahs?.length,
        //     keys: Object.keys(uthmani)
        //   });
        // }
        return;
      }

      // console.log(`Saving ${uthmaniAyahs.length} verses for surah ${surahNumber}`);

      await db!.transaction('rw', db!.verses, async () => {
        // Clear existing verses for this surah first
        await db!.verses.where('surahNumber').equals(surahNumber).delete();
        
        for (let i = 0; i < uthmaniAyahs.length; i++) {
          const uthmaniAyah = uthmaniAyahs[i];
          const tajweedAyah = tajweed?.ayahs?.[i] || tajweed?.surah?.ayahs?.[i];
          const transliterationAyah = transliteration?.ayahs?.[i] || transliteration?.surah?.ayahs?.[i];
          const indonesianAyah = indonesian?.ayahs?.[i] || indonesian?.surah?.ayahs?.[i];
          const jalalaynAyah = jalalayn?.ayahs?.[i] || jalalayn?.surah?.ayahs?.[i];

          await db!.verses.add({
            surahNumber: surahNumber,
            verseNumber: uthmaniAyah.numberInSurah,
            text: {
              arab: uthmaniAyah.text,
              transliteration: transliterationAyah?.text || ''
            },
            translations: {
              id: indonesianAyah?.text || '',
              en: jalalaynAyah?.text || ''
            },
            audio: {
              primary: `https://api.alquran.cloud/v1/ayah/${uthmaniAyah.number}/ar.alafasy`,
              secondary: []
            },
            tafsir: {
              id: ''
            },
            juz: uthmaniAyah.juz,
            hizb: uthmaniAyah.hizbQuarter,
            page: uthmaniAyah.page,
            sajda: uthmaniAyah.sajda || false
          });
        }
      });
    } catch (error) {
      console.error('Error in saveVersesData:', error);
      throw error;
    }
  }

  // Hapus semua data offline
  async clearOfflineData(): Promise<void> {
    try {
      await dbHelpers.clearAllData();
      this.updateProgress({
        status: 'completed',
        current: 0,
        percentage: 0,
        message: 'Data offline berhasil dihapus'
      });
    } catch (error) {
      console.error('Error clearing offline data:', error);
      throw error;
    }
  }

  // Dapatkan info ukuran database
  async getDatabaseInfo(): Promise<{ surahs: number; verses: number; lastDownload: string | null }> {
    const size = await dbHelpers.getDatabaseSize();
    const lastDownload = await dbHelpers.getMetadata('lastDownload');
    return {
      ...size,
      lastDownload
    };
  }
}

export const offlineService = OfflineService.getInstance();