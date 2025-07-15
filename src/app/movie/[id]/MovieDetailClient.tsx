"use client";

import { MovieDetail } from "@/types/tmdb";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  Star,
  Clock,
  Calendar,
  Play,
  User,
  Film,
  DollarSign,
  Languages,
  Quote,
  Video,
} from "lucide-react";
import Navbar from "@/component/navbar";
import { useState } from "react";

export default function MovieDetailClient({ movie }: { movie: MovieDetail }) {
  const trailers = movie.videos?.results.filter((v) => v.site === "YouTube");
  const directors = movie.credits?.crew.filter((c) => c.job === "Director");
  const topCast = movie.credits?.cast;
  const similarMovies = movie.similar?.results?.slice(0, 6);
  const [showAllCast, setShowAllCast] = useState(false);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Animation variants
  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  const slideUp = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };
  const staggerContainer = {
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };
  const cardHover = {
    y: -5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
        {/* Backdrop Image */}
        {movie.backdrop_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            fill
            priority
            className="object-cover opacity-50"
            quality={90}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-transparent" />

        {/* Hero Content */}
        <div className="relative h-full flex items-end pb-16 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div
            className="w-full"
            initial="hidden"
            animate="show"
            variants={staggerContainer}
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Movie Poster */}
              <motion.div
                className="relative w-48 h-64 md:w-56 md:h-80 lg:w-64 lg:h-96 rounded-xl overflow-hidden shadow-2xl border border-gray-700/50"
                variants={slideUp}
                whileHover={{ rotate: 1 }}
              >
                {movie.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="bg-gray-800 w-full h-full flex items-center justify-center">
                    <Film className="text-gray-600" size={48} />
                  </div>
                )}
              </motion.div>

              {/* Movie Info */}
              <div className="flex-1 space-y-6">
                <motion.div variants={slideUp} className="space-y-2">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {movie.title}
                  </h1>

                  {movie.tagline && (
                    <motion.p
                      className="text-xl text-gray-300 italic flex items-center gap-2"
                      variants={slideUp}
                    >
                      <Quote size={18} className="text-amber-400" />
                      &quot;{movie.tagline}&quot;
                    </motion.p>
                  )}
                </motion.div>

                {/* Metadata Row */}
                <motion.div
                  className="flex flex-wrap gap-3 items-center"
                  variants={slideUp}
                >
                  <span className="flex items-center gap-2 bg-amber-500/10 text-amber-400 px-4 py-2 rounded-full">
                    <Star size={18} className="fill-amber-400/20" />
                    <span className="font-medium">
                      {movie.vote_average?.toFixed(1)}
                    </span>
                  </span>

                  <span className="flex items-center gap-2 text-gray-300">
                    <Calendar size={18} className="text-gray-400" />
                    <span>
                      {movie.release_date
                        ? new Date(movie.release_date).toLocaleDateString()
                        : "Unknown"}
                    </span>
                  </span>

                  <span className="flex items-center gap-2 text-gray-300">
                    <Clock size={18} className="text-gray-400" />
                    <span>
                      {movie.runtime !== undefined
                        ? `${Math.floor(movie.runtime / 60)}h ${
                            movie.runtime % 60
                          }m`
                        : "Unknown runtime"}
                    </span>
                  </span>

                  <div className="flex flex-wrap gap-2">
                    {movie.genres?.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-gray-800/50 px-3 py-1 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Financial Info */}
                {((movie.budget ?? 0) > 0 || (movie.revenue ?? 0) > 0) && (
                  <motion.div
                    variants={slideUp}
                    className="flex flex-wrap gap-4 pt-2"
                  >
                    {(movie.budget ?? 0) > 0 && (
                      <div className="flex items-center gap-2 text-gray-300">
                        <DollarSign size={16} className="text-gray-400" />
                        <span>Budget: {formatCurrency(movie.budget ?? 0)}</span>
                      </div>
                    )}
                    {(movie.revenue ?? 0) > 0 && (
                      <div className="flex items-center gap-2 text-gray-300">
                        <DollarSign size={16} className="text-green-400" />
                        <span>
                          Revenue: {formatCurrency(movie.revenue ?? 0)}
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Languages */}
                {movie.spoken_languages?.length &&
                  movie.spoken_languages.length > 0 && (
                    <motion.div
                      variants={slideUp}
                      className="flex items-center gap-2 pt-2"
                    >
                      <Languages size={16} className="text-gray-400" />
                      <span className="text-gray-300">
                        {movie.spoken_languages
                          .map((lang) => lang.name)
                          .join(", ")}
                      </span>
                    </motion.div>
                  )}

                {/* Directors */}
                {directors?.length ? (
                  <motion.div variants={slideUp} className="pt-2">
                    <p className="text-gray-400 text-sm">Directed by</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {directors.map((director) => (
                        <Link
                          key={director.id}
                          href={`/person/${director.id}`}
                          className="text-amber-400 hover:text-amber-300 transition"
                        >
                          {director.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                ) : null}

                {/* Videos Section */}
                {trailers?.length ? (
                  <motion.div variants={slideUp} className="pt-4">
                    <div className="flex flex-wrap gap-3">
                      {trailers.slice(0, 3).map((video) => (
                        <a
                          key={video.key}
                          href={`https://www.youtube.com/watch?v=${video.key}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                        >
                          <Play size={14} />
                          {video.type} ({video.size}p)
                        </a>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* Overview Section */}
        <motion.section
          className="mb-16"
          initial="hidden"
          animate="show"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Video size={24} className="text-amber-400" />
            <span>Synopsis</span>
          </h2>
          <p className="text-gray-300 leading-relaxed max-w-3xl text-lg">
            {movie.overview || "No overview available."}
          </p>
        </motion.section>

        {/* Detailed Info Section */}
        <motion.section
          className="mb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="show"
          variants={fadeIn}
          transition={{ delay: 0.2 }}
        >
          {/* Production Info */}
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
            <h3 className="text-xl font-bold mb-4 text-amber-400">
              Production
            </h3>
            <div className="space-y-3">
              {movie.production_companies?.length > 0 && (
                <div>
                  <p className="text-gray-400 text-sm">Production Companies</p>
                  <p className="text-gray-300">
                    {movie.production_companies
                      .map((comp) => comp.name)
                      .join(", ")}
                  </p>
                </div>
              )}
              {movie.production_countries?.length > 0 && (
                <div>
                  <p className="text-gray-400 text-sm">Production Countries</p>
                  <p className="text-gray-300">
                    {movie.production_countries
                      .map((country) => country.name)
                      .join(", ")}
                  </p>
                </div>
              )}
              {movie.status && (
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <p className="text-gray-300">{movie.status}</p>
                </div>
              )}
            </div>
          </div>

          {/* Financial Info */}
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
            <h3 className="text-xl font-bold mb-4 text-amber-400">
              Financials
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-400 text-sm">Budget</p>
                <p className="text-gray-300">
                  {movie.budget > 0
                    ? formatCurrency(movie.budget)
                    : "Not available"}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Revenue</p>
                <p className="text-gray-300">
                  {movie.revenue > 0
                    ? formatCurrency(movie.revenue)
                    : "Not available"}
                </p>
              </div>
            </div>
          </div>

          {/* Language Info */}
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
            <h3 className="text-xl font-bold mb-4 text-amber-400">Languages</h3>
            <div className="space-y-3">
              {movie.spoken_languages?.length > 0 && (
                <div>
                  <p className="text-gray-400 text-sm">Spoken Languages</p>
                  <p className="text-gray-300">
                    {movie.spoken_languages
                      .map((lang) => lang.english_name)
                      .join(", ")}
                  </p>
                </div>
              )}
              {movie.original_language && (
                <div>
                  <p className="text-gray-400 text-sm">Original Language</p>
                  <p className="text-gray-300">
                    {movie.original_language.toUpperCase()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.section>

        {/* Cast Section */}
        {topCast?.length > 0 && (
          <motion.section
            className="mb-16"
            initial="hidden"
            animate="show"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <User size={24} className="text-amber-400" />
                <span>Top Cast</span>
              </h2>
              {topCast.length > 5 && (
                <button
                  onClick={() => setShowAllCast((prev) => !prev)}
                  className="text-sm text-amber-400 hover:underline"
                >
                  {showAllCast ? "Show Less" : "See All"}
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {(showAllCast ? topCast : topCast.slice(0, 5)).map((cast) => (
                <motion.div
                  key={cast.id}
                  variants={slideUp}
                  whileHover={cardHover}
                  className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 transition-all"
                >
                  <Link href={`/person/${cast.id}`} className="block">
                    <div className="relative aspect-[2/3]">
                      {cast.profile_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w300${cast.profile_path}`}
                          alt={cast.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="bg-gray-700 w-full h-full flex items-center justify-center">
                          <User size={32} className="text-gray-500" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{cast.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {cast.character}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Videos Section */}
        {trailers?.length > 0 && (
          <motion.section
            className="mb-16"
            initial="hidden"
            animate="show"
            variants={fadeIn}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Play size={24} className="text-amber-400" />
              <span>Videos</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trailers.slice(0, 4).map((video) => (
                <motion.div
                  key={video.key}
                  variants={slideUp}
                  whileHover={cardHover}
                  className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50"
                >
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.key}`}
                      title={video.name}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{video.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {video.type} • {video.size}p
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Similar Movies */}
        {similarMovies?.length > 0 && (
          <motion.section
            className="mb-16"
            initial="hidden"
            animate="show"
            variants={fadeIn}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Film size={24} className="text-amber-400" />
              <span>Similar Movies</span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {similarMovies.map((movie) => (
                <motion.div
                  key={movie.id}
                  variants={slideUp}
                  whileHover={cardHover}
                  className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 transition-all"
                >
                  <Link href={`/movie/${movie.id}`} className="block">
                    <div className="relative aspect-[2/3]">
                      {movie.poster_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
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
                    <div className="p-4">
                      <h3 className="font-medium">{movie.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-400">
                          {movie.release_date?.substring(0, 4)}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-amber-400">
                          <Star size={14} />
                          {movie.vote_average?.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
