import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { get_books_hadits } from "@/lib/get_hadits"
import Link from "next/link";

export default async function ListPerawi() {
  let data = await get_books_hadits();

  return (
    <div className="grid grid-cols-1 gap-4 w-full mb-16">
      {data.books.map((book: any) => (
        <Link href={`/hadits/${book.bookSlug}`}>
          <Card className="bg-slate-600 bg-opacity-10 rounded-lg">
            <CardHeader>
              <CardTitle>
                {book.bookName}
              </CardTitle>
              <CardDescription>
                Jumlah : {book.hadiths_count}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>{book.writerName}</div>
              <small>Wafat : {book.writerDeath}</small>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}