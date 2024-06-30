import { DialogHeader } from "@/components/ui/dialog";
import { TAHLIL } from "@/lib/json/data";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { alquranali } from "../al-qur_an/surah/surah";


export default function Tahlil() {

  return (
    <div>
      {TAHLIL.map((tahlil: any) => (
        <Dialog>
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