import Navbar from "@/component/navbar";
import { fetchTvShows, fetchTrendingTvShows } from "@/lib/tmdb";
import TvCarouselTrending from "@/component/TvCarousel";
import Image from "next/image";

export default async function TvShowsPage() {
  const tvShows = await fetchTvShows();
  const trendingShows = await fetchTrendingTvShows();

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-16">
      <Navbar />
      <TvCarouselTrending featuredShows={trendingShows.slice(0, 5)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Popular TV Shows
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {tvShows.map((show) => (
            <a
              href={`/tv/${show.id}`}
              key={show.id}
              className="group relative rounded-xl overflow-hidden hover:z-10 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-xl shadow-lg">
                {show.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                    alt={show.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="bg-gray-800 flex items-center justify-center w-full h-full text-gray-600">
                    No Image
                  </div>
                )}
              </div>
              <div className="mt-3">
                <h3 className="font-semibold line-clamp-1 group-hover:text-amber-400 transition-colors">
                  {show.name}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}