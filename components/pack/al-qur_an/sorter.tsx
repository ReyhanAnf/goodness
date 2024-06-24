import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import ListSurah from "./surah/surah"

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
        <div className="h-svh overflow-y-scroll">
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
