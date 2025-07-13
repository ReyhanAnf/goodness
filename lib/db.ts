import Dexie, { Table } from 'dexie';

// Interface untuk data Surah
export interface Surah {
  id?: number;
  number: number;
  name: string;
  name_latin: string;
  name_translation: string;
  number_of_ayah: string;
  translations: {
    id: string;
    en: string;
  };
  revelation: {
    arab: string;
    en: string;
  };
  tafsir: {
    id: string;
  };
}

// Interface untuk data Ayat
export interface Verse {
  id?: number;
  surahNumber: number;
  verseNumber: number;
  text: {
    arab: string;
    transliteration: string;
  };
  translations: {
    id: string;
    en: string;
  };
  audio: {
    primary: string;
    secondary: string[];
  };
  tafsir: {
    id: string;
  };
  juz: number;
  hizb: number;
  page: number;
  sajda: boolean;
}

// Interface untuk metadata aplikasi
export interface AppMetadata {
  id?: number;
  key: string;
  value: string;
  updatedAt: Date;
}

export class QuranDatabase extends Dexie {
  surahs!: Table<Surah>;
  verses!: Table<Verse>;
  metadata!: Table<AppMetadata>;

  constructor() {
    super('QuranDatabase');
    
    this.version(1).stores({
      surahs: '++id, &number, name, name_latin',
      verses: '++id, surahNumber, verseNumber, juz, hizb, page',
      metadata: '++id, &key'
    });
  }
}

// Cek apakah kita di client-side
const isClient = typeof window !== 'undefined';

// Buat instance database hanya jika di client-side
export const db = isClient ? new QuranDatabase() : null;

// Helper functions untuk database operations
export const dbHelpers = {
  // Cek apakah data sudah ada
  async isDataDownloaded(): Promise<boolean> {
    if (!isClient || !db) return false;
    try {
      const surahCount = await db.surahs.count();
      const verseCount = await db.verses.count();
      return surahCount > 0 && verseCount > 0;
    } catch (error) {
      console.error('Error checking data download:', error);
      return false;
    }
  },

  // Simpan metadata
  async setMetadata(key: string, value: string): Promise<void> {
    if (!isClient || !db) return;
    try {
      // Clear existing metadata first to avoid constraint error
      await db.metadata.where('key').equals(key).delete();
      
      // Add new metadata
      await db.metadata.add({
        key,
        value,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error setting metadata:', error);
    }
  },

  // Ambil metadata
  async getMetadata(key: string): Promise<string | null> {
    if (!isClient || !db) return null;
    try {
      const metadata = await db.metadata.where('key').equals(key).first();
      return metadata?.value || null;
    } catch (error) {
      console.error('Error getting metadata:', error);
      return null;
    }
  },

  // Hapus semua data (untuk reset)
  async clearAllData(): Promise<void> {
    if (!isClient || !db) return;
    try {
      await db.transaction('rw', [db.surahs, db.verses, db.metadata], async () => {
        await db.surahs.clear();
        await db.verses.clear();
        await db.metadata.clear();
      });
    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  },

  // Dapatkan ukuran database
  async getDatabaseSize(): Promise<{ surahs: number; verses: number }> {
    if (!isClient || !db) return { surahs: 0, verses: 0 };
    try {
      const surahs = await db.surahs.count();
      const verses = await db.verses.count();
      return { surahs, verses };
    } catch (error) {
      console.error('Error getting database size:', error);
      return { surahs: 0, verses: 0 };
    }
  }
}; 