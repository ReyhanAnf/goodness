

export async function get_meta_surah(){
  const req = await fetch("https://api.alquran.cloud/v1/surah", {cache : "force-cache"});
  const res = req.json();

  return res;
}

export async function get_surah(number_surah : any, tajweed :any) {
  if(tajweed){
    const req = await fetch(`https://api.alquran.cloud/v1/surah/${number_surah}/editions/quran-tajweed,en.transliteration,id.indonesian,id.jalalayn`, {cache : "force-cache"});
    const res = req.json()

    return res;
  }else{
    const req = await fetch(`https://api.alquran.cloud/v1/surah/${number_surah}/editions/quran-simple,en.transliteration,id.indonesian,id.jalalayn`, {cache : "force-cache"});
    const res = req.json()

    return res;
  }
}