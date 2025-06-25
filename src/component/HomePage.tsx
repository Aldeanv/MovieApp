"use client";

import Image from "next/image";
import { Search, Play, Star, TrendingUp, Clapperboard, Calendar, Heart } from "lucide-react";
import Navbar from "@/component/navbar";
import PopularSection from "@/component/PopularSection";
import TrendingSection from "@/component/TrendingSection";
import { TMDbResponse } from "@/types/tmdb";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
    show: { opacity: 1, transition: { duration: 0.8 } }
  };
  const slideUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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
            Explore thousands of movies, from timeless classics to the latest blockbusters. 
            Find recommendations tailored just for you.
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
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              Browse Categories
            </span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Play className="w-8 h-8" />, title: "Now Playing", bg: "bg-blue-500/10", border: "border-blue-500/20" },
              { icon: <Star className="w-8 h-8" />, title: "Top Rated", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
              { icon: <TrendingUp className="w-8 h-8" />, title: "Trending", bg: "bg-pink-500/10", border: "border-pink-500/20" },
              { icon: <Clapperboard className="w-8 h-8" />, title: "Upcoming", bg: "bg-purple-500/10", border: "border-purple-500/20" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className={`${item.bg} ${item.border} border rounded-xl p-6 flex flex-col items-center gap-3 hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1`}
                whileHover={{ scale: 1.03 }}
                variants={slideUp}
              >
                <div className="p-4 rounded-full bg-gradient-to-r from-orange-500 to-pink-500">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-center">{item.title}</h3>
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

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            initial="hidden"
            animate="show"
            variants={slideUp}
          >
            <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              Why Choose Our Platform
            </span>
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Star className="w-10 h-10 text-yellow-400" />,
                title: "Curated Selection",
                description: "We handpick the best movies from around the world to ensure quality entertainment."
              },
              {
                icon: <Calendar className="w-10 h-10 text-blue-400" />,
                title: "Daily Updates",
                description: "Our database is updated daily with the latest releases and trending content."
              },
              {
                icon: <Heart className="w-10 h-10 text-pink-400" />,
                title: "Personalized Recommendations",
                description: "Get tailored suggestions based on your viewing history and preferences."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-pink-500/30 transition-all"
                variants={slideUp}
                initial="hidden"
                animate="show"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-gray-700">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for weekly movie recommendations and updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-gray-700 text-white px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Clapperboard className="text-pink-500" />
              MovieHub
            </h3>
            <p className="text-gray-400">
              Your ultimate destination for discovering and exploring movies from around the world.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-pink-400 transition">Home</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">Movies</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">TV Shows</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">About Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-pink-400 transition">Popular</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">Trending</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">Upcoming</a></li>
              <li><a href="#" className="hover:text-pink-400 transition">Top Rated</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((social) => (
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
          &copy; {new Date().getFullYear()} MovieHub. All rights reserved.
        </div>
      </footer>
    </div>
  );
}