"use client"

import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { ModeToggle } from "./themebutton"
import Link from "next/link"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { ChevronLeft, LayoutGrid, RefreshCcwDot, Home, Settings } from "lucide-react"
import GlobalSettings from "@/hooks/settings"
import Credits from "./credits"
import OfflineManager from "./offline-manager"

export default function Navbar() {
  let rout = useRouter();
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <Menubar className="w-auto max-w-md mx-auto h-16 rounded-2xl backdrop-blur-xl bg-white/20 dark:bg-black/20 border border-white/30 dark:border-gray-700/30 shadow-2xl justify-evenly gap-1 px-6">
        <MenubarMenu>
          <MenubarTrigger className="hover:bg-white/20 dark:hover:bg-black/30 rounded-xl transition-all duration-300 p-2">
            <Link className="flex flex-col items-center gap-1" href={"/"}>
              <Home size={20} className="text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs text-gray-700 dark:text-gray-300">Home</span>
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
        
        <MenubarMenu>
          <MenubarTrigger 
            className="hover:bg-white/20 dark:hover:bg-black/30 rounded-xl transition-all duration-300 p-2"
            onClick={() => { window.location.href = window.location.href }}
          >
            <div className="flex flex-col items-center gap-1">
              <RefreshCcwDot size={20} className="text-blue-600 dark:text-blue-400" />
              <span className="text-xs text-gray-700 dark:text-gray-300">Refresh</span>
            </div>
          </MenubarTrigger>
        </MenubarMenu>
        
        <MenubarMenu>
          <MenubarTrigger className="hover:bg-white/20 dark:hover:bg-black/30 rounded-xl transition-all duration-300 p-2">
            <div className="flex flex-col items-center gap-1">
              <OfflineManager />
              <span className="text-xs text-gray-700 dark:text-gray-300">Offline</span>
            </div>
          </MenubarTrigger>
        </MenubarMenu>
        
        <MenubarMenu>
          <MenubarTrigger className="hover:bg-white/20 dark:hover:bg-black/30 rounded-xl transition-all duration-300 p-2">
            <div className="flex flex-col items-center gap-1">
              <Settings size={20} className="text-purple-600 dark:text-purple-400" />
              <span className="text-xs text-gray-700 dark:text-gray-300">Settings</span>
            </div>
          </MenubarTrigger>
          <MenubarContent className="backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 border border-white/30 dark:border-gray-600/30 rounded-xl shadow-2xl">
            <div className="p-2">
              <ModeToggle />
            </div>
          </MenubarContent>
        </MenubarMenu>
        
        <MenubarMenu>
          <MenubarTrigger 
            className="hover:bg-white/20 dark:hover:bg-black/30 rounded-xl transition-all duration-300 p-2"
            onClick={() => { rout.back() }}
          >
            <div className="flex flex-col items-center gap-1">
              <ChevronLeft size={20} className="text-orange-600 dark:text-orange-400" />
              <span className="text-xs text-gray-700 dark:text-gray-300">Back</span>
            </div>
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}
