"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BadgeInfo, Play, Pause } from "lucide-react"
import { useEffect, useState } from "react";
import { useGlobalAudioPlayer } from 'react-use-audio-player';


export default function DetailSurah({ ms }: any) {
  let [playing, setPlaying] = useState(false);
  const { load, play, pause } = useGlobalAudioPlayer()

  useEffect(() => {
    load(ms.audio, {
      autoplay: false
    })

    if (playing) {
      play();
    } else {
      pause()
    }
  }, [playing])

  return (
    <Dialog>
      <DialogTrigger>
        <BadgeInfo size={20} />
      </DialogTrigger>
      <DialogContent className="rounded-lg bg-slate-200 dark:bg-gray-900 border-emerald-500" aria-describedby="p">
        <DialogHeader>
          <DialogTitle>{ms.nama}</DialogTitle>
          <DialogTitle>{ms.nomor} . {ms.nama_latin}</DialogTitle>
          <DialogTitle className="text-sm">{ms.arti}</DialogTitle>
          <div className="flex flex-row justify-between px-2">
            <div>Jumlah Ayat : {ms.jumlah_ayat}</div>
            <div>Diturunkan di {ms.tempat_turun}</div>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-semibold" >Deskripsi</h3>
            <div className="text-left" dangerouslySetInnerHTML={{ __html: ms.deskripsi }}></div>
          </div>
        </DialogHeader>
        <Button variant={"outline"} onClick={() => { setPlaying(!playing); }} className="border-emerald-800">{playing ? (
          <div className="flex flex-row justify-center items-center gap-2">
            <Pause size={25} />
            <p>Berhenti</p>
          </div>
        ) : (
          <div className="flex flex-row justify-center items-center gap-2">
            <Play size={25} />
            <p>putar surat ini secara full tanpa per ayat</p>
          </div>
        )}</Button>
      </DialogContent>
    </Dialog>

  )
}