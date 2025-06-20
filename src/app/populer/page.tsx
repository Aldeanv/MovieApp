import { fetchFromTMDb } from '@/lib/tmdb';
import { Movie } from '@/types/tmdb';
import Image from 'next/image';
import Link from 'next/link';

export default async function PopulerPage() {
  const data = await fetchFromTMDb('/movie/popular');
  const movies: Movie[] = data.results;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center my-4">🎬 Film Populer</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            href={`/movie/${movie.id}`} // 👈 Link ke halaman detail
            className="bg-white rounded-lg shadow hover:shadow-lg transition p-3 flex flex-col items-center cursor-pointer"
          >
            {movie.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={750}
                className="w-full rounded h-[300px] object-cover"
              />
            ) : (
              <div className="bg-gray-200 h-[300px] w-full flex items-center justify-center rounded">
                No Image
              </div>
            )}
            <h2 className="font-semibold text-lg mt-2 text-center">{movie.title}</h2>
            {movie.release_date && (
              <span className="text-gray-600 text-sm">
                ({new Date(movie.release_date).getFullYear()})
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
