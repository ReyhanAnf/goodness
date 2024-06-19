export default async function ayat() {
  const res = await fetch("http://api.alquran.cloud/v1/ayah/262/editions/quran-uthmani,id.indonesian", { cache: "no-store" });
  const data = await res.json();
  return data
}

