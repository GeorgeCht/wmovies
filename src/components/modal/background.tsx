'use client'

import { animateVariants } from '@/lib/utils'
import { useScreenSize } from '@/lib/hooks'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { DetailedHTMLProps, HTMLAttributes, useState } from 'react'

import YouTube from 'react-youtube'
import NoSsr from '@/components/misc/no-ssr'
import { cn } from '@nextui-org/react'

const ModalBackground = ({
  mute = 1,
  idle = false,
  videoId,
  backdrop,
  backdropSize = 'w1280',
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  mute?: number
  idle?: boolean
  videoId?: string
  backdrop: string
  backdropSize?: 'w300' | 'w780' | 'w1280' | 'original'
}) => {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const screenSize = useScreenSize()

  return (
    <div
      className={cn(
        'absolute w-full h-[576px] top-0 left-0 z-[-1] transition-opacity !duration-1000',
        videoEnded && idle ? 'opacity-100' : 'opacity-70',
        className,
      )}
      {...props}
    >
      <AnimatePresence mode={'wait'}>
        {(videoEnded || !videoLoaded) && (
          <Motion.div
            key={'background'}
            className={cn(
              'w-full h-[576px] mask-bottom',
              videoEnded && idle ? 'opacity-100' : 'opacity-60',
            )}
            style={{
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundImage: `url(https://image.tmdb.org/t/p/${backdropSize}${backdrop})`,
            }}
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
            animate={videoEnded || !videoLoaded ? 'enter' : 'exit'}
          />
        )}
        {!videoEnded && (
          <Motion.div
            key={'video'}
            className={cn(
              'absolute w-full h-[576px] top-0 left-0 z-0 mask-video',
            )}
            {...animateVariants({
              initial: {
                opacity: 0,
                transition: {
                  ease: 'easeIn',
                },
              },
              enter: {
                opacity: 1,
                transition: {
                  delay: 1,
                  duration: 3,
                  ease: 'easeIn',
                },
              },
              exit: {
                opacity: 0,
                transition: {
                  ease: 'easeOut',
                },
              },
            })}
            animate={videoLoaded ? 'enter' : 'exit'}
          >
            <NoSsr>
              {videoId && (
                <YouTube
                  className={cn(
                    'absolute w-full h-[576px] transition-all !duration-1000 pointer-events-none',
                    idle
                      ? 'scale-[1.35] mt-0 sm:mt-0'
                      : 'scale-125 mt-[10px] sm:-mt-[60px]',
                  )}
                  videoId={videoId}
                  opts={{
                    width: `${screenSize.width >= 1024 ? 1024 : screenSize.width}px`,
                    height: `${screenSize.width >= 1024 ? 576 : screenSize.width * 0.5925}px`,
                    playerVars: {
                      autoplay: 1,
                      controls: 0,
                      rel: 0,
                      showinfo: 0,
                      mute: mute,
                      loop: 1,
                    },
                  }}
                  onReady={() => setVideoLoaded(true)}
                  onEnd={() => setVideoEnded(true)}
                />
              )}
            </NoSsr>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ModalBackground
