"use client"

// import { get_surah } from "@/lib/get_surah"
import "../tajwid.css";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import AyahsCard from "./ayah";
import MetaSurah from "./metasurah";
import { useState } from "react";



export default function ReadOneSurah({ surah, audio_surah }: any) {
  const [tajweed, setTajweed] = useState(true);
  const [fontsize, setFontsize] = useState(3);
  const [qori, setQori] = useState("ar.alafasy");

  return (
    <Card className="bg-slate-100 bg-opacity-5 backdrop-blur-sm p-0">
      <CardHeader className="gradientcard text-center flex-col justify-between gap-1 sticky pb-0 px-0 z-50 top-0 w-full">
        <MetaSurah surah={surah} audio_surah={audio_surah} setpTajweed={setTajweed} setpQori={setQori} pqori={qori} setpFontsize={setFontsize} />
      </CardHeader>

      <CardContent className="ayahread gradientcard pb-10 p-2 scroll-smooth">
        <AyahsCard surah={surah} audio_surah={audio_surah} tajweed={tajweed} qori={qori} fontsize={fontsize} />
      </CardContent>
    </Card>
  )

}