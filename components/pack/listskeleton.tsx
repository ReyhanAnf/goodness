
import { Skeleton } from "@/components/ui/skeleton"

export default function ListSkeleton() {
  return (
    <div className="w-full px-4 py-8 flex flex-col gap-6 bg-gradient-to-br from-emerald-50 via-cyan-50 to-emerald-100 dark:from-emerald-950 dark:via-gray-900 dark:to-emerald-950">
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className="flex flex-col md:flex-row items-center gap-4 w-full rounded-2xl shadow-lg px-4 py-6 bg-white/70 dark:bg-gray-800/60 border border-emerald-100 dark:border-emerald-800 animate-pulse"
        >
          {/* Number badge skeleton */}
          <div className="flex-shrink-0">
            <Skeleton className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-200 to-emerald-400 dark:from-emerald-900 dark:to-emerald-700" />
          </div>
          {/* Ayat content skeleton */}
          <div className="flex-1 flex flex-col gap-3 w-full">
            <Skeleton className="h-6 w-2/3 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900" />
            <Skeleton className="h-4 w-1/2 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900" />
            <Skeleton className="h-4 w-1/3 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-300 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900" />
          </div>
        </div>
      ))}
    </div>
  )
}
