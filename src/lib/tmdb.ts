// lib/tmdb.ts
import { TMDbResponse, MovieDetail } from "@/types/tmdb";

const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchFromTMDb<T = TMDbResponse>(
  endpoint: string,
  params?: Record<string, string>
): Promise<T> {
  const queryParams = new URLSearchParams({
    api_key: process.env.TMDB_API_KEY || "",
    language: "en-US",
    ...params,
  });

  const url = `${BASE_URL}${endpoint}?${queryParams}`;
  const res = await fetch(url, { next: { revalidate: 60 * 60 } });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error TMDb ${res.status}: ${errorText}`);
  }

  return res.json();
}

export async function fetchMovieDetail(id: string): Promise<MovieDetail> {
  return fetchFromTMDb<MovieDetail>(`/movie/${id}`, {
    append_to_response: "videos,credits,similar",
  });
}
