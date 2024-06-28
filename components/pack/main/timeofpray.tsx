"use client";
import { Separator } from "@/components/ui/separator";
import { setCookie } from "cookies-next";
import { useEffect } from "react";


export default function TimeOfPray({ nowDate, timings }: any) {
  let now_pray_time = timings[Math.floor(nowDate) - 1].timings;
  let now = new Date();

  let key_lacak: any[] = [];
  let lacak: any[] = [];

  Object.keys(now_pray_time).forEach(function (key, index) {
    if (now.getHours() <= Math.floor(now_pray_time[key].split(":")[0]) && now.getMinutes() <= Math.floor(now_pray_time[key].split(":")[1].split(" ")[0]) + 2) {
      lacak.push(1);
    } else if (now.getHours() == Math.floor(now_pray_time[key].split(":")[0]) && now.getMinutes() > Math.floor(now_pray_time[key].split(":")[1].split(" ")[0]) + 2) {
      lacak[index] = 0;
      lacak[index + 1] = 1;
    } else {
      lacak.push(0)
    };
    key_lacak.push(key)
  })

  useEffect(() => {
    let element_active = document.querySelector(`#p-${key_lacak[lacak.indexOf(1)]}`);
    element_active?.classList.add("nextpray");
    setCookie("hour", now.getHours())
  }, [])



  return (
    <div className="w-[90%]">
      <div className="dash-text-blur w-full shadow-md text-xs flex flex-row items-center justify-between overflow-x-scroll">
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
      <div className="dash-text-blur w-full shadow-md text-xs flex flex-row items-center justify-between overflow-x-scroll">
        <div className="flex flex-col items-center justify-center">
          <div id="p-Firstthird">1/3 Malam</div>
          <div>{now_pray_time.Firstthird.split(" ")[0]}</div>
        </div>
        <Separator orientation="vertical" />
        <div id="p-Midnight" className="flex flex-col items-center justify-center">
          <div>2/3 Malam</div>
          <div>{now_pray_time.Midnight.split(" ")[0]}</div>
        </div>
        <Separator orientation="vertical" />
        <div id="p-Lastthird" className="flex flex-col items-center justify-center">
          <div>3/3 tiga Malam</div>
          <div>{now_pray_time.Lastthird.split(" ")[0]}</div>
        </div>

      </div>
    </div>
  )
}