import ky from 'ky'
import { Variants } from 'framer-motion'
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

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isClient])

  return screenSize
}

export const animateVariants = (variants: Variants) => {
  return {
    variants,
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
  }
}

export const convertScore = (score: number) => {
  return Math.round((score / 10) * 5 * 10) / 10
}

export const formatVoteCount = (voteCount: number) => {
  if (voteCount >= 1000) {
    const countInK = voteCount / 1000
    return `${countInK.toFixed(1)}k`
  } else {
    return voteCount.toString()
  }
}

export const fetchData = async <T extends unknown>(
  query: string,
): Promise<T> => {
  const joinString = query.includes('?') ? '&' : '?'
  const data = await ky(
    `https://api.themoviedb.org/3/${query}${joinString}api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY!}`,
  ).json()
  return data as T
}

export const getVideoTrailer = (
  videoResults: Array<VideoResult>,
): VideoResult | null => {
  let mostRecentVideo: VideoResult | null = null

  for (const video of videoResults) {
    if (video.type === 'trailer') {
      if (
        !mostRecentVideo ||
        video.published_at > mostRecentVideo.published_at
      ) {
        mostRecentVideo = video
      }
    } else {
      if (
        !mostRecentVideo ||
        video.published_at > mostRecentVideo.published_at
      ) {
        mostRecentVideo = video
      }
    }
  }

  return mostRecentVideo
}

export const formatDuration = (duration: number): string => {
  if (duration < 60) {
    return `${duration}m`
  } else {
    const hours = Math.floor(duration / 60)
    const minutes = duration % 60

    if (minutes > 0) {
      return `${hours}h${minutes}`
    } else {
      return `${hours}h`
    }
  }
}

export const formatDateDifference = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()

  const millisecondsDifference = now.getTime() - date.getTime()
  const secondsDifference = millisecondsDifference / 1000
  const minutesDifference = secondsDifference / 60
  const hoursDifference = minutesDifference / 60
  const daysDifference = hoursDifference / 24
  const monthsDifference = daysDifference / 30
  const yearsDifference = daysDifference / 365

  if (yearsDifference >= 1) {
    return `${Math.floor(yearsDifference)} year${Math.floor(yearsDifference) !== 1 ? 's' : ''} ago`
  } else if (monthsDifference >= 1) {
    return `${Math.floor(monthsDifference)} month${Math.floor(monthsDifference) !== 1 ? 's' : ''} ago`
  } else if (daysDifference >= 1) {
    return `${Math.floor(daysDifference)} day${Math.floor(daysDifference) !== 1 ? 's' : ''} ago`
  } else if (hoursDifference >= 1) {
    return `${Math.floor(hoursDifference)} hour${Math.floor(hoursDifference) !== 1 ? 's' : ''} ago`
  } else if (minutesDifference >= 1) {
    return `${Math.floor(minutesDifference)} minute${Math.floor(minutesDifference) !== 1 ? 's' : ''} ago`
  } else {
    return `${Math.floor(secondsDifference)} second${Math.floor(secondsDifference) !== 1 ? 's' : ''} ago`
  }
}
