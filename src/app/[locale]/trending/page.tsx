import PageWrapper from '@/components/layout/page-wrapper'
import MovieCarousel from '@/components/ui/movie-carousel'
import Title from '@/components/ui/title'
import React from 'react'

export default function Page() {
  return (
    <React.Fragment>
      <PageWrapper multiple query={'trending/all/week'}>
        <div className={'lg:mb-20 mb-10'}>
          <Title>Trending Now</Title>
          <MovieCarousel onModal={false} />
        </div>
        <div className={'lg:mb-20 mb-10'}>
          <Title>Trending Now</Title>
          <MovieCarousel />
        </div>
        <div className={'lg:mb-20 mb-10'}>
          <Title>Trending Now</Title>
          <MovieCarousel />
        </div>
      </PageWrapper>
    </React.Fragment>
  )
}
