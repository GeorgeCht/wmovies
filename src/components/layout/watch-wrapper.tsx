'use client'

import useBGManager from '@/stores/bg-manager'
import { useEffect } from 'react'

const WatchWrapper = () => {
  const { setBackdrop, setVideo } = useBGManager()
  useEffect(() => {
    setBackdrop('none')
    setVideo('none')
  }, [setBackdrop, setVideo])

  return null
}

export default WatchWrapper
