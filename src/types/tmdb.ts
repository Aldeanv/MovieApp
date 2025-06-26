export interface Movie {
  id: number;
  title: string;
  release_date?: string;
  poster_path?: string;
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
