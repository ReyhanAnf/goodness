
import RecentRead from "@/components/pack/al-qur_an/recentread"
import { Sorter } from "@/components/pack/al-qur_an/sorter";

export default function Page() {
  return (
    <main className="flex flex-col h-screen w-full bg-gradient-to-br from-slate-50 via-cyan-50 to-emerald-50 dark:from-slate-950 dark:via-gray-900 dark:to-black">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Al-Qur'an Nul Karim
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Kitab suci umat Islam
            </p>
          </div>
        </div>
      </div>

      {/* Recent Read */}
      <div className="flex-shrink-0 px-4 pb-4">
        <div className="max-w-4xl mx-auto">
          <RecentRead />
        </div>
      </div>

      {/* Surah List */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full">
          <Sorter />
        </div>
      </div>
    </main>
  );
}
