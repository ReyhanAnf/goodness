import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function MenuDoa() {

  return (
    <div className="flex flex-col gap-4 w-full sm:w-1/2 justify-center items-center">
      <Link className="w-full" href={"/doa/doa-harian"}>
        <Card className="bg-slate-400 bg-opacity-5 ">
          <CardHeader>
            <CardTitle>Doa Doa Harian</CardTitle>
          </CardHeader>
        </Card>
      </Link>
      <Link className="w-full" href={"/doa/shalat"}>
        <Card className="bg-slate-400 bg-opacity-5 ">
          <CardHeader>
            <CardTitle>Shalat</CardTitle>
          </CardHeader>
        </Card>
      </Link>
      <Link className="w-full" href={"/doa/tahlil"}>
        <Card className="bg-slate-400 bg-opacity-5 ">
          <CardHeader>
            <CardTitle>Tahlil</CardTitle>
          </CardHeader>
        </Card>
      </Link>
    </div>
  )
}