"use client"
import DateObject from "react-date-object";
import arabic from "react-date-object/calendars/arabic";
import { Ubuntu } from "next/font/google";

export const ubuntu = Ubuntu({
  weight: "400",
  variable: "--font-basefont",
  subsets: ["latin"],
  preload: true
})

export default function CurrentDate({ className }: any) {
  let masehi = new DateObject()

  let objtanggal_m = {
    tahun: masehi.year,
    bulan: masehi.month.number,
    hari: masehi.weekDay.index,
    tanggal: masehi.day
  }

  let hari_m = "Minggu";
  let bulan_m = "Januari";

  switch (objtanggal_m.hari) {
    case 0: hari_m = "Minggu"; break;
    case 1: hari_m = "Senin"; break;
    case 2: hari_m = "Selasa"; break;
    case 3: hari_m = "Rabu"; break;
    case 4: hari_m = "Kamis"; break;
    case 5: hari_m = "Jum'at"; break;
    case 6: hari_m = "Sabtu"; break;
  }
  switch (objtanggal_m.bulan - 1) {
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
  let tampiltanggal_m = hari_m + ", " + objtanggal_m.tanggal + " " + bulan_m + " " + objtanggal_m.tahun;

  let date = new DateObject();
  let hijri = date.convert(arabic);

  let objtanggal_h = {
    tahun: hijri.year,
    bulan: hijri.month.number,
    hari: hijri.weekDay.index,
    tanggal: hijri.day
  }

  let hari_h = "Ahad";
  let bulan_h = "Muharram";

  switch (objtanggal_h.hari) {
    case 1: hari_h = "Ahad"; break;
    case 2: hari_h = "Senin"; break;
    case 3: hari_h = "Tsalasa"; break;
    case 4: hari_h = "Rabu'"; break;
    case 5: hari_h = "Khamis"; break;
    case 6: hari_h = "Jum'at"; break;
    case 0: hari_h = "Sab'at"; break;
  }
  switch (objtanggal_h.bulan - 1) {
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
  let tampiltanggal_h = hari_h + ", " + objtanggal_h.tanggal + " " + bulan_h + " " + objtanggal_h.tahun;
  return (
    <div className={className}>
      <div>{tampiltanggal_m}</div>
      <div className={ubuntu.className} >{tampiltanggal_h}</div>
    </div>
  )
}