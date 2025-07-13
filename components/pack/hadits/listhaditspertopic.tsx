import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { get_hadits } from "@/lib/get_hadits"
import { cn } from "@/lib/utils";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui/pagination";
import localFont from "next/font/local";

// Import font dengan path yang benar
const alquranali = localFont({
  src: [
    {
      path: '../../../public/fonts/uthmani.otf', // path relatif dari /public
      weight: '400'
    }
  ],
  variable: '--font-alquranali'
});

export default async function ListHaditsPerTopic({ perawi, nopage }: any) {
  let intpage = parseInt(nopage)

  let hadiths = await get_hadits(perawi, intpage);

  return (
    <div className="space-y-6 w-full">
      {/* Header Info */}
      <div className="text-center space-y-2 px-4">
        <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          Hadits Riwayat {hadiths.data.name}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Jumlah Hadits: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{hadiths.data.available}</span>
        </p>
      </div>

      {/* Hadits List */}
      <div className="space-y-4 px-4">
        {hadiths.data.hadiths.map((hadith: any, index: any) => (
          <Card key={"hadith-" + index} className="bg-white/20 dark:bg-black/40 backdrop-blur-xl border border-white/30 dark:border-gray-600/50 hover:bg-white/30 dark:hover:bg-black/50 transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Hadits #{hadith.number}
                </CardTitle>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    {hadith.number}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Arabic Text */}
              <div className="bg-gradient-to-r from-emerald-50/50 to-cyan-50/50 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-lg p-4">
                <div className={alquranali.className} translate="no">
                  <div className="text-2xl md:text-3xl tracking-wide leading-[2.5] text-right text-gray-900 dark:text-gray-100" 
                       dangerouslySetInnerHTML={{ __html: hadith.arab }}>
                  </div>
                </div>
              </div>
              
              {/* Hadith ID */}
              <div className="text-center">
                <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                  ID: {hadith.id}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="mb-20 bg-white/10 dark:bg-black/20 backdrop-blur-xl border-t border-white/20 dark:border-gray-600/30">
        <div className="container mx-auto px-4 py-4">
          <Pagination>
            <PaginationContent className="gap-2">
              <PaginationItem>
                {intpage <= 1 ? (
                  <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">‹</span>
                  </div>
                ) : (
                  <PaginationPrevious href={`/hadits/${perawi}/${intpage - 1}`} />
                )}
              </PaginationItem>
              
              <PaginationItem>
                {intpage >= 5 && (
                  <PaginationLink 
                    href={`/hadits/${perawi}/${intpage - 4}`}
                    className="bg-white/20 dark:bg-black/40 border border-white/30 dark:border-gray-600/50 hover:bg-white/30 dark:hover:bg-black/50"
                  >
                    {intpage - 4}
                  </PaginationLink>
                )}
                <PaginationLink 
                  className="bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600" 
                  href={`/hadits/${perawi}/${intpage}`}
                >
                  {intpage}
                </PaginationLink>
                <PaginationLink 
                  href={`/hadits/${perawi}/${intpage + 4}`}
                  className="bg-white/20 dark:bg-black/40 border border-white/30 dark:border-gray-600/50 hover:bg-white/30 dark:hover:bg-black/50"
                >
                  {intpage + 4}
                </PaginationLink>
                {intpage < 5 && (
                  <PaginationLink 
                    href={`/hadits/${perawi}/${intpage + 9}`}
                    className="bg-white/20 dark:bg-black/40 border border-white/30 dark:border-gray-600/50 hover:bg-white/30 dark:hover:bg-black/50"
                  >
                    {intpage + 9}
                  </PaginationLink>
                )}
              </PaginationItem>
              
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              
              <PaginationItem>
                <PaginationLink 
                  href={`/hadits/${perawi}/${intpage + 99}`}
                  className="bg-white/20 dark:bg-black/40 border border-white/30 dark:border-gray-600/50 hover:bg-white/30 dark:hover:bg-black/50"
                >
                  {intpage + 99}
                </PaginationLink>
              </PaginationItem>
              
              <PaginationItem>
                <PaginationNext href={`/hadits/${perawi}/${intpage + 1}`} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}