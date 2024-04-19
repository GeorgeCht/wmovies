'use client'

import { animateVariants } from '@/lib/utils'
import { useScreenSize } from '@/lib/hooks'
import {
  AnimatePresence,
  motion as Motion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { Suspense, useRef, useState } from 'react'
import YouTube from 'react-youtube'
import NoSsr from '@/components/misc/no-ssr'
import useBGManager from '@/stores/bg-manager'

const ProgressiveBackground = () => {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const background = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: background,
    offset: ['start center', 'end center'],
  })
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])
  const screenSize = useScreenSize()
  const { backdrop, video, mute } = useBGManager()

  return (
    <div
      ref={background}
      className={'fixed w-full h-[100vh] top-0 left-0 z-0 opacity-80'}
    >
      <AnimatePresence mode={'wait'}>
        {(videoEnded || !videoLoaded) && backdrop !== 'none' && (
          <Motion.div
            style={{
              opacity: opacity,
            }}
          >
            <Motion.div
              key={'background'}
              className={'fixed w-full h-[100vh] top-0 left-0'}
              style={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop})`,
              }}
              {...animateVariants({
                initial: {
                  transition: { delay: 0.5 },
                  opacity: 0,
                },
                enter: {
                  transition: { delay: 0.5 },
                  opacity: 1,
                },
                exit: {
                  opacity: 0,
                  transition: {
                    delay: 3,
                    ease: 'easeOut',
                  },
                },
              })}
              animate={videoEnded || !videoLoaded ? 'enter' : 'exit'}
            />
          </Motion.div>
        )}
        {!videoEnded && video !== 'none' && (
          <Motion.div
            key={`video/${video}`}
            className={'fixed w-full h-[100vh] top-0 left-0 z-0'}
            style={{
              opacity: videoLoaded ? opacity : 0,
            }}
            {...animateVariants({
              initial: {
                opacity: 0,
                transition: {
                  delay: 0.2,
                  ease: 'easeIn',
                },
              },
              enter: {
                opacity: 1,
                transition: {
                  delay: 1.5,
                  duration: 1.5,
                  ease: 'easeIn',
                },
              },
              exit: {
                opacity: 0,
                transition: {
                  delay: 0.2,
                  ease: 'easeOut',
                },
              },
            })}
            animate={videoLoaded ? 'enter' : 'exit'}
          >
            <NoSsr>
              <Suspense fallback={null}>
                <YouTube
                  className={'absolute w-full h-full -mt-[60px] scale-125'}
                  style={{
                    left:
                      screenSize.width >= 1680
                        ? '0'
                        : ((1680 - screenSize.width) / 2) * -1,
                  }}
                  videoId={video}
                  opts={{
                    width: `${screenSize.width >= 1680 ? screenSize.width : 1680}px`,
                    height: `${screenSize.height}px`,
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
              </Suspense>
            </NoSsr>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProgressiveBackground
