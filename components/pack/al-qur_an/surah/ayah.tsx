"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { alquranali, arabnum } from "./surah";
import { cn } from "@/lib/utils";
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { Copy, Share } from "lucide-react";
import AudioBar from "./audiobar";
import { useEffect, useState } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";

export default function AyahsCard({ surah, audio_surah, tajweed, qori, fontsize }: any) {
  const Tajweed = require("tajweed").Tajweed;

  let ayahs_s = surah["data"][0]["ayahs"];
  let ayahs_t = surah["data"][1]["ayahs"];
  let latin = surah["data"][2]["ayahs"];
  let terjemahan = surah["data"][3]["ayahs"];
  let tafsir = surah["data"][4]["ayahs"];

  let list_fontsize = ["lg", "xl", "2xl", "3xl", "4xl"];

  let parseTajweed = new Tajweed();
  let ayahsparse: any = [];
  if (tajweed) {
    ayahs_t.map((ayah: any) => {
      let parsestr = parseTajweed.parse(ayah.text, true);
      ayahsparse.push(parsestr);
    })
  } else {
    ayahs_s.map((ayah: any) => {
      let parsestr = ayah.text;
      ayahsparse.push(parsestr);
    })
  }

  function choice_audio(arr: any, key: any) {
    let result = arr[0];
    arr.map((qor: any) => {
      if (qor) {
        if (qor?.edition?.identifier == key) {
          result = qor;
        }
      }
    })
    return result;
  }

  let [data_audio, setdataAudio] = useState(choice_audio(audio_surah.data, qori))
  useEffect(() => {
    setdataAudio(choice_audio(audio_surah.data, qori));
  }, [qori])

  const [toplay, setToplay] = useState(0);
  const [playing, setPlaying] = useState(false);
  const { load, pause } = useGlobalAudioPlayer();

  useEffect(() => {
    if (toplay != 0 || playing) {
      let element = document.getElementById(`ayah-${toplay - 1}`);
      element?.scrollIntoView({ behavior: "smooth" });
      if (toplay > data_audio.ayahs.length) {
        setToplay(0);
        setPlaying(false);
        pause();
      } else if (toplay <= 0 || data_audio.ayahs.length == 0) {
        setToplay(0);
        setPlaying(false);
        pause();
        return;
      } else {
        if (toplay == 1 && data_audio.numberOfAyahs != 1) {
          load("https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3", {
            autoplay: true,
            onend: () => {
              load(data_audio.ayahs[toplay - 1].audio, {
                autoplay: true,
                onend: () => {
                  setToplay(toplay + 1);
                }
              });
            }
          });
        } else {
          load(data_audio.ayahs[toplay - 1].audio, {
            autoplay: true,
            onend: () => {
              setToplay(toplay + 1);
            }
          });
        }
        if (!playing) {
          pause();
        }
      }
    }
  }, [toplay, playing]);


  return (
    <div className="scroll-smooth mb-12">
      {surah.data[0].number == 1 || surah.data[0].number == 9 ? (
        ""
      ) : (
        <Card className="bg-transparent border-none shadow-none">
          <CardTitle className={cn("text-emerald-950 text-4xl py-5 px-6 text-center dark:text-emerald-100", alquranali.className)}>بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</CardTitle>
        </Card>
      )}
      {ayahsparse.map((ayah: any, index: any) => (
        <Card key={"a" + index} className=" border-0 ring-0 bg-slate-100/0 dark:bg-slate-900/0 first-line: bg-opacity-10  p-0">
          <CardHeader className="w-full h-0 text-sm my-2 flex-row justify-between items-center">
            <CardTitle className={cn("text-xl w-10 h-10 rounded-xl  text-center pt-2 shadow-lg bg-emerald-200/35 bg-opacity-20 ", arabnum.className)}>{ayahs_s[index].numberInSurah}</CardTitle>
            <div className="flex w-2/3 gap-2 flex-row justify-end px-2 items-center">
              <AudioBar id={ayahs_s[index].numberInSurah} toplay={toplay} setToplay={setToplay} playing={playing} setPlaying={setPlaying} />
              <Copy size={15} className="cursor-pointer" />
              <Share size={15} className="cursor-pointer" />
            </div>
          </CardHeader>
          <CardContent >
            <div className={alquranali.className}>
              <div className={"text-" + list_fontsize[fontsize] + " tracking-wide leading-[2.5] my-1 text-right p-1"} dangerouslySetInnerHTML={{ __html: ayah }}></div>
              <div className=" text-yellow-600/75"><i>{latin[index].text}</i></div>
            </div>
            <Accordion type="single" collapsible >
              <AccordionItem value="item-1" className="hover:no-underline">
                <AccordionTrigger className="text-left" id={"ayah-" + (index + 1)}>{terjemahan[index].text}</AccordionTrigger>
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
