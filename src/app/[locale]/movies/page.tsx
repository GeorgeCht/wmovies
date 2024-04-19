import PageWrapper from '@/components/layout/page-wrapper'
import MovieCarousel from '@/components/ui/movie-carousel'
import Title from '@/components/ui/title'
import { useTranslations } from 'next-intl'
import React from 'react'

import { unstable_setRequestLocale } from 'next-intl/server'

export default function Page({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale)

  const tTitle = useTranslations('titles')
  return (
    <React.Fragment>
      <PageWrapper multiple query={'trending/movie/day'}>
        <div className={'lg:mb-20 mb-10'}>
          <Title onModal={false}>{tTitle('trending')}</Title>
          <MovieCarousel
            queryFlag
            query={'trending/movie/day'}
            onModal={false}
          />
          <MovieCarousel
            queryFlag
            query={'trending/movie/day?page=2'}
            className={'pt-6'}
            onModal={false}
          />
        </div>
        <div className={'lg:mb-20 mb-10'}>
          <Title onModal={false}>{tTitle('weekly_popular')}</Title>
          <MovieCarousel
            queryFlag
            query={'trending/movie/week?page=2'}
            onModal={false}
          />
          <MovieCarousel
            queryFlag
            query={'trending/movie/week?page=3'}
            className={'pt-6'}
            onModal={false}
          />
        </div>
        <div className={'lg:mb-20 mb-10'}>
          <Title onModal={false}>{tTitle('action')}</Title>
          <MovieCarousel
            queryFlag
            query={
              'discover/movie?include_adult=false&include_video=false&page=1&sort_by=popularity.desc&with_genres=28'
            }
            onModal={false}
          />
          <MovieCarousel
            queryFlag
            query={
              'discover/movie?include_adult=false&include_video=false&page=2&sort_by=popularity.desc&with_genres=28'
            }
            className={'pt-6'}
            onModal={false}
          />
        </div>
        <div className={'lg:mb-20 mb-10'}>
          <Title onModal={false}>{tTitle('comedy')}</Title>
          <MovieCarousel
            queryFlag
            query={
              'discover/movie?include_adult=false&include_video=false&page=1&sort_by=popularity.desc&with_genres=35'
            }
            onModal={false}
          />
          <MovieCarousel
            queryFlag
            query={
              'discover/movie?include_adult=false&include_video=false&page=2&sort_by=popularity.desc&with_genres=35'
            }
            className={'pt-6'}
            onModal={false}
          />
        </div>
        <div className={'lg:mb-20 mb-10'}>
          <Title onModal={false}>{tTitle('horror')}</Title>
          <MovieCarousel
            queryFlag
            query={
              'discover/movie?include_adult=false&include_video=false&page=1&sort_by=popularity.desc&with_genres=27'
            }
            onModal={false}
          />
          <MovieCarousel
            queryFlag
            query={
              'discover/movie?include_adult=false&include_video=false&page=2&sort_by=popularity.desc&with_genres=27'
            }
            className={'pt-6'}
            onModal={false}
          />
        </div>
      </PageWrapper>
    </React.Fragment>
  )
}
