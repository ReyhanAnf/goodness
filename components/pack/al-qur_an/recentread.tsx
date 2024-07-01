
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cookies } from "next/headers";
import Link from "next/link";

export default function RecentRead() {
  let cookie = cookies()
  let lastsurah = cookie.get("lastsurah")?.value;
  let lastidsurah = cookie.get("lastidsurah")?.value;
  let lastscroll = cookie.get("lastscroll")?.value;


  return (
    <div className="p-4" >
      <div className="text-md font-semibold pt-2">
        Terakhir Dibaca
      </div>
      {lastsurah ? (
        <Link href={`/al-qur_an/surah/${lastidsurah}`}>
          <Card className="dash-text-blur">
            <CardHeader>
              <CardTitle>{lastsurah}</CardTitle>
            </CardHeader>
            <CardContent className="">
              {lastscroll} %
            </CardContent>
          </Card>
        </Link>
      ) : (
        "Tidak Ada"
      )}
    </div>
  )
}
