// eslint-disable-next-line no-unused-vars
declare type MediaType = 'movie' | 'tv'

// eslint-disable-next-line no-unused-vars
declare interface MediaDetails {
  adult: boolean
  backdrop_path: string
  genres: Array<Genre>
  homepage: string
  id: number
  origin_country: Array<string>
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: Array<ProductionCompany>
  production_countries: Array<ProductionCountry>
  spoken_languages: Array<SpokenLanguage>
  status: string
  tagline: string
  vote_average: number
  vote_count: number
}

declare interface Genre {
  id: number
  name: string
}

declare interface ProductionCompany {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

declare interface ProductionCountry {
  iso_3166_1: string
  name: string
}

declare interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

// eslint-disable-next-line no-unused-vars
declare interface Images {
  backdrops: Array<ImageData>
  posters: Array<ImageData>
  logos?: Array<ImageData>
}

declare interface ImageData {
  aspect_ratio: number
  height: number
  iso_639_1?: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

// eslint-disable-next-line no-unused-vars
declare interface Videos {
  results: Array<VideoResult>
}

declare interface VideoResult {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}

// eslint-disable-next-line no-unused-vars
declare interface Recommended<T> {
  page: number
  results: Array<T>
  total_pages: number
  total_results: number
}
