import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { get_perawi } from "@/lib/get_hadits"
import Link from "next/link";
import { BookOpen, ChevronRight } from "lucide-react";

export default async function ListPerawi() {
  let data = await get_perawi();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {data.data.map((perawi: any) => (
        <Link key={perawi.id} href={`/hadits/${perawi.id}`} className="group">
          <Card className="h-full bg-white/20 dark:bg-black/40 backdrop-blur-xl border border-white/30 dark:border-gray-600/50 hover:bg-white/30 dark:hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 rounded-full flex items-center justify-center">
                    <BookOpen size={20} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                      {perawi.name}
                    </CardTitle>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-500 dark:text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-300" />
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700 dark:text-gray-300">
                Jumlah Hadits: <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{perawi.available}</span>
              </CardDescription>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}