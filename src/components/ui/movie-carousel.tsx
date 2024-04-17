'use client'

import React, { useEffect, useState } from 'react'
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
import { fetchData } from '@/lib/utils'
import MovieCard from './movie-card'

const MovieCarousel = ({
  mediaType = 'movie',
  movieId = '693134',
  onModal = false,
  className,
}: {
  mediaType?: MediaType
  movieId?: string
  onModal?: boolean
  className?: string
}) => {
  const [api, setApi] = useState<CarouselApi>()
  const { isPending: loading, data } = useQuery({
    queryKey: [`${mediaType}/${movieId}/recommendations`],
    queryFn: async () =>
      fetchData<MovieRecommended>(`${mediaType}/${movieId}/recommendations`),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  useEffect(() => {
    if (!api) {
      return
    }
  }, [api])

  if (loading) {
    return (
      <React.Fragment>
        <div className={'flex w-full overflow-hidden'}>
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
          {data?.results.map((movie) => (
            <CarouselItem
              key={movie.id}
              className={cn(
                onModal
                  ? '!basis-[55%] sm:!basis-[33.333%] lg:pr-3 pr-2.5'
                  : '!basis-[55%] sm:!basis-[300px] lg:pr-6 pr-2.5',
              )}
            >
              <MovieCard
                id={movie.id}
                width={onModal ? 333 : 300}
                height={onModal ? 500 : 450}
                title={movie.title}
                image={movie.poster_path}
                releaseYear={movie.release_date.split('-')[0]}
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

export default MovieCarousel
