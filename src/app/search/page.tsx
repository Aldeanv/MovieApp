// page search
import { fetchFromTMDb } from "@/lib/tmdb";
import { TMDbResponse } from "@/types/tmdb";
import Image from "next/image";
import Link from "next/link";
import { Search, Star, Calendar, Film } from "lucide-react";
import Navbar from "@/component/navbar";

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
    <div className="min-h-screen bg-gray-950 text-gray-100 pt-20">
      <Navbar />
      {/* Search Header */}
      <div className="max-w-7xl mx-auto mb-12 space-y-4 px-6">
        <div className="flex items-center gap-3 text-amber-400">
          <Search size={24} />
          <h1 className="text-3xl font-bold">Search Results</h1>
        </div>
        <div className="relative max-w-xl">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            defaultValue={query}
            placeholder="Search for movies..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-700/50 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 bg-gray-800/50 text-gray-100 placeholder-gray-500"
          />
        </div>
      </div>

      {/* Results */}
      {movies.length === 0 ? (
        <div className="max-w-2xl mx-auto text-center py-16 text-gray-500 space-y-2">
          <Film className="mx-auto h-12 w-12 text-gray-600 mb-2" />
          <h2 className="text-xl font-medium text-gray-300 mb-2">No movies found for "{query}"</h2>
          <p className="text-gray-500">Try searching for a different title or check your spelling.</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex justify-between items-center text-gray-400 text-sm px-6">
            <p>Showing {movies.length} results for "{query}"</p>
          </div>

          <div className="grid grid-cols-2 px-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <Link
                href={`/movie/${movie.id}`}
                key={movie.id}
                className="bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden hover:scale-105 transition-transform"
              >
                <div className="relative aspect-[2/3]">
                  {movie.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="bg-gray-700 w-full h-full flex items-center justify-center">
                      <Film size={32} className="text-gray-500" />
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-1">
                  <h3 className="font-medium line-clamp-1 text-gray-100">{movie.title}</h3>
                  <div className="flex justify-between items-center text-sm text-gray-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} className="text-amber-400" />
                      {movie.release_date?.substring(0, 4) || "N/A"}
                    </span>
                    <span className="flex items-center gap-1 text-amber-400">
                      <Star size={14} className="fill-amber-400" />
                      {movie.vote_average?.toFixed(1)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
