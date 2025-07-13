import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchHadits() {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      </div>
      <Input 
        type="text" 
        placeholder="Cari hadits berdasarkan kata kunci..."
        className="pl-10 bg-white/20 dark:bg-black/40 backdrop-blur-xl border border-white/30 dark:border-gray-600/50 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
      />
    </div>
  );
}