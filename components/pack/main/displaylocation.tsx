import { get_current_location } from "@/lib/get_location"
import ClientLocation from "./getclientlocation";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@radix-ui/react-tooltip";
import { MapPin } from "lucide-react";

export default async function DisplayLocation({ latitude, longitude }: any) {
  const raw_location = await get_current_location(latitude, longitude);

  return (
    <div suppressHydrationWarning>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="flex items-center gap-2 px-3 py-2 bg-white/20 dark:bg-black/30 backdrop-blur-sm border border-white/30 dark:border-gray-600/40 rounded-xl hover:bg-white/30 dark:hover:bg-black/40 transition-all duration-300">
            <ClientLocation />
            <span className="text-sm font-medium text-white">
              {raw_location.address.village}, {raw_location.address.county ? raw_location.address.county : raw_location.address.city}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <div className="p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/30 dark:border-gray-600/30 rounded-xl shadow-2xl z-50 max-w-xs">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                {raw_location.display_name}
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}