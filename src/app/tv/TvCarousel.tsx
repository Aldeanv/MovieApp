"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { TvShow } from "@/types/tmdb";

export default function TvCarousel({ featuredShows }: { featuredShows: TvShow[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredShows.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredShows.length]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % featuredShows.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + featuredShows.length) % featuredShows.length);

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {featuredShows.map(
          (show, index) =>
            currentIndex === index && (
              <motion.div
                key={show.id}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/70 to-transparent z-10" />
                <Image
                  src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
                  alt={show.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="relative z-20 h-full flex items-end p-8 md:p-12">
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="max-w-2xl space-y-4"
                  >
                    <h1 className="text-4xl md:text-6xl font-bold">{show.name}</h1>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full">
                        <Star size={16} className="fill-amber-400/30" />
                        {show.vote_average.toFixed(1)}
                      </span>
                      <span className="text-gray-300">{show.first_air_date?.substring(0, 4)}</span>
                    </div>
                    <p className="text-lg text-gray-300 line-clamp-2">{show.overview}</p>
                    <div className="flex gap-4 pt-2">
                      <Link
                        href={`/tv/${show.id}`}
                        className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-medium"
                      >
                        <Play size={18} />
                        View Details
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Indicators */}
      <div className="absolute z-30 bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {featuredShows.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? "bg-amber-400" : "bg-gray-500"
            }`}
          />
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-gray-900/80 rounded-full hover:bg-amber-500"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-gray-900/80 rounded-full hover:bg-amber-500"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
