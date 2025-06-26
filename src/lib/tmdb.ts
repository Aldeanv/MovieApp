// lib/tmdb.ts
import { TMDbResponse, MovieDetail } from "@/types/tmdb";
import { CastDetail, MovieCredit } from "@/types/tmdb";
import { TvShow } from "@/types/tmdb";

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

export async function fetchPersonDetail(id: string): Promise<CastDetail> {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
  );
  if (!res.ok) throw new Error("Failed to fetch cast details");
  return res.json();
}

export async function fetchPeopleDetail(id: string): Promise<CastDetail> {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_API_KEY}&language=id-ID`
  );
  if (!res.ok) throw new Error("Failed to fetch localized details");
  return res.json();
}

export async function fetchPersonCredits(id: string): Promise<MovieCredit[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.TMDB_API_KEY}&language=id-ID`
  );
  if (!res.ok) throw new Error("Failed to fetch filmography");
  const data = await res.json();
  return data.cast;
}

export async function fetchTvShows(): Promise<TvShow[]> {
  const apiKey = process.env.TMDB_API_KEY!;
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`,
    { next: { revalidate: 86400 } }
  );

  if (!res.ok) throw new Error(`Gagal memuat data TV shows (${res.status})`);
  const data = await res.json();
  return data.results;
}