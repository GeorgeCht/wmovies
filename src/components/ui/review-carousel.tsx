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
import ReviewCard from './review-card'
import { useTranslations } from 'next-intl'

const ReviewCarousel = ({
  data,
  loading,
  onModal = false,
  className,
}: {
  data: Review | undefined
  loading: boolean
  onModal?: boolean
  className?: string
}) => {
  const [api, setApi] = useState<CarouselApi>()
  const tMessage = useTranslations('messages')

  // To skip spammy reviews
  const forbiddenTokens = ['http', 'https', '//', 'www']

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
                  ? '!basis-[85%] sm:!basis-[66.666%] md:!basis-[33.333%] lg:pr-3 pr-2.5'
                  : '!basis-[55%] sm:!basis-[300px] lg:pr-6 pr-2.5',
              )}
              key={index}
            >
              <Skeleton className={'rounded-2xl mb-2'}>
                <div
                  style={{
                    width: onModal ? 333 : 276,
                    height: onModal ? 148 : 148,
                  }}
                  className={'w-[300px] h-[450px]'}
                />
              </Skeleton>
            </div>
          ))}
        </div>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      {data && data.total_results > 0 ? (
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
            {data.results.map((review) => (
              <React.Fragment key={review.id}>
                {!forbiddenTokens.some((token) =>
                  review.content.includes(token),
                ) ? (
                  <CarouselItem
                    key={review.id}
                    className={cn(
                      onModal
                        ? '!basis-[85%] sm:!basis-[66.666%] md:!basis-[33.333%] lg:pr-3 pr-2.5'
                        : '!basis-[55%] sm:!basis-[300px] lg:pr-6 pr-2.5',
                    )}
                  >
                    <ReviewCard review={review} width={onModal ? 733 : 300} />
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
      ) : (
        <div className={'flex flex-col justify-center w-full pt-6'}>
          <h5
            className={
              'text-sm font-normal text-white leading-[1.3em] pt-1 cursor-default'
            }
          >
            {tMessage('no_reviews')}
          </h5>
          <p
            className={
              'text-xs font-semibold text-white/50 leading-none pt-1 cursor-default'
            }
          >
            {tMessage('unavailable')}
          </p>
        </div>
      )}
    </React.Fragment>
  )
}

export default ReviewCarousel
