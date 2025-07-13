
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cookies } from "next/headers";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

export default function RecentRead() {
  let cookie = cookies()
  let lastsurah = cookie.get("lastsurah")?.value;
  let lastidsurah = cookie.get("lastidsurah")?.value;
  let lastscroll = cookie.get("lastscroll")?.value;

  if (!lastsurah) {
    return null; // Don't show anything if no recent read
  }

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Clock size={16} className="text-emerald-600 dark:text-emerald-400" />
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Terakhir Dibaca
        </h3>
      </div>
      
      <Link href={`/al-qur_an/surah/${lastidsurah}`}>
        <Card className="group hover:shadow-lg transition-all duration-300 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-500 rounded-xl overflow-hidden">
          <div className="flex items-center p-4">
            <div className="flex-shrink-0 mr-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shadow-lg">
                <BookOpen size={20} />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                {lastsurah}
              </h4>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <span>Progress</span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">
                    {lastscroll}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0 ml-4">
              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900 transition-colors duration-300">
                <ArrowRight size={16} className="text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300" />
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  )
}
