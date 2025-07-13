"use client";
import { CarouselItem, Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { setCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useTheme } from "next-themes";
import { RefreshCw } from "lucide-react";

export default function TimeOfPray({ nowDate, timings }: any) {
  const [currentTimings, setCurrentTimings] = useState(timings);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  let now_pray_time = currentTimings[parseInt(nowDate) - 1]?.timings || timings[parseInt(nowDate) - 1]?.timings;
  let now = new Date();

  let key_lacak: any[] = [];
  let lacak: any[] = [];
  function add(accumulator: any, a: any) {
    return accumulator + a;
  }

  Object.keys(now_pray_time).forEach(function (key, index) {
    if (key != "Sunset") {
      key_lacak.push(key);
      lacak.push(0)
    }
  })
  key_lacak.splice(key_lacak.indexOf("Imsak"), 1);
  key_lacak.unshift("Imsak");
  let midnn = key_lacak[7];
  key_lacak[7] = key_lacak[8];
  key_lacak[8] = midnn;

  key_lacak.map((key, index) => {
    let praytime = now_pray_time[key].split(":");
    if (now.getHours() <= parseInt(praytime[0]) && lacak.reduce(add, 0) == 0) {
      lacak[index] = 1;
      if (now.getMinutes() > parseInt(praytime[1]) + 3 && now.getHours() == parseInt(praytime[0])) {
        lacak[index] = 0;
        if (now_pray_time[key_lacak[index]].split(":")[0] == now_pray_time[key_lacak[index + 1]].split(":")[0]) {
          lacak[index + 2] = 1;
        } else {
          lacak[index + 1] = 1;
        }
      }
    }
  })
  
  const { setTheme } = useTheme();

  // Refresh prayer times
  const refreshPrayerTimes = async () => {
    setIsRefreshing(true);
    try {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;
      
      // Get current location from cookies or default
      const latitude = document.cookie.match(/latitude=([^;]+)/)?.[1] || "-7.283008";
      const longitude = document.cookie.match(/longitude=([^;]+)/)?.[1] || "108.197892";
      
      const response = await fetch(`/api/prayer-times?year=${currentYear}&month=${currentMonth}&latitude=${latitude}&longitude=${longitude}`);
      const data = await response.json();
      
      if (data.success) {
        setCurrentTimings(data.data);
        // Update cookies with current date
        setCookie("year", currentYear.toString());
        setCookie("month", currentMonth.toString());
        setCookie("date", new Date().getDate().toString());
      }
    } catch (error) {
      console.error('Error refreshing prayer times:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    let element_active = document.querySelector(`#p-${key_lacak[lacak.indexOf(1)]}`);
    element_active?.classList.add("nextpray");
    setCookie("hour", now.getHours());
    let theme = now.getHours() >= 6 && now.getHours() < 18 ? "light" : "dark";
    setTheme(theme)
  }, [now_pray_time, setTheme])

  // Auto refresh every 30 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      refreshPrayerTimes();
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="flex items-center gap-2 mb-2">
        <div className="text-xs sm:text-sm text-white/70">Jadwal Shalat</div>
        <Button
          variant="ghost"
          size="sm"
          onClick={refreshPrayerTimes}
          disabled={isRefreshing}
          className="p-1 h-auto bg-white/10 hover:bg-white/20 text-white/70 hover:text-white"
        >
          <RefreshCw size={12} className={isRefreshing ? "animate-spin" : ""} />
        </Button>
      </div>
      <Carousel 
        className="w-full bg-transparent"
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          <CarouselItem>
            <div className="flex flex-row items-center justify-between gap-2 sm:gap-4 text-xs sm:text-sm">
              <div id="p-Imsak" className="flex flex-col items-center">
                <div className="text-white/80">Imsak</div>
                <div className="font-semibold text-white">{now_pray_time.Imsak.split(" ")[0]}</div>
              </div>
              <Separator orientation="vertical" className="hidden sm:block h-8" />
              <div id="p-Fajr" className="flex flex-col items-center">
                <div className="text-white/80">Subuh</div>
                <div className="font-semibold text-white">{now_pray_time.Fajr.split(" ")[0]}</div>
              </div>
              <Separator orientation="vertical" className="hidden sm:block h-8" />
              <div id="p-Sunrise" className="flex flex-col items-center">
                <div className="text-white/80">Terbit</div>
                <div className="font-semibold text-white">{now_pray_time.Sunrise.split(" ")[0]}</div>
              </div>
              <Separator orientation="vertical" className="hidden sm:block h-8" />
              <div id="p-Dhuhr" className="flex flex-col items-center">
                <div className="text-white/80">Dzuhur</div>
                <div className="font-semibold text-white">{now_pray_time.Dhuhr.split(" ")[0]}</div>
              </div>
              <Separator orientation="vertical" className="hidden sm:block h-8" />
              <div id="p-Asr" className="flex flex-col items-center">
                <div className="text-white/80">Ashar</div>
                <div className="font-semibold text-white">{now_pray_time.Asr.split(" ")[0]}</div>
              </div>
              <Separator orientation="vertical" className="hidden sm:block h-8" />
              <div id="p-Maghrib" className="flex flex-col items-center">
                <div className="text-white/80">Maghrib</div>
                <div className="font-semibold text-white">{now_pray_time.Maghrib.split(" ")[0]}</div>
              </div>
              <Separator orientation="vertical" className="hidden sm:block h-8" />
              <div id="p-Isha" className="flex flex-col items-center">
                <div className="text-white/80">Isya</div>
                <div className="font-semibold text-white">{now_pray_time.Isha.split(" ")[0]}</div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex flex-row items-center justify-between gap-2 sm:gap-4 text-xs sm:text-sm">
              <div id="p-Firstthird" className="flex flex-col items-center">
                <div className="text-white/80">1/3 Malam</div>
                <div className="font-semibold text-white">{now_pray_time.Firstthird.split(" ")[0]}</div>
              </div>
              <Separator orientation="vertical" className="hidden sm:block h-8" />
              <div id="p-Midnight" className="flex flex-col items-center">
                <div className="text-white/80">2/3 Malam</div>
                <div className="font-semibold text-white">{now_pray_time.Midnight.split(" ")[0]}</div>
              </div>
              <Separator orientation="vertical" className="hidden sm:block h-8" />
              <div id="p-Lastthird" className="flex flex-col items-center">
                <div className="text-white/80">3/3 Malam</div>
                <div className="font-semibold text-white">{now_pray_time.Lastthird.split(" ")[0]}</div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  )
}