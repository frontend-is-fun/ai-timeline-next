import { redirect } from 'next/navigation';
import { openai } from '@/llm/openai.client';
import { redis } from '@/database/redis.client';
import OpenAI from 'openai';

export interface AIRequest {
  provider: string;
  keyword: string;
}

export interface AIResponse {
  result: string;
}

const genTimelinePrompt = (content: string): string => {
  const prompt = `请根据时间线按照给定的json数组格式列出 ${content} 的发展历史，每行一条内容，包含简要标题和对事件的描述。输出格式的类型如下：\n

  interface TimeLineItem {
    year: string;
    content: string;
    description: string;
  }

  interface TimeLine {
    items: TimeLineItem[];
  }

  然后按格式返回给我，例如：
  {
    items: [
      {
      'year': '1998年',
      'content': '北京京东世纪贸易有限公司成立',
      'description': '1998年6月18日，刘强东先生在中关村创业，成立京东公司。'
    },
    {
      'year': '2004年',
      'content': '京东正式涉足电子商务领域',
      'description': '2004年，京东正式涉足电子商务领域，成为中国最大的自营式电子商务企业。'
    }
    ]
  }


  你要列出你所知道的它所有的发展史，条目数量不限
  `;

  return prompt;
};

const genTimelineAnswer = async (content: string): Promise<string> => {
  const userPrompt = genTimelinePrompt(content);
  const res = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: userPrompt,
      },
    ],
    stream: false,
    response_format: {
      type: 'json_object',
    } as OpenAI.ChatCompletionCreateParams.ResponseFormat,
  });
  return res.choices[0].message.content as string;
};

const TimelineGenerate = async (req: AIRequest): Promise<AIResponse> => {
  'use server';

  const cachedResult = await redis.get(req.keyword);
  if (cachedResult) {
    redirect(`/timeline?keyword=${encodeURIComponent(req.keyword)}`);
  } else {
    // 当前不打算做provider的处理，一个demo而已
    const result = await genTimelineAnswer(req.keyword);
    await redis.set(req.keyword, result);
    redirect(`/timeline?keyword=${encodeURIComponent(req.keyword)}`);
  }
};

export { TimelineGenerate };
