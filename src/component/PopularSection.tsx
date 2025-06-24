"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Movie } from "@/types/tmdb";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

interface PopularSectionProps {
  movies: Movie[];
}

export default function PopularSection({ movies }: PopularSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollBy = (offset: number) => {
    scrollRef.current?.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <section className="relative py-8">
      <h2 className="text-3xl font-bold text-white mb-4 px-4">🎬 Populer</h2>
      <button
        onClick={() => scrollBy(-320)}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/60 p-2 rounded-full hover:bg-black z-10"
      >
        <ChevronLeft className="text-white w-6 h-6" />
      </button>
      <button
        onClick={() => scrollBy(320)}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/60 p-2 rounded-full hover:bg-black z-10"
      >
        <ChevronRight className="text-white w-6 h-6" />
      </button>
      <div ref={scrollRef} className="flex overflow-x-auto overflow-y-hidden hide-scrollbar gap-6">
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            whileHover={{ scale: 1.07 }}
            className="relative w-48 flex-shrink-0 rounded-lg overflow-hidden shadow-xl"
          >
            <Link href={`/movie/${movie.id}`}>
              {movie.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={192}
                  height={288}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="bg-gray-800 w-full h-72 flex items-center justify-center text-white/50">
                  No Image
                </div>
              )}
              <div className="absolute bottom-0 w-full bg-black/70 p-2">
                <h3 className="text-white text-sm font-medium truncate">{movie.title}</h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
