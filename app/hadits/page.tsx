import ListPerawi from "@/components/pack/hadits/listperawi";
import SearchHadits from "@/components/pack/hadits/searchhadits";
import ListSkeleton from "@/components/pack/listskeleton";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2 gradientbg">
      <div className="w-full flex-col justify-center items-center p-2 text-center">
        <h2 className="text-2xl font-bold">Hadits</h2>
        <div>Temukan Assunnah dan hadits sahih</div>
      </div>
      <SearchHadits />
      <Suspense fallback={<ListSkeleton />} >
        <ListPerawi />
      </Suspense>
    </main>
  );
}
