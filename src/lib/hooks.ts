'use client'

import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export const useRestoreScroll = () => {
  const router = useRouter()
  useEffect(() => {
    // Scroll restoration fix @see: https://github.com/vercel/next.js/issues/20951#issuecomment-1003746732
    router.beforePopState((state) => {
      state.options.scroll = false
      return true
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export const useScreenSize = () => {
  const isClient = typeof window === 'object'

  const [screenSize, setScreenSize] = useState(
    isClient
      ? {
          width: window.innerWidth,
          height: window.innerHeight,
        }
      : {
          width: 0,
          height: 0,
        },
  )

  useEffect(() => {
    if (!isClient) {
      return
    }

    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isClient])

  return screenSize
}
