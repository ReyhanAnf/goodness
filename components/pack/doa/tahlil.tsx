"use client"

import { DialogHeader } from "@/components/ui/dialog";
import { TAHLIL } from "@/lib/json/data";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import localFont from "next/font/local";

// Import font langsung untuk menghindari RSC bundler issues
const alquranali = localFont({
  src: [
    {
      path: '../../../public/fonts/uthmani.otf', // path relatif dari /public
      weight: '400'
    }
  ],
  variable: '--font-alquranali'
});

export default function Tahlil() {

  return (
    <div>
      {TAHLIL.map((tahlil: any) => (
        <Dialog key={tahlil.judul}>
          <DialogTrigger className="text-left w-full">
            <Card className="p-2 m-1 bg-slate-500 bg-opacity-5 text-left">
              {tahlil.judul}
            </Card>
          </DialogTrigger>
          <DialogContent className="gradienbg">
            <DialogHeader>
              <DialogTitle>
                <div className={alquranali.className + " text-2xl tracking-wide leading-[2.5] my-1 text-right p-1"} dangerouslySetInnerHTML={{ __html: tahlil.arab }}></div>
              </DialogTitle>
              <DialogDescription>
                {tahlil.id}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}