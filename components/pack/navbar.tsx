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
import { ChevronLeft, LayoutGrid, RefreshCcwDot } from "lucide-react"
import GlobalSettings from "@/hooks/settings"
import Credits from "./credits"

export default function Navbar() {
  let rout = useRouter();
  return (
    <Menubar className="fixed bottom-0 w-full sm:w-[400px] sm:mx-auto h-14 rounded-t-3xl gradientline bg-opacity-5 backdrop-blur-md justify-evenly gap-2 px-4">
      <MenubarMenu>
        <MenubarTrigger className="hover:bg-transparent">
          <Link className="hover:bg-transparent" href={"/"}><LayoutGrid size={25} /></Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger onClick={() => { window.location.href = window.location.href }}>
          <RefreshCcwDot size={20} />
        </MenubarTrigger>
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
