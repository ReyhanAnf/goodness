import { promises as fs } from 'fs';
import { arabnum } from '../al-qur_an/surah/surah';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AudioPlay from './audioplay';



export default async function SusPageHusna() {
  const file = await fs.readFile(process.cwd() + '/lib/json/asmaul-husna.json', 'utf8');
  const data = JSON.parse(file);
  return (
    <div className='gradientcard'>
      <div className='sticky top-0 w-full gradientbg text-center py-3 h-auto z-50'>
        <div>
          <CardTitle>Asmaul Húsna</CardTitle>
          <CardDescription>Nama Nama Allah Yang Baik</CardDescription>
        </div>
      </div>
      <div className='grid grid-cols-2 grid-flow-row bg-gray-300 bg-opacity-5 backdrop-blur-sm '>
        {data.map((item: any) => (
          <Card key={item.urutan} className=' m-2 px-1 gradientcard bg-opacity-15 dark:bg-opacity-15 backdrop-blur-md shadow-md'>
            <CardHeader className={arabnum.className}>
              <CardTitle className='text-4xl'>{item.urutan}</CardTitle>
              <CardTitle className='text-4xl text-center text-emerald-950 dark:text-emerald-100'>{item.arab}</CardTitle>
              <CardDescription className='text-center'>{item.latin}</CardDescription>
            </CardHeader>
            <CardContent className='text-balance text-center overflow-x-scroll text-sm'>
              {item.arti}
            </CardContent>
          </Card>
        ))}
      </div>
      <AudioPlay />
    </div>
  );
}