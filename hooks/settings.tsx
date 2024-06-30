import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useState } from "react";


export default function GlobalSettings() {
  const [fontSize, setFontsize] = useState(3)

  return (
    <Card className={cn("w-full bg-slate-300 bg-opacity-10 backdrop-blur-md m-3 p-1")}>
      <CardHeader>
        <CardTitle>Settings (Belum berfungsi)</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
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
      </CardContent>
    </Card>
  )
}