"use client";
import { CarouselItem, Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { setCookie } from "cookies-next";
import { useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { useTheme } from "next-themes";

export default function TimeOfPray({ nowDate, timings }: any) {
  let now_pray_time = timings[parseInt(nowDate) - 1].timings;
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

  useEffect(() => {
    let element_active = document.querySelector(`#p-${key_lacak[lacak.indexOf(1)]}`);
    element_active?.classList.add("nextpray");
    setCookie("hour", now.getHours());
    let theme = now.getHours() >= 6 && now.getHours() < 18 ? "light" : "dark";
    setTheme(theme)
  }, [now_pray_time])


  return (
    <Carousel className="w-full bg-transparent px-3 m-0"
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem className="px-3">
          <div className="dash-text-blur ring-1 ring-emerald-900 w-full shadow-md text-xs mx-1 flex flex-row items-center justify-between overflow-x-scroll">
            <div id="p-Imsak">
              <div>Imsak</div>
              <div>{now_pray_time.Imsak.split(" ")[0]}</div>
            </div>
            <Separator orientation="vertical" />
            <div id="p-Fajr">
              <div>Subuh</div>
              <div>{now_pray_time.Fajr.split(" ")[0]}</div>
            </div>
            <Separator orientation="vertical" />
            <div id="p-Sunrise">
              <div>Terbit</div>
              <div>{now_pray_time.Sunrise.split(" ")[0]}</div>
            </div>
            <Separator orientation="vertical" />
            <div id="p-Dhuhr" className="">
              <div>Dzuhur</div>
              <div>{now_pray_time.Dhuhr.split(" ")[0]}</div>
            </div>
            <Separator orientation="vertical" />
            <div id="p-Asr" className="">
              <div>Ashar</div>
              <div>{now_pray_time.Asr.split(" ")[0]}</div>
            </div>
            <Separator orientation="vertical" />
            <div id="p-Maghrib">
              <div>Maghrib</div>
              <div>{now_pray_time.Maghrib.split(" ")[0]}</div>
            </div>
            <Separator orientation="vertical" />
            <div id="p-Isha">
              <div>Isya</div>
              <div>{now_pray_time.Isha.split(" ")[0]} </div>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="dash-text-blur  ring-1 ring-emerald-900 mx-1 w-full shadow-md text-xs flex flex-row items-center justify-between overflow-x-scroll">
            <div className="flex flex-col items-center justify-center">
              <div id="p-Firstthird">1/3 Night</div>
              <div>{now_pray_time.Firstthird.split(" ")[0]}</div>
            </div>
            <Separator orientation="vertical" />
            <div id="p-Midnight" className="flex flex-col items-center justify-center">
              <div>2/3 Malam</div>
              <div>{now_pray_time.Midnight.split(" ")[0]}</div>
            </div>
            <Separator orientation="vertical" />
            <div id="p-Lastthird" className="flex flex-col items-center justify-center">
              <div>3/3 Malam</div>
              <div>{now_pray_time.Lastthird.split(" ")[0]}</div>
            </div>

          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}