"use client"

import { Card } from "@/components/ui/card";
import localFont from "next/font/local";
import { BACAAN_SHALAT, NIAT_SHALAT } from "@/lib/json/data";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@radix-ui/react-menubar";

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

export default function ListNiatShalat() {

  return (
    <div className="mb-14">
      <Card className="gradientcard my-2 border-0 ring-0 px-1">
        {NIAT_SHALAT.map((shalat: any) => (
          <Dialog key={shalat.name}>
            <DialogTrigger className="text-left w-full">
              <Card className="p-2 m-1 bg-slate-500 bg-opacity-5 text-left py-3">
                {shalat.name}
              </Card>
            </DialogTrigger>
            <DialogContent className="gradienbg max-h-screen overflow-y-scroll">
              <DialogHeader>
                <DialogTitle className="text-xl">
                  {shalat.name}
                </DialogTitle>
                <DialogTitle>
                  <div className={alquranali.className + " text-3xl tracking-wide leading-[2.5] my-1 text-right p-1"} dangerouslySetInnerHTML={{ __html: shalat.arabic }}></div>
                </DialogTitle>
                <DialogDescription className=" text-yellow-600/75 text-lg text-left">
                  <i>{shalat.latin}</i>
                </DialogDescription>
                <DialogDescription className="text-lg text-left">
                  {shalat.terjemahan}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))}
        <Separator className="m-3" />
        {BACAAN_SHALAT.map((bacaan: any) => (
          <Dialog key={bacaan.name}>
            <DialogTrigger className="text-left w-full">
              <Card className="p-2 m-1 bg-slate-500 bg-opacity-5 text-left py-3">
                {bacaan.name}
              </Card>
            </DialogTrigger>
            <DialogContent className="gradienbg max-h-screen overflow-y-scroll">
              <DialogHeader>
                <DialogTitle className="text-xl">
                  {bacaan.name}
                </DialogTitle>
                <DialogTitle>
                  <div className={alquranali.className + " text-3xl tracking-wide leading-[2.5] my-1 text-right p-1"} dangerouslySetInnerHTML={{ __html: bacaan.arabic }}></div>
                </DialogTitle>
                <DialogDescription className=" text-yellow-600/75 text-lg text-left">
                  <i>{bacaan.latin}</i>
                </DialogDescription>
                <DialogDescription className="text-lg text-left">
                  {bacaan.terjemahan}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ))}
      </Card>
    </div>
  )
}