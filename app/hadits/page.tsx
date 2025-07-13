import ListPerawi from "@/components/pack/hadits/listperawi";
import SearchHadits from "@/components/pack/hadits/searchhadits";
import ListSkeleton from "@/components/pack/listskeleton";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="min-h-screen gradientbg">
      {/* Header Section */}
      <div className="sticky top-0 z-40 w-full bg-white/10 dark:bg-black/20 backdrop-blur-xl border-b border-white/20 dark:border-gray-600/30">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Hadits
            </h1>
            <p className="text-gray-700 dark:text-gray-400 text-sm md:text-base">
              Temukan Assunnah dan hadits sahih dari berbagai perawi terpercaya
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Search Section */}
        <div className="w-full max-w-2xl mx-auto">
          <SearchHadits />
        </div>

        {/* Hadits List */}
        <div className="w-full">
          <Suspense fallback={<ListSkeleton />}>
            <ListPerawi />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
