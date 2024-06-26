
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BadgeInfo } from "lucide-react"



export default function DetailSurah({ ms }: any) {

  return (
    <Dialog>
      <DialogTrigger>
        <BadgeInfo size={20} />
      </DialogTrigger>
      <DialogContent className="rounded-lg bg-slate-200 border-emerald-500">
        <DialogHeader>
          <DialogTitle>{ms.nama}</DialogTitle>
          <DialogTitle>{ms.nomor} . {ms.nama_latin}</DialogTitle>
          <DialogTitle className="text-sm">{ms.arti}</DialogTitle>
          <div className="flex flex-row justify-between px-2">
            <div>Jumlah Ayat : {ms.jumlah_ayat}</div>
            <div>Diturunkan di {ms.tempat_turun}</div>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-semibold" >Deskripsi</h3>
            <div className="text-left" dangerouslySetInnerHTML={{ __html: ms.deskripsi }}></div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>

  )
}