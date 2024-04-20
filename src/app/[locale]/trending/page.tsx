import PageWrapper from '@/components/layout/page-wrapper'
import MovieCarousel from '@/components/ui/movie-carousel'
import TvCarousel from '@/components/ui/tv-carousel'
import Footer from '@/components/layout/footer'
import Title from '@/components/ui/title'
import React from 'react'

import { unstable_setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'

export default function Page({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale)
  const tTitle = useTranslations('titles')

  return (
    <React.Fragment>
      <PageWrapper multiple query={'trending/all/day'}>
        <div className={'lg:mb-20 mb-10'}>
          <Title onModal={false}>{tTitle('trending')}</Title>
          <MovieCarousel
            queryFlag
            query={'trending/movie/week'}
            onModal={false}
          />
          <MovieCarousel
            queryFlag
            query={'trending/movie/week?page=2'}
            className={'pt-6'}
            onModal={false}
          />
          <MovieCarousel
            queryFlag
            query={'trending/movie/week?page=3'}
            className={'pt-6'}
            onModal={false}
          />
          <MovieCarousel
            queryFlag
            query={'trending/movie/week?page=4'}
            className={'pt-6'}
            onModal={false}
          />
        </div>
        <div className={'lg:mb-20 mb-10'}>
          <Title onModal={false}>{tTitle('weekly_popular')}</Title>
          <TvCarousel queryFlag query={'trending/tv/week'} onModal={false} />
          <TvCarousel
            queryFlag
            query={'trending/tv/week?page=2'}
            className={'pt-6'}
            onModal={false}
          />
          <TvCarousel
            queryFlag
            query={'trending/tv/week?page=3'}
            className={'pt-6'}
            onModal={false}
          />
          <TvCarousel
            queryFlag
            query={'trending/tv/week?page=4'}
            className={'pt-6'}
            onModal={false}
          />
        </div>
        <Footer />
      </PageWrapper>
    </React.Fragment>
  )
}
