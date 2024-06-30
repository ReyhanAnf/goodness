import MenuDoa from "@/components/pack/doa/menudoa";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-2 gradientbg">
      <div className="w-full flex-col justify-center items-center p-2 text-center">
        <h2 className="text-2xl font-bold">Doa dan Shalat</h2>
      </div>
      <MenuDoa />
    </main>
  );
}
