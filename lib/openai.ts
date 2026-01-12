import OpenAI from 'openai';

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.warn('OPENAI_API_KEY is not set in environment variables.');
}

export const openai = new OpenAI({
  apiKey: apiKey || 'dummy-key', // Prevent crash during build if key is missing, but will fail request
  dangerouslyAllowBrowser: true // Note: In a real app we should proxy through API routes, but for specific client-side needs or if this runs on server, this might be adjusted. However, Next.js App Router usually runs OpenAI calls in Server Components/Actions. We will use this primarily in Server contexts.
});
