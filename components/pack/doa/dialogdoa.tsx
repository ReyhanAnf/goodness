"use client"

import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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

export default function DialogDoa({ sabda }: any) {

  return (
    <Dialog>
      <DialogTrigger className="text-left w-full">
        <Card className="p-2 m-1 bg-slate-500 bg-opacity-5 text-left py-3">
          {sabda.doa}
        </Card>
      </DialogTrigger>
      <DialogContent className="gradienbg max-h-screen overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {sabda.doa}
          </DialogTitle>
          <DialogTitle>
            <div className={alquranali.className + " text-3xl tracking-wide leading-[2.5] my-1 text-right p-1"} dangerouslySetInnerHTML={{ __html: sabda.ayat }}></div>
          </DialogTitle>
          <DialogDescription className=" text-yellow-600/75 text-lg text-left">
            <i>{sabda.latin}</i>
          </DialogDescription>
          <DialogDescription className="text-lg text-left">
            {sabda.artinya}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}