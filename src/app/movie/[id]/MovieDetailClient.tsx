"use client";

import { MovieDetail } from "@/types/tmdb";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/component/navbar";

export default function MovieDetailClient({ movie }: { movie: MovieDetail }) {
  const trailer = movie.videos?.results.find(
    (v) => v.site === "YouTube" && v.type === "Trailer"
  );
  const director = movie.credits?.crew.find((c) => c.job === "Director");

  // Variants untuk animasi
  const fadeIn = { hidden: { opacity: 0 }, show: { opacity: 1 } };
  const scaleFade = { hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } };
  const slideUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } };
  const slideLeft = { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0 } };
  const slideRight = { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0 } };
  const staggerContainer = { show: { transition: { staggerChildren: 0.08 } } };
  const hoverScale = { scale: 1.07, boxShadow: "0 0 20px rgba(0,0,0,0.6)" };

  return (
    <motion.div className="bg-gradient-to-b from-gray-950 to-black text-gray-100" initial="hidden" animate="show" variants={staggerContainer}>
      <Navbar/>
      {/* HERO */}
      <motion.div className="relative w-full h-screen flex flex-col justify-end overflow-hidden" variants={fadeIn} transition={{ duration: 0.7 }}>
        <motion.div
          className="absolute inset-0"
          variants={scaleFade}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.title}
            fill
            className="object-cover object-center opacity-70 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-transparent" />
        </motion.div>

        <motion.div className="relative z-10 p-8 md:p-16 space-y-4" variants={slideUp} transition={{ delay: 0.3, duration: 0.7 }}>
          <h1 className="text-5xl font-extrabold drop-shadow-lg bg-clip-text text-white">
            {movie.title}
          </h1>
          {movie.tagline && <p className="italic text-gray-200 text-xl">“{movie.tagline}”</p>}
        </motion.div>
      </motion.div>

      <div className="max-w-6xl mx-auto p-6 space-y-12">
        {/* INFO UTAMA */}
        <motion.section className="bg-white/5 backdrop-blur-lg rounded-xl p-6 shadow-xl" variants={slideLeft} viewport={{ once: true }}>
          <p className="text-base text-gray-300 mb-3 leading-relaxed">{movie.overview}</p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <span>📅 {movie.release_date}</span>
            <span>⏳ {movie.runtime} menit</span>
            <span>⭐ {movie.vote_average?.toFixed(1)}</span>
            <span>🎭 {movie.genres?.map((g) => g.name).join(", ")}</span>
            {director && <span>🎬 Oleh {director.name}</span>}
          </div>
        </motion.section>

        {/* TRAILER */}
        {trailer && (
          <motion.section variants={slideRight} viewport={{ once: true }} className="space-y-3">
            <h2 className="text-2xl font-bold">🎞️ Trailer</h2>
            <motion.div className="aspect-video rounded-xl overflow-hidden shadow-2xl" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=0`}
                title="YouTube Video"
                className="w-full h-full"
                allowFullScreen
              />
            </motion.div>
          </motion.section>
        )}

        {/* PEMAIN UTAMA */}
        {movie.credits?.cast.length ? (
          <motion.section variants={slideLeft} viewport={{ once: true }} className="space-y-4">
            <h2 className="text-2xl font-bold border-b border-gray-700 pb-2">👥 Pemain Utama</h2>
            <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4" variants={staggerContainer} viewport={{ once: true }}>
              {movie.credits.cast.slice(0, 10).map((cast) => (
                <motion.div key={cast.id} variants={scaleFade} whileHover={hoverScale} className="bg-white/5 rounded-xl overflow-hidden p-2 flex flex-col items-center cursor-pointer shadow-lg transition">
                  <Link href={`/cast/${cast.id}`} className="flex flex-col items-center w-full text-center">
                    {cast.profile_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w300${cast.profile_path}`}
                        alt={cast.name}
                        width={160}
                        height={240}
                        className="rounded-lg object-cover"
                      />
                    ) : (
                      <div className="bg-gray-600 w-[160px] h-[240px] flex items-center justify-center rounded-lg text-white/50">No Photo</div>
                    )}
                    <p className="mt-2 font-medium">{cast.name}</p>
                    <p className="text-gray-400 text-sm">{cast.character}</p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        ) : null}

        {/* FILM TERKAIT */}
        {movie.similar?.results?.length ? (
          <motion.section variants={slideRight} viewport={{ once: true }} className="space-y-4">
            <h2 className="text-2xl font-bold border-b border-gray-700 pb-2">🎥 Film Terkait</h2>
            <motion.div className="flex gap-4 overflow-x-auto scrollbar-hide" variants={staggerContainer} viewport={{ once: true }}>
              {movie.similar.results.slice(0, 10).map((similar) => (
                <motion.div key={similar.id} variants={scaleFade} whileHover={hoverScale} className="relative w-48 flex-shrink-0 overflow-hidden rounded-xl">
                  <Link href={`/movie/${similar.id}`}>
                    {similar.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w300${similar.poster_path}`}
                        alt={similar.title}
                        width={192}
                        height={288}
                        className="object-cover rounded-xl"
                      />
                    ) : (
                      <div className="bg-gray-600 w-48 h-72 flex items-center justify-center text-white/50">No Image</div>
                    )}
                    <div className="absolute bottom-0 bg-gradient-to-t from-black to-transparent p-2 w-full opacity-90 group-hover:opacity-100 transition">
                      <h3 className="font-semibold text-white text-sm line-clamp-1">{similar.title}</h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        ) : null}
      </div>
    </motion.div>
  );
}