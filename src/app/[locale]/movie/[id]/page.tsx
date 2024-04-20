'use client'

import Footer from '@/components/layout/footer'
import PageWrapper from '@/components/layout/page-wrapper'
import MovieCarousel from '@/components/ui/movie-carousel'
import Title from '@/components/ui/title'
import React from 'react'

import { useTranslations } from 'next-intl'
import { formatLocale } from '@/lib/utils'

const Page = ({ params }: { params: { id: string; locale: string } }) => {
  const tTitle = useTranslations('titles')
  return (
    <React.Fragment>
      <PageWrapper
        single
        query={`movie/${params.id}?language=${formatLocale(params.locale)}`}
        mediaType={'movie'}
        showMoreInfo={false}
        className={'w-full lg:w-[1024px] max-w-[1024px]'}
      >
        <div className={'lg:mb-20 mb-10'}>
          <Title>{tTitle('more_like_this')}</Title>
          <MovieCarousel
            id={params.id}
            mediaType={'movie'}
            onModal={false}
            query={'/recommendations?page=1'}
          />
          <MovieCarousel
            id={params.id}
            mediaType={'movie'}
            onModal={false}
            query={'/recommendations?page=2'}
            className={'pt-6'}
          />
        </div>
        <Footer />
      </PageWrapper>
    </React.Fragment>
  )
}

export default Page
