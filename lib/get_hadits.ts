


export async function get_perawi() {
  let url = `https://api.hadith.gading.dev/books`;

  const req = await fetch(url, {cache : "force-cache"});
  const res = req.json();

  return res;
}


export async function get_hadits(perawi : any, nopage : any ) {
  let range = `${(nopage * 10)-9}-${nopage * 10}`

  let url = `https://api.hadith.gading.dev/books/${perawi}?range=${range}`;

  const req = await fetch(url, {cache : "force-cache"});
  const res = req.json();

  return res;
}