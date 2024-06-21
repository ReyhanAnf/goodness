import { Amiri } from "next/font/google";
import RecentRead from "@/components/pack/al-qur_an/recentread"
import { Sorter } from "@/components/pack/al-qur_an/sorter";

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400"]
})

export default async function Page() {
  return (
    <main className="flex flex-col h-full w-full dark:from-black dark:to-slate-950 bg-gradient-to-b from-slate-50 from-60 to-cyan-50 to-40">
      <h1 className="text-xl text-center font-bold py-2">Al-Qur'an Nul Karim</h1>
      <RecentRead />
      <Sorter />
    </main>
  );
}
