import PageWrapper from '@/components/layout/page-wrapper'
import Title from '@/components/ui/title'
import TvCarousel from '@/components/ui/tv-carousel'
import React from 'react'

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <React.Fragment>
      <PageWrapper
        single
        query={`movie/${params.id}`}
        mediaType={'movie'}
        showMoreInfo={false}
        className={'w-full lg:w-[1024px] max-w-[1024px]'}
      >
        <div className={'lg:mb-20 mb-10'}>
          <Title>You May Also Like</Title>
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
      </PageWrapper>
    </React.Fragment>
  )
}

export default Page
