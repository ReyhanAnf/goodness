import ListHaditsPerTopic from "@/components/pack/hadits/listhaditspertopic";



export default function Page({ params }: { params: { bookslug: string, idchapter: string } }) {
  let bookslug = params.bookslug;
  let idchapter = params.idchapter;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gradientbg">
      <div className="sticky top-0 z-40 gradientcard w-full flex-col justify-center items-center p-2 rounded-b-md text-center">
        <h2 className="text-2xl font-bold">Hadits</h2>
        <div>Temukan Assunnah dan hadits sahih</div>
      </div>
      <ListHaditsPerTopic bookslug={bookslug} idchapter={idchapter} />
    </main>
  )
}