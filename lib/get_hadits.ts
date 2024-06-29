

export async function get_books_hadits() {
  let url = `https://www.hadithapi.com/api/books?apiKey=$2y$10$jVXDaV2xxhORAIohWJPZuJDQJJBqjcMFWU5goK12e6l8QBjIG`;

  const req = await fetch(url, {cache : "force-cache"});
  const res = req.json();

  return res;
}


export async function get_topic_hadits(bookSlug : any) {
  let url = `https://www.hadithapi.com/api/${bookSlug}/chapters?apiKey=$2y$10$jVXDaV2xxhORAIohWJPZuJDQJJBqjcMFWU5goK12e6l8QBjIG`;

  const req = await fetch(url, {cache : "force-cache"});
  const res = req.json();

  return res;
}


export async function get_hadits_pertopic(bookSlug : any, chapter : any) {
  let url = `https://www.hadithapi.com/public/api/hadiths?book=${bookSlug}&chapter=${chapter}&apiKey=$2y$10$jVXDaV2xxhORAIohWJPZuJDQJJBqjcMFWU5goK12e6l8QBjIG`;

  const req = await fetch(url, {cache : "force-cache"});
  const res = req.json();

  return res;
}

export async function get_hadits_range_id(imam : any ,start:any, end:any) {
  let url = `https://api.hadith.gading.dev/books/${imam}?range=${start}-${end}`;

  const req = await fetch(url, {cache : "force-cache"});
  const res = req.json();

  return res;
}