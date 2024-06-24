"use client"


import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormEvent, useEffect, useState } from "react"
import { qori_audio } from "@/lib/get_surah"
import { useRouter } from "next/navigation"




export default function SettingsAyah({ className, setpTajweed, setpQori, pqori, setpFontsize }: any) {
  const [tajweed, setTajweed] = useState(true);
  const [qori, setQori] = useState(pqori);
  const [fontsize, setFontsize] = useState(3);

  let rout = useRouter()

  useEffect(() => {
    setpTajweed(tajweed);
  }, [tajweed])

  useEffect(() => {
    setpQori(qori);
  }, [qori])

  useEffect(() => {
    setpFontsize(fontsize);
  }, [fontsize])

  return (
    <Card className={cn("w-full bg-slate-300 bg-opacity-10 backdrop-blur-md m-3 p-1", className)}>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-2">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Tajweed
            </p>
          </div>
          <Switch name="tajweed" checked={tajweed} onCheckedChange={(e) => { setTajweed(!tajweed) }} />
        </div>
        <div>
          <div className="flex w-full flex-row justify-between items-end p-2">
            <span className="text-lg ">A</span>
            <span className="text-xl ">A</span>
            <span className="text-2xl ">A</span>
            <span className="text-3xl ">A</span>
            <span className="text-4xl ">A</span>
          </div>
          <Slider name="font" defaultValue={[2]} max={4} step={1} onValueChange={(value) => { setFontsize(value[0]) }} />
        </div>
        <div>
          <Select name="audio_qori" value={pqori} onValueChange={(value) => { setQori(value) }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Audio" />
            </SelectTrigger>
            <SelectContent>
              {qori_audio.map((qori) => (
                <SelectItem key={qori.identifier} value={qori.identifier}>{qori.englishName}</SelectItem>
              ))}
            </SelectContent>
          </Select>

        </div>
      </CardContent>
      <CardFooter>
        <Button variant={"secondary"} onClick={() => { rout.refresh() }}>Apply</Button>
      </CardFooter>

    </Card>
  )
}
