"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { font_kitab } from "./surah";
import { cn } from "@/lib/utils";
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { Copy, Share } from "lucide-react";
import AudioBar from "./audiobar";
import { useEffect, useState } from "react";


export default function AyahsCard({ surah, audio_surah, tajweed, qori, fontsize }: any) {
  const Tajweed = require("tajweed").Tajweed;

  let ayahs_s = surah["data"][0]["ayahs"];
  let ayahs_t = surah["data"][1]["ayahs"];
  let latin = surah["data"][2]["ayahs"]
  let terjemahan = surah["data"][3]["ayahs"]
  let tafsir = surah["data"][4]["ayahs"]

  let list_fontsize = ["lg", "xl", "2xl", "3xl", "4xl"]

  let parseTajweed = new Tajweed();
  let ayahsparse: any = []
  if (tajweed) {
    ayahs_t.map((ayah: any) => {
      let parsestr = parseTajweed.parse(ayah.text, true);
      ayahsparse.push(parsestr)
    })
  } else {
    ayahs_s.map((ayah: any) => {
      let parsestr = ayah.text
      ayahsparse.push(parsestr)
    })
  }

  function choice_audio(arr: any, key: any) {
    let result = arr[0];

    arr.map((qor: any) => {
      if (qor) {
        if (qor?.edition?.identifier == key) {
          result = qor
        }
      }
    })

    return result;
  }

  let [data_audio, setdataAudio] = useState(choice_audio(audio_surah.data, qori))
  useEffect(() => {
    setdataAudio(choice_audio(audio_surah.data, qori))

  }, [qori])


  return (
    <div className="scroll-smooth">
      <Card className="bg-transparent border-none shadow-none">
        <CardTitle className={cn("text-sky-950 text-4xl py-5 px-6 text-center dark:text-sky-100", font_kitab.className)}>بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</CardTitle>
      </Card>
      {ayahsparse.map((ayah: any, index: any) => (
        <Card key={"a" + index} className=" border-0 ring-0 bg-slate-100/0 dark:bg-slate-900/0 first-line: bg-opacity-10 backdrop-blur-sm p-0">
          <CardHeader className="w-full h-0 text-sm my-2 flex-row justify-between items-center">
            <CardTitle className={cn("text-xl w-10 h-10 rounded-xl  text-center pt-2 shadow-lg bg-cyan-200/35 bg-opacity-20 ", font_kitab.className)}>{ayahs_s[index].numberInSurah}</CardTitle>
            <div className="flex w-2/3 gap-2 flex-row justify-end px-2 items-center">
              <AudioBar link={data_audio.ayahs[index].audio} identiti={data_audio.edition.identifier} />
              <Copy size={15} />
              <Share size={15} />
            </div>
          </CardHeader>
          <CardContent >
            <div className={font_kitab.className}>
              {tajweed ? (
                <div className={"text-" + list_fontsize[fontsize] + " tracking-wide leading-[2.5] my-1 text-right p-1"} dangerouslySetInnerHTML={{ __html: ayah }}></div>
              ) : (
                <div className={"text-" + list_fontsize[fontsize] + " tracking-wide leading-[2.5] my-1 text-right p-1"}> {ayah}</div>
              )}
              <div className=" text-yellow-600/75"><i>{latin[index].text}</i></div>
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
        </Card>
      ))}
    </div>
  )
}