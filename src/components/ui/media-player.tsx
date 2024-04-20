'use client'

import React, { DetailedHTMLProps, HTMLAttributes, useState } from 'react'
import { Spinner, cn } from '@nextui-org/react'
import { motion as Motion } from 'framer-motion'
import { animateVariants, fetchData, formatLocale } from '@/lib/utils'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from '../i18n/navigation'
import { useQuery } from '@tanstack/react-query'
import { useIdle } from '@uidotdev/usehooks'
import { useScreenSize } from '@/lib/hooks'

import Title from './title'
import { useLocale } from 'next-intl'

const MediaPlayer = ({
  mediaType,
  id,
  season,
  episode,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  mediaType: MediaType
  id: string
  season?: string
  episode?: string
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()
  const idle = useIdle(4500)
  const screenSize = useScreenSize()
  const locale = useLocale()

  const queryFn =
    mediaType === 'movie'
      ? fetchData<MovieDetailsWithImageAndVideos>(
          `${mediaType}/${id}?language=${formatLocale(locale)}`,
        )
      : fetchData<TvDetailsWithImageAndVideos>(
          `${mediaType}/${id}?language=${formatLocale(locale)}`,
        )

  const { data } = useQuery({
    queryKey: [`${mediaType}/${id}/details?language=${formatLocale(locale)}`],
    queryFn: async () => queryFn,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  return (
    <React.Fragment>
      {!isLoaded && (
        <Motion.div
          className={'absolute w-screen h-screen top-0 left-0'}
          {...animateVariants({
            initial: {
              opacity: 0,
            },
            enter: {
              opacity: 1,
            },
            exit: {
              opacity: 0,
              transition: {
                delay: 1,
                ease: 'easeOut',
              },
            },
          })}
        >
          <div
            className={
              'relative flex items-center justify-center w-full h-full'
            }
          >
            <Spinner
              classNames={{
                base: '!w-24 !h-24',
                wrapper: '!w-24 !h-24',
                circle1: '!w-24 !h-24 border-b-white border-[5px]',
                circle2: '!w-24 !h-24 border-b-white border-[5px]',
              }}
            />
          </div>
        </Motion.div>
      )}
      <div
        className={cn(
          'absolute w-screen h-screen top-0 left-0 z-0 bg-black opacity-0 transition-opacity !duration-1000',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className,
        )}
        {...props}
      >
        <iframe
          className={'w-full h-screen h-dvh'}
          onLoadedData={() => setIsLoaded(true)}
          onLoad={() => setIsLoaded(true)}
          src={
            mediaType === 'movie'
              ? `https://vidsrc.to/embed/${mediaType}/${id}`
              : `https://vidsrc.to/embed/${mediaType}/${id}/${season}/${episode}`
          }
          allowFullScreen
        />
      </div>
      {data && (
        <Motion.div
          key={`media-namebar-${id}`}
          {...animateVariants({
            initial: {
              transition: {
                delay: 1,
              },
              opacity: 0,
            },
            enter: {
              transition: {
                delay: 1,
              },
              opacity: 1,
            },
            exit: {
              opacity: 0,
              transition: {
                delay: 1,
                ease: 'easeOut',
              },
            },
          })}
        >
          <div
            className={cn(
              'absolute flex items-start w-screen h-36 top-0 left-0 z-10 px-3 md:px-9 pt-7',
              'bg-gradient-to-b from-black from-25% via-black/60 via-60% to-transparent transition-all !duration-1000',
              idle && screenSize.width >= 768 ? 'opacity-0' : 'opacity-100',
            )}
          >
            <div className={'flex items-center gap-4'}>
              <button aria-label={'Back'} onClick={() => router.back()}>
                <ChevronLeft className={'md:w-10 md:h-10 w-8 h-8'} />
              </button>
              <Title onModal className={'!p-0'}>
                {/* @ts-ignore */}
                {mediaType === 'movie' ? data?.title! : data?.name!}
                {season && episode && ` — S${season}E${episode}`}
              </Title>
            </div>
          </div>
        </Motion.div>
      )}
    </React.Fragment>
  )
}

export default MediaPlayer
