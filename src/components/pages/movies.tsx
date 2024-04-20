'use client'

import PageWrapper from '@/components/layout/page-wrapper'
import MovieCarousel from '@/components/ui/movie-carousel'
import Title from '@/components/ui/title'
import Footer from '@/components/layout/footer'
import React from 'react'
import { useTranslations } from 'next-intl'

const MoviesPage = () => {
  const tTitle = useTranslations('titles')
  const renderSection = (title: string, query: string, page: number = 1) => {
    return (
      <section className={'lg:mb-20 mb-10'}>
        <Title onModal={false}>{tTitle(title)}</Title>
        <MovieCarousel
          queryFlag
          query={`${query}${query.includes('?') ? '&' : '?'}page=${String(page)}`}
          onModal={false}
        />
        <MovieCarousel
          queryFlag
          query={`${query}${query.includes('?') ? '&' : '?'}page=${String(page + 1)}`}
          className={'md:pt-6 pt-4'}
          onModal={false}
        />
      </section>
    )
  }

  return (
    <PageWrapper multiple query={`trending/movie/day`}>
      {renderSection('trending', 'trending/movie/day')}
      {renderSection('weekly_popular', 'trending/movie/week', 2)}
      {renderSection(
        'action',
        'discover/movie?include_adult=false&include_video=false&sort_by=popularity.desc&with_genres=28',
      )}
      {renderSection(
        'comedy',
        'discover/movie?include_adult=false&include_video=false&sort_by=popularity.desc&with_genres=35',
      )}
      {renderSection(
        'horror',
        'discover/movie?include_adult=false&include_video=false&sort_by=popularity.desc&with_genres=27',
      )}
      <Footer />
    </PageWrapper>
  )
}

export default MoviesPage
