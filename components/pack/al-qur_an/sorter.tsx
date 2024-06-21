import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import ListSurah from "./surah"

export function Sorter() {
  return (
    <Tabs defaultValue="surat" className="w-full p-2 px-4">
      <TabsList className="grid w-full grid-cols-3 gap-2 ">
        <TabsTrigger value="juz">Juz</TabsTrigger>
        <TabsTrigger value="surat">Surat</TabsTrigger>
        <TabsTrigger value="urutan">Urutan</TabsTrigger>
      </TabsList>
      <TabsContent value="juz">
        <div>
          Juz
        </div>
      </TabsContent>
      <TabsContent value="surat">
        <div className="">
          <ListSurah />
        </div>
      </TabsContent>
      <TabsContent value="urutan">
        <div>
          Urutan
        </div>
      </TabsContent>
    </Tabs>
  )
}
