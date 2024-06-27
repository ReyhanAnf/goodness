import ReadOneSurah from "@/components/pack/al-qur_an/surah/read_onesurah";
import { get_surah, get_audio_surah, get_meta_surah } from "@/lib/get_surah";

export default async function SusPageSurah({ idsurah }: any) {
  let surah = await get_surah(idsurah);
  let audio_surah = await get_audio_surah(idsurah);
  let metasurah = await get_meta_surah();

  return (
    <ReadOneSurah surah={surah} audio_surah={audio_surah} metasurah={metasurah} idsurah={idsurah} />
  )
}