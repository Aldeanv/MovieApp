"use client"; 

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Movie } from "@/types/tmdb";
import { useState } from "react";

interface SectionProps {
  title: string;
  movies: Movie[];
  moviesPerPage?: number;
}

export default function Section({ title, movies, moviesPerPage = 8 }: SectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const currentMovies = movies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto space-y-6 px-6">
        <h2 className="text-3xl font-bold text-gray-100">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentMovies.map((movie) => (
            <motion.div
              key={movie.id}
              whileHover={{ scale: 1.03 }}
              className="relative rounded-xl overflow-hidden group shadow-2xl"
            >
              <Link href={`/movie/${movie.id}`} className="block">
                {movie.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={500}
                    height={750}
                    className="object-cover rounded-xl w-full h-full"
                  />
                ) : (
                  <div className="bg-gray-600 h-[300px] flex items-center justify-center rounded-xl">
                    No Image
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <h3 className="font-bold text-white text-lg">{movie.title}</h3>
                  {movie.release_date && (
                    <span className="text-gray-300 text-sm">
                      {new Date(movie.release_date).getFullYear()}
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-full text-sm ${currentPage === 1
                ? "text-gray-500 cursor-not-allowed"
                : "text-gray-300 hover:text-white"
              }`}
              aria-label="Previous page"
            >
              ‹
            </button>
            {[...Array(totalPages).keys()].map((num) => {
              const page = num + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition ${page === currentPage
                    ? "bg-white text-gray-900"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-full text-sm ${currentPage === totalPages
                ? "text-gray-500 cursor-not-allowed"
                : "text-gray-300 hover:text-white"
              }`}
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
