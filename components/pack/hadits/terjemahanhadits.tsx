import { translate } from "@/lib/translate"

export default async function TerjemahanHadits({ content, to }: any) {
  to = "id";
  const terjemahan = await translate(content, to);

  return (
    <div>{terjemahan}</div>
  )
}