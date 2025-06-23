import Image from "next/image";
import { fetchFromTMDb } from "@/lib/tmdb";
import { TMDbResponse } from "@/types/tmdb";
import Section from "@/component/Section";

export default async function HomePage() {
  const popularData = (await fetchFromTMDb("/movie/popular")) as TMDbResponse;
  const trendingData = (await fetchFromTMDb(
    "/trending/movie/week"
  )) as TMDbResponse;

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen">
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
            Nikmati pengalaman menemukan film populer dan trending dari seluruh
            dunia, dengan visual yang memukau.
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
