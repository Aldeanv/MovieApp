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
      const data = await fetchFromTMDb<TMDbResponse>("/search/movie", { query });
      movies = data.results ?? [];
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black text-white pt-24 px-6 md:px-12">
      <h1 className="text-center text-4xl font-bold mb-10">
        Hasil pencarian untuk{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          &quot;{query}&quot;
        </span>
      </h1>

      {movies.length === 0 ? (
        <p className="text-center text-gray-400 text-lg mt-12">Oops, filmnya tidak ada.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <Link href={`/movie/${movie.id}`} key={movie.id} className="group relative">
              <div className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm hover:scale-105 transform transition duration-300 shadow-xl hover:shadow-2xl">
                {movie.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={500}
                    height={750}
                    className="object-cover w-full h-72 sm:h-80 group-hover:opacity-80 transition-opacity"
                  />
                ) : (
                  <div className="w-full h-72 sm:h-80 flex items-center justify-center text-white/50 text-sm p-4 text-center">
                    No Image Available
                  </div>
                )}

                <div className="p-4 space-y-1">
                  <h2 className="text-base font-medium truncate group-hover:text-blue-400 transition-colors">
                    {movie.title}
                  </h2>
                  {movie.release_date && (
                    <span className="text-xs text-white/60">
                      {new Date(movie.release_date).getFullYear()}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
