import ReadOneSurah from "@/components/pack/al-qur_an/surah/read_onesurah";
import { Suspense } from 'react'
import ListSkeleton from "@/components/pack/listskeleton";
import SusPageSurah from "@/components/pack/al-qur_an/surah/suspage";

export default function Page({ params }: { params: { idsurah: string } }){
  let idsurah = params ? (params.idsurah == "0" ? 1 : params.idsurah) : 1;
  
  return (
    <main className="w-full gradientbg">
      <Suspense fallback={<ListSkeleton />}>
        <SusPageSurah idsurah={idsurah} />
      </Suspense>
    </main>
    )
}