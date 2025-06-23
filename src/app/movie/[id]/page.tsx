// src/app/movie/[id]/page.tsx
import { fetchMovieDetail } from "@/lib/tmdb"; // pastikan import sesuai
import MovieDetailClient from "./MovieDetailClient"; // sesuai path komponenmu
import { MovieDetail } from "@/types/tmdb";

export default async function MovieDetailPage(
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params; // <<-- di-`await` di sini
  const movie: MovieDetail = await fetchMovieDetail(id);

  return <MovieDetailClient movie={movie} />;
}
