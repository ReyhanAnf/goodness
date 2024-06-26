import SusPageHusna from '@/components/pack/asmaulhusna/suspagehusna';
import { Suspense } from 'react';
import ListSkeleton from '@/components/pack/listskeleton';

export default function Page() {

  return (
    <div>
      <Suspense fallback={<ListSkeleton />}>
        <SusPageHusna />
      </Suspense>
    </div>
  );
}