import { fetchMovieDetail } from '@/lib/tmdb';
import { MovieDetail } from '@/types/tmdb';
import MovieDetailClient from './MovieDetailClient';

export default async function MovieDetailPage({ params }: { params: { id: string } }) {
  const movie: MovieDetail = await fetchMovieDetail(params.id);
  return <MovieDetailClient movie={movie} />;
}
