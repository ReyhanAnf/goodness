import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import TimeClock from "@/components/pack/main/timeclock";
import DateObject from "react-date-object";
import arabic from "react-date-object/calendars/arabic";



export default function Page() {
  let masehi = new DateObject()
  
  let tahun_m = masehi.year;
  let bulan_m = masehi.month.number;
  let tanggal_m = masehi.day;
  let hari_m = masehi.weekDay.index;
  
  switch(hari_m) {
   case 0: hari_m = "Minggu"; break;
   case 1: hari_m = "Senin"; break;
   case 2: hari_m = "Selasa"; break;
   case 3: hari_m = "Rabu"; break;
   case 4: hari_m = "Kamis"; break;
   case 5: hari_m = "Jum'at"; break;
   case 6: hari_m = "Sabtu"; break;
  }
  switch(bulan_m) {
   case 0: bulan_m = "Januari"; break;
   case 1: bulan_m = "Februari"; break;
   case 2: bulan_m = "Maret"; break;
   case 3: bulan_m = "April"; break;
   case 4: bulan_m = "Mei"; break;
   case 5: bulan_m = "Juni"; break;
   case 6: bulan_m = "Juli"; break;
   case 7: bulan_m = "Agustus"; break;
   case 8: bulan_m = "September"; break;
   case 9: bulan_m = "Oktober"; break;
   case 10: bulan_m = "November"; break;
   case 11: bulan_m = "Desember"; break;
  }
  let tampiltanggal_m = hari_m + ", " + tanggal_m + " " + bulan_m + " " + tahun_m;

  let date = new DateObject();
  let hijri = date.convert(arabic);
  
  let tahun_h = hijri.year;
  let bulan_h = hijri.month.number;
  let tanggal_h = hijri.day;
  let hari_h = hijri.weekDay.index;
  
  switch(hari_h - 1) {
   case 0: hari_h = "Ahad"; break;
   case 1: hari_h = "Senin"; break;
   case 2: hari_h = "Tsalasa"; break;
   case 3: hari_h = "Rabu'"; break;
   case 4: hari_h = "Khamis"; break;
   case 5: hari_h = "Jum'at"; break;
   case 6: hari_h = "Sab'at"; break;
  }
  switch(bulan_h - 1) {
   case 0: bulan_h = "Muharram"; break;
   case 1: bulan_h = "Safar"; break;
   case 2: bulan_h = "Rabiul Awal"; break;
   case 3: bulan_h = "Rabiul Akhir"; break;
   case 4: bulan_h = "Jumadil Awal"; break;
   case 5: bulan_h = "Jumadil Akhir"; break;
   case 6: bulan_h = "Rajab"; break;
   case 7: bulan_h = "Sya'ban"; break;
   case 8: bulan_h = "Ramadhan"; break;
   case 9: bulan_h = "Syawal"; break;
   case 10: bulan_h = "Dzulqadah"; break;
   case 11: bulan_h = "Dzuhhijjah"; break;
  }
  let tampiltanggal_h = hari_h + ", " + tanggal_h + " " + bulan_h + " " + tahun_h;


  return (
    <main className="flex flex-col h-screen w-full dark:from-black dark:to-slate-950 bg-gradient-to-b from-slate-50 from-60 to-cyan-50 to-40">
      <div className="header w-full bg-gradient-to-b dark:from-emerald-950 dark:to-black from-emerald-800 to-slate-50 h-1/3">
        <div className="w-full h-full">
          <Image alt="dashboard" src={"/dashboard.svg"} className="relative left-1/2 -translate-x-1/2 w-1/2 bg-opacity-75" width={100} height={50} />
          <div className="w-full z-50 absolute top-0 flex flex-col items-center p-4">
            <div className="flex flex-row w-full justify-between mb-4 text-sm text-white">
              <div>Cisayong, Tasikmalaya</div>
              <div>
                <div>{tampiltanggal_m}</div>
                <div>{tampiltanggal_h}</div>
              </div>
            </div>
            <div className="dash-text-blur w-[90%] text-white ">
              <i>Kata Kata takan pernah bisa mengungkapkannya rasa ini juga bla bla blaa</i>
            </div>
            <TimeClock />
            
            <div className="dash-text-blur w-full shadow-md text-xs flex flex-row items-center justify-between overflow-x-scroll">
              <div>
                <div>Imsak</div>
                <div>04.30 </div>
              </div>
              <Separator orientation="vertical" />
              <div>
                <div>Subuh</div>
                <div>04.30 </div>
              </div>
              <Separator orientation="vertical" />
              <div>
                <div>Terbit</div>
                <div>04.30 </div>
              </div>
              <Separator orientation="vertical" />
              <div className="">
                <div>Dzuhur</div>
                <div>04.30 </div>
              </div>
              <Separator orientation="vertical" />
              <div className="nextpray">
                <div>Ashar</div>
                <div>04.30 </div>
              </div>
              <Separator orientation="vertical" />
              <div>
                <div>Maghrib</div>
                <div>04.30 </div>
              </div>
              <Separator orientation="vertical" />
              <div>
                <div>Isya</div>
                <div>04.30 </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="content w-full dark:bg-black rounded-t-3xl relative bg-slate-50 bg-opacity-5 backdrop-blur-sm pt-4 mt-16 mb-12 bottom-22 top-5 px-4 ">
        <div className="grid grid-flow-col grid-cols-2 grid-rows-2 gap-3 items-center bg-opacity-20  p-4">
          <Link href={"/al-qur_an"} className="menu-dash-item gradientcard bg-opacity-20 flex flex-col items-center">
            <Image src={"/al-quran.svg"} width={80} height={80} alt="al-quran" className="" />
            Al-Qurán
          </Link>
          <div className="menu-dash-item gradientcard ">
            <Link href={"/hadits"} className="menu-dash-item gradientcard bg-opacity-20 flex flex-col items-center">
              <Image src={"/hadits.svg"} width={80} height={80} alt="al-hadits" className="" />
              Hadits
            </Link>
          </div>
          <div className="menu-dash-item gradientcard ">
            <Link href={"/asmaulhusna"} className="menu-dash-item gradientcard bg-opacity-20 flex flex-col items-center">
              <Image src={"/asmaulhusna.svg"} width={80} height={80} alt="asmaul husna" className="" />
              Asmaul Husna
            </Link>
          </div>
          <div className="menu-dash-item gradientcard ">
            <Link href={"/doa"} className="menu-dash-item gradientcard bg-opacity-20 flex flex-col items-center">
              <Image src={"/pray.svg"} width={80} height={80} alt="doa" className="" />
              Doa & Shalat
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
