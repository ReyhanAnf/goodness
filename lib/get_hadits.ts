

// export async function get_books_hadits() {
//   let url = `https://www.hadithapi.com/api/books?apiKey=$2y$10$jVXDaV2xxhORAIohWJPZuJDQJJBqjcMFWU5goK12e6l8QBjIG`;

//   const req = await fetch(url, {cache : "force-cache"});
//   const res = req.json();

//   return res;
// }


// export async function get_topic_hadits(bookSlug : any) {
//   let url = `https://www.hadithapi.com/api/${bookSlug}/chapters?apiKey=$2y$10$jVXDaV2xxhORAIohWJPZuJDQJJBqjcMFWU5goK12e6l8QBjIG`;

//   const req = await fetch(url, {cache : "force-cache"});
//   const res = req.json();

//   return res;
// }


// export async function get_hadits_pertopic(bookSlug : any, chapter : any) {
//   let url = `https://www.hadithapi.com/public/api/hadiths?book=${bookSlug}&chapter=${chapter}&apiKey=$2y$10$jVXDaV2xxhORAIohWJPZuJDQJJBqjcMFWU5goK12e6l8QBjIG`;

//   const req = await fetch(url, {cache : "force-cache"});
//   const res = req.json();

//   return res;
// }



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