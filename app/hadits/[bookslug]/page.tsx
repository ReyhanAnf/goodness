import TopicHadits from "@/components/pack/hadits/topichadits";


export default function Page({ params }: { params: { bookslug: string } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gradientbg">
      <div className="sticky top-0 gradientcard w-full flex-col justify-center items-center p-2 rounded-b-md text-center">
        <h2 className="text-2xl font-bold">Hadits</h2>
        <div>Temukan Assunnah dan hadits sahih</div>
      </div>
      <TopicHadits bookSlug={params.bookslug} />
    </main>
  )
}