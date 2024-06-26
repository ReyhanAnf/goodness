
import { Skeleton } from "@/components/ui/skeleton"

export default function ListSkeleton() {
  return (
    <div className="w-full px-8 py-10 flex flex-col gap-10 bg-transparent">
     {[0,1,2,3,4,5,6,7,8,9].map((i : any)=>(
        <div className="flex items-center space-x-4 w-full rounded-lg shadow-md px-2 py-6">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
       ))}
    </div>
  )
}
