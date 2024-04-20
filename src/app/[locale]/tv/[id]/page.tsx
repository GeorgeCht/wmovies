import Footer from '@/components/layout/footer'
import PageWrapper from '@/components/layout/page-wrapper'
import Title from '@/components/ui/title'
import TvCarousel from '@/components/ui/tv-carousel'
import React from 'react'

import { useTranslations } from 'next-intl'
import { formatLocale } from '@/lib/utils'

const Page = ({ params }: { params: { id: string; locale: string } }) => {
  const tTitle = useTranslations('titles')
  return (
    <React.Fragment>
      <PageWrapper
        single
        query={`tv/${params.id}?language=${formatLocale(params.locale)}`}
        mediaType={'tv'}
        showMoreInfo={false}
        className={'w-full lg:w-[1024px] max-w-[1024px]'}
      >
        <div className={'lg:mb-20 mb-10'}>
          <Title>{tTitle('more_like_this')}</Title>
          <TvCarousel
            id={params.id}
            mediaType={'tv'}
            onModal={false}
            query={'/recommendations?page=1'}
          />
          <TvCarousel
            id={params.id}
            mediaType={'tv'}
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
