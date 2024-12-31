// pages/api/news.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const API_KEY = process.env.NEWS_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`NewsAPI error: ${response.status}`);
    }
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('News API error:', error);
    res.status(500).json({ message: 'Failed to fetch news' });
  }
}