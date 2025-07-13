
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import SusMainPage from "@/components/pack/main/susmainpage";
import Credits from "@/components/pack/credits";
import AddToHome from "@/components/pack/addtohome";

export default function Page() {
  let cookie = cookies();
  const now = new Date();

  let location = {
    year: cookie.has("year") ? `${cookie.get("year")?.value}` : now.getFullYear().toString(),
    month: cookie.has("month") ? `${cookie.get("month")?.value}` : (now.getMonth() + 1).toString(),
    date: cookie.has("date") ? `${cookie.get("date")?.value}` : now.getDate().toString(),
    longitude: cookie.has("longitude") ? `${cookie.get("longitude")?.value}` : "108.197892",
    latitude: cookie.has("latitude") ? `${cookie.get("latitude")?.value}` : "-7.283008"
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-cyan-50 to-emerald-50 dark:from-slate-950 dark:via-gray-900 dark:to-black">
      {/* Header Section */}
      <SusMainPage raw_loc={location} />
      
      {/* Menu Grid Section */}
      <div className="relative w-full px-4 pb-6">
        <div className="max-w-4xl mx-auto">
          {/* Glass Card Container */}
          <div className="backdrop-blur-xl bg-white/20 dark:bg-black/20 rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl p-6">
            {/* Menu Grid - 2x2 on mobile, 4 columns on larger screens */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {/* Al-Qur'an */}
              <Link 
                href="/al-qur_an" 
                className="group menu-card-item bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 dark:from-emerald-500/20 dark:to-cyan-500/20 hover:from-emerald-500/20 hover:to-cyan-500/20 dark:hover:from-emerald-500/30 dark:hover:to-cyan-500/30 backdrop-blur-sm border border-white/20 dark:border-gray-600/30 rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative">
                    <Image 
                      src="/al-quran.svg" 
                      width={60} 
                      height={60} 
                      alt="Al-Qur'an" 
                      className="w-12 h-12 sm:w-16 sm:h-16 transition-transform duration-300 group-hover:scale-110" 
                    />
                  </div>
                  <span className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 text-center">
                    Al-Qur'an
                  </span>
                </div>
              </Link>

              {/* Hadits */}
              <Link 
                href="/hadits" 
                className="group menu-card-item bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 hover:from-blue-500/20 hover:to-indigo-500/20 dark:hover:from-blue-500/30 dark:hover:to-indigo-500/30 backdrop-blur-sm border border-white/20 dark:border-gray-600/30 rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg relative"
              >
                <div className="absolute -top-2 -right-2 z-10">
                  <span className="px-2 py-1 text-xs bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-full font-medium">
                    Beta
                  </span>
                </div>
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative">
                    <Image 
                      src="/hadits.svg" 
                      width={60} 
                      height={60} 
                      alt="Hadits" 
                      className="w-12 h-12 sm:w-16 sm:h-16 transition-transform duration-300 group-hover:scale-110" 
                    />
                  </div>
                  <span className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 text-center">
                    Hadits
                  </span>
                </div>
              </Link>

              {/* Asmaul Husna */}
              <Link 
                href="/asmaulhusna" 
                className="group menu-card-item bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 hover:from-purple-500/20 hover:to-pink-500/20 dark:hover:from-purple-500/30 dark:hover:to-pink-500/30 backdrop-blur-sm border border-white/20 dark:border-gray-600/30 rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative">
                    <Image 
                      src="/asmaulhusna.svg" 
                      width={60} 
                      height={60} 
                      alt="Asmaul Husna" 
                      className="w-12 h-12 sm:w-16 sm:h-16 transition-transform duration-300 group-hover:scale-110" 
                    />
                  </div>
                  <span className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 text-center">
                    Asmaul Husna
                  </span>
                </div>
              </Link>

              {/* Doa & Shalat */}
              <Link 
                href="/doa" 
                className="group menu-card-item bg-gradient-to-br from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20 hover:from-amber-500/20 hover:to-orange-500/20 dark:hover:from-amber-500/30 dark:hover:to-orange-500/30 backdrop-blur-sm border border-white/20 dark:border-gray-600/30 rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative">
                    <Image 
                      src="/pray.svg" 
                      width={60} 
                      height={60} 
                      alt="Doa & Shalat" 
                      className="w-12 h-12 sm:w-16 sm:h-16 transition-transform duration-300 group-hover:scale-110" 
                    />
                  </div>
                  <span className="text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 text-center">
                    Doa & Shalat
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="w-full px-4 pb-40">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
          <Credits />
          <AddToHome />
        </div>
      </div>
    </main>
  );
}
