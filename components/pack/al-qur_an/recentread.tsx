import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function RecentRead() {
  return (
    <div className="p-4">
      <div className="text-md font-semibold pt-2">
        Terakhir Dibaca
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        orientation="horizontal"
        className="w-full"
      >
        <CarouselContent className="-mt-1 h-[60px]">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="pt-1 h-10">
              <div className="flex flex-row gap-2 justify-around p-1">
                <Card className="w-1/2">
                  <CardContent className="flex items-center justify-center p-3">
                    <span className="text-sm font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
                <Card className="w-1/2">
                  <CardContent className="flex items-center justify-center p-3">
                    <span className="text-sm font-semibold">{index + 2}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {
          // <CarouselPrevious />
          // <CarouselNext />
        }
      </Carousel>
    </div>
  )
}
