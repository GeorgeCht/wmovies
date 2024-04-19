// @ts-nocheck: TODO: data type should be infered
'use client'

import React, { DetailedHTMLProps, HTMLAttributes, useEffect } from 'react'
import { useRouter } from '@/components/i18n/navigation'
import { Tooltip, Button, Chip, useDisclosure } from '@nextui-org/react'
import { Volume2, VolumeX, Info } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { fetchData, truncate, getVideoTrailer } from '@/lib/utils'

import useBGManager from '@/stores/bg-manager'
import useTvSeriesTrackerStore from '@/stores/tv-series-tracker'
import PlayIcon from '@/components/ui/play-icon'
import EpisodePicker from '@/components/modal/episode-picker'

const HeroMovieDetails = ({
  id,
  mediaType,
  showMoreInfo = true,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  id: number
  mediaType: MediaType
  showMoreInfo?: boolean
}) => {
  const { setBackdrop, setVideo, mute, setMute } = useBGManager()
  const { setId, setData } = useTvSeriesTrackerStore()
  const router = useRouter()

  // for managing episode picker modal disclosure
  const {
    isOpen: episodePickerIsOpen,
    onOpen: episodePickerOnOpen,
    onOpenChange: episodePickerOnOpenChange,
  } = useDisclosure()

  const queryFn =
    mediaType === 'movie'
      ? fetchData<MovieDetailsWithImageAndVideos>(
          `${mediaType}/${id}?append_to_response=images,videos`,
        )
      : fetchData<TvDetailsWithImageAndVideos>(
          `${mediaType}/${id}?append_to_response=images,videos`,
        )

  const { isPending: loading, data } = useQuery({
    queryKey: [`${mediaType}/${id}/details`],
    queryFn: async () => queryFn,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  useEffect(() => {
    if (data) {
      setBackdrop(data?.backdrop_path)
      if (data?.videos && data?.videos.results) {
        setVideo(getVideoTrailer(data?.videos.results)?.key)
      }
      if (mediaType === 'tv') {
        setId(id)
        setData(data)
      }
    }
  }, [setBackdrop, setVideo, data, id, setId, setData, mediaType])

  if (loading) {
    return null
  }

  return (
    <React.Fragment>
      {data && (
        <div className={'flex flex-col'} {...props}>
          <ul className={'flex gap-2 pb-3'}>
            {data?.genres.map((genre) => (
              <li key={genre.id}>
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
          </ul>
          <h1
            className={
              'md:text-6xl sm:text-5xl text-[2.5rem] font-semibold leading-none tracking-tighter cursor-default md:pb-7 pb-3'
            }
          >
            {mediaType === 'movie' ? data?.title! : data?.name!}
          </h1>
          <p
            className={
              'sm:text-xl text-base font-normal leading-normal max-w-[596px] cursor-default md:pb-7 pb-4'
            }
          >
            {truncate(data?.overview!, 160)}
          </p>
          <div className={'w-full flex gap-3 justify-between pb-1'}>
            <div className={'flex gap-3'}>
              <Button
                onClick={() => {
                  if (mediaType === 'movie') {
                    router.push(`/movie/${id}/watch`)
                  } else {
                    episodePickerOnOpen()
                  }
                }}
                className={
                  'sm:text-xl text-lg text-black font-medium rounded-full bg-white sm:px-10 px-8 py-8 w-fit'
                }
              >
                <PlayIcon className={'sm:w-6 w-5 sm:h-6 h-5'} />
                Watch Now
              </Button>
              {showMoreInfo && (
                <Button
                  onClick={() =>
                    router.push(`/${mediaType}/${id}`, { scroll: false })
                  }
                  className={
                    'sm:text-xl text-lg text-black font-medium rounded-full bg-neutral-400 sm:px-7 px-6 py-8 w-fit'
                  }
                >
                  <Info className={'sm:w-6 w-5 sm:h-6 h-5'} />
                  More info
                </Button>
              )}
              <Tooltip
                showArrow
                delay={200}
                placement={'right'}
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
                    setMute(mute === 1 ? 0 : 1)
                  }}
                  className={
                    'text-white hidden md:flex backdrop-blur rounded-full bg-white/15 px-0 py-8 !w-16 min-w-16'
                  }
                >
                  {mute === 0 ? (
                    <VolumeX className={'sm:w-6 w-5 sm:h-6 h-5'} />
                  ) : (
                    <Volume2 className={'sm:w-6 w-5 sm:h-6 h-5'} />
                  )}
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      )}
      {data && mediaType === 'tv' && (
        <EpisodePicker
          id={id}
          detailsData={data as TvDetailsWithImageAndVideos}
          isOpen={episodePickerIsOpen}
          onOpen={episodePickerOnOpen}
          onOpenChange={episodePickerOnOpenChange}
        />
      )}
    </React.Fragment>
  )
}

export default HeroMovieDetails
