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
import { cn } from '@nextui-org/react'
import ReviewCard from './review-card'
import { useQuery } from '@tanstack/react-query'
import { fetchData } from '@/lib/utils'

const ReviewCarousel = ({
  movieId,
  onModal = false,
  className,
}: {
  movieId: string
  onModal?: boolean
  className?: string
}) => {
  const [api, setApi] = useState<CarouselApi>()
  const { isPending: loading, data } = useQuery({
    queryKey: [`movie/${movieId}/reviews`],
    queryFn: async () => fetchData<Review>(`movie/${movieId}/reviews`),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  // To skip spammy reviews
  const forbiddenTokens = ['http', 'https', '//', 'www']

  useEffect(() => {
    if (!api) {
      return
    }
  }, [api])

  if (loading) {
    return <p>Loading..</p>
  }

  return (
    <React.Fragment>
      {data && (
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
            {data?.results.map((review) => (
              <React.Fragment key={review.id}>
                {!forbiddenTokens.some((token) =>
                  review.content.includes(token),
                ) ? (
                  <CarouselItem
                    key={review.id}
                    className={cn(
                      onModal
                        ? '!basis-full sm:!basis-[33.333%] lg:pr-3 pr-2.5'
                        : '!basis-[55%] sm:!basis-[300px] lg:pr-6 pr-2.5',
                    )}
                  >
                    <ReviewCard review={review} width={onModal ? 333 : 300} />
                  </CarouselItem>
                ) : null}
              </React.Fragment>
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
      )}
    </React.Fragment>
  )
}

export default ReviewCarousel
