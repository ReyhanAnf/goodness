import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Dashboard

      <div className="flex justify-between">
        <Link href={"/shalat"} >Shalat</Link>
        <Link href={"/al-qur_an"} >Al-Qur'an</Link>
        <Link href={"/hadits"} >Hadits</Link>
        <Link href={"/asmaulhusna"} >Asmaul Husna</Link>
      </div>
    </main>
  );
}
