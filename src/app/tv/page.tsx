import Navbar from "@/component/navbar";
import { fetchTrendingTvShows } from "@/lib/tmdb";
import TvCarouselTrending from "@/component/TvCarousel";
import TvShowsList from "@/component/TvShowsList";

export default async function TvShowsPage() {
  const trendingShows = await fetchTrendingTvShows();

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-16">
      <Navbar />
      <TvCarouselTrending featuredShows={trendingShows.slice(0, 5)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            TV Shows
          </h2>
        </div>
        <TvShowsList />
      </main>
    </div>
  );
}
