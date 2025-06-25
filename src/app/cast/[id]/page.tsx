import Image from "next/image";
import Link from "next/link";
import { CastDetail, MovieCredit } from "@/types/tmdb";
import Navbar from "@/component/navbar";

async function fetchPersonDetail(id: string): Promise<CastDetail> {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_API_KEY}&language=id-ID`
  );
  if (!res.ok) throw new Error("Gagal memuat data pemain");
  return res.json();
}

async function fetchPersonCredits(id: string): Promise<MovieCredit[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.TMDB_API_KEY}&language=id-ID`
  );
  if (!res.ok) throw new Error("Gagal memuat daftar film pemain");
  const data = await res.json();
  return data.cast;
}

export default async function CastDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const person = await fetchPersonDetail(params.id);
  const movies = await fetchPersonCredits(params.id);

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen pt-16">
      <Navbar />
      {/* PROFILE CARD */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center bg-slate-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10 transition-all hover:shadow-blue-500/20">
        {/* PHOTO */}
        <div className="relative w-[260px] h-[390px] flex-shrink-0 overflow-hidden rounded-2xl ring-2 ring-blue-500/40 shadow-lg transform transition hover:scale-105">
          {person.profile_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
              alt={person.name}
              width={260}
              height={390}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="bg-slate-700 w-full h-full flex items-center justify-center text-slate-400 italic">
              No Image
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="space-y-5 flex-1">
          <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            {person.name}
          </h1>

          {person.also_known_as?.length ? (
            <p className="text-sm text-slate-300">
              Alias:{" "}
              <span className="italic">{person.also_known_as.join(", ")}</span>
            </p>
          ) : null}

          <p className="text-blue-200 font-medium">
            {person.known_for_department || "Pemeran"}
          </p>
          <p className="text-slate-200 flex gap-1 items-center">
            🎂{" "}
            {person.birthday
              ? new Date(person.birthday).toLocaleDateString("id-ID")
              : "Tanggal lahir tidak diketahui"}
            {person.place_of_birth ? `, ${person.place_of_birth}` : ""}
          </p>
          <p className="text-slate-200 flex gap-1 items-center">
            ✨ Popularitas: {person.popularity.toFixed(2)}
          </p>

          {person.homepage && (
            <Link
              href={person.homepage}
              target="_blank"
              className="inline-block mt-2 text-blue-400 underline hover:text-blue-300 transition"
            >
              🌐 Situs Resmi
            </Link>
          )}

          <p className="text-slate-200 leading-relaxed mt-4 text-justify">
            {person.biography || "Biografi tidak tersedia."}
          </p>
        </div>
      </div>

      {/* FILMOGRAPHY */}
      <div className="max-w-7xl mx-auto mt-12 space-y-6">
        <h2 className="text-3xl font-bold border-b border-slate-700 pb-2">
          🎥 Film yang Dibintangi
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="bg-slate-800/40 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 shadow-lg transform transition hover:scale-105 hover:shadow-2xl"
            >
              {movie.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  width={200}
                  height={300}
                  className="object-cover w-full h-auto"
                />
              ) : (
                <div className="bg-slate-700 h-[300px] flex items-center justify-center text-slate-400 text-sm">
                  No Image
                </div>
              )}
              <div className="p-3 text-center space-y-1">
                <h3 className="font-medium text-slate-50 text-sm line-clamp-2">
                  {movie.title}
                </h3>
                {movie.release_date && (
                  <span className="text-xs text-slate-400">
                    ({new Date(movie.release_date).getFullYear()})
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}