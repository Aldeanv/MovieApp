import { fetchFromTMDb } from "@/lib/tmdb";
import { TMDbResponse } from "@/types/tmdb";
import HomePage from "@/component/HomePage";

export default async function Page() {
  const popularData = (await fetchFromTMDb("/movie/popular")) as TMDbResponse;
  const trendingData = (await fetchFromTMDb("/trending/movie/week")) as TMDbResponse;

  return <HomePage popularData={popularData} trendingData={trendingData} />;
}
