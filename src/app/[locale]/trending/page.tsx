import HeroMovieDetails from '@/components/ui/hero-movie-details'
import MovieCarousel from '@/components/ui/movie-carousel'

export default function Page() {
  return (
    <>
      <div
        className={'flex flex-col justify-end h-[50vh] xl:mb-24 lg:mb-20 mb-10'}
      >
        <HeroMovieDetails
          title={'Dune: Part Two'}
          description={
            'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.'
          }
          genres={['Action', 'Adventure', 'Sci-Fi']}
        />
      </div>
      <div className={'lg:mb-20 mb-10'}>
        <h2
          className={
            'text-2xl sm:text-3xl font-semibold tracking-tighter leading-none sm:pb-5 pb-4'
          }
        >
          Trending Now
        </h2>
        <MovieCarousel />
      </div>
      <div className={'lg:mb-20 mb-10'}>
        <h2
          className={
            'text-2xl sm:text-3xl font-semibold tracking-tighter leading-none sm:pb-5 pb-4'
          }
        >
          Trending Now
        </h2>
        <MovieCarousel />
      </div>
      <div className={'lg:mb-20 mb-10'}>
        <h2
          className={
            'text-2xl sm:text-3xl font-semibold tracking-tighter leading-none sm:pb-5 pb-4'
          }
        >
          Trending Now
        </h2>
        <MovieCarousel />
      </div>
    </>
  )
}
