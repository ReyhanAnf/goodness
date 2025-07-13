"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { alquranali, arabnum } from "./surah";
import { cn } from "@/lib/utils";
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { Copy, Share, Play, Pause, Volume2, Navigation, Check, Bookmark } from "lucide-react";
import AudioBar from "./audiobar";
import { useEffect, useState } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AyahsCard({ surah, audio_surah, tajweed, qori, fontsize }: any) {
  const Tajweed = require("tajweed").Tajweed;

  // Perbaiki deteksi sumber data (offline/online)
  let sourceInfo = '';
  let isOffline = false;
  if (surah && surah.status === "OK" && surah.data && surah.data.ayahs) {
    sourceInfo = 'Sumber data: Offline (IndexedDB/Cache)';
    isOffline = true;
  } else if (surah && surah.data && Array.isArray(surah.data)) {
    sourceInfo = 'Sumber data: Online (API)';
    isOffline = false;
  } else {
    sourceInfo = 'Sumber data: Tidak diketahui';
  }

  // Normalisasi struktur ayat agar komponen bisa handle offline & online
  let ayahs_s: any[] = [], ayahs_t: any[] = [], latin: any[] = [], terjemahan: any[] = [], tafsir: any[] = [];
  if (isOffline && surah.data) {
    // Cek editions
    const editions = surah.data.editions || [];
    const findEdition = (identifier: string) => editions.find((ed: any) => ed.identifier === identifier);

    const arabEdition = findEdition("quran-uthmani") || { surah: { ayahs: surah.data.ayahs || [] } };
    const latinEdition = findEdition("en.transliteration");
    const translationEdition = findEdition("id.indonesian");
    const tafsirEdition = findEdition("id.tafsir");

    ayahs_s = arabEdition?.surah?.ayahs || [];
    ayahs_t = ayahs_s;
    latin = (latinEdition?.surah?.ayahs || []).map((a: any) => ({ text: a.text }));
    terjemahan = (translationEdition?.surah?.ayahs || []).map((a: any) => ({ text: a.text }));
    tafsir = (tafsirEdition?.surah?.ayahs || []).map((a: any) => ({ text: a.text }));
  } else if (surah.data && Array.isArray(surah.data)) {
    // Online: cari edition berdasarkan identifier
    const findEdition = (identifier: string) => surah.data.find((ed: any) => ed.edition?.identifier === identifier);
    const arabEdition = findEdition("ar.alafasy") || findEdition("ar.quran-simple") || surah.data[0];
    const latinEdition = findEdition("en.transliteration") || findEdition("id.transliteration") || findEdition("latin") || {};
    const translationEdition = findEdition("id.indonesian") || findEdition("id.translation") || {};
    const tafsirEdition = findEdition("id.tafsir") || {};

    ayahs_s = arabEdition?.ayahs || [];
    ayahs_t = arabEdition?.ayahs || [];
    latin = (latinEdition?.ayahs || []).map((a: any) => ({ text: a.text }));
    terjemahan = (translationEdition?.ayahs || []).map((a: any) => ({ text: a.text }));
    tafsir = (tafsirEdition?.ayahs || []).map((a: any) => ({ text: a.text }));
  }

  let list_fontsize = ["lg", "xl", "2xl", "3xl", "4xl"];

  let parseTajweed = new Tajweed();
  let ayahsparse: any = [];
  let tajweedRules: any = [];
  
  if (tajweed) {
    ayahs_t.map((ayah: any) => {
      let parsestr = parseTajweed.parse(ayah.text, true);
      ayahsparse.push(parsestr);
      
      // Extract tajweed rules if available
      if (ayah.tajweed) {
        tajweedRules.push(ayah.tajweed);
      } else {
        tajweedRules.push(null);
      }
    })
  } else {
    ayahs_s.map((ayah: any) => {
      let parsestr = ayah.text;
      ayahsparse.push(parsestr);
      tajweedRules.push(null);
    })
  }

  // Get surah number and name for bookmark
  const surahNumber = surah.data?.number || (Array.isArray(surah.data) ? surah.data[0]?.number : 1);
  const surahName = surah.data?.englishName || surah.data?.name_latin || 'Al-Qur\'an';

  // Last read bookmark state
  const [lastReadAyah, setLastReadAyah] = useState<number | null>(null);

  // Load last read bookmark on component mount
  useEffect(() => {
    const savedBookmark = localStorage.getItem(`lastRead_${surahNumber}`);
    if (savedBookmark) {
      const bookmarkData = JSON.parse(savedBookmark);
      setLastReadAyah(bookmarkData.ayah);
    }
  }, [surahNumber]);

  // Function to save last read bookmark
  const saveLastRead = (ayahNumber: number) => {
    const bookmarkData = {
      surah: surahNumber,
      surahName: surahName,
      ayah: ayahNumber,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(`lastRead_${surahNumber}`, JSON.stringify(bookmarkData));
    setLastReadAyah(ayahNumber);
    toast.success(`Penanda disimpan di ayat ${ayahNumber}`);
  };

  // Function to clear last read bookmark
  const clearLastRead = () => {
    localStorage.removeItem(`lastRead_${surahNumber}`);
    setLastReadAyah(null);
    toast.success("Penanda terakhir dibaca dihapus");
  };

  // Function to render Arabic text with tajweed tooltips
  const renderArabicWithTajweed = (ayahText: string, ayahIndex: number, isCurrentlyPlaying: boolean) => {
    if (!tajweed || !tajweedRules[ayahIndex]) {
      // If no tajweed data, render normal text
      return (
        <div 
          className={cn(
            "text-" + list_fontsize[fontsize] + " tracking-wide leading-[2.5] text-right p-4 bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/10 dark:to-cyan-900/10 rounded-xl border border-emerald-100 dark:border-emerald-800",
            "group-hover:from-emerald-100 group-hover:to-cyan-100 dark:group-hover:from-emerald-800/20 dark:group-hover:to-cyan-800/20 transition-all duration-300",
            isCurrentlyPlaying && "from-emerald-100 to-cyan-100 dark:from-emerald-800/30 dark:to-cyan-800/30"
          )} 
          dangerouslySetInnerHTML={{ __html: ayahText }}
        />
      );
    }

    // If tajweed data is available, render with tooltips
    const tajweedData = tajweedRules[ayahIndex];
    
    return (
      <TooltipProvider>
        <div 
          className={cn(
            "text-" + list_fontsize[fontsize] + " tracking-wide leading-[2.5] text-right p-4 bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/10 dark:to-cyan-900/10 rounded-xl border border-emerald-100 dark:border-emerald-800 relative",
            "group-hover:from-emerald-100 group-hover:to-cyan-100 dark:group-hover:from-emerald-800/20 dark:group-hover:to-cyan-800/20 transition-all duration-300",
            isCurrentlyPlaying && "from-emerald-100 to-cyan-100 dark:from-emerald-800/30 dark:to-cyan-800/30"
          )}
        >
          <div dangerouslySetInnerHTML={{ __html: ayahText }} />
          
          {/* Render tajweed indicators if data is available */}
          {tajweedData && Array.isArray(tajweedData) && tajweedData.map((rule: any, ruleIndex: number) => {
            if (rule && rule.type) {
              return (
                <Tooltip key={ruleIndex}>
                  <TooltipTrigger asChild>
                    <div 
                      className="absolute cursor-help hover:opacity-100 transition-opacity duration-200"
                      style={{
                        left: `${rule.position || 0}%`,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '4px',
                        height: '24px',
                        backgroundColor: getTajweedColor(rule.type),
                        opacity: 0.6,
                        borderRadius: '2px',
                        pointerEvents: 'auto'
                      }}
                    />
                  </TooltipTrigger>
                  <TooltipContent 
                    side="top" 
                    className="bg-emerald-800 text-white border-emerald-700 max-w-xs"
                  >
                    <div className="text-center p-1">
                      <div className="font-bold text-sm mb-1">{rule.type.toUpperCase()}</div>
                      {rule.text && (
                        <div className="text-xs opacity-90 leading-relaxed">{rule.text}</div>
                      )}
                      {rule.description && (
                        <div className="text-xs opacity-75 mt-1 italic">{rule.description}</div>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            }
            return null;
          })}
        </div>
      </TooltipProvider>
    );
  };

  // Function to get color for different tajweed rules
  const getTajweedColor = (ruleType: string) => {
    const colors: { [key: string]: string } = {
      'idgham': '#FF6B6B', // Red
      'ikhfa': '#4ECDC4', // Teal
      'iqlab': '#45B7D1', // Blue
      'qalqalah': '#96CEB4', // Green
      'ghunnah': '#FFEAA7', // Yellow
      'madd': '#DDA0DD', // Plum
      'waqf': '#98D8C8', // Mint
      'idgham_ghunnah': '#FF8E8E', // Light Red
      'idgham_bila_ghunnah': '#FF5252', // Dark Red
      'ikhfa_haqiqi': '#26A69A', // Dark Teal
      'ikhfa_shafawi': '#4DB6AC', // Light Teal
      'default': '#FFA500' // Orange
    };
    
    return colors[ruleType.toLowerCase()] || colors.default;
  };

  function choice_audio(arr: any, key: any) {
    if (!arr || !arr.data) return null;
    
    let result = arr.data[0];
    arr.data.map((qor: any) => {
      if (qor) {
        if (qor?.edition?.identifier == key) {
          result = qor;
        }
      }
    })
    return result;
  }

  let [data_audio, setdataAudio] = useState(choice_audio(audio_surah, qori))
  useEffect(() => {
    setdataAudio(choice_audio(audio_surah, qori));
  }, [qori])

  const [toplay, setToplay] = useState(0);
  const [playing, setPlaying] = useState(false);
  const { load, pause } = useGlobalAudioPlayer();

  // Navigation state
  const [showNavigation, setShowNavigation] = useState(false);
  const [targetAyah, setTargetAyah] = useState("");

  useEffect(() => {
    if (!data_audio || !data_audio.ayahs) return;
    
    if (toplay != 0 || playing) {
      let element = document.getElementById(`ayah-${toplay - 1}`);
      if (element) {
        // Scroll ke tengah/atas viewport dengan offset
        const yOffset = 400; // offset px dari atas viewport (misal, header tinggi 100-120px)
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset - window.innerHeight / 4;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      if (toplay > data_audio.ayahs.length) {
        setToplay(0);
        setPlaying(false);
        pause();
      } else if (toplay <= 0 || data_audio.ayahs.length == 0) {
        setToplay(0);
        setPlaying(false);
        pause();
        return;
      } else {
        if (toplay == 1 && data_audio.numberOfAyahs != 1) {
          load("../../../../../audio/1.mp3", {
            autoplay: true,
            onend: () => {
              load(data_audio.ayahs[toplay - 1].audio, {
                autoplay: true,
                onend: () => {
                  setToplay(toplay + 1);
                }
              });
            }
          });
        } else {
          load(data_audio.ayahs[toplay - 1].audio, {
            autoplay: true,
            onend: () => {
              setToplay(toplay + 1);
            }
          });
        }
        if (!playing) {
          pause();
        }
      }
    }
  }, [toplay, playing]);

  // Navigation function
  const navigateToAyah = () => {
    const ayahNumber = parseInt(targetAyah);
    if (ayahNumber > 0 && ayahNumber <= ayahs_s.length) {
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

  // Copy function
  const copyAyah = (ayahText: string, ayahNumber: number) => {
    const textToCopy = `${ayahText}\n\nQS. ${surah.data?.englishName || surah.data?.name_latin || 'Al-Qur\'an'} : ${ayahNumber}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast.success("Ayat berhasil disalin");
    }).catch(() => {
      toast.error("Gagal menyalin ayat");
    });
  };

  // Share function
  const shareAyah = async (ayahText: string, ayahNumber: number) => {
    const shareText = `${ayahText}\n\nQS. ${surah.data?.englishName || surah.data?.name_latin || 'Al-Qur\'an'} : ${ayahNumber}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Ayat Al-Qur\'an',
          text: shareText,
          url: window.location.href
        });
        toast.success("Berhasil dibagikan");
      } catch (error) {
        toast.error("Gagal membagikan");
      }
    } else {
      // Fallback to copy
      copyAyah(ayahText, ayahNumber);
    }
  };

  return (
    <div className="scroll-smooth mb-12 space-y-6">
      {/* Last Read Bookmark Info */}
      {lastReadAyah && (
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bookmark className="text-amber-600 dark:text-amber-400" size={20} />
                <div>
                  <div className="text-sm font-medium text-amber-800 dark:text-amber-200">
                    Terakhir dibaca: Ayat {lastReadAyah}
                  </div>
                  <div className="text-xs text-amber-600 dark:text-amber-400">
                    {surahName}
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  const element = document.getElementById(`ayah-${lastReadAyah}`);
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-3 py-1 bg-amber-600 text-white text-xs rounded-lg hover:bg-amber-700 transition-colors"
              >
                Lanjutkan
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bismillah */}
      {surahNumber == 1 || surahNumber == 9 ? (
        ""
      ) : (
        <Card className="bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 border border-emerald-200 dark:border-emerald-700 shadow-lg">
          <CardTitle className={cn("text-emerald-800 dark:text-emerald-200 text-4xl py-8 px-6 text-center", alquranali.className)}>
            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
          </CardTitle>
        </Card>
      )}

      {/* Ayahs */}
      {ayahsparse.map((ayah: any, index: any) => {
        const ayahNumber = ayahs_s[index]?.numberInSurah || index + 1;
        const isCurrentlyPlaying = toplay === ayahNumber;
        const isLastRead = lastReadAyah === ayahNumber;
        
        return (
          <Card 
            key={"a" + index} 
            id={`ayah-${ayahNumber}`}
            className={cn(
              "group hover:shadow-lg transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-500 rounded-2xl overflow-hidden",
              isCurrentlyPlaying && "ring-2 ring-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500",
              isLastRead && "ring-2 ring-amber-500 bg-amber-50 dark:bg-amber-900/20 border-amber-500"
            )}
          >
            {/* Ayah Header */}
            <CardHeader className="pb-3 pt-4 px-6">
              <div className="flex items-center justify-between">
                {/* Ayah Number */}
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-300",
                    isCurrentlyPlaying 
                      ? "bg-gradient-to-br from-emerald-600 to-emerald-700 scale-110" 
                      : isLastRead
                      ? "bg-gradient-to-br from-amber-600 to-amber-700 scale-110"
                      : "bg-gradient-to-br from-emerald-500 to-emerald-600"
                  )}>
                    {ayahNumber}
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Ayat {ayahNumber}
                    </div>
                    {isLastRead && (
                      <div className="flex items-center gap-1 mt-1">
                        <Bookmark size={12} className="text-amber-600 dark:text-amber-400" />
                        <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                          Terakhir dibaca
                        </span>
                      </div>
                    )}
                    {tajweed && tajweedRules[index] && (
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                          Tajweed
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <AudioBar 
                    id={ayahNumber} 
                    toplay={toplay} 
                    setToplay={setToplay} 
                    playing={playing} 
                    setPlaying={setPlaying} 
                  />
                  <button 
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    onClick={() => copyAyah(ayah, ayahNumber)}
                  >
                    <Copy size={16} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <button 
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    onClick={() => shareAyah(ayah, ayahNumber)}
                  >
                    <Share size={16} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <button 
                    className={cn(
                      "p-2 rounded-lg transition-colors duration-200",
                      isLastRead 
                        ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900/50"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                    )}
                    onClick={() => isLastRead ? clearLastRead() : saveLastRead(ayahNumber)}
                    title={isLastRead ? "Hapus penanda" : "Simpan sebagai terakhir dibaca"}
                  >
                    <Bookmark size={16} />
                  </button>
                </div>
            </div>
          </CardHeader>

            {/* Ayah Content */}
            <CardContent className="px-6 pb-6">
              {/* Arabic Text */}
              <div className="mb-4">
            <div className={alquranali.className}>
                  {renderArabicWithTajweed(ayah, index, isCurrentlyPlaying)}
                </div>
            </div>

              {/* Transliteration */}
              {latin[index]?.text && (
                <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-200 dark:border-amber-800">
                  <div className="text-amber-700 dark:text-amber-300 text-sm italic leading-relaxed">
                    {latin[index].text}
                  </div>
                </div>
              )}

              {/* Translation & Tafsir */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-none">
                  <AccordionTrigger className="text-left p-1 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800 transition-colors duration-200">
                    <div className="flex flex-col items-start gap-2">
                      {/* Translation */}
                      {terjemahan[index]?.text && (
                        <div className="p-4">
                          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 text-sm">
                            Terjemahan
                          </h3>
                          <div className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                            {terjemahan[index].text}
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="space-y-4">
                      {/* Tafsir */}
                      <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-200 dark:border-purple-800">
                        <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2 text-sm">
                          Tafsir
                        </h3>
                        <div className="text-sm text-purple-700 dark:text-purple-300 leading-relaxed italic">
                          {tafsir[index]?.text || 'Tafsir tidak tersedia'}
                        </div>
                      </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
        );
      })}
    </div>
  )
}
