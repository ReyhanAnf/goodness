import { get_doa_harian } from "@/lib/get_doa";
import DialogDoa from "./dialogdoa";


export default async function ListDoaHarian() {
  let doa_harian = await get_doa_harian();

  return (
    <div className="p-2 mb-10 grid grid-cols-2">
      {doa_harian.map((doa: any) => (
        <DialogDoa sabda={doa} />
      ))}
    </div>
  )
}