import ReadOneSurah from "@/components/pack/al-qur_an/read_onesurah";


export default function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  console.log(searchParams)
  return (
    <main className="w-full gradientbg">
      <ReadOneSurah numbersurah={searchParams ? searchParams.number : 1} />
    </main>
  )
}