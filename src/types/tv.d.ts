declare interface TvDetails extends MediaDetails {
  created_by: Array<CreatedBy>
  episode_run_time: Array<number | any>
  first_air_date: string
  in_production: boolean
  languages: Array<string>
  last_air_date: string
  last_episode_to_air: LastEpisodeToAir
  name: string
  next_episode_to_air: any
  networks: Array<Network>
  number_of_episodes: number
  number_of_seasons: number
  seasons: Array<Season>
  status: string
  tagline: string
  vote_average: number
  vote_count: number
}

// eslint-disable-next-line no-unused-vars
declare interface TvDetailsWithImages extends TvDetails {
  images: Images
}

// eslint-disable-next-line no-unused-vars
declare interface TvDetailsWithVideos extends TvDetails {
  videos: Videos
}

// eslint-disable-next-line no-unused-vars
declare interface TvDetailsWithImageAndVideos extends TvDetails {
  images: Images
  videos: Videos
}

declare interface CreatedBy {
  id: number
  credit_id: string
  name: string
  original_name: string
  gender: number
  profile_path: string
}

declare interface LastEpisodeToAir {
  id: number
  overview: string
  name: string
  vote_average: number
  vote_count: number
  air_date: string
  episode_number: number
  episode_type: string
  production_code: string
  runtime: number
  season_number: number
  show_id: number
  still_path: string
}

declare interface Network {
  id: number
  logo_path: string
  name: string
  origin_country: string
}

declare interface Season {
  air_date?: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path: string
  season_number: number
  vote_average: number
}

// eslint-disable-next-line no-unused-vars
declare type TvRecommended = Recommended<TvRecommendedResult>

declare interface TvRecommendedResult {
  backdrop_path: string
  id: number
  original_name: string
  overview: string
  poster_path: string
  media_type: MediaType
  adult: boolean
  name: string
  original_language: string
  genre_ids: Array<number>
  popularity: number
  first_air_date: string
  vote_average: number
  vote_count: number
  origin_country: Array<string>
}
