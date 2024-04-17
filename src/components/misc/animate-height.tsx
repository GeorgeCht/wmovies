import { cn } from '@nextui-org/react'
import { HTMLMotionProps, motion as Motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

export const AnimateHeight = ({
  children,
  className,
  ...props
}: HTMLMotionProps<'div'> & {
  children: React.ReactNode
  className?: string
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [height, setHeight] = useState<number | 'auto'>('auto')

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        const observedHeight = entries[0].contentRect.height
        setHeight(observedHeight)
      })

      resizeObserver.observe(containerRef.current)

      return () => {
        resizeObserver.disconnect()
      }
    }
  }, [])

  return (
    <Motion.div
      className={cn(className, 'overflow-hidden')}
      style={{ height }}
      animate={{ height }}
      transition={{ duration: 0.385, ease: 'easeInOut' }}
      {...props}
    >
      <div ref={containerRef}>{children}</div>
    </Motion.div>
  )
}
