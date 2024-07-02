import { Info } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import Link from "next/link";

export default function Credits() {


  return (
    <Dialog>
      <DialogTrigger className="text-left w-full">
        <Info size={20} />
      </DialogTrigger>
      <DialogHeader>
        <DialogContent className="gradienbg max-h-screen overflow-y-scroll">
          <DialogTitle className="text-xl">
            Muslim Goodness
          </DialogTitle>
          <DialogDescription>
            The daily goodness of Muslims ~ Aplikasi kebaikan muslim sehari hari
          </DialogDescription>
          <div>
            <small>
              Versi 0.1.0
            </small>
          </div>
          <DialogTitle className="text-xl">
            Terima Kasih
          </DialogTitle>
          <DialogDescription>
            Kepada para penyedia API :
          </DialogDescription>
          <Link href={'https://alquran.cloud/api'}>
            Al Qurán Cloud
          </Link>
          <Link href={'https://santrikoding.com/'}>
            Santri Coding
          </Link>
          <Link href={'https://gading.dev/'}>
            Gading Dev
          </Link>
          <Link href={'https://doa-doa-api-ahmadramadhan.fly.dev/'}>
            Ahmad Ramdhan API
          </Link>

          <div className="dash-text-blur">
            dev : Reyhan Andrea Firdaus
          </div>
        </DialogContent>
      </DialogHeader>
    </Dialog >
  )
}