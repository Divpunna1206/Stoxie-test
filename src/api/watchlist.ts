// // src/api/watchlist.ts
// import client from "./client";

// export type WatchlistItem = {
//   id: number;
//   symbol: string;
//   name: string;
//   sector: string;
//   // Add more fields if your backend returns them
// };

// export async function fetchWatchlist(): Promise<WatchlistItem[]> {
//   const res = await client.get<WatchlistItem[]>("/watchlist");
//   return res.data;
// }

// export async function addToWatchlist(symbol: string): Promise<void> {
//   await client.post("/watchlist", { symbol });
// }

// export async function removeFromWatchlist(id: number): Promise<void> {
//   await client.delete(`/watchlist/${id}`);
// }
// src/api/watchlist.ts
import apiClient from "./client";

export type WatchlistItem = {
  id: number;
  symbol: string;
  name: string;
  sector: string | null;
  notify_whatsapp?: boolean;
};

export async function fetchWatchlist(): Promise<WatchlistItem[]> {
  const res = await apiClient.get<WatchlistItem[]>("/watchlist");
  return res.data;
}

/**
 * Add to watchlist.
 * Backend schema: probably symbol + optional name/sector.
 */
export async function addToWatchlist(params: {
  symbol: string;
  name?: string;
  sector?: string | null;
}): Promise<WatchlistItem> {
  const res = await apiClient.post<WatchlistItem>("/watchlist", {
    symbol: params.symbol,
    name: params.name,
    sector: params.sector ?? null,
  });
  return res.data;
}

export async function removeFromWatchlist(id: number): Promise<void> {
  await apiClient.delete(`/watchlist/${id}`);
}

/**
 * Optional: only if your backend has PATCH /watchlist/{id}/whatsapp
 */
export async function toggleWatchlistWhatsapp(
  id: number,
  notify: boolean
): Promise<WatchlistItem> {
  const res = await apiClient.patch<WatchlistItem>(
    `/watchlist/${id}/whatsapp`,
    { notify_whatsapp: notify }
  );
  return res.data;
}
