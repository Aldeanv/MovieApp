"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { TvShow } from "@/types/tmdb";
import { ChevronLeft, ChevronRight, Star, Play, Plus } from "lucide-react";

interface TvCarouselTrendingProps {
  featuredShows: TvShow[];
}

export default function TvCarouselTrending({ featuredShows }: TvCarouselTrendingProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % featuredShows.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredShows.length]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % featuredShows.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + featuredShows.length) % featuredShows.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: { duration: 0.8, ease: "easeIn" }
    })
  };

  return (
    <div className="relative h-[80vh] w-full overflow-hidden rounded-b-3xl shadow-2xl">
      <AnimatePresence custom={direction} mode="popLayout">
        {featuredShows.map((show, index) =>
          index === currentIndex ? (
            <motion.div
              key={show.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/70 to-transparent z-10" />
              
              {/* Backdrop Image */}
              <Image
                src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
                alt={show.name}
                fill
                className="object-cover object-center"
                priority
              />

              {/* Content */}
              <div className="relative z-20 h-full flex items-end p-8 md:p-12 lg:p-16">
                <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="max-w-2xl space-y-4"
                >
                  <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">{show.name}</h1>
                  
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full">
                      <Star size={16} className="fill-amber-400/30" />
                      {show.vote_average?.toFixed(1)}
                    </span>
                    <span className="text-gray-300">
                      {show.first_air_date?.substring(0, 4)}
                    </span>
                  </div>

                  <p className="text-lg text-gray-300 line-clamp-2 drop-shadow-md">
                    {show.overview}
                  </p>

                  <div className="flex gap-4 pt-2">
                    <button className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg">
                      <Play size={18} />
                      Watch Now
                    </button>
                    <button className="flex items-center gap-2 bg-gray-800/80 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors border border-gray-700">
                      <Plus size={18} />
                      My List
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Navigation Controls */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-gray-900/80 text-white rounded-full hover:bg-amber-500 transition-colors z-30 shadow-xl"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-gray-900/80 text-white rounded-full hover:bg-amber-500 transition-colors z-30 shadow-xl"
        aria-label="Next slide"
      >
        <ChevronRight size={28} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {featuredShows.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-amber-400 w-8" : "bg-gray-500/80"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}