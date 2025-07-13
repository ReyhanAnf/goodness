import SusPageHusna from '@/components/pack/asmaulhusna/suspagehusna';
import { Suspense } from 'react';
import ListSkeleton from '@/components/pack/listskeleton';

export default function Page() {
  return (
    <main className="min-h-screen gradientbg">
      {/* Header Section */}
      <div className="sticky top-0 z-40 w-full bg-white/10 dark:bg-black/20 backdrop-blur-xl border-b border-white/20 dark:border-gray-600/30">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Asmaul Husna
            </h1>
            <p className="text-gray-300 dark:text-gray-400 text-sm md:text-base">
              Nama-nama Allah Yang Maha Baik
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-6">
        <Suspense fallback={<ListSkeleton />}>
          <SusPageHusna />
        </Suspense>
      </div>
    </main>
  );
}