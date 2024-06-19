import { Amiri } from "next/font/google";
import ayat from "./lib/ayat";

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400"]
})

export default async function Page() {
  let ayatk = await ayat();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">

      Al-Qur'an Nul Karim
      <div className={amiri.className}>
        {ayatk["data"][0]["text"]}
      </div>
    </main>
  );
}
