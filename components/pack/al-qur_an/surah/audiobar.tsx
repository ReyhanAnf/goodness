"use client"

import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";



export default function AudioBar({ id, toplay, setToplay, playing, setPlaying, audio }: any) {

  return (
    <div className="px-2 py-0 rounded-lg flex flex-row w-auto items-center">
      <Button variant={"ghost"} className="hover:bg-transparent" onClick={() => {
        audio.pause();
        setPlaying(!playing);
        if (toplay != id) (
          setToplay(id)
        )
      }}>{toplay == id && playing == true ? (
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