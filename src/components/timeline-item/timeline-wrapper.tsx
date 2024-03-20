'use client';

import { useState } from 'react';
import type { TimeLine } from '@/service/ai_func';

import Selector from '@/components/timeline-item/select';
import Tree1Component from '@/components/timeline-item/tree-1';
import Tree2Component from '@/components/timeline-item/tree-2';

interface TimelineWrapperProps {
  template: string;
  result: TimeLine;
}

const TimelineWrapper = (props: TimelineWrapperProps) => {
  const { template, result } = props;
  const [selectedTemplate, setSelectedTemplate] = useState<string>('tree1');

  const changeSelect = async (value: string) => {
    console.log('onSelect', value);
    setSelectedTemplate(value);
  };

  return (
    <div className='flex flex-col justify-start items-center'>
      <Selector
        value={selectedTemplate}
        onSelect={changeSelect}
      />
      {
        selectedTemplate === 'tree1'
          ? <Tree1Component items={result.items} />
          : <Tree2Component items={result.items} />
      }
    </div>
  );
};
export default TimelineWrapper;
