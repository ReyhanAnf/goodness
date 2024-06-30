import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { get_hadits } from "@/lib/get_hadits"
import { alquranali } from "../al-qur_an/surah/surah";
import { cn } from "@/lib/utils";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui/pagination";

export default async function ListHaditsPerTopic({ perawi, nopage }: any) {
  let intpage = parseInt(nopage)

  let hadiths = await get_hadits(perawi, intpage);

  return (
    <div className="grid grid-cols-1 gap-4 w-full mb-16">
      <h4 className="text-sm px-4 text-center font-semibold ">(Hadits Riwayat) {hadiths.data.name}</h4>
      <h5 className="text-sm px-4 text-center font-semibold ">Jumlah : {hadiths.data.available}</h5>
      {hadiths.data.hadiths.map((hadith: any, index: any) => (
        <Card key={"a" + index} className=" border-0 ring-0 flex flex-col bg-slate-100/0 dark:bg-slate-900/0 first-line: bg-opacity-10 backdrop-blur-sm p-0">
          <CardHeader className="w-full h-0 text-sm my-2">
            <CardTitle className={cn("text-xl w-10 h-10 rounded-xl  text-center p-2 pb-1 shadow-lg bg-emerald-200/35 bg-opacity-20 ")}>{hadith.number}</CardTitle>
          </CardHeader>
          <CardContent >
            <div className={alquranali.className} translate="no">
              <div className={"text-3xl" + " tracking-wide leading-[2.5] my-1 text-right p-1"} dangerouslySetInnerHTML={{ __html: hadith.arab }}></div>
            </div>
            <div>
              {hadith.id}
            </div>
          </CardContent>
        </Card>
      ))}

      <Pagination className="fixed bottom-0 pb-14 pt-2 gradientline z-0">
        <PaginationContent className="gap-1">
          <PaginationItem>
            {intpage <= 1 ? (
              ""
            ) : (
              <PaginationPrevious href={`/hadits/${perawi}/${intpage - 1}`} />
            )}
          </PaginationItem>
          <PaginationItem>
            {intpage >= 5 ? (
              <PaginationLink href={`/hadits/${perawi}/${intpage - 4}`}>{intpage - 4}</PaginationLink>
            ) : ""}
            <PaginationLink className="ring-1 rounded-lg p-2" href={`/hadits/${perawi}/${intpage}`}>{intpage}</PaginationLink>
            <PaginationLink href={`/hadits/${perawi}/${intpage + 4}`}>{intpage + 4}</PaginationLink>
            {intpage >= 5 ? (
              ""
            ) : (
              <PaginationLink href={`/hadits/${perawi}/${intpage + 9}`}>{intpage + 9}</PaginationLink>
            )}
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href={`/hadits/${perawi}/${intpage + 99}`}>{intpage + 99}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href={`/hadits/${perawi}/${intpage + 1}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

    </div>
  )
}