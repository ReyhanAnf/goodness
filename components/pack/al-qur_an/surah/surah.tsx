"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, MapPin, Hash } from "lucide-react"
import Link from "next/link"
import { get_meta_surah } from "@/lib/get_surah"
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react"

import localFont from "next/font/local"

export const alquranali = localFont({
  src: [
    {
      path: '../../../../public/fonts/uthmani.otf',
      weight: '400'
    }
  ],
  variable: '--font-alquranali'
})

export const arabnum = localFont({
  src: [
    {
      path: '../../../../public/fonts/AlQuranAli.ttf',
      weight: '400'
    }
  ],
  variable: '--font-arabnum'
})

import { Amiri } from "next/font/google"

export const font_kitab = Amiri({
  weight: "400",
  preload: true,
  subsets: ["arabic"],
  display: "auto"
})

export default function ListSurah() {
  const [list_surah, setListSurah] = useState<any[]>([]);
  const [filteredSurah, setFilteredSurah] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        const data = await get_meta_surah();
        
        // Handle different data structures
        let surahList = [];
        if (Array.isArray(data)) {
          // Direct array structure
          surahList = data;
        } else if (data && Array.isArray(data.data)) {
          // Nested data structure
          surahList = data.data;
        } else {
          console.error('Unexpected data structure:', data);
          surahList = [];
        }
        
        // Debug: log first surah to see structure
        // if (surahList.length > 0) {
        //   console.log('First surah structure:', surahList[0]);
        // }
        
        setListSurah(surahList);
        setFilteredSurah(surahList);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching surah:', error);
        setIsLoading(false);
      }
    };
    fetchSurah();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredSurah(list_surah);
    } else {
      const filtered = list_surah.filter((surah) => {
        const query = searchQuery.toLowerCase();
        
        // Handle different property names
        const nama_latin = surah.nama_latin || surah.englishName || surah.name_latin || '';
        const arti = surah.arti || surah.englishNameTranslation || surah.name_translation || '';
        const nama = surah.nama || surah.name || '';
        const nomor = surah.nomor || surah.number || '';
        const tempat_turun = surah.tempat_turun || surah.revelationType || '';
        
        return (
          nama_latin.toLowerCase().includes(query) ||
          arti.toLowerCase().includes(query) ||
          nama.toLowerCase().includes(query) ||
          nomor.toString().includes(query) ||
          tempat_turun.toLowerCase().includes(query)
        );
      });
      setFilteredSurah(filtered);
    }
  }, [searchQuery, list_surah]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative px-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Cari surah berdasarkan nama, arti, atau nomor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        {searchQuery && (
          <div className="text-sm text-gray-500 mt-2 px-1">
            Ditemukan {filteredSurah.length} surah
          </div>
        )}
      </div>

      {/* Surah List */}
      <div className="space-y-2 px-4">
        {filteredSurah.map((item: any) => {
          // Handle different property names with more comprehensive mapping
          const nomor = item.nomor || item.number || '';
          const nama_latin = item.nama_latin || item.englishName || item.name_latin || '';
          const arti = item.arti || item.englishNameTranslation || item.name_translation || '';
          const nama = item.nama || item.name || '';
          
          // More comprehensive mapping for revelation type
          let tempat_turun = item.tempat_turun || 
                            item.revelationType || 
                            item.revelation?.arab ||
                            item.revelation ||
                            'Unknown';
          
          // Normalize revelation type
          if (tempat_turun.toLowerCase().includes('meccan') || tempat_turun.toLowerCase().includes('mekah')) {
            tempat_turun = 'Mekah';
          } else if (tempat_turun.toLowerCase().includes('medinan') || tempat_turun.toLowerCase().includes('madinah')) {
            tempat_turun = 'Madinah';
          }
          
          // More comprehensive mapping for number of ayahs
          const jumlah_ayat = item.jumlah_ayat || 
                             item.numberOfAyahs || 
                             item.number_of_ayah ||
                             'Unknown';
          
          // Debug log for first item
          // if (nomor === '1' || nomor === 1) {
          //   console.log('Surah 1 details:', {
          //     nomor,
          //     nama_latin,
          //     arti,
          //     nama,
          //     tempat_turun,
          //     jumlah_ayat,
          //     originalItem: item
          //   });
          // }
          
          return (
            <Link key={"surah-" + nomor} href={"/al-qur_an/surah/" + nomor}>
              <Card className="group hover:shadow-lg transition-all duration-300 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-500 rounded-xl overflow-hidden">
                <div className="flex items-center p-4">
                  {/* Number Badge */}
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {nomor}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {nama_latin}
                      </h3>
                      <div className={cn("text-lg text-emerald-600 dark:text-emerald-400", alquranali.className)}>
                        {nama}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {arti}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <MapPin size={12} />
                        <span>{tempat_turun}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen size={12} />
                        <span>{jumlah_ayat} ayat</span>
                      </div>
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="flex-shrink-0 ml-4">
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900 transition-colors duration-300">
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredSurah.length === 0 && searchQuery && (
        <div className="text-center py-12 px-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            Surah tidak ditemukan
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Coba cari dengan kata kunci yang berbeda
          </p>
        </div>
      )}

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="text-xs text-gray-500 px-4">
          Total surah: {list_surah.length} | Filtered: {filteredSurah.length}
        </div>
      )}
    </div>
  )
}

