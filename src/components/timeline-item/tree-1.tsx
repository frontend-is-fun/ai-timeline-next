import type { TimeLine } from '@/service/ai_func';

const Tree1Component = (props: TimeLine) => {
  const { items } = props;
  return (
    <div>
      {
        items.map((item: { year: string; content: string; description: string }, index: number) => (
          <div key={item.year + index.toString()}>
            <div className='text-2xl font-bold'>{item.year}</div>
            <div className='text-xl font-bold'>{item.content}</div>
            <div className='text-lg'>{item.description}</div>
          </div>
        ))
      }
    </div>
  );
};

export default Tree1Component;
