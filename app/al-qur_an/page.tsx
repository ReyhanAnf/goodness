import { Amiri } from "next/font/google";

async function ayat() {
  const res = await fetch("http://api.alquran.cloud/v1/ayah/262/editions/quran-uthmani,id.indonesian", { cache: "no-store" });
  const data = await res.json();
  return data
}

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
