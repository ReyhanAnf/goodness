"use client"

import { CardTitle, CardDescription } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function MetaSurah({ surah }: any) {

  const [scrolled, setScroll] = useState(0);
  const [tajweed, setTajweed] = useState(true);

  let surahMeta = surah.data[0]
  let surahNumber = surahMeta.number
  let surahName = surahMeta.englishName
  let turunSurah = surahMeta.revelationType
  let tranSurahName = surahMeta.englishNameTranslation


  useEffect(() => {

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollY = window.scrollY;

      const scrollPercent = (scrollY / (documentHeight - windowHeight)) * 100

      setScroll(scrollPercent)
    }


    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }

  }, [])




  return (
    <div className="flex flex-row justify-between px-4">
      <Link href={"/al-qur_an/surah/?number=" + (surahNumber - 1)}>prev</Link>
      <div className="flex flex-col gap-2 p-2">
        <CardTitle>{surahNumber}. {surahName}</CardTitle>
        <CardDescription>{tranSurahName}</CardDescription>
        <CardDescription>{turunSurah}</CardDescription>
        <Progress className="absolute left-0 bottom-0" value={scrolled} />
      </div>
      <div className="flex flex-col gap-3">
        <Link href={"/al-qur_an/surah/?number=" + (surahNumber + 1)}>next</Link>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">=</Button>
          </PopoverTrigger>
          <PopoverContent className="mr-2 rounded-lg p-3 bg-slate-100 dark:bg-slate-900">
            <div className="grid gap-4">
              <div className="flex items-center space-x-2">
                <Switch id="tajweed-mode" checked={tajweed} onCheckedChange={() => { setTajweed(!tajweed) }} />
                <Label htmlFor="tajweed-mode">Tajweed</Label>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

    </div>
  )
}