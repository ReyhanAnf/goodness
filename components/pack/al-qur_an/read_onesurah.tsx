// import { get_surah } from "@/lib/get_surah"
import "./tajwid.css";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AyahsCard from "./ayah";
import MetaSurah from "./metasurah";
import { get_surah } from "@/lib/get_surah";



export default async function ReadOneSurah({ numbersurah, tajweed }: any) {
  let surah = await get_surah(numbersurah, true);

  return (
    <Card className="bg-slate-100 bg-opacity-5 backdrop-blur-sm p-0">
      <CardHeader className="gradientcard text-center flex-col justify-between gap-1 sticky pb-0 px-0 z-50 top-0 w-full">
        <MetaSurah surah={surah} />
      </CardHeader>

      <CardContent className="ayahread gradientcard pb-10 p-2 scroll-smooth">
        <AyahsCard surah={surah} tajweed={tajweed} />
      </CardContent>
    </Card>
  )

}