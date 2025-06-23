import Image from "next/image";
import Link from "next/link";

interface CastDetail {
  id: number;
  name: string;
  biography: string;
  profile_path: string;
}

interface MovieCredit {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

// Ambil detail pemeran dari TMDb
async function fetchPersonDetail(id: string): Promise<CastDetail> {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_API_KEY}&language=id-ID`
  );
  if (!res.ok) {
    throw new Error("Gagal memuat data pemain");
  }
  return res.json();
}

// Ambil daftar film yang dimainkan oleh pemeran dari TMDb
async function fetchPersonCredits(id: string): Promise<MovieCredit[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.TMDB_API_KEY}&language=id-ID`
  );
  if (!res.ok) {
    throw new Error("Gagal memuat daftar film pemain");
  }
  const data = await res.json();
  return data.cast;
}

export default async function CastDetailPage({ params }: { params: { id: string } }) {
  const person = await fetchPersonDetail(params.id);
  const movies = await fetchPersonCredits(params.id);

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black text-gray-100 min-h-screen p-6 space-y-8">
      {/* Profil Pemain */}
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start gap-6">
        <div className="flex-shrink-0">
          {person.profile_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
              alt={person.name}
              width={300}
              height={450}
              className="rounded-lg object-cover"
            />
          ) : (
            <div className="bg-gray-600 w-[300px] h-[450px] flex items-center justify-center rounded">
              No Photo
            </div>
          )}
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">{person.name}</h1>
          <p className="text-gray-300">{person.biography || "Biografi tidak tersedia."}</p>
        </div>
      </div>

      {/* Daftar Film yang Dibintangi */}
      <div className="max-w-6xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold">🎥 Daftar Film</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="bg-gray-800 rounded-lg overflow-hidden group"
            >
              {movie.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  width={200}
                  height={300}
                  className="object-cover rounded-t-lg group-hover:scale-105 transition-transform"
                />
              ) : (
                <div className="bg-gray-600 h-[300px] flex items-center justify-center rounded-t-lg">
                  No Image
                </div>
              )}
              <div className="p-3">
                <h3 className="font-semibold">{movie.title}</h3>
                {movie.release_date && (
                  <span className="text-gray-400 text-sm">
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
