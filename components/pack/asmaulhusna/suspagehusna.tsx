import { promises as fs } from 'fs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AudioPlay from './audioplay';
import localFont from "next/font/local";

// Import font dengan path yang benar
const arabnum = localFont({
  src: [
    {
      path: '../../../public/fonts/AlQuranAli.ttf', // path relatif dari /public
      weight: '400'
    }
  ],
  variable: '--font-arabnum'
});

export default async function SusPageHusna() {
  const file = await fs.readFile(process.cwd() + '/lib/json/asmaul-husna.json', 'utf8');
  const data = JSON.parse(file);
  
  return (
    <div className="space-y-6">
      {/* Audio Player */}
      <div className="flex justify-center">
        <AudioPlay />
      </div>

      {/* Asmaul Husna Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.map((item: any) => (
          <Card key={item.urutan} className="bg-white/20 dark:bg-black/40 backdrop-blur-xl border border-white/30 dark:border-gray-600/50 hover:bg-white/30 dark:hover:bg-black/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <CardHeader className="text-center space-y-3 p-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 rounded-full flex items-center justify-center mx-auto">
                <span className={`${arabnum.className} text-lg font-bold text-emerald-600 dark:text-emerald-400`}>
                  {item.urutan}
                </span>
              </div>
              <div className="space-y-2">
                <CardTitle className={`${arabnum.className} text-3xl text-center text-gray-900 dark:text-gray-100 leading-tight`}>
                  {item.arab}
                </CardTitle>
                <CardDescription className="text-center text-gray-700 dark:text-gray-300 font-medium">
                  {item.latin}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="text-center p-4 pt-0">
              <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                {item.arti}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}