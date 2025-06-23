import Image from "next/image";
import { fetchFromTMDb } from "@/lib/tmdb";
import { TMDbResponse } from "@/types/tmdb";
import Section from "@/component/Section";
import { Search } from "lucide-react"; // icon dari lucide-react

export default async function HomePage() {
  const popularData = (await fetchFromTMDb("/movie/popular")) as TMDbResponse;
  const trendingData = (await fetchFromTMDb("/trending/movie/week")) as TMDbResponse;

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen">
      {/* Navbar */}
      <header className="fixed w-full z-50 flex items-center justify-between p-4 md:px-8 backdrop-blur-lg bg-gray-950/60">
        <h1 className="text-2xl font-bold text-red-600">MovieApp</h1>
        <div className="relative max-w-sm w-full">
          <input
            type="text"
            placeholder="Cari film..."
            className="w-full text-white rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <Search className="absolute right-3 top-2.5 text-white" />
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-screen flex flex-col justify-center items-start pt-16">
        <div className="absolute inset-0">
          <Image
            src="/Group 2.jpg"
            alt="Hero Movie"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={80}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
        </div>
        <div className="relative z-10 p-8 md:p-16 max-w-3xl space-y-3">
          <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-yellow-500">
            Selamat datang di MovieApp
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-xl">
            Nikmati pengalaman menemukan film populer dan trending dari seluruh dunia, dengan visual yang memukau.
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-12 py-16 px-4">
        <Section title="Populer Sekarang" movies={popularData.results} />
        <Section title="Trending Minggu Ini" movies={trendingData.results} />
      </div>
    </div>
  );
}
