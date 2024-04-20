// @ts-nocheck: TODO: data type should be infered
'use client'

import React, { useState, useEffect } from 'react'
import {
  ModalHeader,
  Button,
  Chip,
  Tooltip,
  cn,
  Skeleton,
  useDisclosure,
} from '@nextui-org/react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/components/i18n/navigation'
import { AnimateHeight } from '@/components/misc/animate-height'
import { Clock, Link2, Volume2, VolumeX } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import {
  fetchData,
  formatLocale,
  formatDuration,
  getVideoTrailer,
  truncate,
} from '@/lib/utils'

import Ratings from '@/components/ui/ratings'
import PlayIcon from '@/components/ui/play-icon'
import ModalBackground from '@/components/modal/background'
import EpisodePicker from '@/components/modal/episode-picker'
import useTvSeriesTrackerStore from '@/stores/tv-series-tracker'

const Header = ({
  id,
  mediaType,
  idle = false,
  setIsOpen,
}: {
  id: string
  mediaType: MediaType
  idle: boolean
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (value: React.SetStateAction<boolean>) => void
}) => {
  const { setId, setData } = useTvSeriesTrackerStore()
  const locale = useLocale()
  const tActions = useTranslations('actions')
  const router = useRouter()
  const pathname = usePathname()

  // for managing episode picker modal disclosure
  const {
    isOpen: episodePickerIsOpen,
    onOpen: episodePickerOnOpen,
    onOpenChange: episodePickerOnOpenChange,
  } = useDisclosure()

  const [trailerIsMuted, setTrailerIsMuted] = useState(1)
  const [expandOverview, setExpandOverview] = useState(false)
  const queryFn =
    mediaType === 'movie'
      ? fetchData<MovieDetailsWithImageAndVideos>(
          `${mediaType}/${id}?append_to_response=images,videos&language=${formatLocale(locale)}`,
        )
      : fetchData<TvDetailsWithImageAndVideos>(
          `${mediaType}/${id}?append_to_response=images,videos&language=${formatLocale(locale)}`,
        )

  const { isPending: loading, data } = useQuery({
    queryKey: [`${mediaType}/${id}/details?language=${formatLocale(locale)}`],
    queryFn: async () => queryFn,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  useEffect(() => {
    if (data && mediaType === 'tv') {
      setId(id)
      setData(data)
    }
  }, [data, id, setId, setData, mediaType])

  if (loading) {
    return (
      <ModalHeader
        className={'flex flex-col lg:w-[1024px] w-full gap-1 z-20 px-4 sm:px-6'}
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
      {data && data?.videos && data?.videos.results && (
        <ModalBackground
          idle={idle}
          mute={trailerIsMuted}
          backdrop={data?.backdrop_path!}
          videoId={getVideoTrailer(data?.videos.results || [''])?.key || 'none'}
        />
      )}
      <ModalHeader
        className={cn(
          'flex flex-col lg:w-[1024px] w-full gap-1 z-20 px-4 sm:px-6 transition-opacity !duration-1000',
          idle ? 'opacity-25' : 'opacity-100',
        )}
      >
        <div
          className={cn(
            'relative flex transition-all !duration-1000',
            idle ? 'sm:pb-72 pb-[33.333vw]' : 'sm:pb-60 pb-[30vw]',
          )}
        >
          <ul
            className={cn(
              'absolute top-0 flex gap-2 transition-all !duration-1000',
              idle ? '-mt-16' : 'mt-0',
            )}
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
            {mediaType === 'movie' && (
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
                  {formatDuration(data?.runtime!) || 'N/A'}
                </Chip>
              </li>
            )}
          </ul>
        </div>
        <Ratings
          size={'sm'}
          rating={data?.vote_average!}
          vote_count={data?.vote_count!}
          className={'z-10'}
        />
        <h1
          aria-roledescription={'title'}
          className={cn(
            'text-balance font-semibold leading-none tracking-tighter cursor-default transition-all !duration-1000',
            idle
              ? 'md:text-5xl sm:text-4xl text-[2rem]'
              : 'md:text-6xl sm:text-5xl text-[2.5rem]',
          )}
        >
          {mediaType === 'movie' ? data?.title! : data?.name!}
        </h1>
        <div
          className={cn(
            'relative mb-4 max-w-[596px] transition-all !duration-1000',
            idle ? 'pt-0' : 'md:pt-7 pt-2.5',
          )}
        >
          <AnimateHeight>
            <p
              onClick={() => {
                setExpandOverview((state) => !state)
              }}
              aria-roledescription={'overview'}
              className={cn(
                'sm:text-xl text-base text-balance font-normal leading-normal cursor-default transition-all',
                idle ? 'h-0' : 'h-fit',
              )}
            >
              {expandOverview
                ? data?.overview!
                : truncate(data?.overview!, 160)}
            </p>
          </AnimateHeight>
        </div>
        <div className={'w-full flex gap-3 justify-between pb-1'}>
          <div className={'flex gap-3'}>
            <Button
              onClick={() => {
                if (mediaType === 'movie') {
                  setIsOpen(false)
                  router.push(`${pathname}/watch`, { scroll: false })
                } else {
                  episodePickerOnOpen()
                }
              }}
              className={
                'sm:text-xl text-lg text-black font-medium rounded-full bg-white sm:px-10 px-8 py-8 w-fit'
              }
            >
              <PlayIcon className={'sm:w-6 w-5 sm:h-6 h-5'} />
              {tActions('watch')}
            </Button>
            <Tooltip
              showArrow
              delay={200}
              placement={'right'}
              content={tActions('copy_link')}
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
            delay={200}
            placement={'left'}
            content={
              trailerIsMuted === 1 ? tActions('unmute') : tActions('mute')
            }
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
      {data && mediaType === 'tv' && (
        <EpisodePicker
          id={id}
          detailsData={data as TvDetailsWithImageAndVideos}
          isOpen={episodePickerIsOpen}
          onOpen={episodePickerOnOpen}
          onOpenChange={episodePickerOnOpenChange}
          setIsOpen={setIsOpen}
        />
      )}
    </React.Fragment>
  )
}

export default Header
