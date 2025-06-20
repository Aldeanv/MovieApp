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

  return (
    <div className="bg-black text-gray-100 min-h-screen">
      {/* HERO */}
      <div className="relative w-full h-screen flex flex-col justify-center items-start">
        {/* Gambar Background */}
        <div className="absolute inset-0">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
            fill
            className="object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="relative z-10 p-8 md:p-16 max-w-3xl space-y-4">
          <motion.h1
            className="text-5xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {movie.title}
          </motion.h1>
          {movie.tagline && (
            <motion.p
              className="italic text-gray-300 text-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              “{movie.tagline}”
            </motion.p>
          )}
          <motion.p
            className="max-w-2xl text-gray-300 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {movie.overview}
          </motion.p>

          <div className="flex flex-wrap gap-3 mt-3">
            <div className="bg-gray-800 text-gray-300 rounded-full px-3 py-1 flex items-center text-sm">
              📅 {movie.release_date}
            </div>
            <div className="bg-gray-800 text-gray-300 rounded-full px-3 py-1 flex items-center text-sm">
              ⏳ {movie.runtime} menit
            </div>
            <div className="bg-gray-800 text-gray-300 rounded-full px-3 py-1 flex items-center text-sm">
              ✅ {movie.status}
            </div>
            <div className="bg-gray-800 text-yellow-400 rounded-full px-3 py-1 flex items-center text-sm">
              ⭐ {movie.vote_average?.toFixed(1)}
            </div>
            <div className="bg-gray-800 text-gray-300 rounded-full px-3 py-1 flex items-center text-sm">
              🎭 {movie.genres?.map((g) => g.name).join(", ")}
            </div>
            {director && (
              <div className="bg-gray-800 text-gray-300 rounded-full px-3 py-1 flex items-center text-sm">
                🎬 {director.name}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TRAILER */}
      {trailer && (
        <div className="bg-black p-8 flex justify-center">
          <div
            className="relative w-full max-w-4xl"
            style={{ paddingTop: "56.25%" }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0`}
              title="YouTube Video"
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* PEMAIN UTAMA */}
      {movie.credits?.cast?.length && (
        <div className="p-8 space-y-4">
          <h2 className="text-2xl font-bold">👥 Pemain Utama</h2>
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            {movie.credits.cast.slice(0, 10).map((cast) => (
              <motion.div
                key={cast.id}
                className="min-w-[160px] flex flex-col items-center"
                whileHover={{ scale: 1.1 }}
              >
                {cast.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w300${cast.profile_path}`}
                    alt={cast.name}
                    width={160}
                    height={240}
                    className="rounded-lg"
                  />
                ) : (
                  <div className="bg-gray-700 w-[160px] h-[240px] rounded flex items-center justify-center">
                    No Photo
                  </div>
                )}
                <p className="font-semibold mt-2">{cast.name}</p>
                <p className="text-gray-400 text-sm">{cast.character}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* FILM TERKAIT */}
      {movie.similar?.results?.length && (
        <div className="p-8 space-y-4">
          <h2 className="text-2xl font-bold">🎥 Film Terkait</h2>
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            {movie.similar.results.slice(0, 10).map((similar) => (
              <motion.div
                key={similar.id}
                whileHover={{ scale: 1.1 }}
                className="min-w-[160px] rounded-lg overflow-hidden bg-gray-800"
              >
                <Link href={`/movie/${similar.id}`} className="block">
                  {similar.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w300${similar.poster_path}`}
                      alt={similar.title}
                      width={160}
                      height={240}
                      className="rounded-t-lg object-cover"
                    />
                  ) : (
                    <div className="bg-gray-600 h-[240px] flex items-center justify-center rounded-t-lg">
                      No Image
                    </div>
                  )}
                  <div className="p-3">
                    <h3 className="font-semibold">{similar.title}</h3>
                    {similar.release_date && (
                      <span className="text-gray-400 text-sm">
                        ({new Date(similar.release_date).getFullYear()})
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

