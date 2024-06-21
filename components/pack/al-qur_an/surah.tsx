import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"


import { Amiri } from "next/font/google"
import { cn } from "@/lib/utils"
import { get_meta_surah } from "@/lib/get_surah"

const font_kitab = Amiri({
  weight: "400",
  variable: "--font-sans",
  preload: true,
  subsets: ["arabic", "latin"]
})

export default async function ListSurah() {
  let list_surah = await get_meta_surah();
  list_surah = list_surah["data"];
  return (
    <div className={cn("mb-10", font_kitab.variable)}>
      {list_surah.map((item: any) => (
        <Link href={"/al-qur_an/?surah=" + item.englishName} className="m-1">
          <Card className={cn("max-h-[75px] flex flex-row items-center p-1 bg-slate-300 bg-opacity-5 backdrop-blur-md  shadow-md", font_kitab.variable)}>
            <CardHeader className="flex-none w-0 text-center items-center px-8 -mr-4  ">
              <CardTitle>{item.number}</CardTitle>
              <div className="text-xs">{item.revelationType}</div>
            </CardHeader>
            <CardHeader className="grow">
              <CardTitle className="text-lg">{item.englishName}</CardTitle>
              <CardDescription>{item.englishNameTranslation}</CardDescription>
            </CardHeader>
            <CardContent className="p-1 m-2 flex-none justify-end items-end">
              <div>{item.name}</div>
              <div className="text-right">{item.numberOfAyahs} ayats</div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}