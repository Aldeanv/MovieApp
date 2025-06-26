"use client";

import { TvShow } from "@/types/tmdb";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  Calendar,
  Clock,
  Tv,
  Quote,
  Users,
  Film,
  Clapperboard,
  List,
} from "lucide-react";

interface Props {
  show: TvShow;
}

export default function TvShowDetailClient({ show }: Props) {
  const creators = show.created_by || [];
  const genres = show.genres || [];
  const networks = show.networks || [];
  const productionCompanies = show.production_companies || [];
  const crew = show.credits?.crew || [];
  const cast = show.credits?.cast || [];
  const videos = show.videos?.results || [];
  const similar = show.similar?.results || [];
  const seasons = show.seasons || [];

  // Filter important crew members
  const importantCrew = crew.filter((person) =>
    ["Director", "Producer", "Writer", "Creator"].includes(person.job)
  );

  // Filter trailer videos
  const trailerVideos = videos.filter(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.8 } },
  };
  const slideUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const cardHover = {
    y: -5,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  };
  const staggerContainer = {
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
        {show.backdrop_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
            alt={show.name}
            fill
            priority
            className="object-cover opacity-50"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-transparent" />

        {/* Content */}
        <div className="relative h-full flex items-end pb-16 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="flex flex-col md:flex-row gap-8 w-full"
          >
            {/* Poster */}
            <motion.div
              className="relative w-48 h-64 md:w-56 md:h-80 lg:w-64 lg:h-96 rounded-xl overflow-hidden border border-gray-700/50 shadow-2xl"
              variants={slideUp}
              whileHover={cardHover}
            >
              {show.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="bg-gray-800 flex items-center justify-center h-full w-full">
                  <Tv className="text-gray-600" size={48} />
                </div>
              )}
            </motion.div>

            {/* Info */}
            <div className="flex-1 space-y-6">
              <motion.div variants={slideUp} className="space-y-2">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                  {show.name}
                </h1>
                {show.original_name && show.original_name !== show.name && (
                  <p className="text-gray-400 italic">{show.original_name}</p>
                )}
              </motion.div>

              <motion.div
                variants={slideUp}
                className="flex flex-wrap gap-3 text-sm text-gray-300 items-center"
              >
                {show.vote_average !== undefined && (
                  <span className="flex items-center gap-1 bg-amber-500/10 text-amber-400 px-4 py-2 rounded-full">
                    <Star size={18} className="fill-amber-400/20" />
                    {show.vote_average.toFixed(1)}
                  </span>
                )}
                {show.first_air_date && (
                  <span className="flex items-center gap-2">
                    <Calendar size={18} className="text-gray-400" />
                    {new Date(show.first_air_date).getFullYear()}
                  </span>
                )}
                {show.number_of_seasons && show.number_of_episodes && (
                  <span className="flex items-center gap-2">
                    <Clock size={18} className="text-gray-400" />
                    {show.number_of_seasons} Seasons • {show.number_of_episodes}{" "}
                    Episodes
                  </span>
                )}
                {show.episode_run_time && show.episode_run_time.length > 0 && (
                  <span className="flex items-center gap-2">
                    <Clock size={18} className="text-gray-400" />
                    {show.episode_run_time[0]} min/episode
                  </span>
                )}
                {genres.map((g) => (
                  <span
                    key={g.id}
                    className="bg-gray-800/50 px-3 py-1 rounded-full text-sm"
                  >
                    {g.name}
                  </span>
                ))}
              </motion.div>

              {creators.length > 0 && (
                <motion.div variants={slideUp} className="pt-2">
                  <p className="text-gray-400 text-sm">Created by:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {creators.map((creator) => (
                      <Link
                        key={creator.id}
                        href={`/cast/${creator.id}`}
                        className="text-amber-400 hover:text-amber-300"
                      >
                        {creator.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              {networks.length > 0 && (
                <motion.div variants={slideUp} className="pt-2">
                  <p className="text-gray-400 text-sm">Networks:</p>
                  <div className="flex flex-wrap gap-3 mt-2 items-center">
                    {networks.map((network) => (
                      <div key={network.id} className="flex items-center gap-2">
                        {network.logo_path ? (
                          <Image
                            src={`https://image.tmdb.org/t/p/w92${network.logo_path}`}
                            alt={network.name}
                            width={40}
                            height={20}
                            className="object-contain h-5"
                          />
                        ) : (
                          <span>{network.name}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-16">
        {/* Overview */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeIn}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Quote size={24} className="text-amber-400" />
            Overview
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            {show.overview || "No overview available."}
          </p>
        </motion.section>

        {/* Videos */}
        {trailerVideos.length > 0 && (
          <motion.section
            className="space-y-8"
            initial="hidden"
            animate="show"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Clapperboard size={24} className="text-amber-400" />
              Videos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {trailerVideos.slice(0, 2).map((video) => (
                <div key={video.key} className="aspect-video w-full relative">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                  />
                  <p className="mt-2 text-gray-300">{video.name}</p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Cast */}
        {cast.length > 0 && (
          <motion.section
            className="space-y-8"
            initial="hidden"
            animate="show"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Users size={24} className="text-amber-400" />
              Cast
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {cast.slice(0, 12).map((person) => (
                <motion.div
                  key={person.id}
                  variants={slideUp}
                  whileHover={cardHover}
                >
                  <Link href={`/cast/${person.id}`} className="block group">
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3">
                      {person.profile_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                          alt={person.name}
                          fill
                          className="object-cover group-hover:opacity-80 transition"
                        />
                      ) : (
                        <div className="bg-gray-800 w-full h-full flex items-center justify-center">
                          <Users className="text-gray-600" size={32} />
                        </div>
                      )}
                    </div>
                    <h3 className="font-medium group-hover:text-amber-400 transition">
                      {person.name}
                    </h3>
                    <p className="text-sm text-gray-400">{person.character}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Crew */}
        {importantCrew.length > 0 && (
          <motion.section
            className="space-y-8"
            initial="hidden"
            animate="show"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Users size={24} className="text-amber-400" />
              Crew
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {importantCrew.slice(0, 8).map((person) => (
                <motion.div
                  key={`${person.id}-${person.job}`}
                  variants={slideUp}
                  whileHover={cardHover}
                >
                  <Link href={`/cast/${person.id}`} className="block group">
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3">
                      {person.profile_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                          alt={person.name}
                          fill
                          className="object-cover group-hover:opacity-80 transition"
                        />
                      ) : (
                        <div className="bg-gray-800 w-full h-full flex items-center justify-center">
                          <Users className="text-gray-600" size={32} />
                        </div>
                      )}
                    </div>
                    <h3 className="font-medium group-hover:text-amber-400 transition">
                      {person.name}
                    </h3>
                    <p className="text-sm text-gray-400">{person.job}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Seasons */}
        {seasons.length > 0 && (
          <motion.section
            className="space-y-8"
            initial="hidden"
            animate="show"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <List size={24} className="text-amber-400" />
              Seasons
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {seasons.map((season) => (
                <motion.div
                  key={season.id}
                  variants={slideUp}
                  whileHover={cardHover}
                  className="bg-gray-900/50 rounded-lg overflow-hidden group"
                >
                  <Link
                    href={`/tv/${show.id}/season/${season.season_number}`}
                    className="block"
                  >
                    <div className="relative aspect-video">
                      {season.poster_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
                          alt={season.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="bg-gray-800 w-full h-full flex items-center justify-center">
                          <Film className="text-gray-600" size={32} />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold group-hover:text-amber-400 transition">
                        {season.name}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                        <span>{season.episode_count} Episodes</span>
                        {season.air_date && (
                          <span>{new Date(season.air_date).getFullYear()}</span>
                        )}
                      </div>
                      {season.overview && (
                        <p className="mt-3 text-gray-300 line-clamp-3 text-sm">
                          {season.overview}
                        </p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Similar Shows */}
        {similar.length > 0 && (
          <motion.section
            className="space-y-8"
            initial="hidden"
            animate="show"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Tv size={24} className="text-amber-400" />
              Similar Shows
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {similar.slice(0, 10).map((similarShow) => (
                <motion.div
                  key={similarShow.id}
                  variants={slideUp}
                  whileHover={cardHover}
                  className="group"
                >
                  <Link href={`/tv/${similarShow.id}`} className="block">
                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3">
                      {similarShow.poster_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${similarShow.poster_path}`}
                          alt={similarShow.name}
                          fill
                          className="object-cover group-hover:opacity-80 transition"
                        />
                      ) : (
                        <div className="bg-gray-800 w-full h-full flex items-center justify-center">
                          <Tv className="text-gray-600" size={32} />
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 flex items-center gap-1 text-amber-400 text-sm">
                        <Star size={14} className="fill-amber-400/20" />
                        {similarShow.vote_average?.toFixed(1)}
                      </div>
                    </div>
                    <h3 className="font-medium group-hover:text-amber-400 transition">
                      {similarShow.name}
                    </h3>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Production Companies */}
        {productionCompanies.length > 0 && (
          <motion.section
            className="space-y-8"
            initial="hidden"
            animate="show"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Film size={24} className="text-amber-400" />
              Production Companies
            </h2>
            <div className="flex flex-wrap gap-6 items-center">
              {productionCompanies.map((company) => (
                <motion.div
                  key={company.id}
                  variants={slideUp}
                  className="flex items-center gap-3 bg-gray-900/50 p-3 rounded-lg"
                >
                  {company.logo_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                      alt={company.name}
                      width={80}
                      height={40}
                      className="object-contain h-10"
                    />
                  ) : (
                    <span className="text-sm">{company.name}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}

