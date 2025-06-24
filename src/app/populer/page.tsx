import Navbar from "@/component/navbar";
import { fetchFromTMDb } from "@/lib/tmdb";
import { Movie } from "@/types/tmdb";
import Image from "next/image";
import Link from "next/link";

export default async function PopulerPage() {
  const data = await fetchFromTMDb("/movie/popular");
  const movies: Movie[] = data.results;

  return (
    <div className="bg-gradient-to-b from-gray-950 to-black min-h-screen text-white pt-16">
      <Navbar />

      <h1 className="text-4xl font-extrabold text-center mt-8 mb-12 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500 drop-shadow-xl">
        🎬 Film Populer
      </h1>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            href={`/movie/${movie.id}`}
            className="group relative flex flex-col items-center bg-white/5 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="relative w-full h-[320px] overflow-hidden">
              {movie.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 200px"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="bg-gray-800 flex items-center justify-center w-full h-full text-white/60">
                  No Image
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
            </div>

            <div className="p-4 text-center space-y-1">
              <h2 className="font-bold text-lg line-clamp-1 group-hover:text-yellow-400 transition-colors">
                {movie.title}
              </h2>
              {movie.release_date && (
                <span className="text-gray-400 text-sm">
                  ({new Date(movie.release_date).getFullYear()})
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
