import Image from "next/image";
import { fetchFromTMDb } from "@/lib/tmdb";
import { TMDbResponse } from "@/types/tmdb";
import { Search } from "lucide-react";
import Navbar from "@/component/navbar";
import PopularSection from "@/component/PopularSection";
import TrendingSection from "@/component/TrendingSection";

export default async function HomePage() {
  const popularData = (await fetchFromTMDb("/movie/popular")) as TMDbResponse;
  const trendingData = (await fetchFromTMDb(
    "/trending/movie/week"
  )) as TMDbResponse;

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen pt-16">
      <Navbar />
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-start overflow-hidden px-8 md:px-16">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/Hero.jpg"
            alt="Hero Movie"
            fill
            priority
            className="object-cover object-center opacity-80"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-xl space-y-6 pb-24">
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500">
            Temukan Film Favoritmu
          </h1>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-md drop-shadow">
            Nikmati pengalaman menjelajahi katalog film populer dan trending
            dari seluruh dunia. Dengan antarmuka modern dan fitur pencarian
            cepat!
          </p>

          {/* Search Bar with Glassmorphism */}
          <div className="relative w-full max-w-md mt-6 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-lg">
            <input
              type="text"
              placeholder="Cari judul film..."
              className="w-full bg-transparent text-white placeholder-white/70 pl-5 pr-12 py-3 focus:outline-none"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70" />
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-12 py-16 px-4 max-w-7xl mx-auto">
        <PopularSection movies={popularData.results} />
        <TrendingSection movies={trendingData.results} />
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 px-4 text-white text-center">
        &copy; 2023 Movie App. All rights reserved.
      </footer>
    </div>
  );
}
