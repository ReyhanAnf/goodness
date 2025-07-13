import Image from "next/image";
import DisplayLocation from "./displaylocation";
import CurrentDate from "./date";
import TimeClock from "./timeclock";
import { get_current_pray } from "@/lib/get_location";
import TimeOfPray from "./timeofpray";
import { get_random_ayah } from "@/lib/get_surah";

export default async function SusMainPage({ raw_loc }: any) {
  let raw_data = await get_current_pray(raw_loc.year, raw_loc.month, raw_loc.latitude, raw_loc.longitude);
  let random_ayah = await get_random_ayah();

  return (
    <div className="relative w-full min-h-[40vh] bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 dark:from-emerald-900 dark:via-emerald-950 dark:to-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <Image 
          alt="dashboard" 
          src="/dashboard.svg" 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-auto max-w-md" 
          width={400} 
          height={200} 
          priority={true} 
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full px-4 py-6 sm:px-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Top Bar - Location and Date */}
          <div className="flex flex-row flex-nowrap justify-between items-center mb-6 space-y-3 sm:space-y-0">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
              <DisplayLocation latitude={raw_loc.latitude} longitude={raw_loc.longitude} />
            </div>
            <CurrentDate className="flex flex-row flex-nowrap items-center" />
          </div>

          {/* Random Ayah Card */}
          <div className="mb-6">
            <div className="backdrop-blur-xl bg-white/10 dark:bg-black/20 rounded-2xl border border-white/20 dark:border-gray-600/30 p-4 sm:p-6 shadow-lg">
              <div className="text-sm sm:text-base text-white/90 leading-relaxed">
                <i>
                  "{random_ayah.data.text}"
                  <br />
                  <span className="text-emerald-200 font-medium">
                    QS {random_ayah.data.surah.englishName} : {random_ayah.data.numberInSurah}
                  </span>
                </i>
              </div>
            </div>
          </div>

          {/* Time and Prayer Section - Single Column on Mobile */}
          <div className="space-y-4 sm:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6">
            {/* Current Time */}
            <div className="backdrop-blur-xl bg-white/10 dark:bg-black/20 rounded-2xl border border-white/20 dark:border-gray-600/30 p-4 shadow-lg w-full">
              <TimeClock />
            </div>

            {/* Prayer Times */}
            <div className="backdrop-blur-xl bg-white/10 dark:bg-black/20 rounded-2xl border border-white/20 dark:border-gray-600/30 p-4 shadow-lg w-full">
              <TimeOfPray nowDate={raw_loc.date} timings={raw_data.data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}