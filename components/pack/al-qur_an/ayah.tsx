import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { font_kitab } from "./surah";
import { cn } from "@/lib/utils";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import { get_surah } from "@/lib/get_surah";

export default function AyahsCard({ surah }: any) {
  const Tajweed = require("tajweed").Tajweed;

  let ayahs = surah["data"][0]["ayahs"];
  let latin = surah["data"][1]["ayahs"]
  let terjemahan = surah["data"][2]["ayahs"]
  let tafsir = surah["data"][3]["ayahs"]

  let parseTajweed = new Tajweed();
  let ayahsparse: any = []

  ayahs.map((ayah: any) => {
    let parsestr = parseTajweed.parse(ayah.text, true);

    ayahsparse.push(parsestr)
  })



  return (
    <div>
      <Card >
        <CardTitle className={cn("text-sky-950 dark:text-sky-50 gradientbg text-4xl py-5 px-6 text-center bg-opacity-0 rounded-lg", font_kitab.className)}>بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</CardTitle>
      </Card>
      {ayahsparse.map((ayah: any, index: any) => (
        <Card className=" border-0 ring-0 bg-slate-100/0 dark:bg-slate-900/0 first-line: bg-opacity-10 backdrop-blur-sm p-0">
          <CardHeader className="w-full h-0 text-sm my-2">
            <CardTitle className={cn("text-lg font-extrabold block", font_kitab.className)}>{ayahs[index].number}</CardTitle>
          </CardHeader>
          <CardContent >
            <div className={font_kitab.className}>
              <div className="text-3xl tracking-normal space-y-2 leading-relaxed my-1 text-right p-1" dangerouslySetInnerHTML={{ __html: ayah }}></div>
              <div className="text-base text-yellow-600/75"><i>{latin[index].text}</i></div>
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">{terjemahan[index].text}</AccordionTrigger>
                <AccordionContent className="border-l-2 border-sky-300 px-4 py-2 my-1">
                  <h2 className="font-semibold my-1">Tafsir</h2>
                  <div className="text-sm">
                    <i>
                      {tafsir[index].text}
                    </i>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

          </CardContent>
          <CardFooter className="flex flex-row justify-end gap-3">
            <div>p</div>
            <div>s</div>
            <div>s</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}