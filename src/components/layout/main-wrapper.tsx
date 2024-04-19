'use client'

import { useScreenSize } from '@/lib/hooks'
import { cn } from '@nextui-org/react'
import { useIdle } from '@uidotdev/usehooks'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

const MainWrapper = ({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
  const idle = useIdle(4500)
  const screenSize = useScreenSize()
  return (
    <main
      className={cn(
        'relative lg:py-8 py-5 xl:px-24 lg:px-16 px-5 ml-0 lg:ml-24 transition-all !ease-in-out !duration-700',
        idle && screenSize.width >= 768 ? 'lg:!ml-0' : 'lg:!ml-24',
        className,
      )}
      {...props}
    >
      {children}
    </main>
  )
}

export default MainWrapper
