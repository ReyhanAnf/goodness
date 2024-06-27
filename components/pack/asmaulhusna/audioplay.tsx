"use client"

import { Play, Pause } from "lucide-react"
import { Button } from '@/components/ui/button';
import { useEffect, useState } from "react";
import { useGlobalAudioPlayer } from "react-use-audio-player";

export default function AudioPlay() {
  const [playing, setPlaying] = useState(false);

  const { load, play, pause } = useGlobalAudioPlayer()
  useEffect(() => {
    load("/asmaulhusna_sound.mp3", {
      autoplay: false
    })


    if (playing) {
      play();
    } else {
      pause()
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