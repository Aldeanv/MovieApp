"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Movie } from "@/types/tmdb";

interface TrendingSectionProps {
  movies: Movie[];
}

export default function TrendingSection({ movies }: TrendingSectionProps) {
  return (
    <section className="py-8 px-4">
      <h2 className="text-3xl font-bold text-white mb-6">🔥 Trending</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 auto-rows-min">
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            whileHover={{ scale: 1.03 }}
            className="relative rounded-md overflow-hidden shadow-md group"
          >
            <Link href={`/movie/${movie.id}`}>
              {movie.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={200}
                  height={300}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="bg-gray-800 w-full h-60 flex items-center justify-center text-white/50">
                  No Image
                </div>
              )}
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-2">
                <h3 className="text-white text-sm font-medium line-clamp-1">
                  {movie.title}
                </h3>
                {movie.release_date && (
                  <span className="text-white/70 text-xs">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
