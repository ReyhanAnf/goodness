
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import SusMainPage from "@/components/pack/main/susmainpage";


export default function Page() {
  let cookie = cookies();

  let location = {
    year: cookie.has("year") ? `${cookie.get("year")?.value}` : "1",
    month: cookie.has("month") ? `${cookie.get("month")?.value}` : "1",
    date: cookie.has("date") ? `${cookie.get("date")?.value}` : "1",
    longitude: cookie.has("longitude") ? `${cookie.get("longitude")?.value}` : "108.218452",
    latitude: cookie.has("latitude") ? `${cookie.get("latitude")?.value}` : "-7.339026"
  }

  return (
    <main className="flex flex-col h-screen w-full dark:from-black dark:to-slate-950 bg-gradient-to-b from-slate-50 from-60 to-cyan-50 to-40">
      <SusMainPage raw_loc={location} />
      <div className="content w-full dark:bg-black rounded-t-3xl relative bg-slate-50 bg-opacity-5 backdrop-blur-sm pt-4 mt-16 mb-12 bottom-22 top-5 px-4 ">
        <div className="grid grid-flow-col grid-cols-2 grid-rows-2 gap-3 items-center bg-opacity-20  p-4">
          <Link href={"/al-qur_an"} className="menu-dash-item gradientcard bg-opacity-20 flex flex-col items-center">
            <Image src={"/al-quran.svg"} width={80} height={80} alt="al-quran" className="" />
            Al-Qurán
          </Link>
          <div className="menu-dash-item gradientcard ">
            <Link href={"/hadits"} className="menu-dash-item gradientcard bg-opacity-20 flex flex-col items-center">
              <Image src={"/hadits.svg"} width={80} height={80} alt="al-hadits" className="" />
              Hadits
            </Link>
          </div>
          <div className="menu-dash-item gradientcard ">
            <Link href={"/asmaulhusna"} className="menu-dash-item gradientcard bg-opacity-20 flex flex-col items-center">
              <Image src={"/asmaulhusna.svg"} width={80} height={80} alt="asmaul husna" className="" />
              Asmaul Husna
            </Link>
          </div>
          <div className="menu-dash-item gradientcard ">
            <Link href={"/doa"} className="menu-dash-item gradientcard bg-opacity-20 flex flex-col items-center">
              <Image src={"/pray.svg"} width={80} height={80} alt="doa" className="" />
              Doa & Shalat
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
