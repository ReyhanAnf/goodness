
export async function get_doa_harian() {
  try {
    let url = `https://doa-doa-api-ahmadramadhan.fly.dev/api`;

    const req = await fetch(url, {
      cache: "force-cache",
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!req.ok) {
      throw new Error(`HTTP error! status: ${req.status}`);
    }

    const res = await req.json();
    return res;
  } catch (error) {
    console.error('Error fetching doa data:', error);
    // Return fallback data
    return [
      {
        id: 1,
        doa: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
        ayat: "Bismillahirrahmanirrahim",
        latin: "Bismillahirrahmanirrahim",
        artinya: "Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang"
      },
      {
        id: 2,
        doa: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
        ayat: "Rabbighfirli wa tub 'alayya innaka antat-tawwabur-rahim",
        latin: "Rabbighfirli wa tub 'alayya innaka antat-tawwabur-rahim",
        artinya: "Ya Tuhanku, ampunilah aku dan terimalah taubatku, sesungguhnya Engkau Maha Penerima taubat lagi Maha Penyayang"
      }
    ];
  }
}
