// page cast
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/component/navbar";
import { fetchPersonDetail, fetchPeopleDetail, fetchPersonCredits } from "@/lib/tmdb";

export default async function CastDetailPage({ params }: { params: { id: string } }) {
  const [personEN, personID, movies] = await Promise.all([
    fetchPersonDetail(params.id),
    fetchPeopleDetail(params.id),
    fetchPersonCredits(params.id),
  ]);

  const sortedMovies = [...movies].sort(
    (a, b) => new Date(b.release_date || 0).getTime() - new Date(a.release_date || 0).getTime()
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navbar />

      {/* HEADER */}
      <header className="relative h-[70vh] overflow-hidden">
        {personEN.profile_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/original${personEN.profile_path}`}
            alt={personEN.name}
            fill
            priority
            className="object-cover opacity-50"
          />
        ) : (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 absolute inset-0" />
        )}

        <div className="absolute bottom-0 left-0 right-0 p-8 z-10 flex flex-col lg:flex-row lg:items-center gap-8 max-w-7xl mx-auto">
          <div className="relative w-48 h-64 lg:w-64 lg:h-80 bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50 shadow-xl">
            {personEN.profile_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${personEN.profile_path}`}
                alt={personEN.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="bg-gray-700 w-full h-full flex items-center justify-center text-gray-500">No Image</div>
            )}
          </div>

          <div>
            <h1 className="text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 drop-shadow-md">
              {personEN.name}
            </h1>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-4 py-1 bg-amber-500/10 text-amber-400 border border-amber-400/50 rounded-full text-sm font-medium">
                {personEN.known_for_department}
              </span>
              {personEN.birthday && (
                <span className="px-4 py-1 bg-gray-800 border border-gray-700 text-gray-200 rounded-full text-sm">
                  {new Date(personEN.birthday).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        <section className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-1/3 sticky top-8 self-start">
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 space-y-6 shadow-md">
              <div>
                <h3 className="text-xs font-semibold text-amber-400 uppercase mb-1">Also Known As</h3>
                <p className="text-gray-200">{personEN.also_known_as?.join(", ") || "N/A"}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-amber-400 uppercase mb-1">Place of Birth</h3>
                <p className="text-gray-200">{personEN.place_of_birth || "N/A"}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-amber-400 uppercase mb-1">Gender</h3>
                <p className="text-gray-200">{personEN.gender === 1 ? "Female" : "Male"}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-amber-400 uppercase mb-1">Popularity</h3>
                <p className="text-gray-200">{personEN.popularity.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-amber-400 uppercase mb-1">Movies</h3>
                <p className="text-gray-200">{sortedMovies.length} movies</p>
              </div>
            </div>
          </aside>

          {/* Biography */}
          <div className="lg:w-2/3">
            <h2 className="text-3xl font-bold mb-4 border-l-4 border-amber-400 pl-4">Biography</h2>
            <p className="text-gray-300 leading-relaxed">
              {personID.biography && personID.biography.trim() !== ""
                ? personID.biography
                : personEN.biography || "Biography not available."}
            </p>
          </div>
        </section>

        {/* Filmography */}
        <section>
          <h2 className="text-3xl font-bold mb-8 border-l-4 border-amber-400 pl-4">Filmography</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {sortedMovies.map((movie) => (
              <Link
                href={`/movie/${movie.id}`}
                key={movie.id}
                className="group bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
              >
                <div className="relative w-full h-64 bg-gray-900 overflow-hidden">
                  {movie.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">No Image</div>
                  )}
                </div>
                <div className="p-3 text-center bg-gray-900/40">
                  <h3 className="font-medium text-gray-200 line-clamp-2 group-hover:text-amber-400 transition-colors">
                    {movie.title}
                  </h3>
                  {movie.release_date && (
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(movie.release_date).getFullYear()}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 border-t border-gray-700/50 py-8 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Movie Database. All rights reserved.
      </footer>
    </div>
  );
}
