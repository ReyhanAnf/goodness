import { Download } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

export default function AddToHome() {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center justify-center w-full sm:w-auto px-4 py-2 bg-emerald-500/20 dark:bg-emerald-500/30 backdrop-blur-sm border border-emerald-500/30 dark:border-emerald-400/30 rounded-lg hover:bg-emerald-500/30 dark:hover:bg-emerald-500/40 transition-all duration-300 text-emerald-700 dark:text-emerald-300">
        <Download size={16} className="mr-2" />
        <span className="text-sm font-medium">Install App</span>
      </DialogTrigger>
      <DialogContent className="gradienbg max-h-screen overflow-y-scroll max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Install Muslim Goodness
          </DialogTitle>
          <DialogDescription className="text-center text-sm">
            The daily goodness of Muslims ~ Aplikasi kebaikan muslim sehari hari
          </DialogDescription>
          <div className="text-center">
            <small className="text-xs opacity-70">
              Versi 0.1.0
            </small>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <DialogTitle className="text-lg font-semibold mb-2">
              Cara Menginstall App
            </DialogTitle>
            <DialogDescription className="mb-3">
              (Dengan membuat pintasan ke layar utama)
            </DialogDescription>
            <div className="space-y-3">
              <div className="p-3 bg-white/10 dark:bg-black/20 rounded-lg">
                <ol className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">1.</span>
                    <span>Buka Web App <Link href="https://muslim-goodness.vercel.app" className="text-emerald-500 hover:underline" target="_blank" rel="noopener noreferrer">Muslim Goodness</Link></span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">2.</span>
                    <span>Klik titik tiga di pojok kanan atas web browser</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">3.</span>
                    <span>Klik "Tambahkan Ke Layar Utama"</span>
                  </li>
                </ol>
              </div>
              <div className="flex justify-center">
                <Image 
                  className="rounded-lg shadow-lg" 
                  alt="guide-install" 
                  src="/addtohome.png" 
                  width={150} 
                  height={300} 
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
