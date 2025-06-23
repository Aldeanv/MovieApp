"use client";

import { MovieDetail } from "@/types/tmdb";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MovieDetailClient({ movie }: { movie: MovieDetail }) {
  const trailer = movie.videos?.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );
  const director = movie.credits?.crew.find((c) => c.job === "Director");

  // Variasi Animasi
  const scaleFade = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 },
  };
  const slideLeft = {
    hidden: { opacity: 0, x: -40 },
    show: { opacity: 1, x: 0 },
  };
  const slideRight = {
    hidden: { opacity: 0, x: 40 },
    show: { opacity: 1, x: 0 },
  };
  const staggerContainer = {
    show: {
      transition: {
        staggerChildren: 0.07,
      },
    },
  };
  const itemVariant = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };
  
  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100">
      {/* HERO */}
      <div className="relative w-full h-screen flex flex-col justify-end">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
        <div className="relative z-10 p-8 md:p-16 space-y-3">
          <motion.h1
            className="text-5xl font-bold text-white drop-shadow"
            variants={scaleFade}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7 }}
          >
            {movie.title}
          </motion.h1>
          {movie.tagline && (
            <motion.p
              className="italic text-gray-300 text-lg"
              variants={scaleFade}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              “{movie.tagline}”
            </motion.p>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-12">
        {/* INFO UTAMA */}
        <motion.div
          className="bg-gray-800 rounded-lg p-6 space-y-3"
          variants={slideLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <p className="text-gray-300">{movie.overview}</p>
          <div className="flex flex-wrap gap-3 text-sm text-gray-300">
            <span>📅 {movie.release_date}</span>
            <span>⏳ {movie.runtime} menit</span>
            <span>✅ {movie.status}</span>
            <span>⭐ {movie.vote_average?.toFixed(1)}</span>
            <span>🎭 {movie.genres?.map((g) => g.name).join(", ")}</span>
            {director && <span>🎬 Disutradarai oleh {director.name}</span>}
          </div>
        </motion.div>

        {/* TRAILER */}
        {trailer && (
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold">🎞️ Trailer</h2>
            <div className="aspect-video rounded-lg overflow-hidden mt-3">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0`}
                title="YouTube Video"
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}

        {/* PEMAIN UTAMA */}
        {movie.credits?.cast?.length && (
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold border-b border-gray-700 pb-2">
              👥 Pemain Utama
            </h2>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {movie.credits.cast.slice(0, 10).map((cast) => (
                <motion.div
                  key={cast.id}
                  variants={itemVariant}
                  whileHover={{ scale: 1.07 }}
                  className="bg-gray-800 rounded-lg overflow-hidden flex flex-col items-center p-3"
                >
                  <Link
                    href={`/cast/${cast.id}`}
                    className="w-full flex flex-col items-center"
                  >
                    {cast.profile_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w300${cast.profile_path}`}
                        alt={cast.name}
                        width={160}
                        height={240}
                        className="rounded"
                      />
                    ) : (
                      <div className="bg-gray-600 w-[160px] h-[240px] flex items-center justify-center rounded">
                        No Photo
                      </div>
                    )}
                    <div className="text-center mt-2">
                      <p className="font-semibold">{cast.name}</p>
                      <p className="text-gray-400 text-sm">{cast.character}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* FILM TERKAIT */}
        {movie.similar?.results?.length && (
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold border-b border-gray-700 py-3">
              🎥 Film Terkait
            </h2>
            <motion.div
              className="flex space-x-6 overflow-x-auto scrollbar-hide mt-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {movie.similar.results.slice(0, 10).map((similar) => (
                <motion.div
                  key={similar.id}
                  variants={itemVariant}
                  whileHover={{ scale: 1.07 }}
                  className="relative flex-shrink-0 w-48 rounded-xl overflow-hidden group"
                >
                  <Link href={`/movie/${similar.id}`} className="block">
                    {similar.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w300${similar.poster_path}`}
                        alt={similar.title}
                        width={192}
                        height={288}
                        className="object-cover rounded-xl"
                      />
                    ) : (
                      <div className="bg-gray-600 w-48 h-72 flex items-center justify-center rounded-xl">
                        No Image
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent opacity-80 group-hover:opacity-100 flex flex-col justify-end p-3 rounded-xl">
                      <h3 className="font-bold text-white">{similar.title}</h3>
                      {similar.release_date && (
                        <span className="text-gray-300 text-sm">
                          ({new Date(similar.release_date).getFullYear()})
                        </span>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
