'use client';

import { ChangeEvent, useState } from 'react';
import type { AIRequest, AIResponse } from '@/service/ai_func';

interface InputComponentProps {
  // eslint-disable-next-line no-unused-vars
  generate: (param: AIRequest) => Promise<AIResponse>;
}
const InputComponent = (props: InputComponentProps) => {
  const { generate } = props;
  const [keyword, setKeyword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submit = async () => {
    setIsLoading(true);
    await generate({
      provider: 'gemini',
      keyword,
    });

    setIsLoading(false);
  };
  return (
    <div className='flex flex-col justify-start items-center'>
      <label
        htmlFor='keyword'
        className='input input-bordered flex items-center gap-2'
      >
        <input
          type='text'
          className='grow'
          id='keyword'
          placeholder='Enter the keyword'
          value={keyword}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setKeyword(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              submit();
            }
          }}
        />
        <kbd className='kbd kbd-sm'>
          <svg
            width='15'
            height='15'
            aria-label='Enter key'
            role='img'
          >
            <g
              fill='none'
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='1.2'
            >
              <path d='M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3' />
            </g>
          </svg>

        </kbd>
      </label>
      <button
        type='button'
        className='btn btn-neutral mt-4'
        onClick={submit}
      >
        {isLoading ? 'Loading...' : 'Generate'}
      </button>

    </div>
  );
};

export default InputComponent;
