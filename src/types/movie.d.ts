declare interface MovieDetails extends MediaDetails {
  belongs_to_collection: BelongsToCollection
  budget: number
  imdb_id: string
  release_date: string
  revenue: number
  runtime: number
  title: string
  video: boolean
}

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

// eslint-disable-next-line no-unused-vars
declare type MovieRecommended = Response<MovieResult>

// eslint-disable-next-line no-unused-vars
declare type MovieRecommendedResult = MovieResult
declare interface MovieResult {
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
