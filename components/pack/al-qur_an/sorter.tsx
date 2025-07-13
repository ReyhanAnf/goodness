import ListSurah from "./surah/surah"
import ListSkeleton from "@/components/pack/listskeleton";

export function Sorter() {
  return (
    <div className="flex-1 overflow-y-auto">
      <ListSurah />
    </div>
  )
}
