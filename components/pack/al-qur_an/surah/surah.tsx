import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { get_meta_surah } from "@/lib/get_surah"
import { cn } from "@/lib/utils";


import localFont from "next/font/local"

export const alquranali = localFont({
  src: [
    {
      path: '../../../../public/fonts/uthmani.otf',
      weight: '400'
    }
  ],
  variable: '--font-alquranali'
})

export const arabnum = localFont({
  src: [
    {
      path: '../../../../public/fonts/AlQuranAli.ttf',
      weight: '400'
    }
  ],
  variable: '--font-arabnum'
})

import { Amiri } from "next/font/google"

export const font_kitab = Amiri({
  weight: "400",
  preload: true,
  subsets: ["arabic"],
  display: "auto"
})

export default async function ListSurah() {
  let list_surah = await get_meta_surah();
  return (
    <div className="mb-10">
      {list_surah.map((item: any) => (
        <Link key={"surah-"+item.nomor} href={"/al-qur_an/surah/" + item.nomor} className="m-1">
          <Card className="max-h-[75px] flex flex-row items-center p-1 bg-slate-300 bg-opacity-5 backdrop-blur-md  shadow-md">
            <CardHeader className="flex-none w-0 text-center items-center px-8 -mr-4  ">
              <CardTitle>{item.nomor}</CardTitle>
              <div className="text-xs">{item.tempat_turun}</div>
            </CardHeader>
            <CardHeader className="grow">
              <CardTitle className="text-lg">{item.nama_latin}</CardTitle>
              <CardDescription>{item.arti}</CardDescription>
            </CardHeader>
            <CardContent className="p-1 m-2 flex-none justify-end text-right items-end">
              <div className={cn("py-1", alquranali.className)}>{item.nama}</div>
              <div className="text-right">{item.jumlah_ayat} ayat</div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

