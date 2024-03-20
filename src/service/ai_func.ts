import { redirect } from 'next/navigation';

export interface AIRequest {
  provider: string;
  keyword: string;
}

export interface AIResponse {
  result: string;
}

const TimelineGenerate = async (req: AIRequest): Promise<AIResponse> => {
  'use server';

  const result = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(`AI generated result：${req.keyword}`);
    }, 3000);
  });
  redirect(`/timeline?keyword=${req.keyword}`);
};

export { TimelineGenerate };
