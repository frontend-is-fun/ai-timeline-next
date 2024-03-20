import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: process.env.OPENAI_BASE_URL || 'https://api.openai.com',
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

export { openai };
