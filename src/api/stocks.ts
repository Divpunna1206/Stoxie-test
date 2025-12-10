


// // src/api/stocks.ts
// import apiClient from "./client";

// export type StockQuote = {
//   symbol: string;
//   name: string;
//   sector: string;
//   price: number;
//   change: number;
//   volume: number;
//   sentiment_score?: number | null;
//   last_news_headline?: string | null;
//   last_updated?: string | null;
// };

// // Keep this if you want, but we'll be defensive below
// export type DashboardResponse = {
//   stocks: StockQuote[];
// };

// export async function fetchDashboardStocks(): Promise<StockQuote[]> {
//   const res = await apiClient.get("/dashboard/stocks");
//   const data: any = res.data;

//   // Case 1: backend returns an array directly → [ {symbol, ...}, ... ]
//   if (Array.isArray(data)) {
//     return data as StockQuote[];
//   }

//   // Case 2: backend returns { stocks: [ ... ] }
//   if (data && Array.isArray(data.stocks)) {
//     return data.stocks as StockQuote[];
//   }

//   console.error("Unexpected /dashboard/stocks response shape:", data);
//   return [];
// }

// /**
//  * Helper to get one stock from the dashboard data.
//  * (Backend doesn't have a per-stock endpoint yet.)
//  */
// export async function fetchStockBySymbol(
//   symbol: string
// ): Promise<StockQuote | null> {
//   const stocks = await fetchDashboardStocks();
//   return (
//     stocks.find(
//       (s) => s.symbol?.toUpperCase() === symbol.toUpperCase()
//     ) ?? null
//   );
// }


// src/api/stocks.ts
import apiClient from "./client";

export type StockQuote = {
  symbol: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  volume: number;
  sentiment_score?: number | null;
  last_news_headline?: string | null;
  last_updated?: string | null;
};

// Covers all shapes we might get back
export type DashboardResponse =
  | StockQuote[]
  | { items: StockQuote[] }
  | { stocks: StockQuote[] };

export async function fetchDashboardStocks(): Promise<StockQuote[]> {
  const res = await apiClient.get<DashboardResponse>("/dashboard/stocks");
  const data: any = res.data;

  // Case 1: backend returns an array directly → [ {symbol, ...}, ... ]
  if (Array.isArray(data)) {
    return data as StockQuote[];
  }

  // Case 2: backend returns { items: [ ... ] }  ✅ your current case
  if (data && Array.isArray(data.items)) {
    return data.items as StockQuote[];
  }

  // Case 3: backend returns { stocks: [ ... ] }
  if (data && Array.isArray(data.stocks)) {
    return data.stocks as StockQuote[];
  }

  console.error("Unexpected /dashboard/stocks response shape:", data);
  return [];
}

/**
 * Helper to get one stock from the dashboard data.
 * (Backend doesn't have a per-stock endpoint yet.)
 */
export async function fetchStockBySymbol(
  symbol: string
): Promise<StockQuote | null> {
  const stocks = await fetchDashboardStocks();
  return (
    stocks.find(
      (s) => s.symbol?.toUpperCase() === symbol.toUpperCase()
    ) ?? null
  );
}
