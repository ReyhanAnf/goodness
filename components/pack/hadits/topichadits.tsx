import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { get_topic_hadits } from "@/lib/get_hadits"
import Link from "next/link";

export default async function TopicHadits({ bookSlug }: any) {
  let data = await get_topic_hadits(bookSlug);

  return (
    <div className="grid grid-cols-1 gap-4 w-full mb-16">
      {data.chapters.map((topic: any) => (
        <Link href={`/hadits/${topic.bookSlug}/${topic.id}`} id={topic.id} >
          <Card className="bg-slate-600 bg-opacity-10 rounded-lg flex flex-row">
            <CardHeader>
              <CardTitle className="p-3 rounded-md bg-emerald-700 bg-opacity-55">
                {topic.chapterNumber}
              </CardTitle>
            </CardHeader>
            <CardHeader>
              <CardTitle>
                {topic.chapterEnglish}
              </CardTitle>
              <CardDescription>
                {topic.chapterArabic}
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}