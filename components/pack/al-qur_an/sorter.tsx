import ListSurah from "./surah/surah"
import { Suspense } from 'react'
import ListSkeleton from "@/components/pack/listskeleton";


export function Sorter() {
  return (
    <Suspense fallback={<ListSkeleton />}>
      <ListSurah />
    </Suspense>
  )
}
