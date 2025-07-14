import Navbar from "@/component/navbar";
import { fetchFromTMDb } from "@/lib/tmdb";
import { Movie } from "@/types/tmdb";
import Image from "next/image";
import Link from "next/link";
import { Clapperboard } from "lucide-react";
import { Star, Play, Calendar } from "lucide-react";

export default async function PopulerPage() {
  const data = await fetchFromTMDb("/movie/popular");
  const movies: Movie[] = data.results;

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-12">
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Popular Movies
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Discover the most talked-about films right now
          </p>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <div key={movie.id} className="group relative rounded-xl overflow-hidden hover:z-10 transition-all duration-300 hover:-translate-y-2">
              <Link href={`/movie/${movie.id}`} className="block">
                {/* Movie Poster */}
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl shadow-lg">
                  {movie.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                    />
                  ) : (
                    <div className="bg-gray-800 flex items-center justify-center w-full h-full">
                      <Clapperboard className="text-gray-600" size={48} />
                    </div>
                  )}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-1 text-sm text-white">
                        <Calendar size={14} />
                        <span>{movie.release_date?.substring(0, 4)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-amber-400">
                        <Star size={14} className="fill-amber-400/30" />
                        <span>{movie.vote_average?.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-white">
                        <Play size={14} />
                        <span>{movie.popularity?.toFixed(0) ?? "0"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Movie Title */}
                <div className="mt-3">
                  <h3 className="font-semibold line-clamp-1 group-hover:text-amber-400 transition-colors">
                    {movie.title}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-amber-500 rounded-lg text-white hover:bg-amber-600 transition-colors">
              1
            </button>
            <button className="px-4 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors">
              2
            </button>
            <button className="px-4 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}