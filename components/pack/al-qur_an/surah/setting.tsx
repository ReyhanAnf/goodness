"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"
import { qori_audio } from "@/lib/get_surah"
import { useRouter } from "next/navigation"
import { Settings, Eye, Volume2, Type, RotateCcw, Check, Save } from "lucide-react"
import { toast } from "sonner"

// Default settings
const DEFAULT_SETTINGS = {
  tajweed: true,
  qori: 'ar.alafasy',
  fontsize: 3
};

export default function SettingsAyah({ className, setpTajweed, setpQori, pqori, setpFontsize }: any) {
  const [tajweed, setTajweed] = useState(DEFAULT_SETTINGS.tajweed);
  const [qori, setQori] = useState(DEFAULT_SETTINGS.qori);
  const [fontsize, setFontsize] = useState(DEFAULT_SETTINGS.fontsize);
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  let rout = useRouter()

  // Load settings from localStorage on mount
  useEffect(() => {
    const loadSettings = () => {
      try {
        const savedSettings = localStorage.getItem('quran_settings');
        if (savedSettings) {
          const settings = JSON.parse(savedSettings);
          setTajweed(settings.tajweed ?? DEFAULT_SETTINGS.tajweed);
          setQori(settings.qori ?? DEFAULT_SETTINGS.qori);
          setFontsize(settings.fontsize ?? DEFAULT_SETTINGS.fontsize);
        } else {
          // Use props as fallback if no saved settings
          setTajweed(true);
          setQori(pqori || DEFAULT_SETTINGS.qori);
          setFontsize(3);
        }
      } catch (error) {
        console.error('Error loading settings:', error);
        // Fallback to defaults
        setTajweed(DEFAULT_SETTINGS.tajweed);
        setQori(pqori || DEFAULT_SETTINGS.qori);
        setFontsize(DEFAULT_SETTINGS.fontsize);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, [pqori]);

  // Save settings to localStorage
  const saveSettings = () => {
    try {
      const settings = {
        tajweed,
        qori,
        fontsize,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem('quran_settings', JSON.stringify(settings));
      toast.success("Pengaturan berhasil disimpan");
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error("Gagal menyimpan pengaturan");
    }
  };

  // Check for changes
  useEffect(() => {
    if (isLoading) return;

    const savedSettings = localStorage.getItem('quran_settings');
    let originalSettings = DEFAULT_SETTINGS;
    
    if (savedSettings) {
      try {
        originalSettings = JSON.parse(savedSettings);
      } catch (error) {
        console.error('Error parsing saved settings:', error);
      }
    }
    
    const changed = tajweed !== originalSettings.tajweed || 
                   qori !== originalSettings.qori || 
                   fontsize !== originalSettings.fontsize;
    
    setHasChanges(changed);
  }, [tajweed, qori, fontsize, isLoading]);

  // Apply settings to parent components
  useEffect(() => {
    if (!isLoading) {
      setpTajweed(tajweed);
    }
  }, [tajweed, setpTajweed, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      setpQori(qori);
    }
  }, [qori, setpQori, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      setpFontsize(fontsize);
    }
  }, [fontsize, setpFontsize, isLoading]);

  // Apply settings function
  const applySettings = () => {
    saveSettings();
    rout.refresh();
  };

  // Reset settings function
  const resetSettings = () => {
    setTajweed(DEFAULT_SETTINGS.tajweed);
    setQori(DEFAULT_SETTINGS.qori);
    setFontsize(DEFAULT_SETTINGS.fontsize);
    
    // Clear localStorage
    localStorage.removeItem('quran_settings');
    toast.success("Pengaturan direset ke default");
  };

  // Font size labels
  const fontSizes = [
    { size: 0, label: "Kecil", class: "text-lg" },
    { size: 1, label: "Normal", class: "text-xl" },
    { size: 2, label: "Sedang", class: "text-2xl" },
    { size: 3, label: "Besar", class: "text-3xl" },
    { size: 4, label: "Sangat Besar", class: "text-4xl" }
  ];

  if (isLoading) {
    return (
      <Card className={cn("w-full bg-white/20 dark:bg-black/40 backdrop-blur-xl border border-white/30 dark:border-gray-600/50", className)}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Memuat pengaturan...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("w-full bg-white/20 dark:bg-black/40 backdrop-blur-xl border border-white/30 dark:border-gray-600/50", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full flex items-center justify-center">
            <Settings size={20} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Pengaturan Ayat
            </CardTitle>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Pengaturan akan disimpan otomatis
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Tajweed Setting */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
              <Eye size={16} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Tampilkan Tajweed
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Aktifkan untuk melihat aturan tajweed
              </p>
            </div>
            <Switch 
              checked={tajweed} 
              onCheckedChange={setTajweed}
              className="data-[state=checked]:bg-emerald-600"
            />
          </div>
        </div>

        {/* Font Size Setting */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
              <Type size={16} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Ukuran Font
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Sesuaikan ukuran teks Arab
              </p>
            </div>
          </div>
          
          <div className="pl-11 space-y-3">
            {/* Font Size Preview */}
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-4">
                {fontSizes.map((font) => (
                  <div 
                    key={font.size}
                    className={cn(
                      "transition-all duration-200",
                      font.class,
                      fontsize === font.size 
                        ? "text-emerald-600 dark:text-emerald-400 font-bold" 
                        : "text-gray-400 dark:text-gray-500"
                    )}
                  >
                    A
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {fontSizes[fontsize]?.label}
              </div>
            </div>
            
            {/* Slider */}
            <Slider 
              value={[fontsize]} 
              max={4} 
              step={1} 
              onValueChange={(value) => setFontsize(value[0])}
              className="w-full"
            />
          </div>
        </div>

        {/* Qori Setting */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
              <Volume2 size={16} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Qori Audio
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Pilih pembaca Al-Qur'an
              </p>
            </div>
          </div>
          
          <div className="pl-11">
            <Select value={qori} onValueChange={setQori}>
              <SelectTrigger className="w-full bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600">
                <SelectValue placeholder="Pilih Qori" />
              </SelectTrigger>
              <SelectContent className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl">
                {qori_audio.map((qoriOption) => (
                  <SelectItem 
                    key={qoriOption.identifier} 
                    value={qoriOption.identifier}
                    className="hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{qoriOption.englishName}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {qoriOption.language === 'ar' ? 'Arabic' : 'English'}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={resetSettings}
            className="flex-1 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <RotateCcw size={14} className="mr-2" />
            Reset
          </Button>
          <Button 
            size="sm"
            onClick={applySettings}
            disabled={!hasChanges}
            className={cn(
              "flex-1 bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-200",
              !hasChanges && "opacity-50 cursor-not-allowed"
            )}
          >
            <Save size={14} className="mr-2" />
            Simpan
          </Button>
        </div>

        {/* Changes Indicator */}
        {hasChanges && (
          <div className="p-3 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-200 dark:border-amber-700">
            <div className="text-xs text-amber-800 dark:text-amber-200 text-center">
              <strong>Perubahan terdeteksi!</strong> Klik "Simpan" untuk menyimpan pengaturan secara permanen.
            </div>
          </div>
        )}

        {/* Last Saved Info */}
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          Pengaturan tersimpan di browser Anda
        </div>
      </CardContent>
    </Card>
  )
}
