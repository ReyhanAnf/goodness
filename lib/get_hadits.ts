


export async function get_perawi() {
  try {
    let url = `https://api.hadith.gading.dev/books`;

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
    console.error('Error fetching perawi data:', error);
    // Return fallback data
    return {
      data: [
        { id: 'muslim', name: 'Shahih Muslim', available: 7563 },
        { id: 'bukhari', name: 'Shahih Bukhari', available: 7563 },
        { id: 'abudaud', name: 'Sunan Abu Daud', available: 5274 },
        { id: 'tirmidzi', name: 'Sunan Tirmidzi', available: 3956 },
        { id: 'nasai', name: 'Sunan Nasai', available: 5662 },
        { id: 'ibnumajah', name: 'Sunan Ibnu Majah', available: 4341 }
      ]
    };
  }
}

export async function get_hadits(perawi: any, nopage: any) {
  try {
    let range = `${(nopage * 10) - 9}-${nopage * 10}`;
    let url = `https://api.hadith.gading.dev/books/${perawi}?range=${range}`;

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
    console.error('Error fetching hadits data:', error);
    // Return fallback data
    return {
      data: {
        hadiths: [
          {
            number: 1,
            arab: "حدثنا أبو بكر بن أبي شيبة قال حدثنا أبو الأحوص عن أبي إسحاق عن أبي الأحوص عن عبد الله قال قال رسول الله صلى الله عليه وسلم إنما الأعمال بالنيات وإنما لكل امرئ ما نوى",
            id: "1"
          }
        ]
      }
    };
  }
}