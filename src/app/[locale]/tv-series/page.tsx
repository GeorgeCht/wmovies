import PageWrapper from '@/components/layout/page-wrapper'
import TvCarousel from '@/components/ui/tv-carousel'
import Title from '@/components/ui/title'
import { useTranslations } from 'next-intl'
import React from 'react'

export default function Page() {
  const tTitle = useTranslations('titles')
  return (
    <React.Fragment>
      <PageWrapper multiple query={'trending/tv/day'}>
        <div className={'lg:mb-20 mb-10'}>
          <Title>{tTitle('trending')}</Title>
          <TvCarousel queryFlag query={'trending/tv/day'} onModal={false} />
          <TvCarousel
            queryFlag
            query={'trending/tv/day?page=2'}
            className={'pt-6'}
            onModal={false}
          />
        </div>
        <div className={'lg:mb-20 mb-10'}>
          <Title onModal={false}>{tTitle('weekly_popular')}</Title>
          <TvCarousel
            queryFlag
            query={'trending/tv/week?page=2'}
            onModal={false}
          />
          <TvCarousel
            queryFlag
            query={'trending/tv/week?page=3'}
            className={'pt-6'}
            onModal={false}
          />
        </div>
        <div className={'lg:mb-20 mb-10'}>
          <Title onModal={false}>{tTitle('airing_today')}</Title>
          <TvCarousel
            queryFlag
            query={'tv/airing_today?language=en-US&page=1'}
            onModal={false}
          />
          <TvCarousel
            queryFlag
            query={'tv/airing_today?language=en-US&page=2'}
            className={'pt-6'}
            onModal={false}
          />
        </div>
        <div className={'lg:mb-20 mb-10'}>
          <Title onModal={false}>{tTitle('top_rated_series')}</Title>
          <TvCarousel
            queryFlag
            query={'tv/top_rated?language=en-US&page=1'}
            onModal={false}
          />
          <TvCarousel
            queryFlag
            query={'tv/top_rated?language=en-US&page=2'}
            className={'pt-6'}
            onModal={false}
          />
        </div>
      </PageWrapper>
    </React.Fragment>
  )
}
