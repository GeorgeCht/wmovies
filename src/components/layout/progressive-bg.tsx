'use client'

import { useScreenSize, animateVariants } from '@/lib/utils'
import {
  AnimatePresence,
  motion as Motion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useRef, useState } from 'react'
import YouTube from 'react-youtube'
import NoSsr from '@/components/misc/no-ssr'

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
  return (
    <div
      ref={background}
      className={'fixed w-full h-[100vh] top-0 left-0 z-0 opacity-80'}
    >
      <AnimatePresence mode={'wait'}>
        {(videoEnded || !videoLoaded) && (
          <Motion.div
            key={'background'}
            className={'fixed w-full h-[100vh] top-0 left-0'}
            style={{
              opacity: opacity,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundImage:
                'url(https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg)',
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
            className={'fixed w-full h-[100vh] top-0 left-0 z-0'}
            style={{
              opacity: videoLoaded ? opacity : 0,
            }}
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
                className={'absolute w-full h-full -mt-[60px] scale-125'}
                style={{
                  left:
                    screenSize.width >= 1680
                      ? '0'
                      : ((1680 - screenSize.width) / 2) * -1,
                }}
                videoId={'lVWL5B_m5GM'}
                opts={{
                  width: `${screenSize.width >= 1680 ? screenSize.width : 1680}px`,
                  height: `${screenSize.height}px`,
                  playerVars: {
                    autoplay: 1,
                    controls: 0,
                    rel: 0,
                    showinfo: 0,
                    mute: 1,
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

export default ProgressiveBackground
