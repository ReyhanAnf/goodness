import { get_current_location } from "@/lib/get_location"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
// import { clientLocation } from "@/hooks/clientlocation"

export default async function DisplayLocation({ latitude, longitude }: any) {
  const raw_location = await get_current_location(latitude, longitude);

  return (
    <div suppressHydrationWarning>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{raw_location.address.village}, {raw_location.address.county ? raw_location.address.county : raw_location.address.city}</TooltipTrigger>
          <TooltipContent>
            <div className="p-4 bg-slate-100 bg-opacity-40 rounded-lg z-50">
              {raw_location.display_name}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}