import ReadOneSurah from "@/components/pack/al-qur_an/read_onesurah";


export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  let tajweed = searchParams?.tajweed ? (searchParams.tajweed == "0" ? false : true) : true;
  return (
    <main className="w-full gradientbg">
      <ReadOneSurah numbersurah={searchParams ? (searchParams.number == "0" ? 1 : searchParams.number) : 1} tajweed={tajweed} />
    </main>
  )
}