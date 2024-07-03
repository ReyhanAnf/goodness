
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import SusMainPage from "@/components/pack/main/susmainpage";
import Credits from "@/components/pack/credits";
import AddToHome from "@/components/pack/addtohome";


export default function Page() {
  let cookie = cookies();

  let location = {
    year: cookie.has("year") ? `${cookie.get("year")?.value}` : "1",
    month: cookie.has("month") ? `${cookie.get("month")?.value}` : "1",
    date: cookie.has("date") ? `${cookie.get("date")?.value}` : "1",
    longitude: cookie.has("longitude") ? `${cookie.get("longitude")?.value}` : "108.197892",
    latitude: cookie.has("latitude") ? `${cookie.get("latitude")?.value}` : "-7.283008"
  }

  return (
    <main className="flex flex-col h-screen w-full dark:from-black dark:to-slate-950 bg-gradient-to-b from-slate-50 from-60 to-cyan-50 to-40 mb-12">
      <SusMainPage raw_loc={location} />
      <div className="content w-full bg-gradient-to-t dark:to-black dark:from-gray-950 rounded-t-3xl bg-slate-50 bg-opacity-5">
        <div className="grid grid-flow-col grid-cols-2 grid-rows-2 gap-3 items-center bg-opacity-20  p-4">
          <Link href={"/al-qur_an"} className="menu-dash-item gradientcard bg-opacity-20 flex flex-col items-center">
            <Image src={"/al-quran.svg"} width={80} height={80} alt="al-quran" className="" />
            Al-Qurán
          </Link>
          <div className="menu-dash-item gradientcard ">
            <Link href={"/hadits"} className="menu-dash-item gradientcard bg-opacity-20 flex flex-col items-center">
              <span className="w-full gradientline text-xs p-1">Fitur Belum Lengkap</span>
              <Image src={"/hadits.svg"} width={80} height={80} alt="al-hadits" className="" />
              <span>Hadits</span>
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
      <div className="mx-auto my-5 mb-10 flex flex-row justify-evenly gap-4">
        <Credits />
        <AddToHome />
      </div>
    </main>
  );
}
