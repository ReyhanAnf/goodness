import { Amiri } from "next/font/google";
import RecentRead from "@/components/pack/al-qur_an/recentread"

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400"]
})

export default async function Page() {
  return (
    <main className="">
      <h1 className="text-xl text-center font-bold py-2">Al-Qur'an Nul Karim</h1>
      <RecentRead />
    </main>
  );
}
