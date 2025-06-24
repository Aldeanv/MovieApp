// app/search/page.tsx
import { fetchFromTMDb } from "@/lib/tmdb";
import { TMDbResponse } from "@/types/tmdb";
import Image from "next/image";
import Link from "next/link";

interface SearchPageProps {
  searchParams: { query?: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.query || "";
  let movies: TMDbResponse["results"] = [];

  if (query) {
    try {
      // gunakan param `query`:
      const data = await fetchFromTMDb<TMDbResponse>("/search/movie", { query });
      movies = data.results ?? [];
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  return (
    <div className="bg-gray-950 text-white min-h-screen pt-24 px-8 md:px-16">
      <h1 className="text-3xl font-bold mb-8">Hasil untuk: &quot;{query}&quot;</h1>

      {movies.length === 0 ? (
        <p className="text-gray-400">Tidak ada film ditemukan.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <Link href={`/movie/${movie.id}`} key={movie.id} className="bg-gray-800 rounded-xl overflow-hidden group hover:shadow-lg transition">
              {movie.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={500}
                  height={750}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="bg-gray-700 w-full h-64 flex items-center justify-center text-white/50">
                  No Image
                </div>
              )}
              <div className="p-3">
                <h2 className="font-semibold text-white truncate">{movie.title}</h2>
                {movie.release_date && (
                  <span className="text-white/70 text-sm">({new Date(movie.release_date).getFullYear()})</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
