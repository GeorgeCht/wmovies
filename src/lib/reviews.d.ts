// eslint-disable-next-line no-unused-vars
declare interface Review {
  id: number
  page: number
  results: Array<ReviewResult>
  total_pages: number
  total_results: number
}

declare interface ReviewResult {
  author: string
  author_details: AuthorDetails
  content: string
  created_at: string
  id: string
  updated_at: string
  url: string
}

declare interface AuthorDetails {
  name: string
  username: string
  avatar_path?: string
  rating: number
}
