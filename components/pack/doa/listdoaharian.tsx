import { Card } from "@/components/ui/card";
import { get_doa_harian } from "@/lib/get_doa";
import { alquranali } from "../al-qur_an/surah/surah";
import { DialogHeader } from "@/components/ui/dialog";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";


export default async function ListDoaHarian() {
  let doa_harian = await get_doa_harian();

  return (
    <div className="p-2 mb-10 grid grid-cols-2">
      {doa_harian.map((doa: any) => (
        <Dialog>
          <DialogTrigger className="text-left w-full">
            <Card className="p-2 m-1 bg-slate-500 bg-opacity-5 text-left py-3">
              {doa.doa}
            </Card>
          </DialogTrigger>
          <DialogContent className="gradienbg max-h-screen overflow-y-scroll">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {doa.doa}
              </DialogTitle>
              <DialogTitle>
                <div className={alquranali.className + " text-3xl tracking-wide leading-[2.5] my-1 text-right p-1"} dangerouslySetInnerHTML={{ __html: doa.ayat }}></div>
              </DialogTitle>
              <DialogDescription className=" text-yellow-600/75 text-lg text-left">
                <i>{doa.latin}</i>
              </DialogDescription>
              <DialogDescription className="text-lg text-left">
                {doa.artinya}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}