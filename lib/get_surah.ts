import { db, dbHelpers } from './db';

export async function get_surah_description(surahNumber: number) {
  try {
    // Try to get detailed surah info from santrikoding API
    const req = await fetch(`https://quran-api.santrikoding.com/api/surah/${surahNumber}`, {cache : "force-cache"});
    const res = await req.json();
    
    if (res && res.deskripsi) {
      return res.deskripsi;
    }
  } catch (error) {
    console.error('Error fetching surah description:', error);
  }

  // Fallback descriptions for common surahs
  const fallbackDescriptions: { [key: number]: string } = {
    1: "Al-Fatihah adalah surah pertama dalam Al-Qur'an. Surah ini terdiri dari 7 ayat dan termasuk dalam golongan surah Makkiyah. Al-Fatihah artinya 'Pembukaan' dan merupakan surah yang paling sering dibaca dalam shalat.",
    2: "Al-Baqarah adalah surah kedua dalam Al-Qur'an. Surah ini terdiri dari 286 ayat dan merupakan surah terpanjang dalam Al-Qur'an. Al-Baqarah artinya 'Sapi Betina' dan termasuk dalam golongan surah Madaniyah.",
    3: "Ali 'Imran adalah surah ketiga dalam Al-Qur'an. Surah ini terdiri dari 200 ayat dan termasuk dalam golongan surah Madaniyah. Ali 'Imran artinya 'Keluarga Imran'.",
    36: "Yasin adalah surah ke-36 dalam Al-Qur'an. Surah ini terdiri dari 83 ayat dan termasuk dalam golongan surah Makkiyah. Yasin adalah salah satu nama Al-Qur'an dan surah ini memiliki keutamaan khusus.",
    55: "Ar-Rahman adalah surah ke-55 dalam Al-Qur'an. Surah ini terdiri dari 78 ayat dan termasuk dalam golongan surah Madaniyah. Ar-Rahman artinya 'Yang Maha Pengasih'.",
    67: "Al-Mulk adalah surah ke-67 dalam Al-Qur'an. Surah ini terdiri dari 30 ayat dan termasuk dalam golongan surah Makkiyah. Al-Mulk artinya 'Kerajaan'.",
    112: "Al-Ikhlas adalah surah ke-112 dalam Al-Qur'an. Surah ini terdiri dari 4 ayat dan termasuk dalam golongan surah Makkiyah. Al-Ikhlas artinya 'Memurnikan Keesaan Allah'.",
    113: "Al-Falaq adalah surah ke-113 dalam Al-Qur'an. Surah ini terdiri dari 5 ayat dan termasuk dalam golongan surah Makkiyah. Al-Falaq artinya 'Waktu Subuh'.",
    114: "An-Nas adalah surah ke-114 dalam Al-Qur'an. Surah ini terdiri dari 6 ayat dan termasuk dalam golongan surah Makkiyah. An-Nas artinya 'Manusia'."
  };

  return fallbackDescriptions[surahNumber] || "Deskripsi surah ini tidak tersedia saat ini. Silakan coba lagi nanti atau gunakan sumber referensi Al-Qur'an lainnya.";
}

export async function get_meta_surah(){
  // Cek apakah data offline tersedia
  const isOfflineAvailable = await dbHelpers.isDataDownloaded();
  
  if (isOfflineAvailable && db) {
    try {
      // Ambil dari database lokal
      const surahs = await db.surahs.toArray();
      console.log('✅ Using offline data, surahs count:', surahs.length);
      return surahs;
    } catch (error) {
      console.error('❌ Error fetching from local database:', error);
      // Fallback ke API jika database error
    }
  }

  console.log('📡 Using online API - offline data not available');

  // Fallback ke API - try multiple sources
  try {
    // Try santrikoding API first (has more detailed info including descriptions)
  const req = await fetch("https://quran-api.santrikoding.com/api/surah", {cache : "force-cache"});
    const res = await req.json();

    if (res && Array.isArray(res)) {
      console.log('✅ Using santrikoding API, surahs count:', res.length);
  return res;
    } else if (res && res.data && Array.isArray(res.data)) {
      console.log('✅ Using santrikoding API (nested), surahs count:', res.data.length);
      return res.data;
    }
  } catch (error) {
    console.error('❌ Error fetching from santrikoding API:', error);
  }

  try {
    // Fallback to alquran.cloud (less detailed but more reliable)
    const req = await fetch("https://api.alquran.cloud/v1/surah", {cache : "force-cache"});
    const res = await req.json();
    
    if (res && res.data && Array.isArray(res.data)) {
      console.log('✅ Using alquran.cloud API, surahs count:', res.data.length);
      return res.data;
    }
  } catch (error) {
    console.error('❌ Error fetching from alquran.cloud:', error);
  }

  // Return empty array if all APIs fail
  console.error('❌ All API sources failed, returning empty array');
  return [];
}

export async function get_surah(number_surah : any) {
  // Cek apakah data offline tersedia
  const isOfflineAvailable = await dbHelpers.isDataDownloaded();
  
  if (isOfflineAvailable && db) {
    try {
      // Ambil surah dari database lokal
      const surah = await db.surahs.where('number').equals(parseInt(number_surah)).first();
      const verses = await db.verses.where('surahNumber').equals(parseInt(number_surah)).toArray();
      
      if (surah && verses.length > 0) {
        console.log(`✅ Using offline data for surah ${number_surah}, verses count:`, verses.length);
        
        // Format data sesuai dengan struktur API
        const formattedData = {
          code: 200,
          status: "OK",
          data: {
            number: surah.number,
            name: surah.name,
            englishName: surah.name_latin,
            englishNameTranslation: surah.name_translation,
            revelationType: surah.revelation?.arab || "Meccan",
            numberOfAyahs: parseInt(surah.number_of_ayah),
            ayahs: verses.map(verse => ({
              number: verse.verseNumber,
              text: verse.text.arab,
              numberInSurah: verse.verseNumber,
              juz: verse.juz,
              manzil: 1, // Default value
              page: verse.page,
              ruku: 1, // Default value
              hizbQuarter: verse.hizb,
              sajda: verse.sajda
            })),
            editions: [
              {
                identifier: "quran-uthmani",
                language: "ar",
                name: "Uthmani",
                englishName: "Uthmani",
                format: "text",
                type: "text",
                direction: "rtl",
                surah: {
                  number: surah.number,
                  name: surah.name,
                  englishName: surah.name_latin,
                  englishNameTranslation: surah.name_translation,
                  revelationType: surah.revelation?.arab || "Meccan",
                  numberOfAyahs: parseInt(surah.number_of_ayah),
                  ayahs: verses.map(verse => ({
                    number: verse.verseNumber,
                    text: verse.text.arab,
                    numberInSurah: verse.verseNumber,
                    juz: verse.juz,
                    manzil: 1,
                    page: verse.page,
                    ruku: 1,
                    hizbQuarter: verse.hizb,
                    sajda: verse.sajda
                  }))
                }
              },
              {
                identifier: "id.indonesian",
                language: "id",
                name: "Indonesian",
                englishName: "Indonesian",
                format: "text",
                type: "translation",
                direction: "ltr",
                surah: {
                  number: surah.number,
                  name: surah.name,
                  englishName: surah.name_latin,
                  englishNameTranslation: surah.name_translation,
                  revelationType: surah.revelation?.arab || "Meccan",
                  numberOfAyahs: parseInt(surah.number_of_ayah),
                  ayahs: verses.map(verse => ({
                    number: verse.verseNumber,
                    text: verse.translations.id,
                    numberInSurah: verse.verseNumber,
                    juz: verse.juz,
                    manzil: 1,
                    page: verse.page,
                    ruku: 1,
                    hizbQuarter: verse.hizb,
                    sajda: verse.sajda
                  }))
                }
              },
              {
                identifier: "en.transliteration",
                language: "en",
                name: "Transliteration",
                englishName: "Transliteration",
                format: "text",
                type: "transliteration",
                direction: "ltr",
                surah: {
                  number: surah.number,
                  name: surah.name,
                  englishName: surah.name_latin,
                  englishNameTranslation: surah.name_translation,
                  revelationType: surah.revelation?.arab || "Meccan",
                  numberOfAyahs: parseInt(surah.number_of_ayah),
                  ayahs: verses.map(verse => ({
                    number: verse.verseNumber,
                    text: verse.text.transliteration,
                    numberInSurah: verse.verseNumber,
                    juz: verse.juz,
                    manzil: 1,
                    page: verse.page,
                    ruku: 1,
                    hizbQuarter: verse.hizb,
                    sajda: verse.sajda
                  }))
                }
              }
            ]
          }
        };
        
        return formattedData;
      } else {
        console.log(`❌ Offline data not found for surah ${number_surah}, falling back to API`);
      }
    } catch (error) {
      console.error('❌ Error fetching from local database:', error);
      // Fallback ke API jika database error
    }
  } else {
    console.log('📡 Offline data not available, using API');
  }

  // Fallback ke API jika offline data tidak tersedia
  try {
    console.log(`📡 Fetching surah ${number_surah} from API...`);
    const req = await fetch(`https://api.alquran.cloud/v1/surah/${number_surah}/editions/quran-uthmani,quran-tajweed,en.transliteration,id.indonesian,id.jalalayn`, {cache : "force-cache"});
    const res = await req.json();

    return res;
  } catch (error) {
    console.error('❌ Error fetching surah from API:', error);
    // Return default data jika API gagal
    return {
      code: 500,
      status: "Error",
      data: {
        number: parseInt(number_surah),
        name: "الفاتحة",
        englishName: "Al-Fatiha",
        englishNameTranslation: "The Opening",
        revelationType: "Meccan",
        numberOfAyahs: 7,
        ayahs: [],
        editions: []
      }
    };
  }
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
  // Cek apakah data offline tersedia
  const isOfflineAvailable = await dbHelpers.isDataDownloaded();
  
  if (isOfflineAvailable && db) {
    try {
      // Ambil surah dari database lokal
      const surah = await db.surahs.where('number').equals(parseInt(number_surah)).first();
      const verses = await db.verses.where('surahNumber').equals(parseInt(number_surah)).toArray();
      
      if (surah && verses.length > 0) {
        // Format audio data dari offline database
        const audioEditions = qori_audio.map(qori => ({
          identifier: qori.identifier,
          language: qori.language,
          name: qori.englishName,
          englishName: qori.englishName,
          format: "audio",
          type: "audio",
          direction: "ltr",
          surah: {
            number: surah.number,
            name: surah.name,
            englishName: surah.name_latin,
            englishNameTranslation: surah.name_translation,
            revelationType: surah.revelation?.arab || "Meccan",
            numberOfAyahs: parseInt(surah.number_of_ayah),
            ayahs: verses.map(verse => ({
              number: verse.verseNumber,
              text: verse.text.arab,
              numberInSurah: verse.verseNumber,
              juz: verse.juz,
              manzil: 1,
              page: verse.page,
              ruku: 1,
              hizbQuarter: verse.hizb,
              sajda: verse.sajda,
              audio: {
                primary: `https://api.alquran.cloud/v1/ayah/${verse.verseNumber}/ar.alafasy`,
                secondary: []
              }
            }))
          }
        }));
        
        return {
          code: 200,
          status: "OK",
          data: audioEditions
        };
      }
    } catch (error) {
      console.error('Error fetching audio from local database:', error);
      // Fallback ke API jika database error
    }
  }

  // Fallback ke API jika offline data tidak tersedia
  try {
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
  } catch (error) {
    console.error('Error fetching audio from API:', error);
    // Return empty data jika API gagal
    return {
      code: 500,
      status: "Error",
      data: []
    };
  }
}

export async function get_random_ayah() {
  // Cek apakah data offline tersedia
  const isOfflineAvailable = await dbHelpers.isDataDownloaded();
  
  if (isOfflineAvailable && db) {
    try {
      // Ambil random ayat dari database lokal
      const totalVerses = await db.verses.count();
      const randomIndex = Math.floor(Math.random() * totalVerses);
      const randomVerse = await db.verses.offset(randomIndex).first();
      
      if (randomVerse) {
        // Ambil data surah untuk ayat ini
        const surah = await db.surahs.where('number').equals(randomVerse.surahNumber).first();
        
        // Format data sesuai dengan struktur API
        return {
          code: 200,
          status: "OK",
          data: {
            number: randomVerse.verseNumber,
            text: randomVerse.translations.id,
            numberInSurah: randomVerse.verseNumber,
            juz: randomVerse.juz,
            manzil: 1,
            page: randomVerse.page,
            ruku: 1,
            hizbQuarter: randomVerse.hizb,
            sajda: randomVerse.sajda,
            surah: {
              number: surah?.number || randomVerse.surahNumber,
              name: surah?.name || '',
              englishName: surah?.name_latin || '',
              englishNameTranslation: surah?.name_translation || '',
              revelationType: surah?.revelation?.arab || 'Meccan',
              numberOfAyahs: parseInt(surah?.number_of_ayah || '0')
            }
          }
        };
      }
    } catch (error) {
      console.error('Error getting random ayah from local database:', error);
      // Fallback ke API jika database error
    }
  }

  // Fallback ke API jika offline data tidak tersedia
  try {
  let random_ayah = Math.floor(Math.random() * 6214);
  const req = await fetch(`https://api.alquran.cloud/v1/ayah/${random_ayah}/id.indonesian`, {cache : "no-store"});
  const res = req.json();

  return res;
  } catch (error) {
    console.error('Error fetching random ayah from API:', error);
    // Return default data jika semua gagal
    return {
      code: 500,
      status: "Error",
      data: {
        number: 1,
        text: "Bismillahirrahmanirrahim",
        numberInSurah: 1,
        juz: 1,
        manzil: 1,
        page: 1,
        ruku: 1,
        hizbQuarter: 1,
        sajda: false,
        surah: {
          number: 1,
          name: "الفاتحة",
          englishName: "Al-Fatiha",
          englishNameTranslation: "The Opening",
          revelationType: "Meccan",
          numberOfAyahs: 7
        }
      }
    };
  }
}
