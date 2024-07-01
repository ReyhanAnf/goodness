import Image from "next/image";
import DisplayLocation from "./displaylocation";
import ClientLocation from "./getclientlocation";
import CurrentDate from "./date";
import TimeClock from "./timeclock";
import { get_current_pray } from "@/lib/get_location";
import TimeOfPray from "./timeofpray";
import { get_random_ayah } from "@/lib/get_surah";

export default async function SusMainPage({ raw_loc }: any) {
  let raw_data = await get_current_pray(raw_loc.year, raw_loc.month, raw_loc.latitude, raw_loc.longitude);
  let random_ayah = await get_random_ayah();

  return (
    <div className="header w-full bg-gradient-to-b dark:from-emerald-950 dark:to-black from-emerald-800 to-slate-50 h-1/3 mb-20">
      <div className="w-full h-full">
        <Image alt="dashboard" src={"/dashboard.svg"} className="absolute left-1/2 z-0 -translate-x-1/2 w-1/2 bg-opacity-75" width={100} height={50} priority={true} />
        <div className="w-full flex flex-col items-center p-2 bg-transparent">
          <div className="flex flex-row w-full justify-between items-center mb-4 text-sm text-white">
            <div className="flex flex-row gap-2 items-center z-10 w-1/3">
              <DisplayLocation latitude={raw_loc.latitude} longitude={raw_loc.longitude} />
              <ClientLocation />
            </div>
            <CurrentDate className="flex flex-col items-end z-30" />
          </div>
          <div className="dash-text-blur z-10 w-[90%] max-h-40 text-xs overflow-scroll">
            <i>{random_ayah.data.text}.<br /> QS {random_ayah.data.surah.englishName} : {random_ayah.data.numberInSurah}</i>
          </div>
          <TimeClock />
          <TimeOfPray nowDate={raw_loc.date} timings={raw_data.data} />
        </div>
      </div>
    </div>
  )
}