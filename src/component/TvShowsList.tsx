"use client";

import { useEffect, useState } from "react";
import { TvShow } from "@/types/tmdb";
import Image from "next/image";
import { Star, Play, Calendar} from "lucide-react";

export default function TvShowsList() {
  const [tvShows, setTvShows] = useState<TvShow[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadTvShows = async (pageNum: number) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/tv-shows?page=${pageNum}`);
      if (!res.ok) throw new Error("Failed to load TV shows");
      const data = await res.json();
      setTvShows(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTvShows(page);
  }, [page]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* TV Shows Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
        {tvShows.map((show) => (
          <div
            key={show.id}
            className="group relative rounded-xl overflow-hidden hover:z-10 transition-all duration-300 hover:-translate-y-2"
          >
            <a href={`/tv/${show.id}`} className="block">
              {/* Poster Image */}
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl shadow-lg bg-gray-800">
                {show.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                    alt={show.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <div className="text-center p-4">No Image Available</div>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-1 text-sm text-white">
                      <Calendar size={14} />
                      <span>
                        {show.first_air_date?.substring(0, 4) || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-amber-400">
                      <Star size={14} className="fill-amber-400/30" />
                      <span>{show.vote_average?.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-white">
                      <Play size={14} />
                      <span>{show.number_of_seasons} Seasons</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Show Title */}
              <div className="mt-3 px-2">
                <h3 className="font-medium text-gray-900 dark:text-white line-clamp-1 group-hover:text-amber-400 transition-colors">
                  {show.name}
                </h3>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1 || isLoading}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            page === 1 || isLoading
              ? "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
              : "bg-amber-500 hover:bg-amber-600 text-white"
          }`}
        >
          Previous
        </button>

        <span className="text-gray-700 dark:text-gray-300 font-medium">
          Page {page}
        </span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={isLoading}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isLoading
              ? "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
              : "bg-amber-500 hover:bg-amber-600 text-white"
          }`}
        >
          Next
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      )}
    </div>
  );
}
