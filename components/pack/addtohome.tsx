import { Info } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import Link from "next/link";
import Image from "next/image";
import {Button} from "../ui/button";

export default function AddToHome() {


  return (
    <Dialog>
      <DialogTrigger className="text-left w-full">
        <Button variant={"outline"}>
         Install App
        </Button>
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
            Cara Menginstall App
          </DialogTitle>
          <DialogDescription>
            ( Dengan membuat pintasan ke layar utama)
          </DialogDescription>
          <div>
          <ul>
          <li>1. Buka Web App <Link href="https://muslim-goodness.vercel.all">Muslim Goodness</Link></li>
          <li>2. Klik titik tiga di pojok kanan atas web browser </li>
           <li> 3. Klik Tambahkan Ke Layar Utama</li>
            <Image className="mx-auto" src={"/addtohome.png"} width={150} height={300} />
          </ul>
          </div>
        </DialogContent>
      </DialogHeader>
    </Dialog >
  )
}
