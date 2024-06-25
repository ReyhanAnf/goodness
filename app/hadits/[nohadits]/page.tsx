

export default function Page({ params }: { params: { nohadits: string } }){
  return (
    <h1>
    {params.nohadits}
    </h1>
    )
}