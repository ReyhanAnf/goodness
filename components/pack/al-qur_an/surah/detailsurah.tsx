"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BadgeInfo, Play, Pause, Navigation, Palette } from "lucide-react"
import { useEffect, useState } from "react";
import { useGlobalAudioPlayer } from 'react-use-audio-player';
import { get_surah_description } from "@/lib/get_surah";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function DetailSurah({ ms }: any) {
  let [playing, setPlaying] = useState(false);
  const [description, setDescription] = useState<string>("Loading...");
  const [isLoadingDescription, setIsLoadingDescription] = useState(true);
  const { load, play, pause } = useGlobalAudioPlayer()

  useEffect(() => {
    // console.log('DetailSurah Debug:', ms);
    
    // Check if audio URL exists before loading
    if (ms?.audio) {
      load(ms.audio, {
        autoplay: true
      })

      if (playing) {
        play();
      } else {
        pause();
      }
    }
  }, [playing, ms?.audio])

  // Load surah description
  useEffect(() => {
    const loadDescription = async () => {
      if (ms?.nomor || ms?.number) {
        setIsLoadingDescription(true);
        try {
          const surahNumber = ms.nomor || ms.number;
          const desc = await get_surah_description(surahNumber);
          setDescription(desc);
        } catch (error) {
          console.error('Error loading description:', error);
          setDescription("Deskripsi surah ini tidak tersedia saat ini.");
        } finally {
          setIsLoadingDescription(false);
        }
      }
    };

    loadDescription();
  }, [ms?.nomor, ms?.number]);

  // Handle different property names for data
  const surahName = ms?.nama || ms?.name || ms?.englishName || 'Unknown';
  const surahNumber = ms?.nomor || ms?.number || '?';
  const surahLatin = ms?.nama_latin || ms?.englishName || ms?.name_latin || 'Unknown';
  const surahTranslation = ms?.arti || ms?.englishNameTranslation || ms?.name_translation || 'Unknown';
  const surahRevelation = ms?.tempat_turun || ms?.revelationType || 'Unknown';
  const surahAyahs = ms?.jumlah_ayat || ms?.numberOfAyahs || 0;

  // Tajweed color information
  const tajweedColors = [
    {
      name: "Idgham",
      color: "#FF6B6B",
      description: "Menggabungkan dua huruf menjadi satu dengan ghunnah (dengung)"
    },
    {
      name: "Ikhfa",
      color: "#4ECDC4", 
      description: "Menyembunyikan huruf nun mati atau tanwin dengan ghunnah"
    },
    {
      name: "Iqlab",
      color: "#45B7D1",
      description: "Mengubah huruf nun mati atau tanwin menjadi mim"
    },
    {
      name: "Qalqalah",
      color: "#96CEB4",
      description: "Membaca huruf dengan getaran atau pantulan suara"
    },
    {
      name: "Ghunnah",
      color: "#FFEAA7",
      description: "Dengung yang wajib dibaca selama 2 harakat"
    },
    {
      name: "Madd",
      color: "#DDA0DD",
      description: "Memanjangkan bacaan huruf mad"
    },
    {
      name: "Waqf",
      color: "#98D8C8",
      description: "Tanda berhenti dalam bacaan"
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="p-2 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all duration-200"
        >
          <BadgeInfo size={18} className="text-emerald-700 dark:text-emerald-300" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{surahName}</DialogTitle>
          <DialogTitle className="text-lg">{surahNumber} . {surahLatin}</DialogTitle>
          <DialogTitle className="text-sm text-gray-600">{surahTranslation}</DialogTitle>
          <div className="flex flex-row justify-between px-2 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="text-sm">Jumlah Ayat : {surahAyahs}</div>
            <div className="text-sm">Diturunkan di {surahRevelation}</div>
          </div>
          
          {/* Tajweed Information */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="tajweed" className="border-none">
              <AccordionTrigger className="flex items-center gap-2 p-3 bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-lg border border-emerald-200 dark:border-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors">
                <Palette size={16} className="text-emerald-600 dark:text-emerald-400" />
                <span className="font-medium text-emerald-800 dark:text-emerald-200">
                  Informasi Tajweed
                </span>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Berikut adalah penjelasan warna-warna tajweed yang digunakan dalam bacaan Al-Qur'an:
                  </p>
                  {tajweedColors.map((rule, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div 
                        className="w-6 h-6 rounded-full flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: rule.color }}
                      ></div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-1">
                          {rule.name}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                          {rule.description}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-200 dark:border-amber-700">
                    <div className="text-xs text-amber-800 dark:text-amber-200">
                      <strong>Tips:</strong> Hover pada garis berwarna di atas teks Arab untuk melihat detail aturan tajweed.
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex flex-col items-start">
            <h3 className="text-lg font-semibold mb-2">Deskripsi</h3>
            <div className="text-left text-sm leading-relaxed">
              {isLoadingDescription ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  <span>Memuat deskripsi...</span>
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: description }}></div>
              )}
            </div>
          </div>
        </DialogHeader>
        {ms?.audio && (
          <Button 
            variant={"outline"} 
            onClick={() => { setPlaying(!playing); }} 
            className="border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
          >
            {playing ? (
              <div className="flex flex-row justify-center items-center gap-2">
                <Pause size={20} />
                <p>Berhenti</p>
              </div>
            ) : (
              <div className="flex flex-row justify-center items-center gap-2">
                <Play size={20} />
                <p>Putar surat ini secara full</p>
              </div>
            )}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  )
}