// import { Amiri } from "next/font/google";
// const amiri = Amiri({
//   subsets: ["arabic"],
//   weight: ["400"]
// })
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default async function Page() {
  return (
    <main className="flex flex-col h-screen w-full dark:from-black dark:to-slate-950 bg-gradient-to-b from-slate-50 from-60 to-cyan-50 to-40">
      <div className="header w-full bg-gradient-to-b dark:from-emerald-950 dark:to-black from-emerald-800 to-slate-50 h-1/3">
        <div className="w-full h-full">
          <Image alt="dashboard" src={"/dashboard.svg"} className="relative left-1/2 -translate-x-1/2 w-1/2 bg-opacity-75" width={100} height={50} />
          <div className="w-full z-50 absolute top-0 flex flex-col items-center p-4">
            <div className="flex flex-row w-full justify-between mb-4 text-sm text-white">
              <div>Cisayong, Tasikmalaya</div>
              <div>
                <div>20 Juni 2024 M</div>
                <div>13 Dzulhijjah 1443 H</div>
              </div>
            </div>
            <div className="dash-text-blur w-[90%] text-white ">
              <i>Kata Kata takan pernah bisa mengungkapkannya rasa ini juga bla bla blaa</i>
            </div>
            <div className="dash-text-blur w-auto text-lg py-2 font-semibold">06 : 35 : 43</div>
            <div className="dash-text-blur w-full shadow-md text-xs flex flex-row items-center justify-between overflow-x-scroll">
              <div>
                <div>Imsak</div>
                <div>04.30 </div>
              </div>
              <Separator orientation="vertical" />
              <div>
                <div>Subuh</div>
                <div>04.30 </div>
              </div>
              <Separator orientation="vertical" />
              <div>
                <div>Terbit</div>
                <div>04.30 </div>
              </div>
              <Separator orientation="vertical" />
              <div className="">
                <div>Dzuhur</div>
                <div>04.30 </div>
              </div>
              <Separator orientation="vertical" />
              <div className="nextpray">
                <div>Ashar</div>
                <div>04.30 </div>
              </div>
              <Separator orientation="vertical" />
              <div>
                <div>Maghrib</div>
                <div>04.30 </div>
              </div>
              <Separator orientation="vertical" />
              <div>
                <div>Isya</div>
                <div>04.30 </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="content w-full dark:bg-black rounded-t-3xl relative bg-slate-50 bg-opacity-5 backdrop-blur-sm pt-4 mt-16 mb-12 bottom-22 top-5 px-4 ">
        <div className="grid grid-flow-col grid-cols-2 grid-rows-2 gap-3 items-center bg-opacity-50  p-4">
          <Link href={"/al-qur_an"} className="menu-dash-item gradientcard ">Al-Quran</Link>
          <div className="menu-dash-item gradientcard ">Hadits</div>
          <div className="menu-dash-item gradientcard ">Asmaul Husna</div>
          <div className="menu-dash-item gradientcard ">Sholat dan Doa</div>
        </div>
      </div>
    </main>
  );
}
