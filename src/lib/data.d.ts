declare interface MovieDetails {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: BelongsToCollection
  budget: number
  genres: Array<Genre>
  homepage: string
  id: number
  imdb_id: string
  origin_country: Array<string>
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: Array<ProductionCompany>
  production_countries: Array<ProductionCountry>
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: Array<SpokenLanguage>
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  images: Images
  videos: Videos
}

declare type MediaType = 'movie' | 'tv'

// eslint-disable-next-line no-unused-vars
declare interface MovieDetailsWithImages extends MovieDetails {
  images: Images
}

// eslint-disable-next-line no-unused-vars
declare interface MovieDetailsWithVideos extends MovieDetails {
  videos: Videos
}

// eslint-disable-next-line no-unused-vars
declare interface MovieDetailsWithImageAndVideos extends MovieDetails {
  images: Images
  videos: Videos
}

declare interface BelongsToCollection {
  id: number
  name: string
  poster_path: string
  backdrop_path: string
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
declare interface MovieRecommended {
  page: number
  results: Array<MovieRecommendedResult>
  total_pages: number
  total_results: number
}

declare interface MovieRecommendedResult {
  backdrop_path?: string
  id: number
  original_title: string
  overview: string
  poster_path: string
  media_type: MediaType
  adult: boolean
  title: string
  original_language: string
  genre_ids: Array<number>
  popularity: number
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
}
