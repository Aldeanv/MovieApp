import { fetchMovieDetail } from "@/lib/tmdb";
import MovieDetailClient from "./MovieDetailClient";
import { MovieDetail } from "@/types/tmdb";

export default async function MovieDetailPage(
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;
  const movie: MovieDetail = await fetchMovieDetail(id);

  return <MovieDetailClient movie={movie} />;
}
