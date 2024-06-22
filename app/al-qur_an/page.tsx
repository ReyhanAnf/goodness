import { Amiri } from "next/font/google";
import RecentRead from "@/components/pack/al-qur_an/recentread"
import { Sorter } from "@/components/pack/al-qur_an/sorter";


export default async function Page() {
  return (
    <main className="flex flex-col max-h-screen h-screen bg-scroll w-full gradientbg">
      <h1 className="text-xl text-center font-bold py-2">Al-Qur'an Nul Karim</h1>
      <RecentRead />
      <Sorter />
    </main>
  );
}
