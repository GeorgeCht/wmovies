'use client'

import { useScreenSize, animateVariants } from '@/lib/utils'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { useState } from 'react'

import YouTube from 'react-youtube'
import NoSsr from '@/components/misc/no-ssr'

const ModalBackground = ({
  mute = 1,
  videoId,
  backdrop,
}: {
  mute?: number
  videoId?: string
  backdrop: string
}) => {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const screenSize = useScreenSize()

  return (
    <div className={'absolute w-full h-[576px] top-0 left-0 z-[-1] opacity-70'}>
      <AnimatePresence mode={'wait'}>
        {(videoEnded || !videoLoaded) && (
          <Motion.div
            key={'background'}
            className={'w-full h-[576px] opacity-60 mask-bottom'}
            style={{
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop})`,
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
            className={
              'absolute w-full h-[576px] top-0 left-0 z-0 opacity-60 mask-video'
            }
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
              <YouTube
                className={
                  'absolute w-full h-[576px] mt-[10px] sm:-mt-[60px] scale-125 pointer-events-none'
                }
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
            </NoSsr>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ModalBackground
