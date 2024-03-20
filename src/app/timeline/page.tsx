import { getTimelineFromCache } from '@/service/ai_func';
import TimelineWrapper from '@/components/timeline-item/timeline-wrapper';

const TimeLineResPage = async ({ searchParams }: { searchParams: { keyword: string } }) => {
  const template: string = 'trasync ee1';
  const { keyword } = searchParams;

  const cachedResult = await getTimelineFromCache(keyword);

  if (!cachedResult) {
    return (
      <div className='mt-48 flex flex-col justify-start items-center font-bold text-4xl'>
        no result , go to home page to search again
      </div>
    );
  }

  const result = JSON.parse(cachedResult);
  // todo 对序列化失败的处理

  return (
    <div className='flex flex-col justify-start items-center'>
      <div className='text-4xl font-bold'>{keyword}</div>
      <TimelineWrapper
        template={template}
        result={result}
      />
    </div>
  );
};

export default TimeLineResPage;
