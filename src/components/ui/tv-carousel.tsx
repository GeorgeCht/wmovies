'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './carousel'
import { Skeleton, cn } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { fetchData, formatLocale } from '@/lib/utils'
import { useInView } from 'framer-motion'
import { useLocale } from 'next-intl'
import TvCard from './tv-card'

const TvCarousel = ({
  mediaType = 'tv',
  id,
  query = '/recommendations',
  onModal = false,
  queryFlag = false,
  className,
}: {
  mediaType?: MediaType
  id?: string
  query?: string
  onModal?: boolean
  queryFlag?: boolean
  className?: string
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    margin: '-80px',
  })
  const [api, setApi] = useState<CarouselApi>()
  const locale = useLocale()
  const joinString = query.includes('?') ? '&' : '?'
  const { isPending: loading, data } = useQuery({
    queryKey: [
      queryFlag
        ? `${query}${joinString}language=${formatLocale(locale)}`
        : `${mediaType}/${id}${query}${joinString}language=${formatLocale(locale)}`,
    ],
    queryFn: async () =>
      fetchData<Response<TvResult>>(
        queryFlag
          ? `${query}${joinString}language=${formatLocale(locale)}`
          : `${mediaType}/${id}${query}${joinString}language=${formatLocale(locale)}`,
      ),
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: isInView,
  })

  useEffect(() => {
    if (!api) {
      return
    }
  }, [api])

  if (loading) {
    return (
      <React.Fragment>
        <div ref={ref} className={'flex w-full mb-6 overflow-hidden'}>
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              className={cn(
                'min-w-0 shrink-0 grow-0 basis-full',
                onModal
                  ? '!basis-[55%] sm:!basis-[33.333%] lg:pr-3 pr-2.5'
                  : '!basis-[55%] sm:!basis-[300px] lg:pr-6 pr-2.5',
              )}
              key={index}
            >
              <Skeleton className={'rounded-2xl mb-5'}>
                <div
                  style={{
                    width: onModal ? 333 : 276,
                    height: onModal ? 500 : 414,
                  }}
                  className={'w-[300px] h-[450px]'}
                />
              </Skeleton>
              <Skeleton className={'w-[67%] rounded-lg *:rounded-lg'}>
                <div className={'h-4'} />
              </Skeleton>
            </div>
          ))}
        </div>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Carousel
        opts={{
          align: 'start',
          loop: false,
        }}
        setApi={setApi}
        className={cn(
          'group/carousel w-full sm:max-w-prefered max-w-[calc(100vw-32px)]',
          className,
        )}
      >
        <CarouselContent>
          {data?.results.map((tv) => (
            <CarouselItem
              key={tv.id}
              className={cn(
                onModal
                  ? '!basis-[55%] sm:!basis-[33.333%] lg:pr-3 pr-2.5'
                  : '!basis-[55%] sm:!basis-[300px] lg:pr-6 pr-2.5',
              )}
            >
              <TvCard
                id={tv.id}
                width={onModal ? 333 : 300}
                height={onModal ? 500 : 450}
                title={tv.name}
                image={tv.poster_path}
                releaseYear={tv.first_air_date.split('-')[0]}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext
          className={
            'group-hover/carousel:opacity-100 md:opacity-0 opacity-100 transition-opacity'
          }
        />
        <CarouselPrevious
          className={
            'group-hover/carousel:opacity-100 md:opacity-0 opacity-100 transition-opacity'
          }
        />
      </Carousel>
    </React.Fragment>
  )
}

export default TvCarousel
