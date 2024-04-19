import { useState, useEffect } from 'react'

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
