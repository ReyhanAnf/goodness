import ListHaditsPerTopic from "@/components/pack/hadits/listhaditspertopic";
import ListSkeleton from "@/components/pack/listskeleton";
import { Suspense } from "react";

export default function Page({ params }: { params: { perawi: string } }) {
  return (
    <main className="min-h-screen gradientbg">
      {/* Header Section */}
      <div className="sticky top-0 z-40 w-full bg-white/10 dark:bg-black/20 backdrop-blur-xl border-b border-white/20 dark:border-gray-600/30">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Hadits
            </h1>
            <p className="text-gray-300 dark:text-gray-400 text-sm md:text-base">
              Temukan Assunnah dan hadits sahih dari berbagai perawi terpercaya
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-6 pb-32">
        <Suspense fallback={<ListSkeleton />}>
          <ListHaditsPerTopic perawi={params.perawi} nopage={1} />
        </Suspense>
      </div>
    </main>
  );
}