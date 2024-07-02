
import RecentRead from "@/components/pack/al-qur_an/recentread"
import { Sorter } from "@/components/pack/al-qur_an/sorter";


export default function Page() {

  return (
    <main className="flex flex-col h-auto bg-scroll w-full gradientbg" suppressHydrationWarning>
      <h1 className="text-xl text-center font-bold py-2">Al-Qur'an Nul Karim</h1>
      <RecentRead />
      <Sorter />
    </main>
  );
}
