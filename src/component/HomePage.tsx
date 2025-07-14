"use client";

import Image from "next/image";
import { Search, Play, Tv, Clapperboard } from "lucide-react";
import Navbar from "@/component/navbar";
import PopularSection from "@/component/PopularSection";
import TrendingSection from "@/component/TrendingSection";
import { TMDbResponse } from "@/types/tmdb";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage({
  popularData,
  trendingData,
}: {
  popularData: TMDbResponse;
  trendingData: TMDbResponse;
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.8 } },
  };
  const slideUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen pt-16">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-start overflow-hidden px-4 md:px-16">
        <div className="absolute inset-0">
          <Image
            src="/Hero.jpg"
            alt="Movie Collage"
            fill
            className="object-cover opacity-50"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        </div>

        <motion.div
          className="relative z-10 max-w-2xl space-y-6 pb-24"
          initial="hidden"
          animate="show"
          variants={fadeIn}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"
            variants={slideUp}
          >
            Discover Your Next Favorite Movie
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-lg drop-shadow"
            variants={slideUp}
          >
            Explore thousands of movies, from timeless classics to the latest
            blockbusters. Find recommendations tailored just for you.
          </motion.p>
          <motion.form
            onSubmit={handleSearch}
            className="relative w-full max-w-md mt-6 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-xl"
            variants={slideUp}
          >
            <input
              type="text"
              placeholder="Search for movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-white placeholder-white/70 pl-5 pr-12 py-4 focus:outline-none text-lg"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full hover:shadow-lg transition-all"
            >
              <Search className="text-white" size={20} />
            </button>
          </motion.form>
        </motion.div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <motion.div initial="hidden" animate="show" variants={fadeIn}>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              Browse Categories
            </span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                href: "/popular",
                icon: <Play className="w-8 h-8" />,
                title: "Popular",
                bg: "bg-blue-500/10",
                border: "border-blue-500/20",
                colSpan: "col-span-1",
              },
              {
                href: "/tv",
                icon: <Tv className="w-8 h-8" />,
                title: "TV Shows",
                bg: "bg-pink-500/10",
                border: "border-pink-500/20",
                colSpan: "col-span-1",
              },
              {
                href: "/upcoming",
                icon: <Clapperboard className="w-8 h-8" />,
                title: "Upcoming",
                bg: "bg-purple-500/10",
                border: "border-purple-500/20",
                // col-span-2 hanya aktif di layar kecil
                colSpan: "col-span-2 md:col-span-1",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`${item.colSpan} ${item.bg} ${item.border} border rounded-xl p-6 flex flex-col items-center gap-3 transition-all cursor-pointer hover:shadow-lg hover:-translate-y-1`}
                whileHover={{ scale: 1.03 }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  },
                }}
              >
                <Link
                  href={item.href}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="p-4 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 transition-transform group-hover:scale-110">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-center">
                    {item.title}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Popular & Trending Sections */}
      <div className="space-y-20 py-12 px-4 max-w-7xl mx-auto">
        <PopularSection movies={popularData.results} />
        <TrendingSection movies={trendingData.results} />
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-4">
        <div className="max-w-7xl md:flex justify-between mx-8">
          <div className="space-x-4 flex justify-between">
            <div className="w-xs pr-20">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clapperboard className="text-pink-500" />
                ReelScope
              </h3>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-pink-400 transition">
                    Popular
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-400 transition">
                    Trending
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-400 transition">
                    Upcoming
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              {["Facebook", "Twitter", "Instagram", "YouTube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="bg-gray-800 p-2 rounded-full hover:bg-pink-500 transition"
                  aria-label={social}
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          &copy; {new Date().getFullYear()} ReelScope. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
