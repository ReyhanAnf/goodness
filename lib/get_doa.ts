
export async function get_doa_harian() {
  let url = `https://doa-doa-api-ahmadramadhan.fly.dev/api`;

  const req = await fetch(url, {cache : "force-cache"});
  const res = req.json();

  return res;
}
