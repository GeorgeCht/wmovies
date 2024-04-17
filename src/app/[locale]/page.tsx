import { Link } from '@/components/i18n/navigation'
import HeroMovieDetails from '@/components/ui/hero-movie-details'
import MovieCarousel from '@/components/ui/movie-carousel'
import { useTranslations } from 'next-intl'

export default function Index() {
  const t = useTranslations('Index')
  return (
    <>
      <h1>{t('title')}</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate iure
        iste delectus! Necessitatibus laudantium ipsum perspiciatis recusandae
        modi sapiente, ab dolorum saepe? Eveniet molestiae incidunt dignissimos,
        libero cumque sunt exercitationem!
      </p>
      <HeroMovieDetails
        title={'Dune: Part Two'}
        description={
          'Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.'
        }
        genres={['Action', 'Adventure', 'Sci-Fi']}
      />

      <hr className={'mb-10'} />
      <Link
        className={'bg-red-500 py-5 px-5'}
        href={'/movie/693134'}
        scroll={false}
      >
        Click me!!!!!!!!!!!!!!
      </Link>
      <h2
        className={
          'text-3xl font-semibold tracking-tighter leading-none sm:pb-10 pb-8'
        }
      >
        Trending Now
      </h2>
      <MovieCarousel />
    </>
  )
}
