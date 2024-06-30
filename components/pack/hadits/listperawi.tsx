import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { get_perawi } from "@/lib/get_hadits"
import Link from "next/link";

export default async function ListPerawi() {
  let data = await get_perawi();

  return (
    <div className="grid grid-cols-1 gap-4 w-full mb-16">
      {data.data.map((perawi: any) => (
        <Link key={perawi.id} href={`/hadits/${perawi.id}`}>
          <Card className="bg-slate-600 bg-opacity-10 rounded-lg">
            <CardHeader>
              <CardTitle>
                {perawi.name}
              </CardTitle>
              <CardDescription>
                Jumlah : {perawi.available}
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}