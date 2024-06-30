import ListDoaHarian from "@/components/pack/doa/listdoaharian";
import ListNiatShalat from "@/components/pack/doa/listniatshalat";
import Tahlil from "@/components/pack/doa/tahlil";
import ListSkeleton from "@/components/pack/listskeleton";
import { Suspense } from "react";

export default function Page({ params }: { params: { subdoa: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 gradientbg ">
      <div className="w-full sticky top-0 gradientline flex-col justify-center items-center p-2 py-3  text-center">
        <h2 className="text-2xl font-bold">
          {params.subdoa == "doa-harian" ? (
            "Doa Harian"
          ) : params.subdoa == "shalat" ? (
            "Tata Cara Shalat"
          ) : params.subdoa == "tahlil" ? (
            "Tahlil"
          ) : "Page Not Found"}
        </h2>
      </div>
      <div className="px-2 w-full">
        <Suspense fallback={<ListSkeleton />} >
          {params.subdoa == "doa-harian" ? (
            <ListDoaHarian />
          ) : params.subdoa == "shalat" ? (
            <ListNiatShalat />
          ) : params.subdoa == "tahlil" ? (
            <Tahlil />
          ) : "Page Not Found"}
        </Suspense>
      </div>
    </main>
  );
}
