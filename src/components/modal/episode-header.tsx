import React, { useState } from 'react'
import Ratings from '@/components/ui/ratings'
import { Chip, Skeleton, cn } from '@nextui-org/react'
import { AnimateHeight } from '@/components/misc/animate-height'
import { truncate } from '@/lib/utils'
import { useTranslations } from 'next-intl'

const EpisodeHeader = ({
  loading,
  season,
  episodeData,
  detailsData,
}: {
  loading: boolean
  season: number
  episodeData: TvSeason
  detailsData: TvDetailsWithImageAndVideos
}) => {
  const tMessage = useTranslations('messages')
  const [expandOverview, setExpandOverview] = useState(false)
  if (loading) {
    return (
      <React.Fragment>
        <Skeleton className={'rounded-full w-[52px] h-8 mt-3 mb-8'} />
        <div className={'flex gap-2'}>
          <Skeleton className={'rounded-lg w-[88px] h-4'} />
          <Skeleton className={'rounded-lg w-5 h-4'} />
          <Skeleton className={'rounded-lg h-4 w-20'} />
        </div>
        <Skeleton className={'rounded-lg w-40 h-8 mt-1 mb-3'} />
        <Skeleton className={'rounded-lg w-[512px] h-4'} />
        <Skeleton className={'rounded-lg w-[482px] h-4'} />
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <Chip
        size={'sm'}
        classNames={{
          base: 'z-10 backdrop-blur bg-white/15 px-2 py-4 mt-3 mb-8',
          content: 'font-semibold tracking-tight cursor-default',
        }}
      >
        {episodeData?.air_date.split('-')[0] || 'N/A'}
      </Chip>
      <Ratings
        size={'sm'}
        rating={episodeData?.vote_average!}
        vote_count={detailsData.vote_count}
        className={'z-10'}
      />
      <h1
        aria-roledescription={'title'}
        className={
          'text-balance font-semibold md:text-4xl sm:text-3xl text-2xl leading-none tracking-tighter cursor-default'
        }
      >
        {tMessage('season')} {season}
      </h1>
      <div className={'relative mb-3'}>
        <AnimateHeight>
          <p
            onClick={() => {
              setExpandOverview((state) => !state)
            }}
            aria-roledescription={'overview'}
            className={cn(
              'sm:text-lg text-base text-balance font-normal leading-normal cursor-default transition-all',
            )}
          >
            {detailsData && expandOverview
              ? detailsData?.overview! || ''
              : truncate(detailsData?.overview!, 120) || ''}
          </p>
        </AnimateHeight>
      </div>
    </React.Fragment>
  )
}

export default EpisodeHeader
