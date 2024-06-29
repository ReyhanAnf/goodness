

export async function translate(content:any, to : any) {
  const translated = require('google-translate-api-x');
  const res = await translated(content, {to: to});

  return res.text
}