import { TMDbResponse, MovieDetail } from '@/types/tmdb';

const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchFromTMDb(endpoint: string): Promise<TMDbResponse> {
  const url = `${BASE_URL}${endpoint}?api_key=${process.env.TMDB_API_KEY}&language=id-ID`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error('Error status TMDb:', res.status, await res.text());
    throw new Error('Gagal mengambil data dari TMDb');
  }
  return res.json();
}

// ✅ Khusus detail film
export async function fetchMovieDetail(id: string): Promise<MovieDetail> {
  const url = `${BASE_URL}/movie/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,credits,similar&language=id-ID`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error('Error status TMDb Detail:', res.status, await res.text());
    throw new Error('Gagal mengambil data detail dari TMDb');
  }
  return res.json();
}


