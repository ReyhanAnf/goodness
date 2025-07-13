"use client"

import { CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SettingsAyah from "./setting";
import { ChevronRight, ChevronLeft, Bolt, ListRestart, BadgeInfo, Home, Navigation, Search } from "lucide-react"
import ProgressAyah from "./progressayah";
import { useRouter } from "next/navigation";
import DetailSurah from "./detailsurah";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function MetaSurah({ metasurah, setpTajweed, setpQori, pqori, setpFontsize, idsurah }: any) {
  const router = useRouter();
  const [ms, setMs] = useState<any>(null);
  const [showNavigation, setShowNavigation] = useState(false);
  const [targetAyah, setTargetAyah] = useState("");
  
  useEffect(() => {
    // console.log('MetaSurah Debug:', { metasurah, idsurah });
    
    // Handle different data structures and add safety checks
    let surahData = null;
    
    if (metasurah && Array.isArray(metasurah)) {
      // console.log('Metasurah is array, length:', metasurah.length);
      surahData = metasurah[parseInt(idsurah) - 1];
    } else if (metasurah && metasurah.data && Array.isArray(metasurah.data)) {
      // console.log('Metasurah has data property, length:', metasurah.data.length);
      surahData = metasurah.data[parseInt(idsurah) - 1];
    } else if (metasurah && typeof metasurah === 'object') {
      // console.log('Metasurah is single object');
      surahData = metasurah;
    }

    // console.log('Surah data found:', surahData);

    // Fallback data if surahData is not available
    if (!surahData) {
      // console.log('No surah data found, using fallback');
      surahData = {
        nomor: parseInt(idsurah),
        nama: `Surah ${idsurah}`,
        nama_latin: `Surah ${idsurah}`,
        arti: "Loading...",
        tempat_turun: "Loading...",
        jumlah_ayat: 0
      };
    }

    setMs(surahData);
  }, [metasurah, idsurah]);

  // Navigation functions with safety checks
  const navigateToSurah = (direction: 'prev' | 'next') => {
    const currentNumber = parseInt(idsurah);
    const targetNumber = direction === 'prev' ? currentNumber - 1 : currentNumber + 1;
    
    if (targetNumber >= 1 && targetNumber <= 114) {
      router.push(`/al-qur_an/surah/${targetNumber}`);
    }
  };

  const navigateToHome = () => {
    router.push('/al-qur_an');
  };

  // Navigate to specific ayah
  const navigateToAyah = () => {
    const ayahNumber = parseInt(targetAyah);
    if (ayahNumber > 0 && ayahNumber <= (ms?.jumlah_ayat || ms?.numberOfAyahs || 0)) {
      const element = document.getElementById(`ayah-${ayahNumber}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setShowNavigation(false);
        setTargetAyah("");
        toast.success(`Menuju ayat ${ayahNumber}`);
      }
    } else {
      toast.error(`Ayat ${targetAyah} tidak ditemukan`);
    }
  };

  // Show loading state if ms is not available
  if (!ms) {
    return (
      <div className="w-full bg-gradient-to-r from-emerald-50 via-cyan-50 to-emerald-50 dark:from-emerald-950 dark:via-gray-900 dark:to-emerald-950 border-b border-emerald-200 dark:border-emerald-800 shadow-lg">
        <div className="flex flex-row justify-between items-center px-4 py-3">
          <div className="flex flex-col gap-2 items-start">
            <Button
              variant="ghost"
              size="sm"
              disabled
              className="p-2 rounded-full opacity-50"
            >
              <ChevronLeft size={20} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={navigateToHome}
              className="p-2 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all duration-200"
            >
              <Home size={18} className="text-emerald-700 dark:text-emerald-300" />
            </Button>
          </div>

          <div className="flex flex-col items-center text-center px-4 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {idsurah}
              </div>
              <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                Loading...
              </CardTitle>
            </div>
            
            <CardTitle className="text-base text-emerald-700 dark:text-emerald-300 font-medium mb-1">
              Loading...
            </CardTitle>
            
            <CardDescription className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Loading...
            </CardDescription>
            
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
              <span>Loading...</span>
            </div>
            
            <div className="mt-2">
              <ProgressAyah />
            </div>
          </div>

          <div className="flex flex-col gap-2 items-end">
            <Button
              variant="ghost"
              size="sm"
              disabled
              className="p-2 rounded-full opacity-50"
            >
              <ChevronRight size={20} />
            </Button>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="p-2 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all duration-200"
                >
                  <Bolt size={18} className="text-emerald-700 dark:text-emerald-300" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="end">
                <SettingsAyah 
                  setpTajweed={setpTajweed} 
                  setpQori={setpQori} 
                  pqori={pqori} 
                  setpFontsize={setpFontsize} 
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full -mt-5 bg-gradient-to-r from-emerald-50 via-cyan-50 to-emerald-50 dark:from-emerald-950 dark:via-gray-900 dark:to-emerald-950 border-b border-emerald-200 dark:border-emerald-800 shadow-lg">
      <div className="flex flex-row justify-between items-center px-4 py-3">
        {/* Left Navigation */}
        <div className="flex flex-col gap-2 items-start">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateToSurah('prev')}
            disabled={parseInt(idsurah) <= 1}
            className={cn(
              "p-2 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all duration-200",
              parseInt(idsurah) <= 1 && "opacity-50 cursor-not-allowed"
            )}
          >
            <ChevronLeft size={20} className="text-emerald-700 dark:text-emerald-300" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={navigateToHome}
            className="p-2 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all duration-200"
          >
            <Home size={18} className="text-emerald-700 dark:text-emerald-300" />
          </Button>
        </div>

        {/* Center Content */}
        <div className="flex flex-col items-center text-center px-4 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
              {ms.nomor || ms.number || idsurah}
            </div>
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
              {ms.nama || ms.name || ms.englishName || `Surah ${idsurah}`}
            </CardTitle>
          </div>
          
          <CardTitle className="text-base text-emerald-700 dark:text-emerald-300 font-medium mb-1">
            {ms.nama_latin || ms.englishName || ms.name_latin || `Surah ${idsurah}`}
          </CardTitle>
          
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            {ms.arti || ms.englishNameTranslation || ms.name_translation || "Loading..."}
          </CardDescription>
          
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500 mb-2">
            <span>{ms.tempat_turun || ms.revelationType || "Loading..."}</span>
            <span>•</span>
            <span>{ms.jumlah_ayat || ms.numberOfAyahs || 0} Ayat</span>
          </div>

          {/* Ayah Navigation */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowNavigation(!showNavigation)}
              className="flex items-center gap-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              <Navigation size={14} />
              <span className="text-xs">Ayat</span>
            </Button>
            
            {showNavigation && (
              <div className="flex items-center gap-2 animate-in slide-in-from-left-2 duration-200">
                <Input
                  type="number"
                  placeholder="No. ayat..."
                  value={targetAyah}
                  onChange={(e) => setTargetAyah(e.target.value)}
                  className="w-16 text-center text-xs"
                  min="1"
                  max={ms.jumlah_ayat || ms.numberOfAyahs || 0}
                />
                <Button 
                  size="sm" 
                  onClick={navigateToAyah}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-200"
                >
                  <Search size={12} />
                </Button>
              </div>
            )}
          </div>
          
          <div className="mt-2">
            <ProgressAyah />
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex flex-col gap-2 items-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateToSurah('next')}
            disabled={parseInt(idsurah) >= 114}
            className={cn(
              "p-2 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all duration-200",
              parseInt(idsurah) >= 114 && "opacity-50 cursor-not-allowed"
            )}
          >
            <ChevronRight size={20} className="text-emerald-700 dark:text-emerald-300" />
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="p-2 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all duration-200"
              >
                <Bolt size={18} className="text-emerald-700 dark:text-emerald-300" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="end">
              <SettingsAyah 
                setpTajweed={setpTajweed} 
                setpQori={setpQori} 
                pqori={pqori} 
                setpFontsize={setpFontsize} 
              />
            </PopoverContent>
          </Popover>
          
          <DetailSurah ms={ms} />
        </div>
      </div>
    </div>
  )
}