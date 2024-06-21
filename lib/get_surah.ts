

export async function get_meta_surah(){
  const req = await fetch("https://api.alquran.cloud/v1/surah", {cache : "force-cache"});
  const res = req.json();

  return res;
}