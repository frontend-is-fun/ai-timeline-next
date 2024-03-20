import { redis } from '@/database/redis.client';
import { redirect } from 'next/navigation';

const TimeLineResPage = async ({ searchParams }: { searchParams: { keyword: string } }) => {
  const { keyword } = searchParams;

  const cachedResult = await redis.get(keyword);

  if (!cachedResult) {
    return (
      <div className='mt-48 flex flex-col justify-start items-center font-bold text-4xl'>
        no result , go to home page to search again
      </div>
    );
  }

  const result = JSON.parse(cachedResult);
  console.log(result);

  return (
    <div className='flex flex-col justify-start items-center'>
      {
        result.items.map((item: { year: string; content: string; description: string }, index: number) => {
          console.log(item);
          return (
            <div key={item.year + index.toString()}>
              <div className='text-2xl font-bold'>{item.year}</div>
              <div className='text-xl font-bold'>{item.content}</div>
              <div className='text-lg'>{item.description}</div>
            </div>
          );
        })
      }
    </div>
  );
};

export default TimeLineResPage;
