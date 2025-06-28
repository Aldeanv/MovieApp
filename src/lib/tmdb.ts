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

export async function fetchTvShows(page = 1): Promise<TvShow[]> {
  const res = await fetch(
    `${BASE_URL}/tv/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page}`,
    { next: { revalidate: 86400 } }
  );

  if (!res.ok) {
    throw new Error("Gagal memuat data TV shows.");
  }

  const data = await res.json();
  return data.results as TvShow[];
}


export async function fetchTrendingTvShows(): Promise<TvShow[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
    { next: { revalidate: 86400 } }
  );

  if (!res.ok) throw new Error("Gagal memuat trending TV shows.");
  const data = await res.json();
  return data.results as TvShow[];
}

export async function fetchTvShowDetail(id: string): Promise<TvShow> {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,credits,similar`
  );
  if (!res.ok) throw new Error("Failed to fetch TV show details");
  return res.json();
}

export async function fetchUpcomingMovies(page = 1): Promise<MovieDetail[]> {
  const res = await fetch(
    `${BASE_URL}/movie/upcoming?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=${page},&sort_by=release_date.asc`,
    { next: { revalidate: 86400 } }
  );

  if (!res.ok) {
    throw new Error("Gagal memuat data upcoming movies.");
  }

  const data = await res.json();
  return data.results as MovieDetail[];

}