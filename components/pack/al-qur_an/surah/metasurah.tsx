"use client"

import { CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import SettingsAyah from "./setting";
import { ChevronRight, ChevronLeft, Bolt, ListRestart } from "lucide-react"
import ProgressAyah from "./progressayah";
import { useRouter } from "next/navigation";


export default function MetaSurah({ surah, setpTajweed, setpQori, pqori, setpFontsize }: any) {

  let surahMeta = surah.data[0]
  let surahNumber = surahMeta.number
  let surahName = surahMeta.englishName
  let turunSurah = surahMeta.revelationType
  let tranSurahName = surahMeta.englishNameTranslation

  let rout = useRouter()

  return (
    <div className="flex flex-row justify-between px-2">
      <div className="flex flex-col gap-3 items-end pl-0">
        <Link href={"/al-qur_an/surah/?number=" + (surahNumber - 1)} onClick={() => { rout.refresh() }}>
          <ChevronLeft size={25} />
        </Link>
        <Link href={"/al-qur_an"} onClick={() => { rout.refresh() }}>
          <ListRestart size={25} />
        </Link>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <CardTitle>{surahNumber}. {surahName}</CardTitle>
        <CardDescription>{tranSurahName}</CardDescription>
        <CardDescription>{turunSurah}</CardDescription>
        <ProgressAyah />
      </div>
      <div className="flex flex-col gap-3 items-end pr-0">
        <Link href={"/al-qur_an/surah/?number=" + (surahNumber + 1)} onClick={() => { rout.refresh() }}>
          <ChevronRight size={25} />
        </Link>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="pr-1">
              <Bolt size="20" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <SettingsAyah setpTajweed={setpTajweed} setpQori={setpQori} pqori={pqori} setpFontsize={setpFontsize} />
          </PopoverContent>
        </Popover>
      </div>

    </div>
  )
}