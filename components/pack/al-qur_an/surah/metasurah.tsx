"use client"

import { CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import SettingsAyah from "./setting";
import { ChevronRight, ChevronLeft, Bolt, ListRestart, BadgeInfo } from "lucide-react"
import ProgressAyah from "./progressayah";
import { useRouter } from "next/navigation";
import DetailSurah from "./detailsurah";

export default function MetaSurah({ metasurah, setpTajweed, setpQori, pqori, setpFontsize, idsurah }: any) {

  let rout = useRouter();
  let ms = metasurah;
  ms = ms[idsurah - 1]

  return (
    <div className="flex flex-row justify-between px-4">
      <div className="flex flex-col gap-3 items-end pl-0">
        <Link href={"/al-qur_an/surah/" + (ms.nomor - 1)} onClick={() => { rout.refresh(); rout.refresh() }}>
          <ChevronLeft size={25} />
        </Link>
        <Link href={"/al-qur_an"} onClick={() => { rout.refresh(); rout.refresh() }}>
          <ListRestart size={25} />
        </Link>
      </div>
      <div className="flex flex-col px-2 -ml-2 pb-1 justify-center items-center text-center">
        <CardTitle className="text-center">{ms.nama} </CardTitle>
        <CardTitle className="text-xl gap-2 items-center text-center flex flex-row">{ms.nomor} . {ms.nama_latin}  <DetailSurah ms={ms} /> </CardTitle>
        <CardDescription className="text-center">{ms.arti}</CardDescription>
        <CardDescription className="text-center">{ms.tempat_turun}</CardDescription>
        <ProgressAyah />
      </div>
      <div className="flex flex-col items-center mx-0  pr-0 pl-0">
        <Link href={"/al-qur_an/surah/" + (ms.nomor + 1)} onClick={() => { rout.refresh(); rout.refresh() }}>
          <ChevronRight size={25} />
        </Link>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost">
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