// src/api/news.ts
import client from "./client";

export type NewsItem = {
  id: string;
  source: string;
  title: string;
  url: string;
  published_at: string;
  summary?: string | null;
  market_impact?: string | null;
  sentiment_score?: number | null;
};

type NewsListResponse = {
  items: NewsItem[];
};

export async function fetchNews(): Promise<NewsItem[]> {
  const res = await client.get<NewsListResponse>("/news");
  return res.data.items;
}
