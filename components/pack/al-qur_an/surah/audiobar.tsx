"use client"

import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"
import { useEffect, useState } from "react"



export default function AudioBar({ link, playsaudio, setPlayaudio }: any) {

  const [audio, setAudio] = useState(new Audio(link));
  const [playing, setPlaying] = useState(false);


  useEffect(() => {
    setAudio(new Audio(link));
    playing ? audio.play() : audio.pause();
  },
    [playing, link]
  );



  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [playing]);


  return (
    <div className="px-2 py-0 rounded-lg flex flex-row w-auto items-center shadow-sm">
      <Button variant={"ghost"} onClick={() => { setPlaying(!playing) }}>{playing ? (
        <>
          <Pause size={15} />
          pause
        </>
      ) : (
        <>
          <Play size={15} />
          play
        </>
      )} </Button>
    </div>
  )
}