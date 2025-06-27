import Navbar from "@/component/navbar";
import { fetchUpcomingMovies } from "@/lib/tmdb";
import { Movie } from "@/types/tmdb";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Star } from "lucide-react";

export default async function UpcomingPage() {
  const upcomingMovies = await fetchUpcomingMovies();

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-16">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            Upcoming Movies
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {upcomingMovies.map((movie: Movie) => (
            <div
              key={movie.id}
              className="group relative rounded-xl overflow-hidden hover:z-10 transition-all duration-300 hover:-translate-y-2"
            >
              <Link href={`/movie/${movie.id}`} className="block">
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl shadow-lg">
                  {movie.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      fill
                      priority
                      className="object-cover"
                    />
                  ) : (
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 absolute inset-0" />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{movie.title}</h3>
                  <p className="text-sm text-gray-400 flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    {movie.release_date}
                  </p>
                  <p className="text-sm text-gray-400 flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {movie.vote_average}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
