import ReadOneSurah from "@/components/pack/al-qur_an/surah/read_onesurah";
import { get_surah, get_audio_surah } from "@/lib/get_surah";

export default async function Page({ searchParams, }: { searchParams?: { [key: string]: string | string[] | undefined }; }) {
  let numbersurah = searchParams ? (searchParams.number == "0" ? 1 : searchParams.number) : 1;

  let surah = await get_surah(numbersurah);
  let audio_surah = await get_audio_surah(numbersurah);

  return (
    <main className="w-full gradientbg">
      <ReadOneSurah surah={surah} audio_surah={audio_surah} />
    </main>
  )
}