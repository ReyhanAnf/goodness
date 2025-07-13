import { Info } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import Link from "next/link";

export default function Credits() {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center justify-center w-full sm:w-auto px-4 py-2 bg-white/10 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-gray-600/30 rounded-lg hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 text-emerald-400">
        <Info size={16} className="mr-2" />
        <span className="text-sm font-medium">Info</span>
      </DialogTrigger>
      <DialogContent className="gradienbg max-h-screen overflow-y-scroll max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Muslim Goodness
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
              Terima Kasih
            </DialogTitle>
            <DialogDescription className="mb-3">
              Kepada para penyedia API :
            </DialogDescription>
            <div className="space-y-2">
              <Link 
                href="https://alquran.cloud/api"
                className="block p-2 bg-white/10 dark:bg-black/20 rounded-lg hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Al Qurán Cloud
              </Link>
              <Link 
                href="https://santrikoding.com/"
                className="block p-2 bg-white/10 dark:bg-black/20 rounded-lg hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Santri Coding
              </Link>
              <Link 
                href="https://gading.dev/"
                className="block p-2 bg-white/10 dark:bg-black/20 rounded-lg hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Gading Dev
              </Link>
              <Link 
                href="https://doa-doa-api-ahmadramadhan.fly.dev/"
                className="block p-2 bg-white/10 dark:bg-black/20 rounded-lg hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ahmad Ramdhan API
              </Link>
            </div>
          </div>

          <div className="p-3 bg-white/10 dark:bg-black/20 rounded-lg text-center">
            <span className="text-sm font-medium">dev : Reyhan Andrea Firdaus</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}