"use client"

import { Play, Pause } from "lucide-react"
import { Button } from '@/components/ui/button';
import { useEffect, useState } from "react";

export default function AudioPlay() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/asmaulhusna_sound.mp3");

    if (playing) {
      audio.play()
    } else {
      audio.pause()
    }
  }, [playing])

  return (
    <Button variant={"outline"} className='sticky bottom-16 left-[95%] mx-2 rounded-lg bg-gray-500 bg-opacity-10 backdrop-blur-md p-3 flex-1 w-14'
      onClick={() => { setPlaying(!playing) }}
    >
      {playing ? (
        <Pause size={25} />
      ) : (
        <Play size={25} />
      )}
    </Button>
  )
}