// app/search/page.tsx
import { fetchFromTMDb } from "@/lib/tmdb";
import { TMDbResponse } from "@/types/tmdb";
import Image from "next/image";
import Link from "next/link";
import { Search, Star, Calendar, Film, Tv, User } from "lucide-react";
import Navbar from "@/component/navbar";
import ClientSearchInput from "@/component/ClientSearchInput";

interface SearchPageProps {
  searchParams: { query?: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.query || "";
  let results: TMDbResponse["results"] = [];

  if (query) {
    try {
      const data = await fetchFromTMDb<TMDbResponse>("/search/multi", { query });
      results = data.results ?? [];
    } catch (error) {
      console.error("Error fetching results:", error);
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

        {/* Search Input */}
        <ClientSearchInput />
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <div className="max-w-2xl mx-auto text-center py-16 text-gray-500 space-y-2">
          <Film className="mx-auto h-12 w-12 text-gray-600 mb-2" />
          <h2 className="text-xl font-medium text-gray-300 mb-2">
            No results found for "{query}"
          </h2>
          <p className="text-gray-500">
            Try searching for a different title or name.
          </p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex justify-between items-center text-gray-400 text-sm px-6">
            <p>Showing {results.length} results for "{query}"</p>
          </div>

          <div className="grid grid-cols-2 px-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {results.map((item) => {
              const isMovie = item.media_type === "movie";
              const isTV = item.media_type === "tv";
              const isPerson = item.media_type === "person";

              const title = isMovie
                ? item.title
                : isTV
                ? item.name
                : isPerson
                ? item.name
                : "Unknown";

              const date = isMovie
                ? item.release_date
                : isTV
                ? item.first_air_date
                : undefined;

              const link = isMovie
                ? `/movie/${item.id}`
                : isTV
                ? `/tv/${item.id}`
                : isPerson
                ? `/person/${item.id}`
                : "#";

              const vote = item.vote_average?.toFixed(1) || "0.0";

              return (
                <Link
                  href={link}
                  key={`${item.media_type}-${item.id}`}
                  className="bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden hover:scale-105 transition-transform relative"
                >
                  <div className="relative aspect-[2/3]">
                    {item.poster_path || item.profile_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${
                          item.poster_path || item.profile_path
                        }`}
                        alt={title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="bg-gray-700 w-full h-full flex items-center justify-center">
                        {isMovie ? (
                          <Film size={32} className="text-gray-500" />
                        ) : isTV ? (
                          <Tv size={32} className="text-gray-500" />
                        ) : (
                          <User size={32} className="text-gray-500" />
                        )}
                      </div>
                    )}
                    <span className="absolute top-2 left-2 bg-black/70 text-xs px-2 py-1 rounded-full text-white capitalize">
                      {item.media_type}
                    </span>
                  </div>

                  <div className="p-4 space-y-1">
                    <h3 className="font-medium line-clamp-1 text-gray-100">{title}</h3>
                    <div className="flex justify-between items-center text-sm text-gray-400 mt-1">
                      {isPerson ? (
                        <span className="italic text-sm text-pink-400">
                          Known for: {item.known_for_department}
                        </span>
                      ) : (
                        <>
                          <span className="flex items-center gap-1">
                            <Calendar size={14} className="text-amber-400" />
                            {date?.substring(0, 4) || "N/A"}
                          </span>
                          <span className="flex items-center gap-1 text-amber-400">
                            <Star size={14} className="fill-amber-400" />
                            {vote}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}