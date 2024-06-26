"use client"

import { CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import SettingsAyah from "./setting";
import { ChevronRight, ChevronLeft, Bolt, ListRestart } from "lucide-react"
import ProgressAyah from "./progressayah";
import { useRouter } from "next/navigation";


export default function MetaSurah({ metasurah, setpTajweed, setpQori, pqori,setpFontsize, idsurah}: any) {

  let rout = useRouter();
  let ms = metasurah;
  ms = ms[idsurah - 1]

  return (
    <div className="flex flex-row justify-between px-4">
      <div className="flex flex-col gap-3 items-end pl-0">
        <Link href={"/al-qur_an/surah/" + (ms.nomor - 1)} onClick={() => { rout.refresh();rout.refresh() }}>
          <ChevronLeft size={25} />
        </Link>
        <Link href={"/al-qur_an"} onClick={() => { rout.refresh();rout.refresh()  }}>
          <ListRestart size={25} />
        </Link>
      </div>
      <div className="flex flex-col px-2 justify-center items-center text-center">
        <CardTitle>{ms.nama}</CardTitle>
        <CardTitle className="text-xl">{ms.nomor} . {ms.nama_latin}</CardTitle>
        <CardDescription>{ms.arti}</CardDescription>
        <CardDescription>{ms.tempat_turun}</CardDescription>
        <ProgressAyah />
      </div>
      <div className="flex flex-col gap-3 items-end pr-0">
        <Link href={"/al-qur_an/surah/" + (ms.nomor + 1)} onClick={() => { rout.refresh();rout.refresh() }}>
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