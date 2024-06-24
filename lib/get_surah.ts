

export async function get_meta_surah(){
  const req = await fetch("https://api.alquran.cloud/v1/surah", {cache : "force-cache"});
  const res = req.json();

  return res;
}

export async function get_surah(number_surah : any) {
    const req = await fetch(`https://api.alquran.cloud/v1/surah/${number_surah}/editions/quran-simple,quran-tajweed,en.transliteration,id.indonesian,id.jalalayn`, {cache : "force-cache"});
    const res = req.json()

    return res;
}



export const qori_audio = [
  {
    "identifier": "ar.abdullahbasfar",
    "language": "ar",
    "englishName": "Abdullah Basfar"
  },
  {
    "identifier": "ar.abdurrahmaansudais",
    "language": "ar",
    "englishName": "Abdurrahmaan As-Sudais",
  },
  {
    "identifier": "ar.abdulsamad",
    "language": "ar",
    "englishName": "Abdul Samad",
  },
  {
    "identifier": "ar.shaatree",
    "language": "ar",
    "englishName": "Abu Bakr Ash-Shaatree",
  },
  {
    "identifier": "ar.ahmedajamy",
    "language": "ar",
    "englishName": "Ahmed ibn Ali al-Ajamy",
  },
  {
    "identifier": "ar.alafasy",
    "language": "ar",
    "englishName": "Alafasy",
  },
  {
    "identifier": "ar.hanirifai",
    "language": "ar",
    "englishName": "Hani Rifai",
  },
  {
    "identifier": "ar.husary",
    "language": "ar",
    "englishName": "Husary",
  },
  {
    "identifier": "ar.husarymujawwad",
    "language": "ar",
    "englishName": "Husary (Mujawwad)",
  },
  {
    "identifier": "ar.hudhaify",
    "language": "ar",
    "englishName": "Hudhaify",
  },
  {
    "identifier": "ar.ibrahimakhbar",
    "language": "ar",
    "englishName": "Ibrahim Akhdar",
  },
  {
    "identifier": "ar.mahermuaiqly",
    "language": "ar",
    "englishName": "Maher Al Muaiqly",
  },
  {
    "identifier": "ar.muhammadayyoub",
    "language": "ar",
    "englishName": "Muhammad Ayyoub",
  },
  {
    "identifier": "ar.muhammadjibreel",
    "language": "ar",
    "englishName": "Muhammad Jibreel",
  },
  {
    "identifier": "ar.saoodshuraym",
    "language": "ar",
    "englishName": "Saood bin Ibraaheem Ash-Shuraym",
  },
  {
    "identifier": "en.walk",
    "language": "en",
    "englishName": "Ibrahim Walk",
  },
  {
    "identifier": "ar.parhizgar",
    "language": "ar",
    "englishName": "Parhizgar",
  },
  {
    "identifier": "ar.aymanswoaid",
    "language": "ar",
    "englishName": "Ayman Sowaid",
  }
]

export async function get_audio_surah(number_surah : any) {
  let url = `https://api.alquran.cloud/v1/surah/${number_surah}/editions/`;

  qori_audio.map((qori, index)=>{
    url += `${qori.identifier}`

    if(index != qori_audio.length - 1){
      url += ","
    }
  })

  const req = await fetch(url, {cache : "force-cache"});
    const res = req.json()

    return res;
}
