'use client'

import React, { useState } from 'react'
import {
  ModalHeader,
  Button,
  Chip,
  Tooltip,
  cn,
  Skeleton,
} from '@nextui-org/react'
import { Clock, Link2, Volume2, VolumeX } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { fetchData, formatDuration, getVideoTrailer } from '@/lib/utils'

import Ratings from '@/components/ui/ratings'
import PlayIcon from '@/components/ui/play-icon'
import ModalBackground from '@/components/modal/background'

const Header = ({ movieId }: { movieId: string }) => {
  const [trailerIsMuted, setTrailerIsMuted] = useState(1)
  const [expandOverview, setExpandOverview] = useState(false)

  const { isPending: loading, data } = useQuery({
    queryKey: [`movie/${movieId}/details`],
    queryFn: async () =>
      fetchData<MovieDetailsWithImageAndVideos>(
        `movie/${movieId}?append_to_response=images,videos`,
      ),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  if (loading) {
    return (
      <ModalHeader
        className={'flex flex-col lg:w-[1024px] w-full gap-1 z-20 px-6'}
      >
        <div className={'w-[596px]'}>
          <div className={'flex gap-2 sm:pb-60 pb-[30vw]'}>
            <Skeleton className={'rounded-full *:rounded-full w-24'}>
              <div className={'w-24 h-8'}></div>
            </Skeleton>
            <Skeleton className={'rounded-full *:rounded-full w-20'}>
              <div className={'w-20 h-8'}></div>
            </Skeleton>
            <Skeleton className={'rounded-full *:rounded-full w-28'}>
              <div className={'w-28 h-8'}></div>
            </Skeleton>
          </div>
          <Skeleton className={'rounded-lg mb-3 w-60'}>
            <div className={'w-52 h-4'}></div>
          </Skeleton>
          <Skeleton className={'rounded-lg *:rounded-lg mb-10 w-[27rem]'}>
            <div className={'w-[27rem] h-12'}></div>
          </Skeleton>
          <div className={'space-y-3 mb-10'}>
            <Skeleton className={'w-[90%] rounded-lg *:rounded-lg'}>
              <div className={'h-4 w-[90%]'}></div>
            </Skeleton>
            <Skeleton className={'w-[94%] rounded-lg *:rounded-lg'}>
              <div className={'h-4 w-[94%]'}></div>
            </Skeleton>
            <Skeleton className={'w-[92%] rounded-lg *:rounded-lg'}>
              <div className={'h-4 w-[92%]'}></div>
            </Skeleton>
          </div>
          <div className={'flex gap-3'}>
            <Skeleton className={'rounded-full *:rounded-full mb-10 w-56'}>
              <div className={'w-56 h-16'}></div>
            </Skeleton>
            <Skeleton className={'rounded-full *:rounded-full mb-10 h-16'}>
              <div className={'w-16 h-16'}></div>
            </Skeleton>
          </div>
        </div>
      </ModalHeader>
    )
  }

  return (
    <React.Fragment>
      <ModalBackground
        mute={trailerIsMuted}
        backdrop={data?.backdrop_path!}
        videoId={getVideoTrailer(data?.videos.results!)?.key}
      />
      <ModalHeader
        className={'flex flex-col lg:w-[1024px] w-full gap-1 z-20 px-6'}
      >
        <ul
          className={'flex gap-2 sm:pb-60 pb-[30vw]'}
          aria-roledescription={'genres'}
        >
          {data?.genres.map((genre, index) => (
            <li key={index}>
              <Chip
                size={'sm'}
                classNames={{
                  base: 'z-10 backdrop-blur bg-white/15 px-2 py-4',
                  content: 'font-semibold tracking-tight cursor-default',
                }}
              >
                {genre.name}
              </Chip>
            </li>
          ))}
          <li>
            <Chip
              size={'sm'}
              classNames={{
                base: 'z-10 backdrop-blur bg-white/15 px-2 py-4',
                content:
                  'flex gap-2 items-center font-semibold tracking-tight cursor-default',
              }}
            >
              <Clock className={'w-3 h-3 text-white'} />
              {formatDuration(data?.runtime!)}
            </Chip>
          </li>
        </ul>
        <Ratings
          size={'sm'}
          rating={data?.vote_average!}
          vote_count={data?.vote_count!}
          className={'z-10'}
        />
        <h1
          aria-roledescription={'title'}
          className={
            'text-balance md:text-6xl sm:text-5xl text-[2.5rem] font-semibold leading-none tracking-tighter cursor-default pb-7'
          }
        >
          {data?.title!}
        </h1>
        <div className={'mb-7 max-w-[596px]'}>
          <p
            onClick={() => {
              setExpandOverview((state) => !state)
            }}
            aria-roledescription={'overview'}
            className={cn(
              expandOverview
                ? 'max-h-full'
                : 'h-[calc(3*1.4925em)] truncate line-clamp-3',
              'h-full sm:text-xl text-base text-balance font-normal leading-normal cursor-default transition-all',
            )}
          >
            {data?.overview!}
          </p>
        </div>
        <div className={'w-full flex gap-3 justify-between pb-5'}>
          <div className={'flex gap-3'}>
            <Button
              className={
                'sm:text-xl text-lg text-black font-medium rounded-full bg-white sm:px-10 px-8 py-8 w-fit'
              }
            >
              <PlayIcon className={' sm:w-6 w-5 sm:h-6 h-5'} />
              Watch Now
            </Button>
            <Tooltip
              showArrow
              placement={'right'}
              content={'Copy link'}
              classNames={{
                base: ['before:bg-neutral-100 dark:before:bg-white'],
                content: [
                  'py-2 px-4 shadow-xl text-black text-[13px] font-semibold',
                  'bg-gradient-to-br from-white to-neutral-100 rounded-lg',
                ],
              }}
            >
              <Button
                className={
                  'text-white backdrop-blur rounded-full bg-white/15 px-0 py-8 !w-16 min-w-16'
                }
              >
                <Link2 className={'sm:w-6 w-5 sm:h-6 h-5'} />
              </Button>
            </Tooltip>
          </div>
          <Tooltip
            showArrow
            placement={'left'}
            content={'Unmute'}
            classNames={{
              base: ['before:bg-neutral-100 dark:before:bg-white'],
              content: [
                'py-2 px-4 shadow-xl text-black text-[13px] font-semibold',
                'bg-gradient-to-br from-white to-neutral-100 rounded-lg',
              ],
            }}
          >
            <Button
              onClick={() => {
                setTrailerIsMuted(trailerIsMuted === 1 ? 0 : 1)
              }}
              className={
                'text-white backdrop-blur hidden md:flex border border-white/25 rounded-full bg-white/0 px-0 py-8 !w-16 min-w-16'
              }
            >
              {trailerIsMuted === 0 ? (
                <VolumeX className={'sm:w-6 w-5 sm:h-6 h-5'} />
              ) : (
                <Volume2 className={'sm:w-6 w-5 sm:h-6 h-5'} />
              )}
            </Button>
          </Tooltip>
        </div>
      </ModalHeader>
    </React.Fragment>
  )
}

export default Header
