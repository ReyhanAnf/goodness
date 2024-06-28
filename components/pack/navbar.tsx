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
import { ChevronLeft, LayoutGrid } from "lucide-react"

export default function Navbar() {
  let rout = useRouter();
  return (
    <Menubar className="fixed bottom-0 w-full h-14 rounded-t-3xl bg-gradient-to-tr from-slate-50 to-emerald-200 dark:from-slate-950 dark:to-emerald-950 bg-opacity-5 backdrop-blur-md justify-between px-5">
      <MenubarMenu>
        <MenubarTrigger>
          <Link href={"/"}><LayoutGrid size={25} /></Link>
        </MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Find</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Search the web</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Find...</MenubarItem>
              <MenubarItem>Find Next</MenubarItem>
              <MenubarItem>Find Previous</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
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
