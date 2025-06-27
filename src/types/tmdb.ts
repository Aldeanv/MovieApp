export interface Movie {
  id: number;
  title: string;
  release_date?: string;
  poster_path?: string;
  vote_average?: number;
  media_type?: "movie" | "tv" | "person";
  popularity?: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  key: string;
  site: "YouTube" | string;
  type: "Trailer" | "Teaser" | "Clip";
  size: number;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  profile_path?: string;
}

export interface SimilarMovie {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
}

export interface MovieDetail {
  id: number;
  title: string;
  tagline?: string;
  overview: string;
  release_date?: string;
  poster_path?: string;
  runtime?: number;
  status?: string;
  vote_average?: number;
  genres?: Genre[];
  production_companies?: { name: string }[];
  videos?: {
    results: Video[];
  };
  credits?: {
    cast: Cast[];
    crew: Crew[];
  };
  similar?: {
    results: SimilarMovie[];
  };
  backdrop_path?: string;
  revenue?: number;
  budget?: number;
  spoken_languages?: { name: string }[];
}

export interface TMDbResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface CastDetail {
  id: number;
  name: string;
  gender: number;
  original_name: string;
  biography: string;
  profile_path: string;
  birthday?: string;
  place_of_birth?: string;
  known_for_department?: string;
  movies: MovieCredit[];
  popularity: number;
  kwown_for?: MovieCredit[];
  also_known_as?: string[];
}

export interface MovieCredit {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  character?: string;
  overview?: string;
  vote_average?: number;
}

// types/tmdb.ts
export interface TvShow {
  id: number;
  name: string;
  backdrop_path?: string | null;
  poster_path?: string | null;
  overview?: string | null;
  first_air_date?: string;
  last_air_date?: string;
  status?: string;
  type?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
  episode_run_time?: number[];
  vote_average?: number;
  genres?: { id: number; name: string }[];
  created_by?: { id: number; name: string }[];
  networks?: { id: number; name: string; logo_path?: string }[];
  production_companies?: { id: number; name: string; logo_path?: string }[];
  seasons?: { id: number; name: string; poster_path?: string; air_date?: string; episode_count?: number; overview?: string; season_number: number }[];
  credits?: { cast?: CastMember[]; crew?: CrewMember[] };
  videos?: { results: Video[] };
  similar?: { results: SimilarShow[] };
  original_name?: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  profile_path?: string;
}

export interface Video {
  key: string;
  name: string;
  site: "YouTube" | string;
  type: "Trailer" | "Teaser" | "Clip";
}

export interface SimilarShow {
  id: number;
  name: string;
  poster_path?: string;
  vote_average?: number;
}
