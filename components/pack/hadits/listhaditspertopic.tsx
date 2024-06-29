import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { get_hadits_pertopic, get_hadits_range_id } from "@/lib/get_hadits"
import { arabnum, alquranali } from "../al-qur_an/surah/surah";
import { cn } from "@/lib/utils";
import TerjemahanHadits from "./terjemahanhadits";

export default async function ListHaditsPerTopic({ bookslug, idchapter }: any) {
  let data = await get_hadits_pertopic(bookslug, idchapter);
  let rangeid = {
    from: parseInt(data.hadiths.data[0].hadithNumber),
    to: parseInt(data.hadiths.data[0].hadithNumber) + parseInt(data.hadiths.total)
  }
  let real_hadits = await get_hadits_range_id("bukhari", rangeid.from, rangeid.to);
  return (
    <div className="grid grid-cols-1 gap-4 w-full mb-16">
      <h3 className="text-xl px-4 text-center font-semibold">
        <TerjemahanHadits content={data.hadiths.data[0].headingEnglish} />
      </h3>
      <h4 className="text-sm px-4 text-center font-semibold ">(Hadits Riwayat) {real_hadits.data.name}</h4>
      {real_hadits.data.hadiths.map((hadith: any, index: any) => (
        <Card key={"a" + index} className=" border-0 ring-0 bg-slate-100/0 dark:bg-slate-900/0 first-line: bg-opacity-10 backdrop-blur-sm p-0">
          <CardHeader className="w-full h-0 text-sm my-2 flex-row justify-between items-center">
            <div className="flex flex-row gap-3 items-center">
              <CardTitle className={cn("text-xl w-10 h-10 rounded-xl  text-center pt-2 shadow-lg bg-emerald-200/35 bg-opacity-20 ", arabnum.className)}>{index + 1}</CardTitle>
              {/* <CardTitle>{hadith.c}</CardTitle> */}
            </div>
          </CardHeader>
          <CardContent >
            <div className={alquranali.className} translate="no">
              <div className={"text-3xl" + " tracking-wide leading-[2.5] my-1 text-right p-1"} dangerouslySetInnerHTML={{ __html: hadith.arab }}></div>
            </div>
            <div>
              {hadith.id}
            </div>
            <div>
              {real_hadits.data.name} No. {hadith.number}
            </div>
            {/* <TerjemahanHadits content={hadith.englishNarrator + hadith.hadithEnglish} /> */}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}