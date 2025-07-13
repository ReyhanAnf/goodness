"use client";
import "../tajwid.css";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AyahsCard from "./ayah";
import MetaSurah from "./metasurah";
import { useState, useEffect } from "react";
import { setCookie } from "cookies-next";
import { get_surah } from "@/lib/get_surah";
import ListSkeleton from "@/components/pack/listskeleton";


export default function ReadOneSurah({ surah: _surah, audio_surah, metasurah, idsurah }: any) {
  const [surah, setSurah] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tajweed, setTajweed] = useState(true);
  const [fontsize, setFontsize] = useState(3);
  const [qori, setQori] = useState("ar.alafasy");
  const [playaudio_ayahs, setPlayaudio_ayahs] = useState([]);

  useEffect(() => {
    setLoading(true);
    get_surah(idsurah).then((data) => {
      setSurah(data);
      setLoading(false);
      // Simpan ke localStorage/cookie jika perlu
      window.localStorage.setItem(`d_surah_${idsurah}`, JSON.stringify(data));
    });
  }, [idsurah]);

  if (loading || !surah) {
    return <ListSkeleton />;
  }

  return (
    <Card className="bg-slate-100 bg-opacity-5 backdrop-blur-sm p-0">
      <CardHeader className="gradientcard text-center flex-col justify-between gap-1 sticky pb-0 px-0 z-50 top-0 w-full">
        <MetaSurah metasurah={metasurah} setpTajweed={setTajweed} setpQori={setQori} pqori={qori} setpFontsize={setFontsize} idsurah={idsurah} />
      </CardHeader>
      <CardContent className="ayahread gradientcard pb-10 p-2 scroll-smooth">
        <AyahsCard surah={surah} audio_surah={audio_surah} tajweed={tajweed} qori={qori} fontsize={fontsize} playsaudio={playaudio_ayahs} setPlayaudio={setPlayaudio_ayahs} />
      </CardContent>
    </Card>
  )
}

