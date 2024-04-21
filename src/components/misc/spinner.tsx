'use client'

import { Spinner, cn } from '@nextui-org/react'
import { animateVariants } from '@/lib/utils'
import { motion as Motion } from 'framer-motion'

const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <Motion.div
      key={'loading-spinner'}
      className={cn('absolute w-screen h-screen top-0 left-0', className)}
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
        className={'relative flex items-center justify-center w-full h-full'}
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
  )
}

export default LoadingSpinner
