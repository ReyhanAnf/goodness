"use client"

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { ModeToggle } from "./themebutton"
import Link from "next/link"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { ChevronLeft, LayoutGrid, Settings } from "lucide-react"
import GlobalSettings from "@/hooks/settings"

export default function Navbar() {
  let rout = useRouter();
  return (
    <Menubar className="fixed bottom-0 w-full h-14 rounded-t-3xl gradientline bg-opacity-5 backdrop-blur-md justify-between px-5">
      <MenubarMenu>
        <MenubarTrigger className="hover:bg-transparent">
          <Link className="hover:bg-transparent" href={"/"}><LayoutGrid size={25} /></Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <Settings size={20} />
        </MenubarTrigger>
        <MenubarContent className="w-[60svh] -translate-x-6 px-2">
          <GlobalSettings />
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <ModeToggle />
      </MenubarMenu>
      <MenubarMenu>
        <Button variant={"ghost"} onClick={() => { rout.back() }}>
          <ChevronLeft />
        </Button>
      </MenubarMenu>
    </Menubar>
  )
}
