import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import ListSurah from "./surah/surah"
import { Suspense } from 'react'
import ListSkeleton  from "@/components/pack/listskeleton";


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
          <Suspense fallback={<ListSkeleton />}>
              <ListSurah />
          </Suspense>
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
